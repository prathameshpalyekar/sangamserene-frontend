import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import '../less/Information.less';
// import Header from 'modules/Header/views/Header';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

const content = [
    // 'We have aesthetically designed two spacious rooms with modern amenities measuring 300 Sq. Ft. under one cottage having rooftop of mangalore tiles.',
    null,
    // 'We serve Homemade food cooked on Traditional Wood Stove (Chulha) - Chulivarche Jevan to take care of your increased appetite in this environment.',
    null,
    null,
    null
];

class Information extends Component {
    render() {
        return (
            <div className="information-container">
                <div className="-content-container row">
                    <div className="col-sm-2">
                    </div>
                    <div className="col-sm-2 -content-item">
                        <Content imageUrl="rooms.jpg" title="Rooms & Rates" route="/rooms" history={this.props.history} content={content[0]}/>
                    </div>
                    <div className="col-sm-2 -content-item">
                        <Content imageUrl="gallery.jpg" title="Gallery" route="/gallery" history={this.props.history} content={content[1]}/>
                    </div>
                    <div className="col-sm-2 -content-item">
                        <Content imageUrl="restaurant.jpeg" title="Restaurant" route="/restaurant" history={this.props.history} content={content[2]}/>
                    </div>
                    <div className="col-sm-2 -content-item">
                        <Content imageUrl="sight_seeing.jpg" title="Sight Seeing" route="/activities" history={this.props.history} content={content[3]}/>
                    </div>
                </div>
            </div>
        )
    }
}

class Content extends Component {
    handleClick() {
        const { history, route } = this.props;
        history.push(route);
    }

    render() {
        const backgroundImage = "url('/assets/images/home/" + this.props.imageUrl + "')";
        return (
            <div className="-content-item-container">
                <Paper elevation={5} className="-image-container" square={false}>
                    <div className="-image" style={{backgroundImage}}>
                    </div>
                </Paper>
                <div className="-header">
                    {this.props.title}
                </div>
                <div className="-content">
                    {this.props.content}
                </div>
                <div className="-horizontal-line">
                </div>
                <div>
                    <Button variant="outlined" color="primary" className="-read-more" onClick={this.handleClick.bind(this)}>
                        Read More
                    </Button>
                </div>
            </div>
        )
    }
}

class ContentCard extends Component {
    render() {
        return (
            <Card className="-content-card-item-container">
                <CardActionArea>
                    <CardMedia className="-image" image="../../../../assets/images/info_image.jpg" title="Contemplative Reptile"/>
                    <CardContent className="-card-content">
                        <div className="-header">
                            Rooms & Rates
                        </div>
                        <div className="-content">
                            {/*I’m a paragraph. Click here to add your own text and edit me. 
                            I’m a great place for you to tell a story and 
                            let your users know a little more about you.*/}
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions className="-card-actions">
                    <Button variant="outlined" color="primary" className="-read-more">
                        Read More
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withRouter(Information);
