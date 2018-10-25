import moment from 'moment';

export const weekdaysLong = { en: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"] };
export const weekdaysShort = { en: ["S", "M", "T", "O", "T", "F", "L"] };
export const months = { en: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]};
export const firstDayOfWeek = { en: 1 };

export const DATE_LOCALE = {
    formatMonthTitle: (d, locale='en') => `${months[locale][d.getMonth()]} ${d.getFullYear()}`,
    formatWeekdayShort: (d, locale='en') => weekdaysShort[locale][d],
    formatDay: (d, locale='en') => moment(d).format('day'),
    getFirstDayOfWeek: (locale='en') => firstDayOfWeek[locale],
    formatWeekdayLong: (d, locale='en') => weekdaysLong[locale][d]
}

