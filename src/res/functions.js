import AsyncStorage from '@react-native-community/async-storage';
import {infoMonth, dayOfWeek, dataPinned} from './datas';

let monthArr = infoMonth;
let arrDay = dayOfWeek;
let onDay = {};

export const checkMonth = (month) => {
  if (month > 0 && month < 13) {
    if (
      month == 1 ||
      month == 3 ||
      month == 5 ||
      month == 7 ||
      month == 8 ||
      month == 10 ||
      month == 12
    ) {
      return 1;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      return 2;
    } else {
      return 0;
    }
  }
  return -1;
};
export const checkDay = (year, month, currentDay, check) => {
  if (!check) {
    if (currentDay == 1) {
      month = month - 1;
      if (checkMonth(month) == 1) {
        return {yearChange: year, monthChange: month, days: 31};
      }
      if (checkMonth(month) == 2) {
        return {yearChange: year, monthChange: month, days: 30};
      }
      if (checkMonth(month) == 0) {
        return {yearChange: year, monthChange: month, days: 28};
      }
      if (checkMonth(month) == -1) {
        return {yearChange: year - 1, monthChange: 12, days: 31};
      }
    } else {
      return {yearChange: year, monthChange: month, days: currentDay - 1};
    }
  } else if (check) {
    if (checkMonth(month + 1) == -1) {
      if (currentDay == 31) {
        return {yearChange: year + 1, monthChange: 1, days: 1};
      }
    }
    if (checkMonth(month) == 1) {
      if (currentDay == 31) {
        return {yearChange: year, monthChange: month + 1, days: 1};
      }
    }
    if (checkMonth(month) == 2) {
      if (currentDay == 30) {
        return {yearChange: year, monthChange: month + 1, days: 1};
      }
    }
    if (checkMonth(month) == 0) {
      if (currentDay == 28) {
        return {yearChange: year, monthChange: month + 1, days: 1};
      }
    }
    if (checkMonth(month) == -1) {
      return {yearChange: year + 1, monthChange: 1, days: 1};
    } else {
      return {yearChange: year, monthChange: month, days: currentDay + 1};
    }
  }
};
let d = new Date();
export const checkTime = (props) => {
  const {time, date} = props;
  //Nam
  if (date.split('-')[0] < d.getFullYear()) {
    return true;
  }
  if (date.split('-')[0] > d.getFullYear()) {
    return false;
  }
  if (date.split('-')[0] == d.getFullYear()) {
    //Thang
    if (date.split('-')[1] < d.getUTCMonth() + 1) {
      return true;
    }
    if (date.split('-')[1] > d.getUTCMonth() + 1) {
      return false;
    }
    if (date.split('-')[1] == d.getUTCMonth() + 1) {
      //Day
      if (date.split('-')[2] < d.getUTCDate()) {
        return true;
      }
      if (date.split('-')[2] > d.getUTCDate()) {
        return false;
      }
      if (date.split('-')[2] == d.getUTCDate()) {
        if (d.getHours() == time.split(':', 1)) {
          if (d.getMinutes() > time.split(':')[1]) {
            return true;
          }
        } else if (d.getHours() != time.split(':', 1)) {
          if (d.getHours() > time.split(':', 1)) {
            return true;
          }
        }
        return false;
      }
    }
  }
};

let date = new Date();

//get number week
export const getWeekNumber = () => {
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  let yearCurrent = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil(((date - yearCurrent) / 86400000 + 1) / 7);
  return [date.getUTCFullYear(), weekNo];
};

//Sort
export const sortSchedule = (key, order = 'asc') => {
  return function innerSort(a, b) {
    const varA = parseInt(a.split(':', 1));
    const varB = parseInt(b.split(':', 1));
    console.log(varA);
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
};

export const getFinalData = (dataList) => {
  let finalData = dataList.sort((a, b) => {
    if (parseInt(a.time.split(':')[0]) < parseInt(b.time.split(':')[0])) {
      return -1;
    }
    if (parseInt(a.time.split(':')[0]) > parseInt(b.time.split(':')[0])) {
      return 1;
    } else if (
      parseInt(a.time.split(':')[1]) < parseInt(b.time.split(':')[1])
    ) {
      return -1;
    } else if (
      parseInt(a.time.split(':')[1]) > parseInt(b.time.split(':')[1])
    ) {
      return 1;
    }
    return 0;
  });
  return finalData;
};

export const getTimeShedule = (scheduleTime) => {
  let hours = '';
  let minutes = '';
  if (parseInt(scheduleTime.split(':')[0]) < 10) {
    hours = '0' + parseInt(scheduleTime.split(':')[0]);
  } else {
    hours = parseInt(scheduleTime.split(':')[0]);
  }

  if (parseInt(scheduleTime.split(':')[1]) < 10) {
    minutes = '0' + parseInt(scheduleTime.split(':')[1]);
  } else {
    minutes = parseInt(scheduleTime.split(':')[1]);
  }
  return hours + ':' + minutes;
};

export const changeMonth = (month) => {
  //lay ten thang
  let dataMonth = monthArr.filter(
    (item) => item.numberMonth == month.toString(),
  );
  return dataMonth[0].nameMonth;
};

export const storage = async () => {
  await AsyncStorage.setItem('schedules', []);
};
export const storageNotes = async () => {
  await AsyncStorage.setItem('notes', []);
};
export const storageId = async () => {
  await AsyncStorage.setItem('id', 0);
};
export const storagePinned = async () => {
  await AsyncStorage.setItem('pinned', JSON.stringify(dataPinned));
};

//Check
export const checkNumber = (text) => {
  if (isNaN(text)) {
    if (isNaN(text.split(':')[0]) || isNaN(text.split(':')[1])) {
      return true;
    }
  }
  return false;
};

export const checkLimit = (number) => {
  if (number.split(':')[0] > 23 || number.split(':')[0] < 0) {
    return true;
  }
  if (parseInt(number.split(':')[1]) > 59 || number.split(':')[1] < 0) {
    return true;
  }
  return false;
};

export const checkInput = (scheduleDecription, scheduleTime, src) => {
  if (scheduleDecription == '') {
    return 0;
  } else if (scheduleTime == '') {
    return 1;
  } else if (checkNumber(scheduleTime) || checkLimit(scheduleTime)) {
    return 2;
  } else if (src == '') {
    return 3;
  }
  return -1;
};

export const checkErr = (scheduleDescription, scheduleTime, src) => {
  if (checkInput(scheduleDescription, scheduleTime, src) === 0) {
    return {
      status: true,
      textError: 'Dont empty description!',
    };
  }
  if (checkInput(scheduleDescription, scheduleTime, src) === 1) {
    return {
      status: true,
      textError: 'Dont empty time!',
    };
  }
  if (checkInput(scheduleDescription, scheduleTime, src) === 2) {
    return {
      status: true,
      textError: 'Time type was wrong! - Ex: 09:12',
    };
  }
  if (checkInput(scheduleDescription, scheduleTime, src) === 3) {
    return {
      status: true,
      textError: 'Select icon!',
    };
  }
  if (checkInput(scheduleDescription, scheduleTime, src) === -1) {
    return {
      id: 1,
      status: false,
      textError: 'Success!',
    };
  }
};

export const checkInputEdit = (scheduleDescription, scheduleTime) => {
  if (scheduleDescription == '') {
    return 0;
  } else if (scheduleTime == '') {
    return 1;
  } else if (checkNumber(scheduleTime) || checkLimit(scheduleTime)) {
    return 2;
  }
  return -1;
};

export const checkErrEdit = (scheduleDescription, scheduleTime) => {
  if (checkInput(scheduleDescription, scheduleTime) === 0) {
    return {
      status: true,
      textError: 'Dont empty description!',
    };
  }
  if (checkInput(scheduleDescription, scheduleTime) === 1) {
    return {
      status: true,
      textError: 'Dont empty time!',
    };
  }
  if (checkInput(scheduleDescription, scheduleTime) === 2) {
    return {
      status: true,
      textError: 'Time type was wrong! - Ex: 09:12',
    };
  }
  if (checkInput(scheduleDescription, scheduleTime) === -1) {
    return {
      id: 1,
      status: false,
      textError: 'Success!',
    };
  }
};

export const checkNoteInput = (textNote) => {
  if (textNote === '') {
    return true;
  }
};

export const checkEmpty = (text) => {
  return text === '';
};

export const checkAddPinned = (title, date, time, des, type, img) => {
  if (checkEmpty(title)) {
    return {
      status: true,
      textError: 'Dont empty title!',
    };
  }
  if (checkEmpty(date)) {
    return {
      status: true,
      textError: 'Dont empty date!',
    };
  }
  if (checkEmpty(time)) {
    return {
      status: true,
      textError: 'Dont empty time!',
    };
  }
  if (checkEmpty(des)) {
    return {
      status: true,
      textError: 'Dont empty description!',
    };
  }
  if (checkEmpty(type)) {
    return {
      status: true,
      textError: 'Select type pin!',
    };
  }
  if (checkEmpty(img)) {
    return {
      status: true,
      textError: 'Select icon!',
    };
  }
  if (checkNumber(time)) {
    return {
      status: true,
      textError: 'Time type was wrong! - Ex: 09:12',
    };
  }
  else return {
    id: -1,
    status: false,
    textError: 'Time type was wrong! - Ex: 09:12',
  };
};

//Add
export const addSchedule = (
  id,
  scheduleTime,
  scheduleDescription,
  dataFull,
  img,
  year,
  month,
  currentDay,
) => {
  let rand = id + 1;
  let Obj = {
    //Tạo mới phần tử
    id: rand,
    time: getTimeShedule(scheduleTime),
    date: year + '-' + month + '-' + currentDay,
    imgSrc: img.src.uri,
    description: scheduleDescription,
  };
  dataFull.push(Obj); //Push vào mảng
  AsyncStorage.setItem(
    //Set vào Storage
    'schedules',
    JSON.stringify(dataFull),
  );
};

export const getDateOW = (year, month, currentDay) => {
  //thu trong tuan
  let d = new Date(year + '-' + month + '-' + currentDay);
  //console.log(dataList);
  return arrDay[d.getDay()].name;
};
