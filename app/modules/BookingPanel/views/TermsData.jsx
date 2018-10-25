import React, { Component } from 'react';
import '../less/TermsData.less';
// import Header from 'modules/Header/views/Header';
// import Footer from 'modules/Footer/views/Footer';
// import firebase from 'firebase/app';
// import firebaseUi from 'firebaseui';
// import FirebaseConfig from 'config';
// import { withRouter } from 'react-router-dom';
// import cx from 'classnames';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import AwModal from 'components/ui/AwModal';
// import EditRoomForm from './EditRoomForm';

const ROOMS = [];

class TermsData extends Component {
    
    render() {
        // const { showEditRoomForm } = this.state;
        return (
            <div className="-terms-data">
                <div className="-header">TERMS AND CONDITIONS</div>
                <div>
                    Please take a moment to review our Terms &amp; Conditions and Cancellation Policy below.
                    Note that due to our small size we have to strictly follow to the policies listed below and
                    there can be no exceptions, even in the case of an emergency.
                </div>
                <br/>
                <div>
                    <b>1. DEFINITION :</b>
                </div>
                <br/>
                <ol type="I">
                    <li>
                    Guest shall mean any person registered as guest residing at the resort.
                    </li>
                    <li>
                    The person signing / agreeing the T &amp; C of the resort should be at least 18 years of age.
                    </li>
                </ol>
                <br/>
                <div>
                    <b>2. GENERAL INFORMATION :</b>
                </div>
                <br/>
                <ol type="I">
                    <li>
                        Please note that it is a Private property no invitee (guests apart from registered guests) is allowed in the property.
                    </li>
                    <li>
                        Smoking and Drinking is strictly prohibited.
                    </li>
                    <li>
                        Outside Eatables and Drinks are not allowed.
                    </li>
                    <li>
                        Pets are not allowed.
                    </li>
                    <li>
                        No littering and trash. Your co-operation will be highly appreciated to keep the environment clean.
                    </li>
                    <li>
                        No room service is available except Drinking Water.
                    </li>
                    <li>
                        We request you to please save electricity and water. Turn off the switches and taps when not required.
                    </li>
                    <li>
                        Please respect privacy of other guests. Enjoy yourself and let others enjoy themselves.
                    </li>
                    <li>
                        We provide purified water. Authentic food is made in quality oil and we use filtered water.
                    </li>
                    <li>
                        FACILITIES INCLUDED IN TARIFF :
                        <ul>
                            <li>Breakfast, Lunch, Tea and Dinner.</li>
                            <li>Air conditioner.</li>
                            <li>Television.</li>
                            <li>Swimming Pool.</li>
                        </ul>
                    </li>
                    <li>
                        SWIMMING POOL : Please note that,
                        <ul>
                            <li>Swimming costumes are compulsory.</li>
                            <li>Take shower before entering the pool.</li>
                            <li>Eatables and / or beverages are not allowed in / near the swimming pool area.</li>
                            <li>
                                Please take care of yourself and children in the swimming pool. Management is not
    responsible for any mishap.
                            </li>
                            <li>
                                If your body is allergic to chlorine do not enter in the swimming pool and / or
    swimming pool area.
                            </li>
                            <li>
                                No children will be allowed in the adult pool without the supervision of his / her
    parents / guardians.
                            </li>
                        </ul>
                    </li>
                </ol>
                <br/>
                <div>
                    <b>3. INDEMNITY :</b>
                </div>
                <br/>
                <ol type="I">
                    <li>
                        The person signing the agreement will be liable for the damages (not limited to the
cash deposit) caused to the resort and/or its property on account of any act, omission
or negligence of the guests.
                    </li>
                    <li>
                        A refundable security deposit will be taken in cash upon arrival per room, and
returned on the time of departure. (Held in abeyance)
                    </li>
                    <li>
                        The Person signing acknowledges on his own behalf and / or on behalf of the guests
accompanying him including minors, that he and guests accompanying him are fully
aware and well acquainted of and appreciate the real danger and risks that are
associated with residing at the resort. And also are aware of the presence of wild and
dangerous animals, reptiles, birds and insects and the attendant real risk of
suffering bodily harm, injury, death and /or loss to property which may arise as
result of an encounter with and /or the presence of wild animals and /or reptiles
and /or birds whilst on the premises or property of the Resort.
                        <br/>
                        <br/>
                        The guest(s)/signing guest(s), including guest(s) of the accompanying party and/or
invitee(s) hereby waive all claim(s) of any cause or nature, however they may arise,
and hereby indemnifies and continues to indemnify and hold harmless and free, the
resort/management of the resort, their owners, directors, associates, partners,
directors and employees and/or any person connected, whether directly or indirectly,
with the running of the resort and fellow guest(s)/invitee(s) from any and all claims of
whatever cause or nature made by the guest(s)/signing guest(s) and/or guest(s) in
the accompanying party and/or invitees and/or by the spouse, common law wife,
children, whether minor or adult, or relatives and/or authorised representatives of the
guest(s)/signing guest(s) and/or guest(s) in the accompanying party and/or invitees,
for any harm, injury, death, or loss suffered by the guest(s)/signing guest(s) and/or
any guest(s) of the accompanying party and/or invitees while on the resort, whether
arising from an act or omission
                    </li>
                    <li>
                        The person signing the agreement is fully aware that management is not
responsible for loss of properties like Cameras, Ornaments, Mobiles or any other
valuables. Please take care of your belongings.
                    </li>
                </ol>
                <div>
                    <b>4. CHECK-IN CHECK-OUT :</b>
                </div>
                <br/>
                <ol type="I">
                    <li>
                        Check in time is 10:00 Am and Check out time is 9:00 am. If any guest need access
to the rooms before the check in time (10:00), it must be upon the approval of the
management. Also late departures beyond the check out time (9:00 am) must be on
approval. Without approval of the management extra stay will be charged.
                    </li>
                    <li>
                        Please inform the management before checking out, to complete the procedure of
checking out.
                    </li>
                </ol>
                <div>
                    <b>5. PRICING POLICY :</b>
                </div>
                <br/>
                <ol type="I">
                    <li>
                        Children above 6 years will be considered as an adult. There won’t be any charges
for children below 6 years.
                    </li>
                    <li>
                        If an extra bed is required, Please inform the management in advance.
                    </li>
                    <li>
                        We charge Price as per rooms.
                    </li>
                </ol>
                <br/>
                <div>
                    ON WEEKENDS AND HOLIDAYS :
                </div>
                <div>
                    DOUBLE OCCUPANCY
                </div>
                <div>
                    5800 INR Room Rent + 200 INR Registration Fees = 6000 INR Per Day.
                </div>
                <br/>
                <div>
                    ON WEEKDAYS :
                </div>
                <div>
                    DOUBLE OCCUPANCY
                </div>
                <div>
                    3800 INR Room Rent + 200 INR Registration Fees = 4000 INR Per Day.
                </div>
                <br/>
                <div>Note That extra person cost is 1500 INR per day.</div>
                <br/>
                <div>
                    <b>6. CANCELLATION POLICY :</b>
                </div>
                <div>
                    In the unfortunate event that you will not be able to join
us, please review the cancellation policy below:
                </div>
                <div>
                    In case of emergency or other unavoidable circumstances we give you an option of
postponing the reservation. However,
                </div>
                <ul>
                    <li>
                        Registration Charges are non refundable.
                    </li>
                    <li>
                        Reservation Cancelled 15 days prior to the Check–in date will incur 70% refund.
                    </li>
                    <li>
                        Reservation Cancelled 7 - 14 days prior to the Check–in date will incur 50% refund.
                    </li>
                    <li>
                        No date changes or refunds will be entertained for any cancellations within 7 days
of scheduled check-in date.
                    </li>
                    <li>
                        No date changes will be entertained for any stays during the Festival seasons like
Diwali, Christmas and New years.
                    </li>
                    <li>
                        Book your stay at least 7 days prior. No bookings will be done 7 days prior to the booking date.
                    </li>
                </ul>
                <div>
                    7. Provide Photocopy (Xerox) of Valid ID proof / Valid ID proof on the day of arrival to
the management. ( eg. Driving License, Aadhar card, Pan card, Passport.)
                </div>
                <div>
                    Online bookings only.
                </div>
                <div className="-footer">
                    Respect Nature And Nature Will Respect You!
                </div>
                <div className="-footer">
                    Don’t forget to tag us while posting the pictures on social media.
                    <br/>
Last But not the least enjoy your stay with Sangam Serene Agro Farm !
                </div>
            </div>
        )
    }
}

export default TermsData;
