import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import serviceReducer from 'modules/Service/reducers/index.js';
import authReducer from '../modules/Auth/reducers';
import jobReducer from '../modules/Jobs/reducers';
import timeReportReducer from '../modules/TimeReport/reducers';
import holidayReducer from '../modules/Holidays/reducers';
import candidatesReducer from '../modules/Candidates/reducers';
import myPageReducer from '../modules/MyPages/reducers';
import chatReducer from '../modules/Chat/reducers';
import notificationsReducer from '../modules/Notifications/reducers';
import reviewsReducer from '../modules/Reviews/reducers';

const rootReducer = combineReducers({
    router: routerReducer,
	form: formReducer,
    auth: authReducer,
    job: jobReducer,
    timereport: timeReportReducer,
    services: serviceReducer,
    holidays: holidayReducer,
    candidates: candidatesReducer,
    myPage: myPageReducer,
    chat: chatReducer,
    notifications: notificationsReducer,
    reviews: reviewsReducer,
});

export default rootReducer;
