import React, { Component } from 'react';
import '../less/AboutUs.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import Paper from '@material-ui/core/Paper';

class AboutUs extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        return (
            <div className="about-container">
                <Header isMobile={this.props.isMobile} shouldFixHeader={true}/>
                <div className="-header-buffer"></div>
                <div className="-content-container">
                    <div className="-about-us-image">
                    </div>
                    <div className="-content row">
                        <Paper elevation={5} className="col-sm-10 col-sm-offset-1 -data-container" square={true}>
                            <div className="-header">
                                About Us
                            </div>
                            <div className="-sub-header">
                                
                            </div>
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="-about-us-info">
                                        Sangam Serene AgroFarm is ideally located on the Hill Top at Village
                                        Dhamani, Sangameshwar, Maharashtra in the Sahyadri Ranges of Konkan
                                        . It is well connected by Road and
                                        Railway for Travelers from Mumbai, Pune and nearby areas. We are
                                        situated 3 Km from Mumbai Goa Highway and 4 Km from Sangameshwar
                                        Railway Station.
                                    </div>
                                    <div className="-about-us-info">
                                        The place is Calm, Cool, unperturbed, tranquil amidst the natural green
                                        scenic beauty for relaxed stay to rejuvenate your Body, Mind and Soul,
                                        very much needed for tired mind and body in hectic city life. Your morning
                                        will start with the sound of chirping of various birds typically found in
                                        Sahyadri Forests, like woodpecker, kingfisher, hornbill etc. Sangam
                                        Serene Agro Farm is best suited for family and friends.
                                    </div>
                                    <div className="-about-us-info">
                                        Aesthetically Designed Rooms in Cottages having rooftop of Mangalore
                                        Tiles with AC and modern amenities with Bath Tub. Swimming Pool with
                                        infinite end to the nature. Water in the Swimming Pool is filtered every day
                                        with modern purification Plant to take health care of our guests in the Pool.
                                        All rooms have front view of Swimming Pool and amazing scenic nature to
                                        thrill you.
                                    </div>
                                    <div className="-about-us-info">
                                        We serve Homemade food cooked on Traditional Wood Stove (Chulha) –
                                        Chulivarche Jevan to take care of your increased appetite in this
                                        environment. Our package is inclusive of Breakfast, Veg - Non-Veg Lunch /
                                        Dinner and Tea / Coffee in early evening.
                                    </div>
                                    <div className="-about-us-info">
                                        Travelers planning for combo tour with other sight-seeing places have lot of
                                        popular attractive places to visit like, Beaches – Guhagar, Ganpatipule, Aare-ware, Temples – Marleshwar Swayambhu Shivmandir with Natural
                                        Waterfall, Devrukh Soljai &amp; Redjai Mandir, Kasba Karneshwar Mandir,
                                        Memorial of Chhatrapati Sambhaji, Hot Water Ponds at Rajvadi &amp; Aaravali,
                                        Forts of Historic Importance – Bhawangad, Prachitgad and Ratnadurg and
                                        many more.
                                    </div>
                                    <div className="-about-us-info">
                                        Sangam Serene AgroFarm ensures refreshed life of your inner senses and soul.
                                    </div>
                                    <div className="-about-us-info">
                                        Book your stay at least 7 days prior. No bookings will be done 7 days prior to the booking date.
                                        Book your stay with us online and call us for any assistance. We are happy to help you.
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <img src={'../../../../assets/images/about/about_us.jpeg'}/>
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default AboutUs;
