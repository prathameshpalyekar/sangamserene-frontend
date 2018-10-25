import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import '../less/Home.less';
import Header from 'modules/Header/views/Header';
import Welcome from './Welcome';
import Information from './Information';
import Footer from 'modules/Footer/views/Footer';
import LandingPage from './LandingPage';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldFixHeader: false,
            lastScrollY: 0,
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollToHeader = this.scrollToHeader.bind(this);
    }

    componentDidMount() {
        window.scroll(0, 0);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
  
    handleScroll() {
        const landingPage = ReactDOM.findDOMNode(this.refs.landingPage);
        this.setState({
            shouldFixHeader: window.scrollY > landingPage.offsetHeight
        });
    }

    scrollToHeader() {
        // console.log('this is called')
        const landingPage = ReactDOM.findDOMNode(this.refs.landingPage);
        // console.log(landingPage)
        window.scroll(0, landingPage.offsetHeight);
    }

    render() {
        const { shouldFixHeader } = this.state;
        return (
            <div className="home-container">
                <div ref="landingPage">
                    <LandingPage isMobile={this.props.isMobile} scrollToHeader={this.scrollToHeader}/>
                </div>
                <Header isMobile={this.props.isMobile} shouldFixHeader={shouldFixHeader}/>
                <Welcome shouldFixHeader={shouldFixHeader}/>
                <Information/>
                <Footer/>
            </div>
        )
    }
}

export default Home;
