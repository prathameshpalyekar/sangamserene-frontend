import React, { Component } from 'react';
import '../less/BookingPanel.less';
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
import { getHash } from 'modules/BookingPanel/actions/getHash';
import TermsData from './TermsData';
import { sendMailToOwner } from 'modules/PostBooking/actions/sendMailToOwner';
const uuidv4 = require('uuid/v4');
// import bolt from 'bolt';
import Alert from 'react-s-alert';

class BookingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            showTerms: false,
            personalData: {},
            showErrorInForm: false,
        };
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showTerms = this.showTerms.bind(this);
        this.closeTerms = this.closeTerms.bind(this);
    }

    showTerms() {
        this.setState({
            showTerms: true
        })
    }

    closeTerms() {
        this.setState({
            showTerms: false
        })
    }

    onSubmit(model) {
        const { nonVeg, veg } = model;
        if (!nonVeg && !veg) {
            Alert.error('Please give food preferences.')
            return;
        } else if (!nonVeg && veg) {
            model.nonVeg = '0';
        } else if (!veg && nonVeg) {
            model.veg = '0';
        }
        this.setState({
            personalData: model
        })
        this.showTerms();
    }

    enableButton() {
        this.setState({
            canSubmit: true
        })
    }

    disableButton() {
        this.setState({
            canSubmit: false
        })
    }

    render() {
        const { state } = this.props.location;
        const { booking, reservedRooms } = state;
        const { personalData } = this.state;

        return (
            <div className="booking-panel-container">
                <Header isMobile={this.props.isMobile} shouldFixHeader={true}/>
                <div className="-header-buffer"></div>
                <div className="-booking-panel container">
                    <div className="row">
                        <div className="col-sm-7 col-sm-offset-1 -booking-form-container">
                            <div className="-header">
                                Enter your details
                            </div>
                            <Paper elevation={5} className="-booking-form" square={true}>
                                <div className="-title">
                                    FILL YOUR DETAILS
                                </div>
                                <Formsy className="edit-room-form" onValidSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
                                    <FC.Input label="Name" required name="name" type="text"/>
                                    <FC.Input label="Email" required name="email" type="email"/>
                                    <FC.Input label="Mobile number" required name="phoneNumber" type="number"/>
                                    <FC.Input label="Address" required name="address" type="text"/>
                                    <div className="row -food-preferences">
                                        <div className="-food-title">
                                            Food Preferences
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="-group">
                                                <FC.Input label="Non-veg" name="nonVeg" type="number" min="0" defaultValue="0"/>
                                                <div className="-person">Persons</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="-group">
                                                <FC.Input label="Veg" name="veg" type="number" min="0" defaultValue="0"/>
                                                <span className="-person">Persons</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary -btn-submit" disabled={!this.state.canSubmit}>Submit</button>
                                </Formsy>
                            </Paper>
                        </div>
                        <CustomerBooking booking={booking} reservedRooms={reservedRooms}/>
                    </div>
                </div>
                <Footer/>
                {this.state.showTerms ?
                    <Terms onRequestClose={this.closeTerms} personalData={personalData} booking={booking} reservedRooms={reservedRooms} history={this.props.history}/>
                    : null
                }
            </div>
        )
    }
}

class Terms extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.openPaymentPortal = this.openPaymentPortal.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onPaymentSuccess = this.onPaymentSuccess.bind(this);
    }

    componentDidMount() {
        const { Config, UiConfig } = FirebaseConfig;
        // firebase.initializeApp(Config);
    }

    onPaymentSuccess(BOLT) {
        const { history, booking, reservedRooms, personalData } = this.props;
        const { txnStatus } = BOLT.response;
        if (txnStatus === 'CANCEL') {
            return;
        }

        const bookingData = {
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            reservedRooms,
            paymentResponse: BOLT.response,
            name: personalData.name,
            email: personalData.email,
            phoneNumber: personalData.phoneNumber,
            address: personalData.address,
            nonVeg: personalData.nonVeg,
            veg: personalData.veg,
            payment: BOLT.response.amount
        }
        sendMailToOwner(bookingData)
        const newState = {
            pathname: '/post-booking',
            state: {
                booking: bookingData,
            }
        }
        history.push(newState);
        // console.log( BOLT.response.txnStatus);
    }

    onPaymentFailure(BOLT) {
        console.log(BOLT.message)
    }

    onSuccess(data) {
        console.log(data);
        const { bolt } = window;
        const responseHandler = {
            responseHandler: this.onPaymentSuccess,
            catchException: this.onPaymentFailure,
        };
        console.log(responseHandler)
        bolt.launch(data, responseHandler);
    }

    openPaymentPortal() {
        const { personalData, booking, reservedRooms } = this.props;
        let Total_Cost = 0;
        reservedRooms.forEach((room) => {
            Total_Cost += room.cost;
        })
        const txnid = uuidv4();
        const requestData = {
            txnid,
            firstname: personalData.name,
            email: personalData.email,
            phone: personalData.phoneNumber,
            amount: Total_Cost
        };

        getHash(requestData, this.onSuccess);
    }

    render() {
        console.log(this.props.personalData)
        return (
            <div>
                <AwModal.Modal
                    isOpen={true}
                    className="tems-data-modal"
                    onRequestClose={this.props.onRequestClose}>
                    <AwModal.Body>
                        <TermsData/>
                    </AwModal.Body>
                    <AwModal.Footer>
                        <button type="button" className="btn btn-primary -btn-submit" onClick={this.openPaymentPortal}>Accept</button>
                        <button type="button" className="btn btn-danger -btn-submit" onClick={this.props.onRequestClose}>Cancel</button>
                    </AwModal.Footer>
                </AwModal.Modal>
            </div>
        );
    }
}

class CustomerBooking extends Component {
    render() {
        const { booking, reservedRooms } = this.props;
        const { checkIn, checkOut, roomsData, rooms } = booking || {};
        const roomsArray = Array(rooms).fill('');
        let Total_Cost = 0;
        reservedRooms.forEach((room) => {
            Total_Cost += room.cost;
        })

        return (
            <Paper elevation={3} className="col-sm-3 -customer-booking-container" square={false}>
                <div className="-booking-time">
                    <div className="-check-in">
                        <div className="-check-in-date">{moment(checkIn).format('ddd MMM D')}</div>
                        <div className="-check-in-title">Check In</div>
                    </div>
                    <div className="-arrow-icon">
                        <i className="material-icons">arrow_forward</i>
                    </div>
                    <div className="-check-out">
                        <div className="-check-out-date">{moment(checkOut).format('ddd MMM D')}</div>
                        <div className="-check-out-title">Check Out</div>
                    </div>
                </div>
                <div className="-booking-rooms">
                    <div className="-room-header">
                        <div className="-index-title">Rooms</div>
                        <div className="-adults-title">Adults</div>
                        <div className="-children-title">Children</div>
                        <div className="-extras-title">Extras</div>
                    </div>
                    {roomsArray.map((room, index) => {
                        return (
                            <div className="-room-row" key={index}>
                                <div className="-room-index">{index + 1}</div>
                                <div className="-adults">{roomsData.adults[index]}</div>
                                <div className="-children">{roomsData.children[index]}</div>
                                <div className="-extras">{roomsData.extras[index]}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="-horizontal-line">
                </div>
                {reservedRooms.length > 0 ?
                    <div className="-reserved-rooms">
                        <div className="-reserved-rooms-header">
                            <div className="-room">Room</div>
                            <div className="-cost">Cost</div>
                        </div>
                        <div className="-reserved-rooms">
                            {reservedRooms.map((room, index) => {
                                return (
                                    <div className="-room-row" key={index}>
                                        <div className="-name">{room.room_name}</div>
                                        <div className="-cost">&#8377; {room.cost}</div>
                                    </div>
                                )
                            })}
                        </div>
                        {reservedRooms.length === rooms ?
                            <div className="-reserved-rooms-header">
                                <div className="-room">Total</div>
                                <div className="-cost">&#8377; {Total_Cost}</div>
                            </div> : null
                        }
                    </div> : null
                }
            </Paper>
        );
    }
}


export default withRouter(BookingPanel);
