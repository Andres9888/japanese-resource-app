import { DateTime } from 'luxon';

export const getTwoDaysAgo = () => {
  return DateTime.now()
    .setZone('utc')
    .minus({ days: 2 })
    .startOf('day')
    .toJSDate();
};
export const getYesterdayStart = timezone => {
  return DateTime.now()
    .setZone(timezone)
    .minus({ days: 1 })
    .startOf('day')
    .toMillis();
};
export const getYesterdayEnd = timezone => {
  return DateTime.now()
    .setZone(timezone)
    .minus({ days: 1 })
    .endOf('day')
    .toMillis();
};
export const convertToMilliseconds = isoTime => {
  return DateTime.fromJSDate(isoTime).toMillis();
};

export const didlogYesterday = (log, user) => {
  if (
    convertToMilliseconds(log.dateLogged) >= getYesterdayStart(user.timezone) &&
    convertToMilliseconds(log.dateLogged) <= getYesterdayEnd(user.timezone)
  ) {
    return true;
  }
  return false;
};
