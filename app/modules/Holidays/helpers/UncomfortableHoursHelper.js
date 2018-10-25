import _ from 'lodash';
import moment from 'moment';

const internals = {};

const USER_TIMEZONE = process.env.USER_TIMEZONE || 'Europe/Stockholm';

const DEFAULT_SLOTS = {
    weekday: {
        midnight: {
            start: 0,
            end: 7 * 60,
            unComfortable: true,
        },
        day: {
            start: 7 * 60,
            end: 18 * 60,
            unComfortable: false,
        },
        evening: {
            start: 18 * 60,
            end: 24 * 60,
            unComfortable: true,
        },
    },
    saturday: {
        day: {
            start: 0,
            end: 24 * 60,
            unComfortable: true,
        },
    },
    sunday: {
        day: {
            start: 0,
            end: 24 * 60,
            unComfortable: true,
        },
    },
    'normal-holiday': {
        day: {
            start: 0,
            end: 24 * 60,
            unComfortable: true,
        },
    },
    'special-holiday': {
        day: {
            start: 0,
            end: 24 * 60,
            unComfortable: true,
        },
    },
};

const SERVERING_SLOTS = {
    weekday: {
        night: {
            start: 0,
            end: 1 * 60,
            unComfortable: false,
        },
        midnight: {
            start: 1 * 60,
            end: 6 * 60,
            unComfortable: true,
        },
        day: {
            start: 6 * 60,
            end: 20 * 60,
            unComfortable: false,
        },
        evening: {
            start: 20 * 60,
            end: 25 * 60,
            unComfortable: true,
        }
    },
    saturday: {
        night: {
            start: 0,
            end: 1 * 60,
            unComfortable: false,
        },
        midnight: {
            start: 1 * 60,
            end: 6 * 60,
            unComfortable: true,
        },
        day: {
            start: 6 * 60,
            end: 16 * 60,
            unComfortable: false,
        },
        evening: {
            start: 16 * 60,
            end: 25 * 60,
            unComfortable: true,
        }
    },
    "normal-holiday": {
        night: {
            start: 0,
            end: 1 * 60,
            unComfortable: false,
        },
        midnight: {
            start: 1 * 60,
            end: 6 * 60,
            unComfortable: true,
        },
        day: {
            start: 6 * 60,
            end: 16 * 60,
            unComfortable: false,
        },
        evening: {
            start: 16 * 60,
            end: 25 * 60,
            unComfortable: true,
        }
    },
    sunday: {
        night: {
            start: 0,
            end: 1 * 60,
            unComfortable: false,
        },
        midnight: {
            start: 1 * 60,
            end: 6 * 60,
            unComfortable: true,
        },
        day: {
            start: 6 * 60,
            end: 25 * 60,
            unComfortable: true,
        }
    },
    "special-holiday": {
        night: {
            start: 0,
            end: 1 * 60,
            unComfortable: false,
        },
        midnight: {
            start: 1 * 60,
            end: 6 * 60,
            unComfortable: true,
        },
        day: {
            start: 6 * 60,
            end: 25 * 60,
            unComfortable: true,
        }
    }
};

const BUTIK_INVENTORY_SLOTS = {
    weekday: {
        midnight: {
            start: 0,
            end: 5 * 60,
            unComfortable: true,
        },
        day: {
            start: 5 * 60,
            end: 18.25 * 60,
            unComfortable: false,
        },
        evening: {
            start: 18.25 * 60,
            end: 20 * 60,
            unComfortable: true,
        },
        night: {
            start: 20 * 60,
            end: 29 * 60,
            unComfortable: true,
        }
    },
    saturday: {
        day: {
            start: 0,
            end: 12 * 60,
            unComfortable: false,
        },
        night: {
            start: 12 * 60,
            end: 29 * 60,
            unComfortable: true,
        },
    },
    "normal-holiday": {
        day: {
            start: 0,
            end: 12 * 60,
            unComfortable: false,
        },
        night: {
            start: 12 * 60,
            end: 29 * 60,
            unComfortable: true,
        },
    },
    sunday: {
        day: {
            start: 0,
            end: 29 * 60,
            unComfortable: true,
        },
    },
    "special-holiday": {
        day: {
            start: 0,
            end: 29 * 60,
            unComfortable: true,
        },
    }
};

const CONFIG = {
    SS02: {
        dayEndsAt: 29, // 29 hours
        slots: BUTIK_INVENTORY_SLOTS,
        holidayKey: 'SS02_SS09'
    },
    SS09: {
        dayEndsAt: 29, // 29 hours
        slots: BUTIK_INVENTORY_SLOTS,
        holidayKey: 'SS02_SS09'
    },
    SS07: {
        dayEndsAt: 25, // 25 hours
        slots: SERVERING_SLOTS,
        holidayKey: 'SS07'
    },
    default: {
        dayEndsAt: 24, // 24 hours
        slots: DEFAULT_SLOTS,
        holidayKey: 'default'
    },
}



module.exports = {

    isUncomfortableHours: function (fromDate, toDate, service, allHolidays) {
        const config = (service && service.systemName && CONFIG[service.systemName]) ? CONFIG[service.systemName] : CONFIG.default;
        const { holidayKey, slots, dayEndsAt } = config;
        const holidays = allHolidays.filter(h => h.key === holidayKey);

        const shiftToDate = moment.isMoment(toDate) ? toDate : moment(toDate);
        const shiftFromDate = moment.isMoment(fromDate) ? fromDate : moment(fromDate);
        let iDate = moment(shiftFromDate).startOf('day');
        const dates = [];
        let diff = shiftToDate.diff(iDate, 'hours');

        dates.push({
            date: iDate,
            type: internals.getDateType(holidays, iDate),
            start: shiftFromDate.diff(iDate, 'minutes'),
            end : (diff <= dayEndsAt) ? shiftToDate.diff(iDate, 'minutes') : dayEndsAt * 60,
        });
        diff = diff - dayEndsAt;
        while( diff > 0 ) {
            iDate = moment(iDate).add(1,'days');

            diff = diff - 24;
            dates.push({
                date: iDate,
                type: internals.getDateType(holidays, iDate),
                start: (dayEndsAt - 24) * 60,
                end : (diff <= dayEndsAt) ? shiftToDate.diff(iDate, 'minutes') : dayEndsAt * 60,
            });
        }

        return  _.some(dates, function(date) {
            return internals.isUncomfortableSlot(date, config);
        });
    }
};

internals.isUncomfortableSlot = function(date, config) {
    const daySlots = config.slots[date.type];
    return _.some(Object.keys(daySlots), (key) => {
        const slot = daySlots[key];
        if(date.end <= slot.start || date.start >= slot.end) {
            return false;
        }
        if(date.start < slot.end || date.end > slot.start) {
            return slot.unComfortable;
        }
    });
};

internals.getDateType = function (holidays, iDate) {
    const matchedHoliday = _.find(holidays, holiday => moment.utc(holiday.date).format('YYYY-MM-DD') === iDate.format('YYYY-MM-DD'));
    if (matchedHoliday) {
        return `${matchedHoliday.holidayType}-holiday`;
    }
    if (internals.isSaturday(iDate)) {
        return 'saturday';
    }
    if (internals.isSunday(iDate)) {
        return 'sunday';
    }
    return 'weekday';
};

internals.isSaturday = function(date) {
    return date.weekday() === 6;
};

internals.isSunday = function(date) {
    return date.weekday() === 0;
};
