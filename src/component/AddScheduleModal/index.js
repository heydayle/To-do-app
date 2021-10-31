import React, {useContext} from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import {modalStyle} from '../../res/Styles/Styles';
import Colors from '../../res/Colors';
import {dayOfWeek} from '../../res/datas';
import {
  FlatList,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-web';
import Modal from 'modal-react-native-web';
import {ErrContext, ScheduleContext} from '../dataContext';
import {checkErr, getTimeShedule, changeMonth} from '../../res/functions';
import AsyncStorage from '@react-native-community/async-storage';
import images from '../../res/Images';

type Props = {
  dataFull?: [],
  state?: state,
  imgState?: state,

};

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

const monthArr = dayOfWeek;

export default function AddScheduleModal(props: Props) {
  const {modalVisible, setModalVisible} = useContext(ScheduleContext);

  const arrImg = [images.Doctor, images.Birthday, images.Alarm];
  return (
    <Modal //Modal add Schedule
      visible={modalVisible}
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
              Schedule
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 20,
                color: Colors.mainColor,
              }}>
              {state.dayOfW}, {changeMonth(state.month, monthArr).slice(0, 3)}{' '}
              {state.currentDay} {state.year}
            </Text>
          </View>
          <TextInput
            style={modalStyle.textInputStyle}
            placeholder={'Description'}
            onChangeText={(text) => setScheduleDecription(text)}
            value={scheduleDecription}
          />
          <TextInput
            style={modalStyle.textInputStyle}
            placeholder={'00:00'}
            maxLength={5}
            onChangeText={(text) => {
              setScheduleTime(text);
            }}
            value={scheduleTime}
          />
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 15,
              marginBottom: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: Colors.grayf9,
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                setImg({
                  src: arrImg[0],
                  style: modalStyle.selectImg,
                });
              }}
              style={
                arrImg[0] === img.src
                  ? [img.style, modalStyle.imgNomal]
                  : modalStyle.imgNomal
              }>
              <Image source={arrImg[0]} style={modalStyle.imgSelectStyle} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setImg({
                  src: arrImg[2],
                  style: modalStyle.selectImg,
                });
              }}
              style={
                arrImg[2] === img.src
                  ? [img.style, modalStyle.imgNomal]
                  : modalStyle.imgNomal
              }>
              <Image source={arrImg[2]} style={modalStyle.imgSelectStyle} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setImg({
                  src: arrImg[1],
                  style: modalStyle.selectImg,
                });
              }}
              style={
                arrImg[1] === img.src
                  ? [img.style, modalStyle.imgNomal]
                  : modalStyle.imgNomal
              }>
              <Image source={arrImg[1]} style={modalStyle.imgSelectStyle} />
            </TouchableOpacity>
          </View>
          <View>
            {/*<Picker*/}
            {/*  selectedValue={selectedValue}*/}
            {/*  style={{*/}
            {/*    height: (windowsHeight * 8) / 100,*/}
            {/*    width: (windowsWidth * 35) / 100,*/}
            {/*    marginBottom: 20,*/}
            {/*    backgroundColor: Colors.grayf9,*/}
            {/*    borderWidth: 0,*/}
            {/*    borderRadius: 15,*/}
            {/*    paddingHorizontal: 10,*/}
            {/*    color: Colors.gray60,*/}
            {/*  }}*/}
            {/*  onValueChange={(itemValue, itemIndex) =>*/}
            {/*    setSelectedValue(itemValue)*/}
            {/*  }>*/}
            {/*  <Picker.Item label={''} value="1" />*/}
            {/*  <Picker.Item label="Special" value="2" />*/}
            {/*  <Picker.Item label="Danger" value="3" />*/}
            {/*</Picker>*/}
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
                setModalVisible(!modalVisible);
              }}>
              <Text style={modalStyle.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <ErrContext.Provider value={{modalVisibleErr, setModalVisibleErr}}>
              <TouchableHighlight
                style={[modalStyle.button, {backgroundColor: Colors.mainColor}]}
                onPress={() => {
                  setModalVisibleErr(
                    checkErr(scheduleDecription, scheduleTime, img.src),
                  );
                  if (
                    checkErr(scheduleDecription, scheduleTime, img.src).id == 1
                  ) {
                    var rand = id + 1;
                    let Obj = {
                      //Tạo mới phần tử
                      id: rand,
                      time: getTimeShedule(scheduleTime),
                      date:
                        state.year + '-' + state.month + '-' + state.currentDay,
                      imgSrc: img.src.uri,
                      description: scheduleDecription,
                    };
                    dataFull.push(Obj); //Push vào mảng
                    AsyncStorage.setItem(
                      //Set vào Storage
                      'schedules',
                      JSON.stringify(dataFull),
                    );
                    AsyncStorage.setItem(
                      //Set vào Storage
                      'id',
                      JSON.stringify(id + 1),
                      () => {
                        setImg({src: ''});
                        setScheduleTime('');
                        setScheduleDecription('');
                      },
                    );
                    setModalVisible(!modalVisible);
                  }
                }}>
                <Text style={modalStyle.textStyle}>Add</Text>
              </TouchableHighlight>
            </ErrContext.Provider>
          </View>
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
