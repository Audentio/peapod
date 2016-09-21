/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

// import moment from 'moment-timezone';

export const globals = {
    daysPerWeek: 7,
    startingDay: 0, // sunday = 0, monday = 1 ect...
    locale: window.navigator.language,
    forceSix: true,
};

// allow addDays on date
export function addDays(date, days) {
    date = new Date(date);
    date.setDate(date.getDate() + days);
    return date;
}
export function setDayOfWeek(date, dayOfWeek) {
    date = new Date(date);
    return date.setDate(date.getDate() - date.getDay() + dayOfWeek);
}

// reset the time on dates
export function resetTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// get list of date between two dates
export function getDates(firstDate, secondDate) {
    const startDate = resetTime(firstDate);
    const stopDate = resetTime(secondDate);

    const dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(currentDate);
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
}

// get days in month
export function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// get the entire month from the date.
export function getMonthFromDate(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const dayCount = daysInMonth(month + 1, year);

    const firstDate = new Date(year, month);

    return getDates(firstDate, addDays(firstDate, dayCount - 1));
}

// get local month
export function getLocalMonth(date) {
    return date;
    // return moment(date).format('MMMM');
    // return date.toLocaleDateString(globals.locale, { month: 'long' });
}
