import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Button from '@material-ui/core/Button';
import '../less/Footer.less';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import { Link } from 'react-router-dom';
// import Header from 'modules/Header/views/Header';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            submitted: false
        };
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(model) {
        console.log(model);
        // this.setState({
        //     submitted: true
        // });
    }

    enableButton() {
        this.setState({
            canSubmit: true
        });
    }

    disableButton() {
        this.setState({
            canSubmit: false
        });
    }

    renderContact() {
        return (
            <div className="-contact">
                <div className="-address-rows">   
                    Sutarwadi, At Post Dhamni, Taluka Sangameshwar
                    <br/>
                    District Ratnagiri, Maharashtra 415611
                </div>
                <div className="-email-link">
                    <a className="-email" href="mailto:sangmaserene@gmail.com">sangmaserene@gmail.com</a>
                </div>
                <div className="-telephone">
                    <div>+91 8169823695</div>
                    <div>+91 9969557688</div>
                </div>
            </div>
        );
    }

    renderTermsLink() {
        return (
            <div>
                <Link to="/terms" className="-terms-link">Terms & Conditions</Link>
                <br/>
                <br/>
                <Link to="/faq" className="-terms-link">FAQ</Link>
            </div>
        );
    }

    renderCopyRight() {
        return (
            <div className="-copy-right">
                © 2018 by Sangam Serene
            </div>
        );
    }

    render() {
        const { canSubmit, submitted } = this.state;
        return (
            <div className="footer-container row">
                <div className="col-sm-2">
                </div>
                <div className="col-sm-3">
                    {this.renderCopyRight()}
                </div>
                <div className="col-sm-2 -terms">
                    {this.renderTermsLink()}
                </div>
                <div className="col-sm-3">
                    {this.renderContact()}
                    {/*<div className="row">
                        <Formsy className="-submit-form" onValidSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
                            <div className="col-sm-5">
                                <FC.Input required layout="elementOnly" placeholder="Name" name="name" autoComplete="new"/>
                                <FC.Input required layout="elementOnly" placeholder="Email" name="email" autoComplete="new"/>
                                <FC.Input layout="elementOnly" placeholder="Subject" name="subject" autoComplete="new"/>
                            </div>
                            <div className="-message-field col-sm-7">
                                <FC.Textarea required layout="elementOnly" placeholder="Message" validations="maxLength:255" name="message"></FC.Textarea>
                                <button type="submit" className="btn btn-filled btn-block -btn-submit" disabled={!canSubmit || submitted}>Submit</button>
                            </div>
                    </Formsy>
                    </div>*/}
                </div>

            </div>
        )
    }
}

export default Footer;
