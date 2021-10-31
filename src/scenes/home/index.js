import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Picker,
} from 'react-native-web';
import Pinned from '../../component/Pinned';
import Schedule from '../../component/Schedule';
import Colors from '../../res/Colors';
import images from '../../res/Images';
import {Calendar} from 'react-native-calendario';
import Modal from 'modal-react-native-web';
import {dataPinned, dataSchedules, dayOfWeek, infoMonth} from '../../res/datas';
import {
  checkMonth,
  checkDay,
  checkNumber,
  storage,
  storageNotes,
  sortSchedule,
  getFinalData,
  getTimeShedule,
  checkTime,
  checkInput,
  checkNoteInput,
  checkErr,
  checkErrEdit,
  addSchedule,
  changeMonth,
  storageId,
  getDateOW,
  storagePinned,
} from '../../res/functions';
import {
  modalStyle,
  noteStyle,
  stylesRight,
  styles,
} from '../../res/Styles/Styles';
import AsyncStorage from '@react-native-community/async-storage';
import NoteItem from '../../component/NoteItem';
import {
  CalendarContext,
  ErrContext,
  PinnedContext,
  SelectMonthContext,
} from '../../component/dataContext';
import ErrModal from '../../component/errModal';
import CalendarModal from '../../component/CalendarModal';
import SelectMonthModal from '../../component/SelectMonthModal';
import AddPinModal from '../../component/AddPinModal';

type Props = {};

//console.error("Unexpected text node: " + item + ". A text node cannot be a child of a <View>.");

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

const d = new Date();

const arr = dataPinned;

const arrDay = dayOfWeek;

const monthArr = infoMonth;

let onDay = dayOfWeek[d.getDay()];

let flat = true;

let dataFull = [];

let dataNotes = [];

let dataPinnedStore = [];

let id = 0;

export default function index(props: Props) {
  let dataList = [];
  const data = arr;

  const [state, setState] = useState({
      currentDay: d.getUTCDate(),
      month: d.getUTCMonth() + 1,
      year: d.getFullYear(),
      dayOfW: onDay.name,
      schedules: false,
    }),
    [monthState, setMonthState] = useState(1);

  const [dataState, setData] = useState([]),
    [flats, setFlat] = useState(false),
    [date, setDate] = useState(new Date()),
    [calendarModal, setCalendarModal] = useState(false),
    [monthModal, setMonthModal] = useState(false),
    [monthChanged, setMonthChanged] = useState(state.month);

  const [contentSchedule, setContentSchedule] = useState({
    _id: 0,
    description: '',
    time: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleErr, setModalVisibleErr] = useState({
    status: false,
    textError: '',
  });

  //state for modal Schedule
  const showDialog = () => {
    setModalVisible(true);
  };

  const [scheduleDescription, setScheduleDescription] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [editSchedule, setEditSchedule] = useState(false);
  const [monthDataChange, setMonthDataChange] = useState();

  const [img, setImg] = useState({
    src: '',
    style: StyleSheet,
  });

  const arrImg = [
    images.Doctor,
    images.Birthday,
    images.Alarm,
    images.Gym,
    images.Shusi,
    images.Yoga,
  ];

  //state modal Note
  const [modalNote, setModalNote] = useState(false);
  const [textNote, setTextNode] = useState('');
  const [contentNote, setContentNote] = useState({
    _id: 'ad',
    description: 'ad',
    stylist: StyleSheet,
  });
  const [colorNote, setColorNote] = useState(StyleSheet);
  const [editNoteModal, setEditNoteModal] = useState(false);

  const [addPinModal, setAddPinModal] = useState(false),
    [titlePin, setTitlePin] = useState(''),
    [datePin, setDatePin] = useState(''),
    [timePin, setTimePin] = useState(''),
    [desPin, setDesPin] = useState('');

  const showModalNote = () => {
    setModalNote(true);
  };
  const handleModalNote = () => {
    setModalNote(false);
  };

  //Note
  const getStorageNotes = async () => {
    await AsyncStorage.getItem('notes', (err, result) => {
      dataNotes = JSON.parse(result);
    });
  };

  const getid = async () => {
    await AsyncStorage.getItem('id', (err, result) => {
      id = parseInt(result);
    });
  }; //lay id tu dong

  const checkStorageId = async () => {
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('id') === null) {
      await storageId();
    }
  };

  const checkStorageNotes = async () => {
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('notes') === null) {
      await storageNotes();
    }
  };

  const checkStoragePinned = async () => {
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('pinned') === null) {
      await storagePinned();
    }
  };

  const getStoragePinned = async () => {
    await AsyncStorage.getItem('pinned', (err, result) => {
      dataPinnedStore = JSON.parse(result);
    });
  };

  const {currentDay, month, year, dayOfW} = state;
  //Schedule
  let getStorage = async () => {
    await AsyncStorage.getItem('schedules', (err, result) => {
      dataFull = JSON.parse(result);
      flat = false;
      dataList = dataFull.filter(
        (item) =>
          item.date.split('-')[2] == state.currentDay &&
          item.date.split('-')[1] == state.month &&
          item.date.split('-')[0] == state.year,
      );
    });
  };

  const checkStorage = async () => {
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('schedules') === null) {
      await storage();
    }
  };

  const checkLoad = () => {
    //kiem tra local storage
    if (flat) {
      checkStorageNotes();
      checkStorage();
      checkStorageId();
      checkStoragePinned();
      getStorageNotes();
      getStorage();
      getid();
      getStoragePinned();
    } else {
      dataList = dataFull.filter(
        (item) =>
          item.date.split('-')[2] == state.currentDay &&
          item.date.split('-')[1] == state.month &&
          item.date.split('-')[0] == state.year,
      );
    }
  };
  checkLoad();

  const deCreDayWeek = (check) => {
    //xu ly tang giam ngay
    let newDate = checkDay(year, month, currentDay, check);
    setState({
      currentDay: newDate.days,
      month: newDate.monthChange,
      year: newDate.yearChange,
      dayOfW: getDateOW(newDate.yearChange, newDate.monthChange, newDate.days),
    });
  };

  const getDateOW = (year, month, currentDay) => {
    //thu trong tuan
    let d = new Date(year + '-' + month + '-' + currentDay);
    //console.log(dataList);
    onDay = arrDay[d.getDay()];
    return onDay.name;
  };

  const deCreDay = () => {
    deCreDayWeek(false); //giam mot ngay
  };

  const inCreDay = () => {
    deCreDayWeek(true); //tang 1 ngay
  };

  const monthCallbackData = useCallback(
    (item) => {
      setMonthDataChange(item.numberMonth);
      alert(monthDataChange);
    },
    [monthDataChange],
  );

  useEffect(() => {
    getStorageNotes();
    getid();
    //console.log(monthChanged);
  }, [dataNotes]);

  useEffect(() => {
    getStorage();
    getid();
    //console.log(monthChanged);
  }, [dataFull]);

  return (
    <View style={styles.container}>
      <View style={styles.contentLeft}>
        <View style={styles.titleLeft}>
          <Image
            style={{width: 44, height: 46}}
            source={{uri: '/img/icon/addTask.png'}}
          />
          <Text style={styles.titleName}>i'll doo</Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.mainLeft}>
          <View style={styles.headMainLeft}>
            <Text style={styles.nameHead}>Weekly Pinned</Text>
            <TouchableOpacity>
              <Text style={styles.linkHead}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <FlatList
              data={dataPinnedStore}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={({item}) => {
                return (
                  <Pinned
                    imgSrc={item.imgSrc}
                    name={item.name}
                    date={item.date}
                    kind={item.kind}
                    description={item.description}
                    wrapperStyle={styles.kindPin}
                  />
                );
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setAddPinModal(true)}>
              <Image
                source={{uri: 'img/icon/addIcon.png'}}
                style={styles.addIcon}
              />
              <Text style={styles.addText}>Add new weekly pin</Text>
            </TouchableOpacity>
          </View>
          <PinnedContext.Provider
            value={{
              visible: [addPinModal, setAddPinModal],
              title: [titlePin, setTitlePin],
              date: [datePin, setDatePin],
              time: [timePin, setTimePin],
              des: [desPin, setDesPin],
              icon: [img, setImg],
              err: [modalVisibleErr, setModalVisibleErr],
            }}>
            <AddPinModal />
          </PinnedContext.Provider>
          <View>
            <View style={styles.headCalendar}>
              <View style={styles.calendarLeft}>
                <Text style={styles.textPiker}>
                  {changeMonth(d.getMonth() + 1)}, {year}
                </Text>
                <View style={styles.buttonCalendar}>
                  <TouchableOpacity>
                    <Image
                      source={{uri: 'img/icon/backIconCircle.png'}}
                      style={styles.iconMove}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={{uri: 'img/icon/nextIconCircle.png'}}
                      style={styles.iconMove}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                padding: 10,
                backgroundColor: Colors.white,
                borderRadius: 20,
                paddingVertical: 'auto',
                marginBottom: 20,
              }}>
              <Calendar
                firstDayMonday={true}
                onChange={(range) => {}}
                monthHeight={270}
                disableRange={true}
                numberOfMonths={1}
                showMonthTitle={false}
                theme={{
                  activeDayColor: {},
                  monthTitleTextStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                  },
                  emptyMonthContainerStyle: {},
                  emptyMonthTextStyle: {},
                  weekColumnsContainerStyle: {},
                  weekColumnStyle: {},
                  weekColumnTextStyle: {
                    color: Colors.mainColor,
                  },
                  nonTouchableDayContainerStyle: {},
                  nonTouchableDayTextStyle: {},
                  startDateContainerStyle: {
                    backgroundColor: Colors.red5c,
                    color: Colors.white,
                  },
                  endDateContainerStyle: {},
                  dayContainerStyle: {
                    width: 40,
                    height: 40,
                  },
                  dayTextStyle: {
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
                  },
                  activeDayContainerStyle: {},
                  activeDayTextStyle: {},
                  nonTouchableLastMonthDayTextStyle: {},
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      {/*<View style={{zIndex: 9999}}>*/}
      <ErrContext.Provider value={{modalVisibleErr, setModalVisibleErr}}>
        <ErrModal />
      </ErrContext.Provider>
      {/*</View>*/}
      <View style={stylesRight.contentRight}>
        <View style={stylesRight.rightHeader}>
          <View style={stylesRight.rightHeaderTitle}>
            <Text style={stylesRight.rightTitle}>Today's schedule</Text>
            <TouchableOpacity
              onPress={() => {
                // setMonthModal(true);
              }}>
              <Text style={stylesRight.monthSch}>
                {changeMonth(month)}
                {', '}
                {year}{' '}
              </Text>
            </TouchableOpacity>
            <SelectMonthContext.Provider
              value={{
                monthProvider: [monthModal, setMonthModal],
                stateProvider: [state, setState],
                valueMonth: [monthChanged, setMonthChanged],
              }}>
              <SelectMonthModal monthArr={monthArr} arrDay={arrDay} />
            </SelectMonthContext.Provider>
            <TouchableOpacity
              onPress={() => {
                showDialog();
              }}>
              <Image
                source={{uri: 'img/icon/addTask.png'}}
                style={{width: 50, height: 53}}
              />
            </TouchableOpacity>
            <Modal //______________________________________________Modal add Schedule
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
                      {dayOfW}, {changeMonth(month).slice(0, 3)} {currentDay}{' '}
                      {year}
                    </Text>
                  </View>
                  <TextInput
                    style={modalStyle.textInputStyle}
                    placeholder={'Description'}
                    onChangeText={(text) => setScheduleDescription(text)}
                    value={scheduleDescription}
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
                        setModalVisible(!modalVisible);
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
                          checkErr(scheduleDescription, scheduleTime, img.src),
                        );
                        if (
                          checkErr(scheduleDescription, scheduleTime, img.src)
                            .id === 1
                        ) {
                          addSchedule(
                            id,
                            scheduleTime,
                            scheduleDescription,
                            dataFull,
                            img,
                            year,
                            month,
                            currentDay,
                          );
                          AsyncStorage.setItem(
                            'id',
                            JSON.stringify(id + 1),
                            () => {
                              setImg({src: ''});
                              setScheduleTime('');
                              setScheduleDescription('');
                            },
                          );
                          setModalVisible(!modalVisible);
                        }
                      }}>
                      <Text style={modalStyle.textStyle}>Add</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <CalendarContext.Provider
            value={{
              stateProvider: [state, setState],
              calendarProvider: [calendarModal, setCalendarModal],
              valueMonth: [monthChanged, setMonthChanged],
            }}>
            <CalendarModal arrDay={arrDay} onDay={onDay} />
          </CalendarContext.Provider>
          <View style={stylesRight.rightNextHead}>
            {/*/___________________________________________________Schedule*/}
            <TouchableOpacity
              style={stylesRight.fullDay}
              onPress={() => setCalendarModal(true)}>
              <Text style={stylesRight.daySch}>{dayOfW} </Text>
              <Text style={stylesRight.daySch}>
                {currentDay.toString().length < 2
                  ? '0' + currentDay
                  : currentDay}
              </Text>
            </TouchableOpacity>
            <View style={stylesRight.buttonSch}>
              <TouchableOpacity
                onPress={() => {
                  deCreDay();
                }}>
                <Image
                  source={{uri: 'img/icon/backIconCircle.png'}}
                  style={stylesRight.iconMove}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  inCreDay();
                }}>
                <Image
                  source={{uri: 'img/icon/nextIconCircle.png'}}
                  style={stylesRight.iconMove}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={stylesRight.rightMain}>
              <FlatList
                data={getFinalData(dataList)}
                keyExtractor={(item, index) => 'key' + index} //__________________Schedules
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setContentSchedule({
                          _id: item.id,
                          description: item.description,
                          time: item.time,
                        });
                        setScheduleDescription(item.description);
                        setScheduleTime(item.time);
                        setEditSchedule(!editSchedule);
                      }}>
                      <Schedule
                        imgSrc={item.imgSrc}
                        time={item.time}
                        date={item.date}
                        description={item.description}
                        wrapperStyle={stylesRight.schedule}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{width: (windowsWidth * 25) / 100}}>
        <View style={noteStyle.noteFullStyle}>
          <View style={noteStyle.noteHead}>
            <Text style={{fontSize: 25}}>Notes</Text>
          </View>
          {/*//_________________________________________________________________Notes*/}
          <View style={noteStyle.noteMain}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={dataNotes}
              //extraData={editSchedule}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setEditNoteModal(true);
                      setContentNote({
                        _id: item.id,
                        description: item.description,
                        stylist: item.stylist,
                      });
                      setTextNode(item.description);
                      setColorNote(item.stylist);
                    }}>
                    <NoteItem
                      des={item.description}
                      id={item.id}
                      wrapper={item.stylist}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <TouchableOpacity
            style={noteStyle.noteAddBtn}
            onPress={() => {
              showModalNote();
            }}>
            <Image
              source={{uri: 'img/icon/addIcon.png'}}
              style={{width: 40, height: 40}}
            />
            <Text
              style={{
                marginLeft: 10,
                marginVertical: 'auto',
                fontSize: 15,
              }}>
              Add note
            </Text>
          </TouchableOpacity>
          {/*//______________________________________________________________Add Note*/}
          <Modal
            visible={editNoteModal}
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
              <View style={[modalStyle.modalView, colorNote]}>
                <TextInput
                  style={modalStyle.textInputStyle}
                  placeholder={'Notes'}
                  autoCapitalize={'word'}
                  onChangeText={(text) => setTextNode(text)}
                  value={textNote}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                  }}>
                  <Text>Note's color:</Text>
                  <TouchableHighlight
                    style={[
                      modalStyle.colorNoteStyle,
                      {backgroundColor: Colors.bluea0},
                    ]}
                    onPress={() => setColorNote(noteStyle.itemBlue)}>
                    <Text />
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.colorNoteStyle,
                      {backgroundColor: Colors.greenb3},
                    ]}
                    onPress={() => setColorNote(noteStyle.itemGreen)}>
                    <Text />
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.colorNoteStyle,
                      {backgroundColor: Colors.mainColor},
                    ]}
                    onPress={() => setColorNote(noteStyle.itemMainColor)}>
                    <Text />
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.colorNoteStyle,
                      {backgroundColor: Colors.red5c},
                    ]}
                    onPress={() => setColorNote(noteStyle.itemRed)}>
                    <Text />
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.colorNoteStyle,
                      {backgroundColor: Colors.grayf9},
                    ]}
                    onPress={() => setColorNote(noteStyle.itemGray)}>
                    <Text />
                  </TouchableHighlight>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight
                    style={[
                      modalStyle.button,
                      {
                        backgroundColor: Colors.gray60,
                        marginRight: 20,
                      },
                    ]}
                    onPress={() => {
                      setTextNode('');
                      setColorNote();
                      setEditNoteModal(false);
                    }}>
                    <Text style={[modalStyle.textStyle]}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.button,
                      {
                        backgroundColor: Colors.red6b,
                        marginRight: 20,
                      },
                    ]}
                    onPress={() => {
                      const dataNotesDelete = dataNotes;
                      for (let i = 0; i < dataNotes.length; i++) {
                        if (dataNotes[i].id === contentNote._id) {
                          dataNotes = dataNotesDelete.filter(
                            (item) => item.id !== contentNote._id,
                          );
                        }
                      }
                      AsyncStorage.setItem('notes', JSON.stringify(dataNotes));
                      setTextNode('');
                      setColorNote();
                      setEditNoteModal(false);
                    }}>
                    <Text style={[modalStyle.textStyle]}>Delete</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.button,
                      {
                        backgroundColor: Colors.mainColor,
                      },
                    ]}
                    onPress={() => {
                      if (checkNoteInput(textNote)) {
                        setModalVisibleErr({
                          status: true,
                          textError: 'Dont empty note!',
                        });
                      } else {
                        for (let i = 0; i < dataNotes.length; i++) {
                          if (dataNotes[i].id === contentNote._id) {
                            dataNotes[i].description = textNote;
                            dataNotes[i].stylist = colorNote;
                          }
                        }
                        setData(dataNotes);
                        AsyncStorage.setItem(
                          'notes',
                          JSON.stringify(dataNotes),
                          () => {
                            setTextNode('');
                            setColorNote();
                          },
                        );
                        setEditNoteModal(false);
                      }
                    }}>
                    <Text style={modalStyle.textStyle}>Confirm</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          <Modal visible={modalNote} animationType="fade" transparent={true}>
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
              <View style={[modalStyle.modalView, colorNote]}>
                <TextInput
                  style={modalStyle.textInputStyle}
                  placeholder={'Notes'}
                  autoCapitalize={'word'}
                  onChangeText={(text) => setTextNode(text)}
                  value={textNote}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                  }}>
                  <Text>Note's color:</Text>
                  <TouchableHighlight
                    style={[
                      modalStyle.colorNoteStyle,
                      {backgroundColor: Colors.bluea0},
                    ]}
                    onPress={() => setColorNote(noteStyle.itemBlue)}>
                    <Text />
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.colorNoteStyle,
                      {backgroundColor: Colors.greenb3},
                    ]}
                    onPress={() => setColorNote(noteStyle.itemGreen)}>
                    <Text />
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.colorNoteStyle,
                      {backgroundColor: Colors.mainColor},
                    ]}
                    onPress={() => setColorNote(noteStyle.itemMainColor)}>
                    <Text />
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.colorNoteStyle,
                      {backgroundColor: Colors.red5c},
                    ]}
                    onPress={() => setColorNote(noteStyle.itemRed)}>
                    <Text />
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.colorNoteStyle,
                      {backgroundColor: Colors.grayf9},
                    ]}
                    onPress={() => setColorNote(noteStyle.itemGray)}>
                    <Text />
                  </TouchableHighlight>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight
                    style={[
                      modalStyle.button,
                      {
                        backgroundColor: Colors.gray60,
                        marginRight: 20,
                      },
                    ]}
                    onPress={() => {
                      handleModalNote();
                    }}>
                    <Text style={[modalStyle.textStyle]}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.button,
                      {
                        backgroundColor: Colors.mainColor,
                        borderWidth: 1,
                        borderColor: Colors.white,
                      },
                    ]}
                    onPress={() => {
                      if (checkNoteInput(textNote)) {
                        setModalVisibleErr({
                          status: true,
                          textError: 'Dont empty note!',
                        });
                      } else {
                        let Obj = {
                          id: id + 1,
                          description: textNote,
                          stylist: colorNote,
                        };
                        setTextNode('');
                        setColorNote();
                        AsyncStorage.setItem('id', id + 1);
                        dataNotes.push(Obj);
                        AsyncStorage.setItem(
                          'notes',
                          JSON.stringify(dataNotes),
                        );
                        handleModalNote();
                        // window.location.reload(false);
                      }
                    }}>
                    <Text style={modalStyle.textStyle}>Add</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          {/*///___________________________________________________________Edit Note*/}
          <Modal visible={editSchedule} animationType="fade" transparent={true}>
            {' '}
            /Edit schedule
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
                  onChangeText={(description) =>
                    setScheduleDescription(description)
                  }
                  value={scheduleDescription}
                />
                <TextInput
                  style={modalStyle.textInputStyle}
                  keyboardType={'numeric'}
                  maxLength={5}
                  onChangeText={(time) => setScheduleTime(time)}
                  value={scheduleTime}
                />
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
                      setEditSchedule(!editSchedule);
                      setScheduleDescription('');
                      setScheduleTime('');
                    }}>
                    <Text style={modalStyle.textStyle}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.button,
                      {
                        backgroundColor: Colors.red6b,
                        marginRight: 15,
                      },
                    ]}
                    onPress={() => {
                      const dataFullDelecte = dataFull;
                      for (let i = 0; i < dataFull.length; i++) {
                        if (dataFull[i].id === contentSchedule._id) {
                          dataFull = dataFullDelecte.filter(
                            (item) => item.id !== contentSchedule._id,
                          );
                        }
                      }
                      AsyncStorage.setItem(
                        'schedules',
                        JSON.stringify(dataFull),
                      );
                      setEditSchedule(!editSchedule);
                      setScheduleDescription('');
                      setScheduleTime('');
                    }}>
                    <Text style={modalStyle.textStyle}>Delete</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={[
                      modalStyle.button,
                      {backgroundColor: Colors.mainColor},
                    ]}
                    onPress={() => {
                      setModalVisibleErr(
                        checkErrEdit(scheduleDescription, scheduleTime),
                      );
                      if (
                        checkErrEdit(scheduleDescription, scheduleTime).id === 1
                      ) {
                        for (let i = 0; i < dataFull.length; i++) {
                          if (dataFull[i].id === contentSchedule._id) {
                            dataFull[i].description = scheduleDescription;
                            dataFull[i].time = scheduleTime;
                          }
                        }
                        AsyncStorage.setItem(
                          'schedules',
                          JSON.stringify(dataFull),
                        );
                        setEditSchedule(!editSchedule);
                        setScheduleDescription('');
                        setScheduleTime('');
                      }
                    }}>
                    <Text style={modalStyle.textStyle}>Confrim</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}
