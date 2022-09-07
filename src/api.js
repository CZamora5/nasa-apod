import { checkDateEquality, getLastValidDayOfMonth } from "./util";

const API_KEY = 'd8lgw09oBngcPZN1fKLYUsUmRw4bYZXQAd5PIhsh';
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

export async function getPictureByDate(date) {
  const data = await getData(`${BASE_URL}?api_key=${API_KEY}&date=${date}`);
  return data;
}

export async function getPicturesByMonth(month) { // month = 'YYYY-MM' OR month can be an instance of Date
  // Returns the data for the dates of the specified month
  // If month is a Date object it only includes the data for dates greater than or equal to month
  const startDate = typeof month == 'string' ? new Date(`${month}-01`) : month;
  const endDate = getLastValidDayOfMonth(month);
  let data;

  if (checkDateEquality(endDate, new Date())) {
    data = await getData(`${BASE_URL}?api_key=${API_KEY}&start_date=${startDate}`);
  } else {
    data = await getData(`${BASE_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`);
  }
  return data;
}

export async function getRandomPictures(count = 1) {
  const data = await getData(`${BASE_URL}?api_key=${API_KEY}&count=${count}`);
  return data;
}

async function getData(url) {
  try {
    const data = await fetch(url).then(response => response.json());
    return data;
  } catch (err) {
    console.error(err);
  }
}