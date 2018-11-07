import React, { Component } from 'react';
import '../less/Booking.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import firebase from 'firebase/app';
import FirebaseConfig from 'config';
import Button from '@material-ui/core/Button';
import { getBookings } from 'modules/Booking/actions/getBookings';

const AMINITIES_MAP = {
    ac: 'AC',
    bathtub: 'Bathtub',
    dressing_table: 'Dressing Table',
    drinking: 'Drinking',
    food: 'Food',
    room_service: 'Room Service',
    shower: 'Shower',
    smoking: 'Smoking',
    swimming_pool: 'Swimming Pool',
    wc: 'WC',
}

const DISCOUNT_PERIOD_START = '2018-11-05';
const DISCOUNT_PERIOD_END = '2018-11-10';
const DISCOUNT_PERCENT = 50;

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomsAvailable: [],
            currentBooking: 0,
            reservedRoomsData: [],
            roomsAvailableAfterBooking: []
        };
        this.reserveRoom = this.reserveRoom.bind(this);
        // this.disableButton = this.disableButton.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        // this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    }

    onSuccess(data) {
        this.setState({
            roomsAvailableAfterBooking: data
        });
    }

    componentDidMount() {
        // console.log("clling this")
        const { Config, UiConfig } = FirebaseConfig;
        if (firebase.apps.length === 0) {
            firebase.initializeApp(Config);
        }
        
        if (firebase.apps.length !== 0) {
            const database = firebase.database();
            firebase.database().ref('/rooms').once('value').then((snapshot) => {
                const value = snapshot.val();
                const rooms = Object.keys(value).map((key) => {
                    const room = Object.assign({}, value[key]);
                    room.id = key;
                    return room;
                });
                this.setState({
                    roomsAvailable: rooms
                });
            }).catch((err) => {
                console.log(err);
            });

            const { location, history } = this.props;
            const { booking } = location.state || {};
            const { checkIn, checkOut } = booking || {};
            getBookings(checkIn, checkOut, this.onSuccess);
        }
        
    }

    reserveRoom(data) {
        const { reservedRoomsData } = this.state;
        const updateReservedRoomsData = reservedRoomsData.slice();
        updateReservedRoomsData.push(data)
        const roomsAvailable = this.state.roomsAvailable.filter((room) => room.id !== data.room_id);

        this.setState({
            currentBooking: this.state.currentBooking + 1,
            reservedRoomsData: updateReservedRoomsData,
            roomsAvailable
        });
    }

    render() {
        const { location, history } = this.props;
        const { booking } = location.state || {};
        const { checkIn, checkOut, roomsData, rooms } = booking || {};
        const showBookingSection = !checkIn || !checkOut || !roomsData;
        const { roomsAvailable, currentBooking, reservedRoomsData, roomsAvailableAfterBooking } = this.state;
        const showRoomOptions = currentBooking < rooms;

        return (
            <div className="booking-container">
                <Header isMobile={this.props.isMobile} shouldFixHeader={true}/>
                <div className="-header-buffer"></div>
                <div className="-booking row">
                    <div className="col-sm-4">
                        <CustomerBooking booking={booking} reservedRooms={reservedRoomsData} history={history}/>
                    </div>
                    <div className="col-sm-8">
                        {showRoomOptions ?
                            <div>
                                <div className="-current-booking-title">Options for Room {currentBooking + 1}</div>
                                {roomsAvailable.filter((room) => {
                                    return roomsAvailableAfterBooking.some((availableRoom) => availableRoom === room.id)
                                }).map((room, index) => {
                                    const { aminities } = room;
                                    const aminitiesData = Object.keys(aminities).map((key) => {
                                        return {
                                            [key]: aminities[key]
                                        };
                                    }).map((aminity) => {
                                        const key = Object.keys(aminity)[0];
                                        return Object.assign({}, {
                                            type: AMINITIES_MAP[key],
                                            value: aminity[key],
                                        });
                                    });
                                    const size = room.area.size + ' ' + 'Sq.Ft';
                                    return (
                                        <Paper elevation={3} className="-available-rooms row" square={true} key={index}>
                                            <div className="-display-picture col-sm-4">
                                                <img src={room.display_picture} className="-image"/>
                                            </div>
                                            <div className="-room-info col-sm-5">
                                                <div className="-name">{room.name}</div>
                                                <div className="-aminities">
                                                    {aminitiesData.slice(0, 5).map((aminity, index) => {
                                                        if (aminity.type === 'AC') {
                                                            aminity.value = false;
                                                        }
                                                        return (
                                                            <div key={index} className="-aminity">
                                                                <div className="-value">
                                                                    {aminity.value ?
                                                                        <i className="material-icons">done</i> :
                                                                        <i className="material-icons">clear</i>
                                                                    }
                                                                </div>
                                                                <div className="-type">{aminity.type}</div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className="-aminities">
                                                    {aminitiesData.slice(5, 10).map((aminity, index) => {
                                                        return (
                                                            <div key={index} className="-aminity">
                                                                <div className="-value">
                                                                    {aminity.value ?
                                                                        <i className="material-icons">done</i> :
                                                                        <i className="material-icons">clear</i>
                                                                    }
                                                                </div>
                                                                <div className="-type">{aminity.type}</div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className="-size">
                                                    Room Size: {size}
                                                </div>
                                                <div className="-warning">
                                                    * Smoking and Drinking is strictly prohibited.
                                                </div>
                                                <div className="-warning">
                                                    * No pets allowed
                                                </div>
                                                <div className="-note">
                                                    ** Price is inclusive of food
                                                </div>
                                            </div>
                                            <RoomCost room={room} booking={booking} currentBooking={currentBooking} reserveRoom={this.reserveRoom}/>
                                        </Paper>
                                    )
                                })}
                            </div> :
                            <div className="-current-booking-title">
                                All Rooms Selected.
                                <br/>
                                Please continue to payment.
                            </div>
                        }
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

class RoomCost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomsAvailable: [],
            // currentBooking: 0
        };
        this.reserveRoom = this.reserveRoom.bind(this);
        // this.disableButton = this.disableButton.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.onSuccess = this.onSuccess.bind(this);
        // this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    }

    reserveRoom() {
        const { room, booking, currentBooking } = this.props;
        const total_cost = this.getTotalCost();
        const room_id = room.id;
        const { roomsData } = booking;
        const booking_data = {
            adults: roomsData.adults[currentBooking],
            children: roomsData.children[currentBooking],
            extras: roomsData.extras[currentBooking],
        };
        const reserveData = {
            cost: total_cost,
            room_id,
            room_name: room.name,
            booking: booking_data,
        };
        this.props.reserveRoom(reserveData);
    }

    getTotalCost() {
        const { room, booking, currentBooking } = this.props;
        const { weekday_price, price, extra_person_charge } = room;
        const checkIn = moment(booking.checkIn);
        const checkOut = moment(booking.checkOut);
        const daysOfStay = checkOut.diff(checkIn, 'days');
        let index = daysOfStay;
        let weekdays = 0;
        let weekends = 0;
        let currentDay = checkIn;
        while (index > 0) {
            const currentDateFormat = currentDay.format('E');
            const isWeekDay = currentDateFormat < 6;
            if (isWeekDay) {
                weekdays++;
            } else {
                weekends++;
            }
            currentDay.add(1, 'day');
            index--;
        }
        const { roomsData } = booking;
        const room_price = weekends * price + weekdays * weekday_price;
        const extra_charge = extra_person_charge * roomsData.extras[currentBooking] * daysOfStay;
        const discount = this.getDiscountAmount();
        const total_cost = room_price + extra_charge - discount;
        // const total_cost = room_price + extra_charge;
        return total_cost;
    }

    getDiscount(start, end) {
        // console.log(start, end)
        const daysOfStay = end.diff(start, 'days');
        // console.log(daysOfStay)
        let index = daysOfStay;
        let weekdays = 0;
        let weekends = 0;
        let currentDay = start;
        while (index > 0) {
            const currentDateFormat = currentDay.format('E');
            const isWeekDay = currentDateFormat < 6;
            if (isWeekDay) {
                weekdays++;
            } else {
                weekends++;
            }
            currentDay.add(1, 'day');
            index--;
        }

        // console.log(weekdays, weekends)
        // return {
        //     weekends,
        //     weekends
        // };

        const { room, booking, currentBooking } = this.props;
        const { roomsData } = booking;
        const { weekday_price, price, extra_person_charge } = room;
        const room_price = weekends * price + weekdays * weekday_price;
        // console.log(room_price)
        const extra_charge = extra_person_charge * roomsData.extras[currentBooking] * daysOfStay;
        // console.log(extra_charge)
        const total_cost = room_price + extra_charge;
        // console.log(total_cost)
        const discount = total_cost * DISCOUNT_PERCENT / 100;
        return discount;
    }

    getDiscountAmount() {
        const { room, booking, currentBooking } = this.props;
        const { weekday_price, price, extra_person_charge } = room;
        const checkIn = moment(booking.checkIn);
        const checkOut = moment(booking.checkOut);
        // Discount Period 
        const periodStart = moment(DISCOUNT_PERIOD_START);
        const periodEnd = moment(DISCOUNT_PERIOD_END);

        const isCheckInBeforeDiscountPeriodStart = checkIn.isBefore(periodStart);
        const isCheckInAfterDiscountPeriodStart = !isCheckInBeforeDiscountPeriodStart;

        const isCheckInAfterDiscountPeriodEnd = periodEnd.isBefore(checkIn);
        const isCheckOutBeforeDiscountPeriodStart = checkOut.isBefore(periodStart);

        const isCheckOutBeforeDiscountPeriodEnd = checkOut.isBefore(periodEnd);    
        const isCheckOutAfterDiscountPeriodEnd = !isCheckOutBeforeDiscountPeriodEnd;

        // console.log(isCheckInBeforeDiscountPeriodStart, 'isCheckInBeforeDiscountPeriodStart');
        // console.log(isCheckOutAfterDiscountPeriodEnd, 'isCheckOutAfterDiscountPeriodEnd');
        // console.log(isCheckOutBeforeDiscountPeriodEnd, 'isCheckOutBeforeDiscountPeriodEnd');

        // console.log(isCheckInAfterDiscountPeriodStart, 'isCheckInAfterDiscountPeriodStart');
        // console.log(isCheckOutBeforeDiscountPeriodEnd, 'isCheckOutBeforeDiscountPeriodEnd');
        // console.log(isCheckOutAfterDiscountPeriodEnd, 'isCheckOutAfterDiscountPeriodEnd');
        
        if (isCheckOutBeforeDiscountPeriodStart || isCheckInAfterDiscountPeriodEnd) {
            return 0;
        }

        if (isCheckInBeforeDiscountPeriodStart) {
            if (isCheckOutBeforeDiscountPeriodEnd) {
                // period start to checkout
                return this.getDiscount(periodStart, checkOut);
            }

            if (isCheckOutAfterDiscountPeriodEnd) {
                // period start to period end
                return this.getDiscount(periodStart, periodEnd);
            }

            return 0;
        }

        if (isCheckInAfterDiscountPeriodStart) {
            if (isCheckOutBeforeDiscountPeriodEnd) {
                // checkin to checkout
                return this.getDiscount(checkIn, checkOut);;
            }

            if (isCheckOutAfterDiscountPeriodEnd) {
                // checkIn to period end
                return this.getDiscount(checkIn, periodEnd);;
            }

            return 0;
        }

        return 0;
    }

    render() {
        const { room, booking, currentBooking } = this.props;
        const { weekday_price, price, extra_person_charge } = room;
        const checkIn = moment(booking.checkIn);
        const checkOut = moment(booking.checkOut);
        const daysOfStay = checkOut.diff(checkIn, 'days');
        let index = daysOfStay;
        let weekdays = 0;
        let weekends = 0;
        let currentDay = checkIn;
        while (index > 0) {
            const currentDateFormat = currentDay.format('E');
            const isWeekDay = currentDateFormat < 6;
            if (isWeekDay) {
                weekdays++;
            } else {
                weekends++;
            }
            currentDay.add(1, 'day');
            index--;
        }
        const { roomsData } = booking;
        const room_price = weekends * price + weekdays * weekday_price;
        const extra_charge = extra_person_charge * roomsData.extras[currentBooking] * daysOfStay;
        const discount = this.getDiscountAmount();
        const total_cost = room_price + extra_charge - discount;
        
        // console.log(discount, 'Discount', room.name)

        return (
            <div className="-price col-sm-3">
                <div className="-rate-title">Rate</div>
                <div className="-cost">
                    <div className="-weekend">
                        <span className="-weekend-price">Weekend : </span>
                        <span>&#8377; {price}</span>
                    </div>
                    <div className="-weekday">
                        <span className="-weekday-price">Weekday : </span>
                        <span>&#8377; {weekday_price}</span>
                    </div>
                    <div className="-extra">
                        <span className="-extra-price">Extra Per Person : </span>
                        <span>&#8377; {extra_person_charge}</span>
                    </div>
                </div>
                <div className="-break-up">
                    <div>
                        <div>
                            <div><b>WeekDays Room Cost: </b></div>
                            <div>
                                {weekdays} (days) * &#8377; {weekday_price} = &#8377; {weekdays * weekday_price}
                            </div>
                        </div>
                        <br/>
                        <div>
                            <div><b>WeekEnd Room Cost: </b></div>
                            <div>
                                {weekends} (days) * &#8377; {price} = &#8377; {weekends * price}
                            </div>
                        </div>
                        <br/>
                        <div>
                            <div>Extra Person Cost: </div>
                            <div>
                                &#8377; {extra_person_charge} * {roomsData.extras[currentBooking]} (persons) * {daysOfStay} (total days) = &#8377; {extra_charge}
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
                <div className="-total-cost">
                    {discount ?
                        <div>
                            <div className="-title">Discount</div>
                            <div className="-cost">&#8377; {discount}</div>
                        </div> : null
                    }
                    <div className="-title">Final Cost</div>
                    <div className="-cost">&#8377; {total_cost}</div>
                </div>
                <div className="-reserve-room">
                    <Button variant="raised" color="default" className="-button" onClick={this.reserveRoom}>
                        Reserve Now
                    </Button>
                </div>
            </div>
        )
    }
}

class CustomerBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.bookRoom = this.bookRoom.bind(this);
    }

    bookRoom(props) {
        const { history, booking, reservedRooms } = props;
        const newState = {
            pathname: '/confirm-booking',
            state: {
                booking,
                reservedRooms
            }
        }
        history.push(newState);
    }

    componentWillReceiveProps(nextProps) {
        const { booking, reservedRooms } = nextProps;
        const { rooms } = booking || {};
        if (reservedRooms.length > 0 && reservedRooms.length === rooms) {
            this.bookRoom(nextProps);
        }
    }

    render() {
        const { booking, reservedRooms } = this.props;
        const { checkIn, checkOut, roomsData, rooms } = booking || {};
        const roomsArray = Array(rooms).fill('');
        let Total_Cost = 0;
        reservedRooms.forEach((room) => {
            Total_Cost += room.cost;
        })

        return (
            <Paper elevation={3} className="-customer-booking-container" square={false}>
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
                        {reservedRooms.length === rooms ?
                            <div className="-book-now">
                                <Button variant="raised" color="default" className="-button" onClick={this.bookRoom}>
                                    Book Now
                                </Button>
                            </div> : null
                        }
                    </div> : null
                }
            </Paper>
        );
    }
}

export default withRouter(Booking);
