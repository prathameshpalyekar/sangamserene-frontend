import moment from 'moment';

export const notificationNameMapper = (notification) => {
    let job;
    switch(notification.get('actionType')) {
        case 'create_job':
            return 'Blivit matchad mot ett nytt jobb'; //You have gotten a match
        case 'job_recommended':
            return 'Pass på! Du har blivit matchad.';
        case 'apply':
            return 'Fått ansökan'; //Congrats, you haft recieved applications for your job
        case 'job_cancelled':
            return 'Instajobbaren kommer få en notis om att jobbet blivit inställt, men att lön betalas ut ändå';
        case 'offer_sent':
            return 'Fått erbjudande'; // visible by candidate when he/she receives offer from emplpoyee
        case 'offer_accepted':
            return 'Tackat ja till erbjudande';

        case 'employer_approved_shift':
            return 'Din tidrapport har blivit godkänd av kunden.'

        case 'employer_auto_approved_shift':
            return 'Tidrapporten för ditt jobb har godkänts och skickats automatiskt.'

        case 'employer_rejected_shift':
            return 'Oj. Någon av dina tidrapporter blev inte godkända av kunden. Vi kommer kontakta dig inom kort.'

        case 'employee_approved_shift':
            return 'Du har fått en tidrapport att godkänna. Gå in och godkänn inom 36 timmar.'

        case 'employee_auto_approved_shift': //Time report auto approved for your job
            return 'Det har gått 36 timmar. Tidrapporten har skickats till kunden automatiskt.'

            //this notification is aboslute but just keeping this for old data
        case 'employee_rejected_shift':
            return 'Instajobbaren har inte godkänt din tidrapport. Instajobs-teamet kommer att kontakta dig så fort som möjligt'

        case 'job_completed':
            // Job has finished. You can write time report now
            return 'Jobbet är avslutat. Gå gärna in och tidrapportera!'

        case 'job_completed_employee':
            // Job has finished. You can write time report now
            return 'Dags att tidrapportera. Godkänn tider inom 36 timmar.'

        case 'job_completed_employee_add_review':
            job = notification.get('from');
            return `Dags att tidrapportera och lämna ett omdöme för ditt jobb hos ${job.getIn(['employer', 'employerInfo', 'companyName'])}.`

        case 'new_review_recieved':
            return 'Du har fått ett nytt omdöme.';

        case 'job_positions_updated':
            job = notification.get('from');
            //return `${job.employer.employerInfo.companyName} har ökat antalet personer i ett jobb du blivit erbjuden. Gå in direkt och tacka ja.`;
            return `${job.getIn(['employer', 'employerInfo', 'companyName'])} har ökat antalet personer i ett jobb du blivit erbjuden. Gå in direkt och tacka ja.`;

        case 'remind_offer_send':
            job = notification.get('from');
            return `Du har ansökningar till ${job.getIn(['service', 'name'])}-jobbet den ${moment(job.get('jobStartDate')).format('DD MMM')} men har inte erbjudit någon jobbet. Tänk snabbt innan någon annan hinner före.`;

        case 'remind_job_start':
            return 'Snart dags för en paus i plugget. Lycka till på jobbet imorgon.';

        default:
            return '';
    }
}

export const notificationDescriptionMapper = (notification) => {
    let job;
    let employee;
    switch(notification.get('actionType')) {
        case 'create_job':
            return 'Pass på! Du har blivit matchad mot ett instajobb!';

        case 'job_recommended':
            return 'Pass på! Du har blivit matchad mot ett Instajobb!';

        case 'apply':
            return 'Grattis! Nu har du fått ansökningar till jobbet. Skicka ett erbjudande innan någon annan hinner före';

        case 'job_hired_cancelled':
            return 'Tyvärr har beställaren ställt in jobbet. Eftersom jobbet är bokat kommer du fortfarande att få lön för de timmar som angavs i annonsen. Kontakta oss på hello@instajobs.com om du har frågor.'

        case 'job_cancelled':
            return 'Tyvärr har detta jobb ställts in.';

        case 'offer_sent':
            return 'Grattis! Du har fått ett jobberbjudande. Tacka ja innan någon annan hinner före';

        case 'offer_accepted':
            return 'Du har anlitat en instajobbare. Chatta gärna för att stämma av detaljer kring jobbet.'

        case 'resigned':
            return 'Instajobbaren har dessvärre ställt in. Klicka här för att komma till jobbet';

        case 'sick_candidate':
            job = notification.get('from');
            return `En instajobbare har blivit sjuk och kan inte jobba på ${job.getIn(['service', 'name'])}-jobbet. Du kan nu återigen acceptera erbjudandet om du fortfarande kan och vill jobba.`

        case 'sick_client':
            employee = notification.get('from');
            job = notification.get('to');
            return `${employee.get('firstName')} ${employee.get('lastName')} har tyvärr blivit sjuk och ställt in ${job.getIn(['service', 'name'])}-jobbet den ${moment(job.get('jobStartDate')).format('DD MMM')}. De kandidater som tidigare fått ett erbjudande av dig har meddelats och kommer nu kunna tacka ja för att hoppa in. Du ökar dina chanser att hitta en ersättare genom att skicka ut fler erbjudanden.`;

        case 'employer_approved_shift':
            return 'Din tidrapport har blivit godkänd av kunden.'

        case 'employer_auto_approved_shift': //Time report auto approved for your job
            return 'Tidrapporten för ditt jobb har godkänts och skickats automatiskt.'

        case 'employer_rejected_shift':
            return 'Oj. Någon av dina tidrapporter blev inte godkända av kunden. Vi kommer kontakta dig inom kort.'

        case 'employee_approved_shift':
            return 'Du har fått en tidrapport att godkänna. Gå in och godkänn inom 36 timmar.'

        case 'employee_auto_approved_shift': //Time report auto approved for your job
            return 'Det har gått 36 timmar. Tidrapporten har skickats till kunden automatiskt.'

            //this notification is aboslute but just keeping this for old data
        case 'employee_rejected_shift':
            return 'Instajobbaren har inte godkänt din tidrapport. Instajobs-teamet kommer att kontakta dig så fort som möjligt'

        case 'job_completed':
            // Job has finished. You can write time report now
            return 'Jobbet är avslutat. Gå gärna in och tidrapportera!'

        case 'job_completed_employee':
            // Job has finished. You can write time report now
            return 'Dags att tidrapportera. Godkänn tider inom 36 timmar.'

        case 'new_employee_hired':
            return 'Är du nöjd med jobbet? Det bästa sättet att risa eller rosa är att ge ett omdöme.';

        case 'job_completed_employee_add_review':
            job = notification.get('from');
            return `Dags att tidrapportera och lämna ett omdöme för ditt jobb hos ${job.employer.employerInfo.companyName}.`

        case 'new_review_recieved':
            return 'Du har fått ett nytt omdöme.';

        case 'job_positions_updated':
            job = notification.get('from');
            return `${job.employer.employerInfo.companyName} har ökat antalet personer i ett jobb du blivit erbjuden. Gå in direkt och tacka ja.`;

        case 'remind_offer_send':
            job = notification.get('from');
            return `Du har ansökningar till ${job.getIn(['service', 'name'])}-jobbet den ${moment(job.get('jobStartDate')).format('DD MMM')} men har inte erbjudit någon jobbet. Tänk snabbt innan någon annan hinner före.`;

        case 'remind_job_start':
            return 'Snart dags för en paus i plugget. Lycka till på jobbet imorgon.';

        default:
            return '';
    }
}
