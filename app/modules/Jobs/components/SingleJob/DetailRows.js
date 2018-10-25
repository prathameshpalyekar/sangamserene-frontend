import moment from 'moment';

export default [{
    label: 'Adress',
    key: 'address',
}, {
    label: 'Ort',
    key: 'city',
}, {
    label: 'Timlön',
    getValue (job, props) {
        const { service = {} } = job;

        const hourlySalary = service.customPricing ? job.hourlySalary : service.price

        return hourlySalary && !props.hideServicePrice ? `${hourlySalary} kr/h` : false;
    },
}, {
    label: 'Antal personer',
    getValue (job) {
        const suffix = job.noOfPersons === 1 ? 'person' : 'personer';
        return `${job.noOfPersons} ${suffix}`;
    },
}, {
    label: 'Totalt antal timmar',
    getValue (job) {
        if (job.type === 'deadline') {
            return job.numberOfHours;
        }

        const { dates } = job;

        if (!dates || !dates.size) {
            return 0;
        }

        const totalBreakMinues = dates.reduce((total, date) => {
            return total + (date.breakMinutes || 0)
        }, 0);

        const total = dates.reduce((total, date) => {
            if (date.toDate && date.fromDate) {
                return total + ((moment(date.toDate).diff(moment(date.fromDate))));
            } else {
                return total;
            }
        }, 0);

        const totalHours = moment.duration(total).asHours() - (typeof totalBreakMinues === 'number' ? totalBreakMinues / 60 : 0);

        return `${Math.round(totalHours * 10) / 10}h`;
    },
}];

