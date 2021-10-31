import React, {useState, useContext, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {modalStyle, windowsWidth, windowsHeight} from '../../res/Styles/Styles';
import Colors from '../../res/Colors';
import {FlatList, TouchableHighlight, TouchableOpacity} from 'react-native-web';
import Modal from 'modal-react-native-web';
import {getDateOW} from '../../res/functions';
import {SelectMonthContext} from '../dataContext';
import {dayOfWeek} from '../../res/datas';

type Props = {
  monthArr?: [],
  arrDay?: [],
};

export default function SelectMonthModal(props: Props) {
  const {monthProvider, stateProvider, valueMonth} = useContext(
    SelectMonthContext,
  );
  const [monthModal, setMonthModal] = monthProvider,
    [state, setState] = stateProvider,
    [monthChanged, setMonthChanged] = valueMonth;

  const {monthArr, arrDay} = props;

  // const changed = useEffect(() => {
  //   console.log(monthChanged);
  //   setState({
  //     currentDay: state.currentDay,
  //     month: parseInt(monthChanged),
  //     year: state.year,
  //     dayOfW:
  //       arrDay[new Date(state.year + '-' + monthChanged + '-1').getDay()].name,
  //   });
  //   //console.log(monthChanged);
  // }, [monthChanged]);

  const monthCallback = useCallback(
    (item) => {
      setMonthChanged(item.numberMonth);
      // changed();
    },
    [monthChanged],
  );

  return (
    <Modal //Modal select month
      visible={monthModal}
      animationType="fade"
      transparent={true}>
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
      <View style={modalStyle.centeredView}>
        <View style={[modalStyle.modalView]}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 10,
                color: Colors.mainColor,
              }}>
              Month
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 10,
                color: Colors.black01,
              }}>
              {monthArr[parseInt(state.month) - 1].nameMonth}
            </Text>
          </View>
          <FlatList
            data={monthArr}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={[
                    {
                      margin: 10,
                      width: 25,
                      height: 25,
                      paddingVertical: 3,
                      textAlign: 'center',
                    },
                    item.numberMonth === state.month.toString()
                      ? {
                          backgroundColor: Colors.mainColor,
                          borderRadius: '50%',
                          color: Colors.white,
                        }
                      : {},
                  ]}
                  onPress={() => {
                    monthCallback(item);
                  }}>
                  <Text
                    style={[
                      {fontWeight: 'bold'},
                      item.numberMonth === monthChanged.toString()
                        ? {
                            color: Colors.white,
                          }
                        : {},
                    ]}>
                    {item.numberMonth}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <TouchableHighlight
            style={[
              modalStyle.button,
              {
                backgroundColor: Colors.mainColor,
                textAlign: 'center',
              },
            ]}
            onPress={() => setMonthModal(false)}>
            <Text>OK</Text>
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
