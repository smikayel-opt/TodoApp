export function getFormatedDate () {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours < 12 ? 'AM' : 'PM';

  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');
  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${paddedDay}/${paddedMonth}/${year} ${paddedHours}:${paddedMinutes} ${amPm}`;

}
