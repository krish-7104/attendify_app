import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setValueHandler} from '../../redux/actions';
import ChangeDate from '../Components/ChangeDate';
import EditDiv from './EditDiv';

const EditAttend = ({navigation}) => {
  const [date, setDate] = useState('');
  const attendance = useSelector(state => state);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'black',
      title: 'Edit Attendance',
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: 20,
              marginTop: 6,
              marginLeft: -8,
              color: '#181818',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Edit Attendance
          </Text>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    const date = new Date();
    setDate(date.toString().slice(0, 15));
    getAttendanceData();
  }, []);

  /**
   * The function handles changing the date by either subtracting or adding a day.
   */
  const dateChangeHandler = type => {
    if (type === 'left') {
      const dateObj = new Date(date);
      dateObj.setDate(dateObj.getDate() - 1);
      setDate(dateObj);
    }
    if (type === 'right') {
      let today = new Date();
      if (date.toString().slice(0, 15) !== today.toString().slice(0, 15)) {
        const dateObj = new Date(date);
        dateObj.setDate(dateObj.getDate() + 1);
        setDate(dateObj);
      }
    }
  };

  /**
   * This function retrieves attendance data from AsyncStorage and updates the state accordingly.
   */
  const getAttendanceData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('attendance');
      if (jsonValue !== null) {
        dispatch(setValueHandler(JSON.parse(jsonValue)));
      } else {
        dispatch(setValueHandler([]));
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * The function stores the attendance data in AsyncStorage if it exists.
   */
  const storeAttendanceHandler = async () => {
    if (attendance) {
      try {
        await AsyncStorage.setItem('attendance', JSON.stringify(attendance));
      } catch (e) {
        console.log(e);
      }
    }
  };

  /**
   * The function edits attendance data by removing a specific date from the present or absent array of
   * a subject.
   */
  const editAttendance = (id, date) => {
    let subjId;
    attendance.map((ele, ind) => {
      if (ele.id === id) {
        subjId = ind;
      }
    });
    let subject = attendance[subjId];
    dispatch(
      setValueHandler([
        ...attendance.filter(item => item.id !== id),
        {
          id: id,
          name: subject.name,
          present: subject.present.filter(
            item => item !== date.toString().slice(0, 15),
          ),
          absent: subject.absent.filter(
            item => item !== date.toString().slice(0, 15),
          ),
        },
      ]),
    );
    storeAttendanceHandler();
  };

  /**
   * The function prompts the user with an alert to confirm the deletion of attendance for a subject.
   */
  const removeAttendanceHandler = (id, date) => {
    Alert.alert(
      'Are You Sure?',
      'You want to delete attendance of this subject',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => editAttendance(id, date),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <ChangeDate
        date={date.toString().slice(0, 15)}
        dateChangeHandler={dateChangeHandler}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        {attendance &&
          attendance.map(item => {
            return (
              <EditDiv
                date={date.toString().slice(0, 15)}
                key={item.id}
                id={item.id}
                subject={item.name}
                present={item.present}
                absent={item.absent}
                cancel={item.cancel ? item.cancel : []}
                removeAttendanceHandler={removeAttendanceHandler}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default EditAttend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
  },
});
