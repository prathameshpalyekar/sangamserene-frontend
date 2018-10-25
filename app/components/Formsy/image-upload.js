/*jshint node:true */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { withFormsy } from 'formsy-react';

import Row from './row.js';
import Icon from './icon.js';
import BaseFormsyComponent from './mixins/component.js';
import cx from 'classnames';
import firebase from 'firebase';

class ImageUpload extends BaseFormsyComponent {

    constructor (props) {
        super(props);

        this.changeValue = this.changeValue.bind(this);
    }

    uploadFile() {
        this.setState({
            uploadInProgress: true
        });

        const { file } = this.state;
        // const name = file.name;
        const name = (new Date()) + '-' + file.name;
        const metadata = { contentType: file.type };
        const ref = firebase.storage().ref();
        const task = ref.child(name).put(file, metadata);

        task.then((snapshot) => {
            // console.log(snapshot);
            const url = snapshot.ref.getDownloadURL();
            // console.log(url)
            return url;
        }).then((url) => {
            this.props.setValue(url);
            console.log(url)
        }).catch((err) => {
            console.log(err);
        })

        // upload(this.state.file, this.props.isAuthenticated, (progress) => {
        //     this.setState({
        //         uploadProgress: progress
        //     });
        // }).then((xhrResponse) => {
        //     const response = xhrResponse.data;
        //     if (response.success) {
        //         this.setState({
        //             path: response.path,
        //             uploadInProgress: false,
        //             uploadProgress: null,
        //         }, () => {
        //             this.props.onUpload && this.props.onUpload(this.state.path);
        //         });
        //     }
        // }).catch((res) => {
        //     Alert.error(res.data.message || 'Failed to upload image.');
        //     this.setState({
        //         uploadError: true,
        //         uploadInProgress: false,
        //         uploadProgress: null,
        //         imagePreviewUrl: null,
        //         file: null,
        //     });
        // });
    }

    changeValue(e) {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: null
            });
            this.uploadFile();
        };

        reader.readAsDataURL(file);
    }

    renderElement () {
        const classNames = cx('checkbox', {
            'has-error': this.showErrors()
        })
        const acceptedFileTypes = 'image/jpeg,image/jpg,image/png';
        return (
            <div className={classNames}>
                <label className={this.props.labelClassName}>
                    <input
                        type="file"
                        name="file"
                        className="-input"
                        ref="fileInput"
                        onChange={this.changeValue}
                        accept={acceptedFileTypes}
                    />{this.props.children || this.props.label}
                </label>
            </div>
        );
    }

    render () {

        var element = this.renderElement();

        if (this.getLayout() === 'elementOnly') {
            return element;
        }

        return (
            <Row
                {...this.getRowProperties()}
                label={this.props.rowLabel}
                htmlFor={this.getId()}
                layout="elementOnly"
            >
                {element}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
};

ImageUpload.defaultProps = {
    label: '',
    rowLabel: '',
    value: false
};


export default withFormsy(ImageUpload);
