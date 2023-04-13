import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
const AttendDiv = props => {
  if (
    props.present.includes(props.date) ||
    props.absent.includes(props.date) ||
    props.cancel.includes(props.date)
  ) {
    return (
      <View style={styles.div}>
        <View style={styles.textArea}>
          <Text style={styles.subName}>
            <Icon name="book" size={20} color="#181818" />
            &nbsp;
            {props.subject}
          </Text>
        </View>
        <View style={styles.attendShow}>
          <Text style={styles.subData}>
            {props.present.length +
              '/' +
              (props.present.length + props.absent.length) +
              '  (' +
              (
                (props.present.length * 100) /
                (props.present.length + props.absent.length)
              ).toPrecision(4) +
              '%)'}
          </Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
              width: '60%',
              overflow: 'hidden',
              marginTop: -2,
            }}>
            {props.present &&
              props.present.map((indi, index) => {
                if (indi === props.date) {
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#4ade80',
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        borderRadius: 30,
                        fontSize: 14,
                        marginRight: 6,
                      }}></View>
                  );
                }
              })}
            {props.absent &&
              props.absent.map((indi, index) => {
                if (indi === props.date) {
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#f87171',
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        borderRadius: 30,
                        fontSize: 14,
                        marginRight: 6,
                      }}></View>
                  );
                }
              })}
            {props.cancel &&
              props.cancel.map((indi, index) => {
                if (indi === props.date) {
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#60a5fa',
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        borderRadius: 30,
                        fontSize: 14,
                        marginRight: 6,
                      }}></View>
                  );
                }
              })}
          </View>
        </View>
      </View>
    );
  }
};

export default AttendDiv;

const styles = StyleSheet.create({
  div: {
    width: '90%',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  textArea: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  attendShow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subName: {
    fontSize: 16,
    marginBottom: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#181818',
  },
  subData: {
    color: '#181818',
    fontSize: 14,
    letterSpacing: 1,
    width: '40%',
    fontFamily: 'Poppins-Regular',
  },
  btnArea: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
});
