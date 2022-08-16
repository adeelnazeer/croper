export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let beautifiedTime = hours + ":" + minutes + " " + ampm;
  return beautifiedTime;
}
export const dateFormateHandler = (date) => {
  const newDate = new Date(date);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  let time = formatAMPM(newDate);
  let hours12 = newDate.toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    hour12: true,
  });
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let seconds = newDate.getSeconds();
  let dayName = days[newDate.getDay()];
  let dateNumber = ("0" + newDate.getDate()).slice(-2);
  let monthName = months[newDate.getMonth()];
  let monthNumber = ("0" + (newDate.getMonth() + 1)).slice(-2);
  let fullYear = newDate.getFullYear();
  let standardDate = monthNumber + "-" + dateNumber + "-" + fullYear;

  return {
    standardDate: standardDate,
    time: time,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    hours12: hours12,
    dayName: dayName,
    dateNumber: dateNumber,
    monthName: monthName,
    monthNumber: monthNumber,
    fullYear: fullYear,
  };
};

export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
