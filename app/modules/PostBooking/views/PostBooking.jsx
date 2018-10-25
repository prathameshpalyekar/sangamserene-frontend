import React, { Component } from 'react';
import '../less/PostBooking.less';
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
import { sendMailToOwner } from 'modules/PostBooking/actions/sendMailToOwner';
// import { getHash } from 'modules/BookingPanel/actions/getHash';
const uuidv4 = require('uuid/v4');
// import bolt from 'bolt';

class PostBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            showTerms: false,
            personalData: {}
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        const { booking } = state;
        const { reservedRooms, checkIn, checkOut, name, email, phoneNumber, payment, paymentResponse, address } = booking;
        const { txnid } = paymentResponse;
        // console.log(booking)
        const { Config, UiConfig } = FirebaseConfig;
        if (firebase.apps.length === 0) {
            firebase.initializeApp(Config);
        }
        
        if (firebase.apps.length !== 0) {
            firebase.database().ref('booking/' + txnid).set(booking).then((result) => {
                console.log(result);
                // sendMailToOwner(booking)
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    render() {
        const { state } = this.props.location;
        const { booking } = state;
        const { reservedRooms, checkIn, checkOut, name, email, phoneNumber, payment } = booking;
        // console.log(reservedRooms)

        return (
            <div className="post-booking-panel-container row">
                <Header isMobile={this.props.isMobile} shouldFixHeader={true}/>
                <div className="-header-buffer"></div>
                <div className="-booking-panel container">
                    <div className="col-sm-3">
                    </div>
                    <Paper elevation={3} className="col-sm-6 -customer-booking-container" square={false}>
                        <div className="-payment-header">
                            !! Booking Confirmed !!
                        </div>
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
                            {reservedRooms.map((room, index) => {
                                return (
                                    <div className="-room-row" key={index}>
                                        <div className="-room-index">{room.room_name}</div>
                                        <div className="-adults">{room.booking.adults}</div>
                                        <div className="-children">{room.booking.children}</div>
                                        <div className="-extras">{room.booking.extras}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="-horizontal-line">
                        </div>
                        <div className="-reserved-rooms-header">
                            <div className="-room">Total</div>
                            <div className="-cost">&#8377; {payment}</div>
                        </div>
                        <div className="-horizontal-line">
                        </div>
                        <div className="-personal-details">
                            <div className="-personal-details-header">
                                Personal Details
                            </div>
                            <div className="-name">{name}</div>
                            <div className="-email">{email}</div>
                            <div className="-phone">{phoneNumber}</div>
                        </div>
                        <div className="-receipt-note">
                            You will soon receive receipt over email.
                        </div>
                    </Paper>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default withRouter(PostBooking);
