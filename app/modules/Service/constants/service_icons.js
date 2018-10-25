import SS00 from '../images/admin-icon.svg';
import SS01 from '../images/event-icon.svg';
import SS02 from '../images/butik-icon.svg';
import SS03 from '../images/allt-i-allo-icon.svg';
import SS04 from '../images/vard-vardinna-icon.svg';
import SS05 from '../images/it-icon.svg';
import SS06 from '../images/receptionist-icon.svg';
import SS07 from '../images/servering-icon.svg';
import SS08 from '../images/lararvikarie-icon.svg';
import SS09 from '../images/stock.svg';
import SS10 from '../images/econoy.svg';

import SS00_FILLED from '../images/filled/job-icon-admin.svg';
import SS01_FILLED from '../images/filled/job-icon-event.svg';
import SS02_FILLED from '../images/filled/job-icon-butik.svg';
import SS03_FILLED from '../images/filled/job-icon-allt-i-allo.svg';
import SS04_FILLED from '../images/filled/job-icon-vard-vardinna.svg';
import SS05_FILLED from '../images/filled/job-icon-it-stod.svg';
import SS06_FILLED from '../images/filled/job-icon-receptionist.svg';
import SS07_FILLED from '../images/filled/job-icon-servering.svg';
import SS08_FILLED from '../images/filled/job-icon-lararvikarie.svg';
import SS09_FILLED from '../images/filled/job-icon-stock.svg';
import SS10_FILLED from '../images/filled/job-icon-econoy.svg';

const serviceIcons = {
    'SS00': [SS00, SS00_FILLED],
    'SS01': [SS01, SS01_FILLED],
    'SS02': [SS02, SS02_FILLED],
    'SS03': [SS03, SS03_FILLED],
    'SS04': [SS04, SS04_FILLED],
    'SS05': [SS05, SS05_FILLED],
    'SS06': [SS06, SS06_FILLED],
    'SS07': [SS07, SS07_FILLED],
    'SS08': [SS08, SS08_FILLED],
    'SS09': [SS09, SS09_FILLED],
    'SS10': [SS10, SS10_FILLED]
};

class ServiceImagePicker {

    static getServiceImage(systemName, iconType = 'inactive') {
        let image;

        const serviceIcon = serviceIcons[systemName];
        if(!serviceIcon) {
            return undefined;
        }
        switch(iconType) {
            //case 'active':
                //image = serviceIcons[systemName][1];
                //break;
            case 'filled':
                image = serviceIcons[systemName][1];
                break;
            default:
                image = serviceIcons[systemName][0];
                break;
        }
        return image;
    }
}

export default ServiceImagePicker;
