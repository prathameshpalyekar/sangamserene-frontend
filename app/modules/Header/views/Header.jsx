import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
// import '../less/Home.less';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import cx from 'classnames';
import '../less/Header.less';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Drawer from '@material-ui/core/Drawer';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDrawer: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }

    toggleDrawer() {
        this.setState({
            showDrawer: !this.state.showDrawer
        });
    }

    handleClick(route) {
        const { history } = this.props;
        history.push(route);
    }

    renderMobileMenuList() {
        return (
            <List component="nav" className="mobile-menu">
                <ListItem button className="list-button" onClick={this.handleClick.bind(this, '/')}>
                    <ListItemText primary="Home" className="list-content"/>
                </ListItem>
                <ListItem button className="list-button" onClick={this.handleClick.bind(this, '/about')}>
                    <ListItemText primary="About Us" className="list-content"/>
                </ListItem>
                <ListItem button className="list-button" onClick={this.handleClick.bind(this, '/rooms')}>
                    <ListItemText primary="Rooms & Rates" className="list-content"/>
                </ListItem>
                <ListItem button className="list-button" onClick={this.handleClick.bind(this, '/restaurant')}>
                    <ListItemText primary="Restaurant" className="list-content"/>
                </ListItem>
                <ListItem button className="list-button" onClick={this.handleClick.bind(this, '/activities')}>
                    <ListItemText primary="Sight Seeing" className="list-content"/>
                </ListItem>
                <ListItem button className="list-button" onClick={this.handleClick.bind(this, '/gallery')}>
                    <ListItemText primary="Gallery" className="list-content"/>
                </ListItem>
                <ListItem button className="list-button" onClick={this.handleClick.bind(this, '/contact')}>
                    <ListItemText primary="Directions" className="list-content"/>
                </ListItem>
            </List>
        )
    }

    render() {
        const { shouldFixHeader, isMobile } = this.props;
        // console.log(this.props.isMobile)
        const containerClassnames = cx('header-container', {
            '-fixed-header': shouldFixHeader
        });

        return (
            <div className={containerClassnames}>
                <Drawer anchor="top" open={this.state.showDrawer} onClose={this.toggleDrawer}>
                    <div tabIndex={0} role="button" onClick={this.toggleDrawer} onKeyDown={this.toggleDrawer}>
                        {this.renderMobileMenuList()}
                    </div>
                </Drawer>
                <AppBar position="static" className="-app-bar">
                    <Toolbar>
                        <div className="-menu-container">
                            {isMobile ?
                                <IconButton color="inherit" aria-label="Menu" className="menu-icon-button" onClick={this.toggleDrawer}>
                                    <MenuIcon className="menu-icon"/>
                                </IconButton> :
                                null
                            }
                            <div className="-logo">
                                <div className="-header-name">
                                    Sangam Serene
                                </div>
                                <div className="-header-sub-title">
                                    AgroFarm
                                </div>
                            </div>
                            {isMobile ?
                                null :
                                <div className="-menu-list">
                                    <ul className="-menu">
                                        <li className="-menu-item -vertical-line">
                                            <Button aria-haspopup="true"className="-menu-button -first" onClick={this.handleClick.bind(this, '/')}>Home</Button>
                                        </li>
                                        <li className="-menu-item -vertical-line">
                                            <Button aria-haspopup="true" className="-menu-button" onClick={this.handleClick.bind(this, '/about')}>About Us</Button>
                                        </li>
                                        <li className="-menu-item -vertical-line">
                                            <Button aria-haspopup="true" className="-menu-button" onClick={this.handleClick.bind(this, '/rooms')}>Rooms & Rates</Button>
                                        </li>
                                        <li className="-menu-item -vertical-line">
                                            <Button aria-haspopup="true" className="-menu-button" onClick={this.handleClick.bind(this, '/restaurant')}>Restaurant</Button>
                                        </li>
                                        <li className="-menu-item -vertical-line">
                                            <Button aria-haspopup="true" className="-menu-button" onClick={this.handleClick.bind(this, '/activities')}>Sight Seeing</Button>
                                        </li>
                                        <li className="-menu-item -vertical-line">
                                            <Button aria-haspopup="true" className="-menu-button" onClick={this.handleClick.bind(this, '/gallery')}>Gallery</Button>
                                        </li>
                                        <li className="-menu-item">
                                            <Button aria-haspopup="true" className="-menu-button -last" onClick={this.handleClick.bind(this, '/contact')}>Directions</Button>
                                        </li>
                                    </ul>
                                </div>
                            }
                            <Button variant="extendedFab" className="-book-now" onClick={this.handleClick.bind(this, '/pre-booking')}>
                                Book Now
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="-offer-container">
                    <div className="-content">
                        Diwali exclusive 50% off
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);
