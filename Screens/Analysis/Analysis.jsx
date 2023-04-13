import {StyleSheet, Text, ScrollView, View} from 'react-native';
import React from 'react';
import {useLayoutEffect} from 'react';
import Dashboard from '../Add Attendance/Dashboard';
import {useSelector} from 'react-redux';
const Analysis = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: 'black',
      title: 'Attendance Analysis',
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
            Attendance Analysis
          </Text>
        );
      },
    });
  }, [navigation]);
  const data = useSelector(state => state);

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <Dashboard />
      <Text
        style={{
          marginVertical: 14,
          fontSize: 18,
          fontFamily: 'Poppins-Medium',
          color: '#181818',
        }}>
        Subject Wise Analysis
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          width: '90%',
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 1,
        }}>
        {data.map((subject, index) => {
          return (
            <View style={styles.card} key={subject.id}>
              <Text style={styles.title}>{subject.name}</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#4ade80',
                        paddingHorizontal: 6,
                        paddingVertical: 6,
                        borderRadius: 30,
                        marginRight: 4,
                      }}></View>
                    <Text style={styles.subTitle}>
                      Present: {subject.present.length}/
                      {subject.present.length + subject.absent.length}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#f87171',
                        paddingHorizontal: 6,
                        paddingVertical: 6,
                        borderRadius: 30,
                        marginRight: 4,
                      }}></View>
                    <Text style={styles.subTitle}>
                      Absent: {subject.absent.length}/
                      {subject.present.length + subject.absent.length}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#60a5fa',
                        paddingHorizontal: 6,
                        paddingVertical: 6,
                        borderRadius: 30,
                        marginRight: 4,
                      }}></View>
                    <Text style={styles.subTitle}>
                      Cancel: {subject.absent.length}
                    </Text>
                  </View>
                </View>
                <Text style={styles.totalPercentage}>
                  {subject.present.length === 0 && subject.absent.length === 0
                    ? 0
                    : (
                        (subject.present.length * 100) /
                        (subject.present.length + subject.absent.length)
                      ).toPrecision(4)}
                  %
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: '96%',
    borderBottomColor: '#18181810',
    borderBottomWidth: 2,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: '#181818',
    fontSize: 16,
    marginBottom: 4,
  },
  subTitle: {
    fontFamily: 'Poppins-Regular',
    color: '#181818',
    fontSize: 13,
    color: '#18181890',
  },
  totalPercentage: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: '#181818',
  },
});
