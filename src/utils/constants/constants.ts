import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export const inputNumberPatern = /^[0-9]{10}$/;

export const convertStringToTimestamp = (dateString: string) => {
  const dateObject = new Date(dateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  } as Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat('en-US', options).format(dateObject);
};

export const convertTimestampToString = (dateObject: Timestamp) => {
  return dayjs(dateObject.toDate()).format('DD/MM/YYYY');
};
