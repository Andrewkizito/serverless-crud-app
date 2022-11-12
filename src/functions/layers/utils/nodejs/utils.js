const KSUID = require("ksuid");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const generateDate = () => {
  const date = new Date().getDate().toString();
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const hours = new Date().getHours() + 3;
  const minutes = new Date().getMinutes();

  const time = `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;
  let dateStr = `${months[month]} ${date}th ${year}`;

  if (date.endsWith("1")) dateStr = `${months[month]} ${date}st ${year}`;
  else if (date.endsWith("2")) dateStr = `${months[month]} ${date}nd ${year}`;
  else if (date.endsWith("3")) dateStr = `${months[month]} ${date}rd ${year}`;

  return {
    time: time,
    date: dateStr,
  };
};

const sortProjects = (a, b) => {
  if (KSUID.parse(a.SK).timestamp > KSUID.parse(b.SK).timestamp) {
    return -1;
  }
  return 1;
};

module.exports = { generateDate, sortProjects };
