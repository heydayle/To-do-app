import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import type {Style} from '../../typeDefinition';
import {checkInput, checkTime, getTimeShedule} from '../../res/functions';
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-web';
import DialogModal from '../DialogCustom';
import Colors from '../../res/Colors';
import Modal from 'modal-react-native-web';
import AsyncStorage from '@react-native-community/async-storage';
import {dayOfWeek} from '../../res/datas';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

type Props = {
  dataFull?: [],
  _id?: string,
  time?: string,
  date?: string,
  description?: string,
  imgSrc?: string,
  wrapperStyle?: Style,
};

let d = new Date();
let onDay = dayOfWeek[d.getDay()];
let dataFullDelecte = [];

let doneImg = 'img/icon/doneTick.png';
let almostImg = 'img/icon/almostTick.png';

export default function Schedule(props: Props) {
  const {time, imgSrc, description, date, wrapperStyle, dataFull, _id} = props;

  const [state, setState] = useState({
    currentDay: d.getUTCDate(),
    month: d.getUTCMonth() + 1,
    year: d.getFullYear(),
    dayOfW: onDay.name,
  });

  const [flat, setFlat] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibles, setModalVisibles] = useState({
    des: description,
    ti: time,
  });

  const [modalVisibleErr, setModalVisibleErr] = useState({
    status: false,
    textError: '',
  });

  const [scheduleDecription, setScheduleDecription] = useState(
    modalVisibles.des,
  );
  const [scheduleTime, setScheduleTime] = useState(modalVisibles.ti);
  const _setIsState = () => {
    setScheduleDecription(modalVisibles.des);
    setScheduleTime(modalVisibles.ti);
  };
  // _setIsState();
  const _true = () => {
    return true;
  };

  const _getdata = () => {
    AsyncStorage.getItem('schedules', (err, result) => {
      dataFullDelecte = JSON.parse(result);
    });
  };
  return (
    <View>
      <View style={stylesRight.scheduleItem}>
        <View style={{marginVertical: 'auto', marginHorizontal: 10}}>
          <Image
            source={{uri: checkTime(props) ? doneImg : almostImg}}
            style={{width: 16, height: 10}}
          />
        </View>
        <View
          style={[
            checkTime(props)
              ? stylesRight.scheduleDone
              : stylesRight.scheduleAlmost,
            wrapperStyle,
          ]}>
          <View style={stylesRight.scheduleLeft}>
            <Image source={{uri: imgSrc}} style={{width: 35, height: 35}} />
            <Text style={stylesRight.textSch}>{description}</Text>
          </View>
          <View style={stylesRight.scheduleRight}>
            <Text style={stylesRight.timeSch}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const stylesRight = StyleSheet.create({
  scheduleItem: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    marginBottom: 20,
  },
  scheduleDone: {
    backgroundColor: '#F8D57E',
  },
  scheduleAlmost: {
    backgroundColor: '#f9f9f9',
  },
  scheduleLeft: {
    //justifyContent: 'space-between',
    flexDirection: 'row',
    width: '70%',
  },
  textSch: {
    marginVertical: 'auto',
    marginLeft: 30,
    fontSize: 16,
  },
  scheduleRight: {},
  timeSch: {
    marginVertical: 'auto',
  },
});

