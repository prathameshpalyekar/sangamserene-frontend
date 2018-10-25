export default (job) => {
    const newJob = Object.assign({}, job);

    if (newJob.serviceId) {
        newJob.service = newJob.serviceId;
        delete newJob.serviceId;
    }

    if (newJob.dates) {
        if (newJob.type === 'deadline') {
            // Get only the first dates object for deadline
            newJob.dates = [newJob.dates[0]];
        }

        newJob.dates = newJob.dates.map((d) => {
            const { fromDate, toDate, breakMinutes } = d;

            return {
                fromDate,
                toDate,
                breakMinutes: newJob.type === 'deadline' ? undefined : breakMinutes || undefined,
            };
        });
    }

    return newJob;
};
