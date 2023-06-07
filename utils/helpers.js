const fedHolidays = require("@18f/us-federal-holidays");
const options = { shiftSaturdayHolidays: true, shiftSundayHolidays: true };

const currentMonth = new Date().getMonth();

module.exports = {
  current_day: () => {
    return new Date();
  },
  current_month: () => {
    const monthNames = [
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

    return monthNames[currentMonth];
  },
  days_num: () => {
    let date = new Date();
    const lastDay = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0);
    const day = new Date(lastDay).getDate();
    return day;
  },
  days_array: () => {
    let date = new Date();
    const lastDay = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0);
    const day = new Date(lastDay).getDate();
    let dayArray = [];
    for (let i = 1; i <= day; i++) {
      dayArray.push(i);
    }
    return dayArray;
  },
  check_holiday: (calDate) => {
    const holidays = fedHolidays.allForYear(2023, options);
    let bool = false;
    holidays.forEach((holiday) => {
      const holidayDate = new Date(holiday.date).getDate();
      const holidayMonth = new Date(holiday.date).getMonth();

      if (holidayDate === calDate && holidayMonth === currentMonth) {
        bool = true;
      }
    });
    return bool;
  },
  holiday_info: (date) => {
    const holidays = fedHolidays.allForYear(2023, options);
    let holidayInfo = "";
    holidays.forEach((holiday) => {
      holidayDate = new Date(holiday.date).getDate();
      const holidayMonth = new Date(holiday.date).getMonth();

      if (holidayDate === date && holidayMonth === currentMonth) {
        holidayInfo = holiday.name;
      }
    });
    return holidayInfo;
  },
  task_day: (taskDate, calDate) => {
    let bool = false;
    const taskMonth = new Date(taskDate).getMonth();
    taskDate = new Date(taskDate).getDate() + 1;

    if (taskDate === calDate && taskMonth === currentMonth) {
      bool = true;
    }
    return bool;
  },
  num_array: (num) => {
    const numArray = [];
    for (let i = 0; i < num; i++) {
      numArray.push(i);
    }
    return numArray;
  },
  get_monday: (date) => {
    date = new Date(date);
    let day = date.getDay() || 7;
    if (day !== 1) {
      date.setHours(-24 * (day - 1));
    }
    return date;
  },
  get_week: (monday) => {
    let startDate = new Date(monday);
    let weekArray = [];
    for (i = 0; i < 7; i++) {
      let nextDay = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + i
      );
      weekArray.push(nextDay);
    }
    return weekArray;
  },
  format_date: (date) => {
    return date.toLocaleDateString("en-us", { month: "long", day: "numeric" });
  },
  check_date: (firstDate, secondDate) => {
    const firstMonth = new Date(firstDate).getMonth();
    const secondMonth = new Date(secondDate).getMonth();

    firstDate = new Date(firstDate).getDate() + 1;
    secondDate = new Date(secondDate).getDate();

    if (firstDate === secondDate && firstMonth === secondMonth) return true;
  },
  weekday: (date) => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = new Date(date).getDay();

    return weekdays[day];
  },
};
