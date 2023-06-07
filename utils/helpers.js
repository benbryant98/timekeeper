const fedHolidays = require("@18f/us-federal-holidays");
const options = { shiftSaturdayHolidays: true, shiftSundayHolidays: true };

module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear() + 5
    }`;
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
    const month = new Date().getMonth();

    return monthNames[month];
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
  date_checker: (calDate) => {
    const holidays = fedHolidays.allForYear(2023, options);
    let bool = false;
    holidays.forEach((holiday) => {
      const holidayDate = new Date(holiday.date).getDate();
      const holidayMonth = new Date(holiday.date).getMonth();

      if (holidayDate === calDate && holidayMonth === new Date().getMonth()) {
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

      if (holidayDate === date && holidayMonth === new Date().getMonth()) {
        holidayInfo = holiday.name;
      }
    });
    return holidayInfo;
  },
};
