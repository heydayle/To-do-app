import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {modalStyle, windowsHeight, windowsWidth} from '../../res/Styles/Styles';
import Colors from '../../res/Colors';
import {
  addSchedule,
  changeMonth,
  checkAddPinned,
  checkErr,
  getWeekNumber,
} from '../../res/functions';
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Picker,
  FlatList,
} from 'react-native-web';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'modal-react-native-web';
import {PinnedContext} from '../dataContext';
import images from '../../res/Images';
import Pinned from '../Pinned';

type Props = {};

export default function AddPinModal(props: Props) {
  const arrImg = [
    images.Doctor,
    images.Birthday,
    images.Alarm,
    images.Gym,
    images.Shusi,
    images.Yoga,
  ];

  const {visible, title, date, time, des, icon, err} = useContext(
    PinnedContext,
  );

  const [addPinModal, setAddPinModal] = visible,
    [titlePin, setTitlePin] = title,
    [datePin, setDatePin] = date,
    [timePin, setTimePin] = time,
    [desPin, setDesPin] = des,
    [img, setImg] = icon,
    [modalVisibleErr, setModalVisibleErr] = err;

  const [selectValue, setSelectValue] = useState('1');

  return (
    <View>
      <Modal //______________________________________________Modal add Schedule
        visible={addPinModal}
        animationType="fade"
        transparent={true}>
        <View>
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
            <View style={modalStyle.modalView}>
              <View
                style={{
                  width: '95%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}>
                  Pinned
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 20,
                    color: Colors.mainColor,
                  }}>
                  Week {getWeekNumber()[1]} of {getWeekNumber()[0]}
                </Text>
              </View>
              <TextInput
                style={modalStyle.textInputStyle}
                placeholder={'Title'}
                onChangeText={(text) => setTitlePin(text)}
                value={titlePin}
              />
              <TextInput
                style={modalStyle.textInputStyle}
                placeholder={'01/01/2020'}
                maxLength={10}
                onChangeText={(text) => {
                  setDatePin(text);
                }}
                value={datePin}
              />
              <TextInput
                style={modalStyle.textInputStyle}
                placeholder={'00:00'}
                maxLength={5}
                onChangeText={(text) => {
                  setTimePin(text);
                }}
                value={timePin}
              />
              <TextInput
                style={modalStyle.textInputStyle}
                placeholder={'Description'}
                maxLength={100}
                onChangeText={(text) => {
                  setDesPin(text);
                }}
                value={desPin}
              />
              <View>
                <Picker
                  selectedValue={selectValue}
                  style={{
                    height: (windowsHeight * 8) / 100,
                    width: (windowsWidth * 35) / 100,
                    marginBottom: 20,
                    backgroundColor: Colors.grayf9,
                    borderWidth: 0,
                    borderRadius: 15,
                    paddingHorizontal: 10,
                    color: Colors.gray60,
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectValue(itemValue)
                  }>
                  <Picker.Item label="Personal" value="1" />
                  <Picker.Item label="Special" value="2" />
                  <Picker.Item label="Danger" value="3" />
                  <Picker.Item label="So so" value="4" />
                  <Picker.Item label="Early" value="5" />
                  <Picker.Item label="Later" value="6" />
                </Picker>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 15,
                  marginBottom: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  alignSelf: 'center',
                }}>
                <FlatList
                  data={arrImg}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  keyExtractor={(item, index) => 'key' + index}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setImg({
                            src: item,
                            style: modalStyle.selectImg,
                          });
                        }}
                        style={
                          item === img.src
                            ? [img.style, modalStyle.imgNomal]
                            : modalStyle.imgNomal
                        }>
                        <Image
                          source={item}
                          style={modalStyle.imgSelectStyle}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableHighlight
                  style={[
                    modalStyle.button,
                    {
                      backgroundColor: Colors.gray70,
                      marginRight: 15,
                    },
                  ]}
                  onPress={() => {
                    setAddPinModal(!addPinModal);
                  }}>
                  <Text style={modalStyle.textStyle}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[
                    modalStyle.button,
                    {backgroundColor: Colors.mainColor},
                  ]}
                  onPress={() => {
                    setModalVisibleErr(
                      checkAddPinned(
                        titlePin,
                        datePin,
                        timePin,
                        selectValue,
                        desPin,
                        img.src,
                      ),
                    );
                    if (
                      checkAddPinned(
                        titlePin,
                        datePin,
                        timePin,
                        selectValue,
                        desPin,
                        img.src,
                      ).id === -1
                    ) {
                      alert(
                        titlePin +
                          '-' +
                          datePin +
                          '-' +
                          timePin +
                          '-' +
                          selectValue +
                          '-' +
                          desPin +
                          '-' +
                          img.src,
                      );
                      setAddPinModal(!addPinModal);
                    }
                  }}>
                  <Text style={modalStyle.textStyle}>Add</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
