import React, {useContext, useState, useCallback, useMemo} from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import {modalStyle, windowsWidth, windowsHeight} from '../../res/Styles/Styles';
import {Calendar} from 'react-native-calendario';
import Colors from '../../res/Colors';
import {FlatList, TouchableHighlight, TouchableOpacity} from 'react-native-web';
import Modal from 'modal-react-native-web';
import {CalendarContext} from '../dataContext';
import {getDateOW} from '../../res/functions';

type Props = {
};

export default function CalendarModal(props: Props) {
  const {stateProvider, calendarProvider, valueMonth} = useContext(
    CalendarContext,
  );

  const [calendarModal, setCalendarModal] = calendarProvider;
  const [state, setState] = stateProvider;
  const [monthChanged, setMonthChanged] = valueMonth;

  return (
    <Modal visible={calendarModal} animationType="fade" transparent={true}>
      {/*<TouchableOpacity >*/}
      <View
        style={{
          width: windowsWidth,
          height: windowsHeight,
          backgroundColor: '#000',
          opacity: 0.7,
          margin: 'auto',
          position: 'absolute',
        }}
      />
      <View style={[modalStyle.centeredView]}>
        <View style={[modalStyle.modalView, {width: '40%', height: '80%'}]}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 'auto',
            }}>
            {/*<TouchableOpacity>*/}
            {/*  <Image*/}
            {/*    source={{uri: 'img/icon/leftArrow.png'}}*/}
            {/*    style={{width: 50, height: 50}}*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
            <Text
              style={{
                paddingVertical: 10,
                fontWeight: 'bold',
                fontSize: 30,
                color: Colors.mainColor,
              }}>
              Calendar
            </Text>
            <Text
              style={{
                marginVertical: 'auto',
                fontWeight: 'bold',
              }}>
              {state.dayOfW}, {state.currentDay}/{state.month}/{state.year}
            </Text>
            {/*<TouchableOpacity>*/}
            {/*  <Image*/}
            {/*    source={{uri: 'img/icon/rightArrow.png'}}*/}
            {/*    style={{width: 50, height: 50}}*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
          </View>
          <Calendar
            startDate={
              new Date(state.year + '-' + state.month + '-' + state.currentDay)
            }
            startingMonth={new Date(state.year + '-' + monthChanged + '-' + 1)}
            firstDayMonday={true}
            onChange={(range) => {
              setState({
                currentDay: range.startDate.getDate(),
                month: range.startDate.getMonth() + 1,
                year: range.startDate.getFullYear(),
                dayOfW: getDateOW(
                  range.startDate.getFullYear(),
                  range.startDate.getUTCMonth() + 1,
                  range.startDate.getDate(),
                ),
              });
              console.log(range.startDate.getUTCMonth() + 1);
            }}
            disableRange={true}
            numberOfMonths={3}
            theme={{
              activeDayColor: {
                backgroundColor: Colors.red5c,
                color: Colors.white,
              },
              monthTitleTextStyle: {
                color: Colors.mainColor,
                fontWeight: 'bold',
                fontSize: 20,
              },
              emptyMonthContainerStyle: {
              },
              emptyMonthTextStyle: {
                fontWeight: '200',
              },
              weekColumnsContainerStyle: {},
              weekColumnStyle: {
                //paddingVertical: 5,
              },
              weekColumnTextStyle: {
                color: Colors.mainColor,
                //fontSize: 13,
              },
              nonTouchableDayContainerStyle: {},
              nonTouchableDayTextStyle: {},
              startDateContainerStyle: {
                backgroundColor: Colors.red5c,
                color: Colors.white,
              },
              endDateContainerStyle: {},
              dayContainerStyle: {
                width: 40, height: 40
                // backgroundColor: Colors.red6b,
              },
              dayTextStyle: {
                color: '#2d4150',
                fontWeight: '200',
                fontSize: 15,
              },
              dayOutOfRangeContainerStyle: {},
              dayOutOfRangeTextStyle: {},
              todayContainerStyle: {
                backgroundColor: Colors.mainColor,
                borderRadius: '50%',
              },
              todayTextStyle: {
                color: Colors.white,
                textAlign: 'center',
              },
              activeDayContainerStyle: {
                backgroundColor: Colors.mainColor,
              },
              activeDayTextStyle: {
                color: 'white',
              },
              nonTouchableLastMonthDayTextStyle: {},
            }}
          />
          <TouchableHighlight
            style={[
              modalStyle.button,
              {
                backgroundColor: Colors.mainColor,
                margin: 'auto',
                width: '90%',
              },
            ]}
            onPress={() => {
              setCalendarModal(false);
            }}>
            <Text style={[modalStyle.textStyleErr, {color: Colors.white}]}>
              OK
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
