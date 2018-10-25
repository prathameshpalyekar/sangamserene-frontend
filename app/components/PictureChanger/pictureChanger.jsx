import React, { Component } from 'react';
import Alert from 'react-s-alert';
import cx from 'classnames';

import profilePlaceholder from 'modules/Candidates/images/placeholder_profile_dark.png';

import './pictureChanger.less';

const FILE_UPLOAD_LIMIT_IN_MB = 5;

class PictureChanger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            imagePreviewUrl: null,
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.pictureChanged(this.state.file);
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        const file = e.target.files[0];

        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            Alert.error('Tillåtna filtyper endast png och jpeg');
            return false;
        }

        if (file.size > 1000000*FILE_UPLOAD_LIMIT_IN_MB) {
            Alert.error(`Maxstorlek på filen får inte överskrida ${FILE_UPLOAD_LIMIT_IN_MB}MB`);
            return false;
        }

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
            this.props.pictureChanged(file);
        }
        reader.readAsDataURL(file);
    }

    render() {
        let { imagePreviewUrl } = this.state;

        const profilePic = this.props.profilePic ? this.props.profilePic : profilePlaceholder;
        //const previewPic = imagePreviewUrl ? imagePreviewUrl : profilePic;
        const previewPic = profilePic;

        const classnames = cx('avatar', this.props.type ? this.props.type : null);

        return (
            <div className="picture-changer text-center">
                <div className={classnames} htmlFor="change-picture" style={{
                    backgroundImage: "url(" + previewPic + ")"
                }}></div>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    {
                        <label className="upload-text -clickable" htmlFor="change-picture">{this.props.btnText}</label>
                    }
                    <input
                        className="visible-hidden"
                        id="change-picture"
                        type="file"
                        accept="image/*"
                        onChange={(e)=>this.handleImageChange(e)} />
                </form>
            </div>
        );
    }
}

export default PictureChanger;
