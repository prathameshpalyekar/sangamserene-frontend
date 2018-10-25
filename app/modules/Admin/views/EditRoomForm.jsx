import React, { Component } from 'react';
import '../less/EditRoomForm.less';
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
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
// import firebase from 'firebase/app';

const ROOMS = [];
const AMINITIES = {
    ac: true,
    wc: true,
    shower: true,
    bathtub: true,
    swimming_pool: true,
    dressing_table: true,
    food: true,
    smoking: false,
    drinking: false,
    room_service: false
};

class EditRoomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false
        };
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.onSuccess = this.onSuccess.bind(this);
        // this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    }

    onSubmit(model) {
        const roomData = Object.assign({
            adult_occupancy: '2',
            child_occupancy: '1',
            price: '6000',
            weekday_price: '4000',
            extra_person_charge: '1500',
            registration_charge: '200',
        }, model, {
            area: {
                size: 300,
                unit: 'meter',
            },
            beds: {
                quantity: 1,
                type: 'double'
            },
            extra_adult_occupancy: 3,
            short_description: '',
            description: '',
            aminities: AMINITIES,
            // display_picture: '',
            room_images: ['']
        });
        const database = firebase.database();
        console.log(this.props.room, roomData)

        if (this.props.room.id) {
            const roomId = this.props.room.id;
            console.log(roomData)
            firebase.database().ref('rooms/' + roomId).set(roomData).then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.log("call without id")
            firebase.database().ref('rooms/').push(roomData).then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err);
            })
            console.log(model)
        }
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
        const { room } = this.props;
        return (
            <AwModal.Modal
                isOpen={true}
                className="edit-room-form-modal"
                onRequestClose={this.props.onRequestClose}>
                <AwModal.Body>
                    <div>
                        <Formsy className="edit-room-form" onValidSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
                            <label>New Room/Edit Room</label>
                            <FC.Input label="Name" required name="name" value={room.name}/>
                            {/*<FC.Input label="Adult Occupancy" required name="adult_occupancy" type="number"/>
                            <FC.Input label="Child Occupancy" required name="child_occupancy" type="number"/>
                            <FC.Input label="Price" required name="price" type="number"/>
                            <div>
                                Amenities
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <FC.Checkbox required name="Amenitiy1">Amenitiy1</FC.Checkbox>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}
                            <div>
                                <FC.ImageUpload name="display_picture" label="Display picture"/>
                            </div>
                            <button type="submit" className="btn btn-primary -btn-submit" disabled={!this.state.canSubmit}>Submit</button>
                        </Formsy>
                    </div>
                </AwModal.Body>
                <AwModal.Footer>
                </AwModal.Footer>
            </AwModal.Modal>
        );
    }
}

export default withRouter(EditRoomForm);
