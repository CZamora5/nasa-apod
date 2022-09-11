export function cropText(text, length) {
	const croppedTextArray = [];
	const wordsArray = text.trim().split(' ');
	for (let i = 0, currLength = 0; currLength <= length && i < wordsArray.length; i++) {
		croppedTextArray.push(wordsArray[i]);
		currLength += wordsArray[i].length;
	}

	const croppedText = croppedTextArray.join(' ');
	return croppedText == text ? croppedText : croppedText + '...';
}

export function getDatesByMonth(month) { // month = 'YYYY-MM' OR month can be an instance of Date
  // Returns an array of dates of the specified month
  // If month is a Date object it only includes the dates greater than or equal to month
  let currDate = typeof month == 'string' ? new Date(`${month}-01`) : month;
  const monthNumber = currDate.getUTCMonth();
  const dates = [];

  while (currDate.getUTCMonth() == monthNumber) {
    dates.push(currDate);
    currDate = getNextDay(currDate);
  }

  return dates;
}

export function getLastValidDayOfMonth(month) { // month = 'YYYY-MM' OR month can be an instance of Date
  // Returns a Date object
  // It is the last day of the given month or the current day if current month is given as an argument
  let currDate = typeof month == 'string' ? new Date(`${month}-01`) : month;
  if (currDate >= new Date()) return new Date();

  const monthNumber = currDate.getUTCMonth();

  while (getNextDay(currDate).getUTCMonth() == monthNumber && getNextDay(currDate) <= new Date()) {
    currDate = getNextDay(currDate);
  }

  return currDate;
}

export function checkDateEquality(firstDate, secondDate) {
  return (
    firstDate.getUTCFullYear() === secondDate.getUTCFullYear() &&
    firstDate.getUTCMonth() === secondDate.getUTCMonth() &&
    firstDate.getUTCDate() === secondDate.getUTCDate()
  );
}

export function formatDate(date) { // date is an instance of Date
	return `${date.getUTCFullYear()}-${formatNumber(date.getUTCMonth() + 1)}-${formatNumber(date.getUTCDate())}`;
}

export function getPreviousDay(date) { // date is an instance of Date
  const milisecondsPerDay = 1000 * 60 * 60 * 24;
  return new Date(date.getTime() - milisecondsPerDay);
}

export function getNextDay(date) { // date is an instance of Date
  const milisecondsPerDay = 1000 * 60 * 60 * 24;
  return new Date(date.getTime() + milisecondsPerDay);
}

function formatNumber(number, length = 2, fillString = '0') {
	return String(number).padStart(length, fillString);
}