import * as moment from 'moment';

export const parseToMySqlDatetime = (datetime: Date) =>
  moment(datetime).format('YYYY-MM-DD hh:mm:ss');

export const parseMySqlDateToISO = (datetime: string) => {};
