import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import Colors from '../Colors';

export const windowsWidth = Dimensions.get('window').width;
export const windowsHeight = Dimensions.get('window').height;

const noteStyle = StyleSheet.create({
  noteFullStyle: {
    padding: 10,
    marginTop: 40,
    flex: 1,
  },
  noteHead: {
    marginBottom: 20,
  },
  noteMain: {
    flex: 1,
    // margin: 'auto',
  },
  noteAddBtn: {
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
    //backgroundColor: Colors.grayf9,
    borderWidth: 1,
    borderColor: Colors.mainColor,
  },
  itemGreen: {
    backgroundColor: Colors.greenb3,
  },
  itemRed: {
    backgroundColor: Colors.red6b,
  },
  itemMainColor: {
    backgroundColor: Colors.mainColor,
  },
  itemBlue: {
    backgroundColor: Colors.bluea0,
  },
  itemGray: {
    backgroundColor: Colors.grayf9,
  },
});
const modalStyle = StyleSheet.create({
  selectImg: {
    backgroundColor: Colors.mainColor,
  },
  imgNomal: {
    padding: 10,
    borderRadius: 15,
  },
  centeredView: {
    zIndex: 1,
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
  centeredViewErr: {
    // position: 'fixed',
    zIndex: 99999,
    flex: 1,
    opacity: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  //modalViewNote: colorNote,
  modalViewErr: {
    zIndex: 99999,
    margin: 10,
    paddingHorizontal: 'auto',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: Colors.red6b,
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
  textStyleErr: {
    color: Colors.red6b,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInputStyle: {
    width: (windowsWidth * 35) / 100,
    height: (windowsHeight * 8) / 100,
    backgroundColor: Colors.grayf9,
    // shadowColor: Colors.gray70,
    // shadowOpacity: 0.1,
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowRadius: 25,
    // elevation: 24,
    fontSize: 15,
    borderRadius: 10,
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
    borderColor: Colors.white,
    borderWidth: 1,
  },
  imgSelectStyle: {
    width: 35,
    height: 35,
  },
  colorNoteStyle: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginBottom: 20,
    borderColor: Colors.white,
    borderWidth: 1,
  },
});
const stylesRight = StyleSheet.create({
  contentRight: {
    width: (windowsWidth * 45) / 100,
    backgroundColor: Colors.white,
  },
  rightHeader: {
    paddingTop: 40,
  },
  rightTitle: {
    fontSize: 30,
    marginVertical: 'auto',
  },
  rightHeaderTitle: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  rightNextHead: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  monthSch: {
    color: Colors.mainColor,
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 'auto',
  },
  fullDay: {
    width: '50%',
    paddingHorizontal: 10,
    paddingVertical: 2,
    flexDirection: 'row',
    backgroundColor: Colors.mainColor,
    justifyContent: 'space-between',
    // borderWidth: 1,
    // borderColor: Colors.mainColor,
    borderRadius: 20,
  },
  daySch: {
    color: Colors.white,
    fontSize: 30,
    marginVertical: 'auto',
  },
  buttonSch: {
    flexDirection: 'row',
    marginVertical: 'auto',
    marginLeft: 15,
  },
  iconMove: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  rightMain: {
    marginTop: 30,
  },
  schedule: {
    width: '90%',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    justifyContent: 'space-between',
    shadowColor: Colors.grayf9,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 24,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentLeft: {
    flex: 1,
    width: (windowsWidth * 35) / 100,
    //height: windowsHeight,
    backgroundColor: Colors.grayf9,
    paddingHorizontal: 50,
    paddingTop: 45,
  },
  titleLeft: {
    flexDirection: 'row',
  },
  titleName: {
    justifyContent: 'center',
    marginVertical: 'auto',
    marginLeft: 15,
    fontSize: 30,
  },
  mainLeft: {
    backgroundColor: Colors.grayf9,
  },
  headMainLeft: {
    flexDirection: 'row',
    marginVertical: 'auto',
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  nameHead: {
    fontSize: 25,
    color: Colors.black01,
  },
  linkHead: {
    margin: 'auto',
    color: Colors.mainColor,
  },
  kindPin: {
    padding: 2,
    marginVertical: 10,
    width: 100,
    textAlign: 'center',
    color: Colors.white,
    borderRadius: 30,
  },
  addButton: {
    backgroundColor: Colors.white,
    marginTop: 15,
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: 'row',
  },
  addIcon: {width: 50, height: 50, marginLeft: 30},
  itemMenu: {
    width: '15%',
    textAlign: 'center',
  },
  addText: {marginVertical: 'auto', marginLeft: 30, fontSize: 15},
  nameItem: {
    fontSize: 20,
    color: Colors.white,
  },
  textPiker: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  headCalendar: {
    marginTop: 30,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarLeft: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
  },
  buttonCalendar: {
    flexDirection: 'row',
    marginVertical: 'auto',
    marginLeft: 15,
  },
  iconMove: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  main: {
    margin: 10,
    height: windowsHeight,
    backgroundColor: Colors.white,
  },
});

export {modalStyle, styles, stylesRight, noteStyle};
