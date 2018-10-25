import {
    UPDATE_SERVICES,
} from './actionTypes.js';

export const updateServices = (services) => ({
    type: UPDATE_SERVICES,
    services
});
