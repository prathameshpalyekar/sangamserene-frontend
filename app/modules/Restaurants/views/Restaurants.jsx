import React, { Component } from 'react';
import '../less/Restaurants.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import Paper from '@material-ui/core/Paper';
const FOOD_SLIDES = [
    'slide1.jpeg',
    'slide2.jpeg',
    'slide3.jpeg'
]

class Restaurants extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        return (
            <div className="restaurants-container">
                <Header isMobile={this.props.isMobile} shouldFixHeader={true}/>
                <div className="-header-buffer"></div>
                <div className="container">
                    <div className="-content row">
                        <Paper elevation={5} className="col-sm-8 col-sm-offset-2 -data-container" square={true}>
                            <div className="-header">
                                Restaurant
                            </div>
                            <div className="-horizontal-line"></div>
                            <div className="-introduction-header row">
                                <div className="col-sm-8 col-sm-offset-2 -content">
                                    Our Rates are Inclusive of Food i.e. Breakfast, Veg-Non Veg Lunch / Dinner and Tea / Coffee in the early evening. 
                                    We have separate Restaurant with buffet style serving. We serve Homemade food cooked 
                                    on Traditional Wood Stove (Chulha) - Chulivarche Jevan to take care of your 
                                    increased appetite in this environment.
                                </div>
                            </div>
                            <div className="-horizontal-line-small"></div>
                            <div className="-photo-container container">
                                <div className="row">
                                    {FOOD_SLIDES.map((slide, index) => {
                                        const src = '/assets/images/restaurant/' + slide;
                                        return (
                                            <Paper elevation={5} className="col-sm-4" square={true} key={index}>
                                                <img src={src} className="-image"/>
                                            </Paper>
                                        )
                                    })}
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

export default Restaurants;
