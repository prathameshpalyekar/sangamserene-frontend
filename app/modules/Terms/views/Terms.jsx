import React, { Component } from 'react';
import '../less/Terms.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import TermsData from 'modules/BookingPanel/views/TermsData';

class Terms extends Component {
    render() {
        return (
            <div className="terms-container">
                <Header isMobile={this.props.isMobile} shouldFixHeader={true}/>
                <div className="-header-buffer"></div>
                <div className="-terms">
                    <TermsData/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Terms;
