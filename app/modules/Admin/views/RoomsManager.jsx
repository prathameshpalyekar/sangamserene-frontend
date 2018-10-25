import React, { Component } from 'react';
import '../less/RoomsManager.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import firebase from 'firebase/app';
import firebaseUi from 'firebaseui';
import FirebaseConfig from 'config';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AwModal from 'components/ui/AwModal';
import EditRoomForm from './EditRoomForm';

const ROOMS = [];

class RoomsManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditRoomForm: false,
            roomsAvailable: [],
            editRoom: {}
        };
        this.showEditRoomForm = this.showEditRoomForm.bind(this);
        this.hideEditRoomForm = this.hideEditRoomForm.bind(this);
        this.editRoom = this.editRoom.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.onSuccess = this.onSuccess.bind(this);
        // this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    }

    componentDidMount() {
        console.log("clling this")
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
        }   
    }

    editRoom(room) {
        this.setState({
            editRoom: room,
            showEditRoomForm: true
        })
    }

    showEditRoomForm() {
        this.setState({
            showEditRoomForm: true
        });
    }

    hideEditRoomForm() {
        this.setState({
            showEditRoomForm: false,
            editRoom: {}
        });
    }

    renderNoRoomsMessage() {
        return (
            <div className="-no-rooms-message">
                No Rooms added yet.
            </div>
        )
    }

    renderRooms(rooms) {
        return (
            <div>
                {rooms.map((room, index) => {
                    return (
                        <Room key={index} room={room} editRoom={this.editRoom}/>
                    )
                })}
            </div>
        )
    }

    render() {
        const { showEditRoomForm, roomsAvailable, editRoom } = this.state;
        console.log(roomsAvailable)
        return (
            <div>
                <div className="rooms-manager-container">
                    {roomsAvailable.length === 0 ?
                        this.renderNoRoomsMessage() :
                        this.renderRooms(roomsAvailable)
                    }
                    <Button variant="contained" className="-add-room" onClick={this.showEditRoomForm}>Add Room</Button>
                </div>
                {showEditRoomForm ? <EditRoomForm onRequestClose={this.hideEditRoomForm} room={editRoom}/> : null}
            </div>
        )
    }
}

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

class Room extends Component {
    constructor(props) {
        super(props);
        this.editRoom = this.editRoom.bind(this);
    }

    editRoom() {
        const { room } = this.props;
        this.props.editRoom(room);
    }

    render() {
        const { room } = this.props;
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
            <Paper elevation={3} className="-available-rooms row" square={true}>
                <div className="-display-picture col-sm-4">
                    <img src={room.display_picture} className="-image"/>
                </div>
                <div className="-room-info col-sm-5">
                    <div className="-name">{room.name}</div>
                    <div className="-aminities">
                        {aminitiesData.slice(0, 5).map((aminity, index) => {
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
                <div className="col-sm-3">
                    <Button variant="contained" className="-add-room" onClick={this.editRoom}>Edit Room</Button>
                </div>
            </Paper>
        )
    }
}

export default withRouter(RoomsManager);
