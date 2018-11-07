import React, { Component } from 'react';
import '../less/Rooms&Rates.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import firebase from 'firebase/app';
import FirebaseConfig from 'config';
import Paper from '@material-ui/core/Paper';
import Loader from 'modules/Gallery/views/Loader';

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

class RoomsRates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomsAvailable: [],
        };
    }

    componentDidMount() {
        window.scroll(0, 0);
        const { Config, UiConfig } = FirebaseConfig;
        if (firebase.apps.length === 0) {
            firebase.initializeApp(Config);
        }
        
        if (firebase.apps.length !== 0) {
            const database = firebase.database();
            this.setState({
                loadingData: true,
            })
            firebase.database().ref('/rooms').once('value').then((snapshot) => {
                const value = snapshot.val();
                const rooms = Object.keys(value).map((key) => {
                    const room = Object.assign({}, value[key]);
                    room.id = key;
                    return room;
                });
                this.setState({
                    roomsAvailable: rooms,
                    loadingData: false
                });
            }).catch((err) => {
                console.log(err);
            });
        }   
    }

    render() {
        const { roomsAvailable, loadingData } = this.state;
        return (
            <div className="rooms-container">
                <Header isMobile={this.props.isMobile} shouldFixHeader={true}/>
                <div className="-header-buffer"></div>
                <div className="-header">
                    Rooms and Rates
                </div>
                <div className="-horizontal-line"></div>
                <div className="-introduction-header row">
                    <div className="col-sm-8 col-sm-offset-2 -content">
                        We have aesthetically designed two spacious rooms with modern amenities measuring 300 Sq. 
                        Ft. under one cottage having rooftop of mangalore tiles. Each room having Large Double Bed 
                        (twin occupancy) with Side Table, Air Conditioner, Dressing Table, Center Table, Two Chairs, 
                        Lighting to suit your mood, Large Bath Room with Bath Tub, Shower, WC. 
                        Each room having Verandah to sit in a cozy mood to enjoy the nature. 
                        All rooms have front view of Swimming Pool and amazing scenic nature to thrill you.  
                        Free access to Swimming Pool* with infinite end to the nature. Water 
                        in the Swimming Pool is filtered every day with modern purification Plant to 
                        take health care of our guests in the Pool. Room Rates are Inclusive of Food i.e. 
                        Breakfast, Veg-Non Veg Lunch / Dinner and Tea / Coffee in the early evening.
                    </div>
                </div>
                <div className="-horizontal-line-small"></div>
                <div className="-rooms-data-container">
                    {loadingData ?
                        <div className="-loader-container">
                            <Loader/>
                        </div> : null 
                    }
                    {roomsAvailable.map((room, index) => {
                        const { aminities, weekday_price, price, extra_person_charge } = room;
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
                                    <div className="-child-age-limit">
                                        * Children above 6 years will be considered as an adult.
                                    </div>
                                    <div className="-note">
                                        ** Price is inclusive of food
                                    </div>
                                </div>
                                <div className="-price-info col-sm-3">
                                    <div className="-title">
                                        Price
                                    </div>
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
                                </div>
                            </Paper>
                        )
                    })}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default RoomsRates;
