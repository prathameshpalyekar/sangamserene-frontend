import React, { Component } from 'react';
import '../less/Gallery.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import cx from 'classnames';
import ReactDOM from 'react-dom';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import AwModal from 'components/ui/AwModal';

const TILES = [
    '../../../../assets/images/gallery/slide1.jpeg',
    '../../../../assets/images/gallery/slide2.jpeg',
    '../../../../assets/images/gallery/slide3.jpeg',
    '../../../../assets/images/gallery/slide4.jpeg',
    '../../../../assets/images/gallery/slide5.jpeg',
    '../../../../assets/images/gallery/slide6.jpg',
    '../../../../assets/images/gallery/slide7.jpeg',
    '../../../../assets/images/gallery/slide8.jpeg',
    '../../../../assets/images/gallery/slide9.jpg',
    '../../../../assets/images/gallery/slide10.jpeg',
    '../../../../assets/images/gallery/slide11.jpg',
    '../../../../assets/images/gallery/slide12.jpeg',
    '../../../../assets/images/gallery/slide13.jpeg',
];

const ExtendedTiles = [
    [
        '../../../../assets/images/gallery/Slide1/slide1.jpeg',
        '../../../../assets/images/gallery/Slide1/slide2.jpeg',
        '../../../../assets/images/gallery/Slide1/slide3.jpeg',
    ],
    [
        '../../../../assets/images/gallery/Slide2/slide1.jpeg',
        '../../../../assets/images/gallery/Slide2/slide2.jpeg',
        '../../../../assets/images/gallery/Slide2/slide3.jpeg',
        '../../../../assets/images/gallery/Slide2/slide4.jpeg',
        '../../../../assets/images/gallery/Slide2/slide5.jpeg',
        '../../../../assets/images/gallery/Slide2/slide6.jpeg',
        '../../../../assets/images/gallery/Slide2/slide7.jpeg',
        '../../../../assets/images/gallery/Slide2/slide8.jpeg',
    ],
    [],
    [],
    [
        '../../../../assets/images/gallery/Slide5/slide1.jpeg',
        '../../../../assets/images/gallery/Slide5/slide2.jpeg',
        '../../../../assets/images/gallery/Slide5/slide3.jpeg',
        '../../../../assets/images/gallery/Slide5/slide4.jpeg',
        '../../../../assets/images/gallery/Slide5/slide5.jpeg',
    ]
]

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollLeft: 0,
            hideNextArrow: false,
            hideBackArrow: true,
            showExtendedGallery: false,
            index: null
        }
        this.shiftRight = this.shiftRight.bind(this);
        this.shiftLeft = this.shiftLeft.bind(this);
        this.showExtendedGallery = this.showExtendedGallery.bind(this);
        this.hideExtendedGallery = this.hideExtendedGallery.bind(this);
    }

    componentDidMount() {
        window.scroll(0, 0);
    }

    shiftLeft() {
        const gallery = ReactDOM.findDOMNode(this.refs.gallery);
        gallery.scrollLeft -= 100;
        this.setState({
            scrollLeft: gallery.scrollLeft,
            hideBackArrow: gallery.scrollLeft === 0,
            hideNextArrow: false,
        })

    }

    shiftRight() {
        const gallery = ReactDOM.findDOMNode(this.refs.gallery);
        gallery.scrollLeft += 100;
        this.setState({
            scrollLeft: gallery.scrollLeft,
            hideNextArrow: gallery.scrollLeft === this.state.scrollLeft,
            hideBackArrow: false
        });
    }

    showExtendedGallery(index) {
        this.setState({
            showExtendedGallery: true,
            index
        })
    }

    hideExtendedGallery() {
       this.setState({
            showExtendedGallery: false
        }) 
    }

    renderInstaIcon(index) {
        return (
            <div className="-insta-icon" onClick={this.showExtendedGallery.bind(this, index)}>
                <div className="-square-one"></div>
                <div className="-square-three"></div>
            </div>
        )
    }

    renderNormalGallery() {
        const { hideNextArrow, hideBackArrow } = this.state;
        return (
            <div className="-gallery">
                {hideBackArrow ? null : <ChevronLeft className="back-arrow" onClick={this.shiftLeft}></ChevronLeft>}
                {hideNextArrow ? null : <ChevronRight className="next-arrow" onClick={this.shiftRight}></ChevronRight>}
                <GridList cols={4} className="-grid-list" ref="gallery">
                    <GridListTile cols={1} className="-grid-column column-1">
                        <div className="-grid-tile tile-1">
                            {this.renderInstaIcon(0)}
                            <img src={TILES[0]} className=""/>
                        </div>
                        <div className="-grid-tile tile-2">
                            {this.renderInstaIcon(1)}
                            <img src={TILES[1]} className=""/>
                        </div>
                    </GridListTile>
                    <GridListTile cols={1} className="-grid-column column-2">
                        <img src={TILES[2]} className="-grid-tile tile-1"/>
                        <img src={TILES[3]} className="-grid-tile tile-2"/>
                    </GridListTile>
                    <GridListTile cols={1} className="-grid-column column-3">
                        <div className="-grid-tile tile-1">
                            {this.renderInstaIcon(4)}
                            <img src={TILES[4]} className=""/>
                        </div>
                        <div className="tile-2">
                            <img src={TILES[5]} className="child-tile-1"/>
                            <img src={TILES[6]} className="child-tile-2"/>
                        </div>
                    </GridListTile>
                    <GridListTile cols={1} className="-grid-column column-4">
                        <div className="tile-1">
                            <img src={TILES[7]} className="child-tile-1"/>
                            <img src={TILES[8]} className="child-tile-2"/>
                        </div>
                        <img src={TILES[9]} className="-grid-tile tile-2"/>
                    </GridListTile>
                    <GridListTile cols={1} className="-grid-column column-5">
                        <img src={TILES[10]} className="-grid-tile tile-1"/>
                        <img src={TILES[11]} className="-grid-tile tile-2"/>
                    </GridListTile>
                    <GridListTile cols={1} className="-grid-column column-6">
                        <img src={TILES[12]} className="-grid-tile tile-1"/>
                    </GridListTile>
                </GridList>
            </div>
        );
    }

    renderMobileGallery() {
        return (
            <div className="-mobile-gallery">
                {TILES.map((tile, index) => {
                    return (
                       <img src={tile} key={index} className="mobile-tile"/> 
                    )
                })}
            </div>
        )
    }

    render() {
        const { showExtendedGallery, index } = this.state;
        const galleryContainerClass = cx('', {
            'gallery-container': !this.props.isMobile,
            'mobile-gallery-container': this.props.isMobile,
        });

        return (
            <div className={galleryContainerClass}>
                <Header isMobile={this.props.isMobile} shouldFixHeader={true}/>
                <div className="-header-buffer"></div>
                {this.props.isMobile ?
                    this.renderMobileGallery() :
                    this.renderNormalGallery()
                }
                {showExtendedGallery ? <ExtendedGallery onRequestClose={this.hideExtendedGallery} index={index}/> : null}
                <Footer/>
            </div>
        );
    }
}


class ExtendedGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
        this.showNext = this.showNext.bind(this);
        this.showPrevious = this.showPrevious.bind(this);
    }

    showNext() {
        const { counter } = this.state;
        const limit = ExtendedTiles[this.props.index].length;
        this.setState({
            counter: counter < (limit - 1) ? counter + 1 : (limit - 1)
        })
    }

    showPrevious() {
        const { counter } = this.state;
        this.setState({
            counter: counter > 0 ? counter - 1 : 0
        });
    }

    render() {
        const { counter } = this.state;
        const { index } = this.props;
        // console.log(counter)
        return (
            <AwModal.Modal
                isOpen={true}
                className="extended-gallery-modal"
                onRequestClose={this.props.onRequestClose}>
                <div className="-previous-arrow" onClick={this.showPrevious}>
                    <span className="chevron left"></span>
                </div>
                <img src={ExtendedTiles[index][counter]} className="-extended-gallery-image"/>
                <div className="-next-arrow" onClick={this.showNext}>
                    <span className="chevron right"></span>
                </div>
            </AwModal.Modal>
        )
    }
}

export default Gallery;
