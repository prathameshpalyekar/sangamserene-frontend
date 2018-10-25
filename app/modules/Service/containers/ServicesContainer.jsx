import { connect } from 'react-redux';

import Services from '../components/Services.jsx';
import { fetchServices } from '../actions/apiActions.js';

const mapStateToProps = state => {
    const services = state.getIn(['services', 'data']);

    return {
        services
    };
};

const mapDispatchsToProps = dispatch => {
    return {
        fetchServices: () => {
           dispatch(fetchServices());
        }
    };
};

export default connect(mapStateToProps, mapDispatchsToProps)(Services);
