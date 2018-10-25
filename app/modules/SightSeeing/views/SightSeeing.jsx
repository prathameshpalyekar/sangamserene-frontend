import React, { Component } from 'react';
import '../less/SightSeeing.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import cx from 'classnames';
import SIGHT_DATA from '../Info/Info';

class SightSeeing extends Component {
    renderSightData() {
        const list = [];
        for (let index = 0; index < SIGHT_DATA.length; index += 2) {
            list.push(
                <div className="row" key={index}>
                    <div className="col-sm-6">
                        <PlaceToVisit tile={SIGHT_DATA[index]}/>
                    </div>
                    <div className="col-sm-6">
                        {SIGHT_DATA[index + 1] ? <PlaceToVisit tile={SIGHT_DATA[index + 1]}/> : null}
                    </div>
                </div>
            )
        }

        return list;
    }

    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        return (
            <div className="activities-container">
                <Header isMobile={this.props.isMobile} shouldFixHeader={true}/>
                <div className="-header-buffer"></div>
                <Paper elevation={5} className="-data-container" square={true}>
                    <div className="-header">
                        Sight Seeing
                    </div>
                    <div className="-horizontal-line"></div>
                    <div className="-introduction-header row">
                        <div className="col-sm-8 col-sm-offset-2 -content">
                            Konkan coast is blessed with beautiful divine nature. The resort is
                            located in Ratnagiri district which has lot of beautiful beaches and other
                            sightseeing places. There are many popular attractive sightseeing
                            places nearby.
                        </div>
                    </div>
                    <div className="-horizontal-line-small"></div>
                    <div className="-images-gallery row">
                        <div className="col-sm-4 -map">
                            <img src={'../../../../assets/images/Activities/Site_Map.png'} className="-map"/>
                        </div>
                        <div className="col-sm-8">
                            <div className="-place-container">
                                {this.renderSightData()}
                            </div>
                        </div>
                    </div>
                    <div className="-horizontal-line-small"></div>
                    <div className="-introduction-header row">
                        <div className="col-sm-8 col-sm-offset-2 -content">
                            Apart from all these famous places within Konkan, there are plenty of
                            attractive locations a short distance away. The Koyna Dam, Malgund,
                            the Soljai and Redjai temples in Devrukh, hot water springs in Rajwadi
                            and Aaravavli, Sapteshwar, Prachitgad, Bhawangad, Ratnadurg are just
                            a few of them.
                        </div>
                    </div>
                    <div className="-horizontal-line"></div>
                </Paper>
                <Footer/>
            </div>
        )
    }
}

class PlaceToVisit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false,
        };
        this.toggleInfo = this.toggleInfo.bind(this);
    }

    toggleInfo() {
        this.setState({
            showInfo: !this.state.showInfo
        });
    }

    render() {
        const { tile } = this.props;
        const { showInfo } = this.state;
        const tileFlipClass = cx('flipper', {
            'flip-tile': showInfo
        });

        return (
            <div className="-place-tile-paper">
                <Paper elevation={5} square={false} className={tileFlipClass}>
                    <GridListTile className="-place-tile -front">
                        <img src={tile.img} alt={tile.title} className="-place-image"/>
                        <GridListTileBar
                            title={
                                <span className="-place-title">
                                    {tile.title}
                                </span>
                            }
                            className="-place-tile-bar"
                            actionIcon={
                                <IconButton className="-place-info-button" onClick={this.toggleInfo}>
                                    <InfoIcon/>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                    <div className="-back">
                        <div className="-place-info-button">
                            <i className="material-icons -back-arrow" onClick={this.toggleInfo}>arrow_forward</i>
                        </div>
                        <div className="-place-info-content">
                            {tile.info}
                            <br/>
                            <span className="-distance">Distance from our farm : {tile.distance} km</span>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default SightSeeing;
