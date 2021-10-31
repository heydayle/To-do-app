import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Colors from '../../res/Colors';
import {TextInput, TouchableHighlight} from 'react-native-web';
import {getTimeShedule} from '../../res/functions';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'modal-react-native-web';

type Props = {
  visible?: boolean,
  time?: string,
};

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

export default function DialogModal(props: Props) {
  const {visible, time} = props;
  const [modalVisible, setModalVisible] = useState(visible);

  const showDialog = () => {
    setModalVisible(true);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  const [selectedValue, setSelectedValue] = useState('0');
  const [scheduleTitle, setScheduleTitle] = useState('');
  const [scheduleDecription, setScheduleDecription] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
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
                Schedule edit
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 20,
                  color: Colors.mainColor,
                }}>
                {/*{dayOfW}, {changeMonth.slice(0, 3)} {currentDay} {year}*/}
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
              placeholder={'Time'}
              onChangeText={(text) => setScheduleTime(text)}
              value={scheduleTime}
            />
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
              {/*  <Picker.Item label="Personal" value="1" />*/}
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
              <TouchableHighlight
                style={[modalStyle.button, {backgroundColor: Colors.mainColor}]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={modalStyle.textStyle}>Confrim</Text>
              </TouchableHighlight>
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
const modalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    opacity: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInputStyle: {
    width: (windowsWidth * 35) / 100,
    height: (windowsHeight * 8) / 100,
    backgroundColor: Colors.grayf9,
    shadowColor: Colors.gray70,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 15,
    elevation: 24,
    fontSize: 15,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    width: 150,
    borderRadius: 15,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
});
