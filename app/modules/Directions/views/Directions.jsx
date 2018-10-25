import React, { Component } from 'react';
import '../less/Directions.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import Paper from '@material-ui/core/Paper';
import { MAP_SRC } from '../constants/Constants';

class Directions extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        return (
            <div className="contact-container">
                <Header isMobile={this.props.isMobile} shouldFixHeader={true}/>
                <div className="-header-buffer"></div>
                <div className="-content-container">
                    <div className="-content row">
                        <Paper elevation={5} className="col-sm-8 col-sm-offset-2 -data-container" square={true}>
                            <div className="-header">
                                Contact Us
                            </div>
                            <div className="-map">
                                <iframe src={MAP_SRC} width="100%" height="100%" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
                            </div>
                        </Paper>
                        <div className="-address col-sm-8 col-sm-offset-2">
                            <div className="-hotel-name">Sangam Serene Agro Farm</div>
                            <div className="-address-rows">   
                                Sutarwadi, At Post Dhamni, Taluka Sangameshwar
                                <br/>
                                District Ratnagiri, Maharashtra 415611
                            </div>
                            <br/>
                            <div>
                                <a className="-email" href="mailto:sangmaserene@gmail.com">sangmaserene@gmail.com</a>
                            </div>
                            <br/>
                            <div className="-telephone">
                                +91 8169823695
                                <br/>
                                +91 9969557688
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Directions;
