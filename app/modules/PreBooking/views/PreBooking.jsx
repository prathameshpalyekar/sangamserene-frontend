import React, { Component } from 'react';
import '../less/PreBooking.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import firebase from 'firebase/app';
import FirebaseConfig from 'config';
import Button from '@material-ui/core/Button';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import AwModal from 'components/ui/AwModal';
import axiosMainApi from 'components/axiosMainApi';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import AwModal from 'components/ui/AwModal';
// import Formsy from 'formsy-react';
// import FC from 'components/Formsy';
import FormHelperText from '@material-ui/core/FormHelperText';
// import { getHash } from 'modules/BookingPanel/actions/getHash';
const uuidv4 = require('uuid/v4');
// import bolt from 'bolt';

class PreBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkIn: null,
            checkOut: null,
            rooms: '',
            showRoomSelectorForm: false,
            enableSearch: false
        };
        this.handleCheckInChange = this.handleCheckInChange.bind(this);
        this.handleCheckOutChange = this.handleCheckOutChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.closeRoomSelectorForm = this.closeRoomSelectorForm.bind(this);
        this.onRoomsSelect = this.onRoomsSelect.bind(this);
        this.searchRooms = this.searchRooms.bind(this);
    }

    componentDidMount() {
        window.scroll(0, 0);
    }

    handleCheckInChange(date) {
        this.setState({
            checkIn: date
        });
    }

    handleCheckOutChange(date) {
        this.setState({
            checkOut: date
        });
    }

    handleChange(event) {
        const { value } = event.target;
        this.setState({
            rooms: value,
            showRoomSelectorForm: true
        });
    }

    closeRoomSelectorForm() {
        this.setState({
            showRoomSelectorForm: false
        })
    }

    onRoomsSelect(data) {
        // this.setState({
        //     roomsData: data,
        //     showRoomSelectorForm: false,
        //     enableSearch: true
        // })

        const roomsData = data;
        const { rooms } = this.state;
        const checkIn = this.state.checkIn ? this.state.checkIn.format('YYYY-MM-DD') : null;
        const checkOut = this.state.checkOut ? this.state.checkOut.format('YYYY-MM-DD') : null;
        const booking = Object.assign({}, {checkIn, checkOut, roomsData, rooms});
        // console.log(booking);
        const { history } = this.props;
        const newState = {
            pathname: '/booking',
            state: {
                booking
            }
        }
        history.push(newState);
    }

    searchRooms() {
        const { roomsData, rooms } = this.state;
        const checkIn = this.state.checkIn ? this.state.checkIn.format('YYYY-MM-DD') : null;
        const checkOut = this.state.checkOut ? this.state.checkOut.format('YYYY-MM-DD') : null;
        const booking = Object.assign({}, {checkIn, checkOut, roomsData, rooms});
        // console.log(booking);
        const { history } = this.props;
        const newState = {
            pathname: '/booking',
            state: {
                booking
            }
        }
        history.push(newState);
    }

    render() {
        const { checkIn, checkOut, rooms, showRoomSelectorForm, enableSearch } = this.state;
        const minCheckoutDate = moment(checkIn).add(1, 'day').format('YYYY-MM-DD');

        return (
            <div className="pre-booking-panel-container row">
                <Header isMobile={this.props.isMobile} shouldFixHeader={true}/>
                <div className="-header-buffer"></div>
                <div className="-pre-booking-panel container">
                    <div className="col-sm-3">
                    </div>
                    <Paper elevation={3} className="col-sm-6 -customer-booking-container" square={false}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <div className="-component">
                                <DatePicker value={checkIn} onChange={this.handleCheckInChange} emptyLabel="Check In" className="-date-picker" minDate={moment()}/>
                            </div>
                            <div className="-component">
                                <DatePicker value={checkOut} onChange={this.handleCheckOutChange} emptyLabel="Check Out" className="-date-picker" disabled={!checkIn} minDate={minCheckoutDate}/>
                            </div>
                            <div className="-component">
                                <Select className="-room-select" value={rooms} displayEmpty onChange={this.handleChange} disabled={!checkOut}>
                                    <MenuItem className="-room-select-option" value={''} disabled>Rooms</MenuItem>
                                    <MenuItem className="-room-select-option" value={1}>1</MenuItem>
                                    <MenuItem className="-room-select-option" value={2}>2</MenuItem>
                                    <MenuItem className="-room-select-option" value={3}>3</MenuItem>
                                    <MenuItem className="-room-select-option" value={4}>4</MenuItem>
                                    <MenuItem className="-room-select-option" value={5}>5</MenuItem>
                                    <MenuItem className="-room-select-option" value={6}>6</MenuItem>
                                </Select>
                            </div>
                            <div className="-child-age-limit">
                                * Children above 6 years will be considered as an adult.
                            </div>
                            
                        </MuiPickersUtilsProvider>
                    </Paper>
                </div>
                <Footer/>
                {showRoomSelectorForm ? <RoomSelector rooms={rooms} onRequestClose={this.closeRoomSelectorForm} onRoomsSelect={this.onRoomsSelect}/> : null}
            </div>
        )
    }
}

class RoomSelector extends Component {
    constructor(props) {
        super(props);
        const rooms = Array(this.props.rooms).fill('');
        this.state = {
            // canSubmit: false
            // checkIn: null,
            // checkOut: null,
            // rooms: ''
            adults: rooms.slice(),
            extras: rooms.slice(),
            children: rooms.slice()
        };
        this.handleChange = this.handleChange.bind(this);
        this.onRoomsSelect = this.onRoomsSelect.bind(this);
        // this.enableButton = this.enableButton.bind(this);
        // this.disableButton = this.disableButton.bind(this);
    }

    handleChange(index, event) {
        const { value, name } = event.target;
        const selectValue = this.state[name].slice();
        selectValue[index] = value;
        this.setState({
            [name]: selectValue,
        });
    }

    onRoomsSelect() {
        const { adults, children, extras } = this.state;
        // const { rooms } = this.props;
        let showError = false;
        adults.forEach((adult) => {
            if (adult !== 1 && adult !== 2) {
                showError = true
            }
        });

        if (showError) {
            this.setState({
                showError: true
            });
            return;
        }

        const rooms = {};
        rooms.adults = adults;
        rooms.children = children.map((child) => child === '' ? 0 : child);
        rooms.extras = extras.map((extra) => extra === '' ? 0 : extra);
        this.props.onRoomsSelect(rooms);
        return;
    }

    render() {
        // const { rooms } = this.props;
        const rooms = Array(this.props.rooms).fill('');
        const { adults, children, extras, showError } = this.state;
        return (
            <AwModal.Modal
                isOpen={true}
                className="-room-selector-modal"
                onRequestClose={this.props.onRequestClose}>
                <AwModal.Body>
                    <div>
                        {rooms.map((room, index) => {
                            return (
                                <div className="row -room-selector-row" key={index}>
                                    <div className="col-sm-3">
                                        <div className="-room-name">Room {index + 1}</div>
                                    </div>
                                    <div className="col-sm-3">
                                        <Select className="-adult-select" value={adults[index]} name="adults" displayEmpty onChange={this.handleChange.bind(this, index)}>
                                            <MenuItem className="-room-select-option" value={''} disabled>Guests</MenuItem>
                                            <MenuItem className="-room-select-option" value={1}>1</MenuItem>
                                            <MenuItem className="-room-select-option" value={2}>2</MenuItem>
                                        </Select>
                                        {showError && !adults[index] ? <FormHelperText className="-error-select">Select Guests</FormHelperText> : null}
                                    </div>
                                    <div className="col-sm-3">
                                        <Select className="-child-select" value={children[index]} name="children" displayEmpty onChange={this.handleChange.bind(this, index)}>
                                            <MenuItem className="-room-select-option" value={''} disabled>Children</MenuItem>
                                            <MenuItem className="-room-select-option" value={1}>1</MenuItem>
                                            <MenuItem className="-room-select-option" value={2}>2</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="col-sm-3">
                                        <Select className="-extra-select" value={extras[index]} name="extras" displayEmpty onChange={this.handleChange.bind(this, index)}>
                                            <MenuItem className="-room-select-option" value={''} disabled>Extra</MenuItem>
                                            <MenuItem className="-room-select-option" value={1}>1</MenuItem>
                                            <MenuItem className="-room-select-option" value={2}>2</MenuItem>
                                            <MenuItem className="-room-select-option" value={3}>3</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="-child-age-limit">
                            * Children above 6 years will be considered as an adult.
                        </div>
                    </div>
                </AwModal.Body>
                <AwModal.Footer>
                    <Button variant="raised" color="default" className="-done" onClick={this.onRoomsSelect}>
                        Done
                    </Button>
                </AwModal.Footer>
            </AwModal.Modal>
        );
    }
}

export default withRouter(PreBooking);
