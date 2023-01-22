import { Dayjs } from 'dayjs';

export const dateDiff = (startDate: Dayjs, endDate: Dayjs) => {
  const startYear = startDate.get('year');
  const startMonth = startDate.get('month');
  const startDay = startDate.get('date');
  const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let d2 = endDate.date();
  let m2 = endDate.month();
  let y2 = endDate.year();

  if (startDay > d2) {
    d2 = d2 + month[m2 - 1];
    m2 = m2 - 1;
  }
  if (startMonth > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }

  return {
    year: y2 - startYear,
    month: m2 - startMonth,
    date: d2 - startDay,
  };
};
