import { myJson } from './schedules';

const dataPinned = [
  {
    imgSrc: '/img/icon/doctorIcon.png',
    name: 'Call doctor for tests',
    date: '15 Mar 2020 - 9:00 AM',
    kind: {type: '2', name: 'Personal'},
    description: 'Ask for blood tests and GYM certificate',
  },
  {
    imgSrc: '/img/icon/doctorIcon.png',
    name: "Thinh's birthday",
    date: '01 Juanary 2021',
    kind: {type: '1', name: 'Special'},
    description: '',
  },
];

const dataSchedules = JSON.parse(myJson);
//   [
//   {
//     time: '7:00',
//     date: '2020-9-30',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Breakfast',
//   },
//   {
//     time: '7:00',
//     date: '2020-10-1',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
//   {
//     time: '15:48',
//     date: '2020-10-2',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
//   {
//     time: '12:10',
//     date: '2020-10-3',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
//   {
//     time: '17:10',
//     date: '2020-10-7',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
//   {
//     time: '17:10',
//     date: '2020-10-4',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
//   {
//     time: '7:10',
//     date: '2020-10-5',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
//   {
//     time: '12:10',
//     date: '2020-10-5',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
//   {
//     time: '17:10',
//     date: '2020-10-6',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
//   {
//     time: '11:10',
//     date: '2020-10-8',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
//   {
//     time: '18:10',
//     date: '2020-10-8',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
//   {
//     time: '6:10',
//     date: '2020-10-9',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
//   {
//     time: '10:10',
//     date: '2020-10-9',
//     imgSrc: 'img/icon/watchIcon.png',
//     description: 'Wake up Buddy',
//   },
// ];

const dayOfWeek = [
  {
    day: '8',
    name: 'Sunday',
  },
  {
    day: '2',
    name: 'Monday',
  },
  {
    day: '3',
    name: 'Tuesday',
  },
  {
    day: '4',
    name: 'Wednesday',
  },
  {
    day: '5',
    name: 'Thursday',
  },
  {
    day: '6',
    name: 'Friday',
  },
  {
    day: '7',
    name: 'Saturday',
  },
];

const infoMonth = [
  {
    numberMonth: '1',
    nameMonth: 'January',
  },
  {
    numberMonth: '2',
    nameMonth: 'February',
  },
  {
    numberMonth: '3',
    nameMonth: 'March',
  },
  {
    numberMonth: '4',
    nameMonth: 'April',
  },
  {
    numberMonth: '5',
    nameMonth: 'May',
  },
  {
    numberMonth: '6',
    nameMonth: 'June',
  },
  {
    numberMonth: '7',
    nameMonth: 'July',
  },
  {
    numberMonth: '8',
    nameMonth: 'August',
  },
  {
    numberMonth: '9',
    nameMonth: 'September',
  },
  {
    numberMonth: '10',
    nameMonth: 'October',
  },
  {
    numberMonth: '11',
    nameMonth: 'November',
  },
  {
    numberMonth: '12',
    nameMonth: 'December',
  },
];

export {dataPinned, dataSchedules, dayOfWeek, infoMonth};
