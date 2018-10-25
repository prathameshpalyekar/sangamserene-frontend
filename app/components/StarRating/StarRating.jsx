import React, { Component } from 'react';
import cx from 'classnames'

import "./StarRating.less"

export default class StarRating extends Component {

    render() {
        const { rate, displayValue } = this.props;
        const stars   = this.props.stars || 5;
        const rating  = parseFloat(this.props.rating);
        const rounded = Math.round(rating*2)/2;
        const ceil    = Math.ceil(rounded)

        const classNames = cx('star-rating', this.props.className, {
            '-rate': rate
        });

        if (rate) {
            const { ratingValue, saveValue } = this.props;
            // rates candidate
            return (
                <div className={classNames}>
                    {[,...Array(stars)].map((x, i) =>
                        <i className={ratingValue >= i ? 'icon-star' : 'icon-star -empty'}
                            key={i}
                            onClick={() => saveValue(i)}
                        ></i>
                    )}
                    <span className="-text">
                      {ratingValue || 0}/{stars}
                    </span>
                </div>
            );
        } else {
            // displays rating only
            return (
                <div className={"rating-component " + classNames}>
                    {[,...Array(stars)].map((x, i) =>
                        i <= ceil
                        ? i == ceil && i != rounded
                            ? <i className='glyphicon glyphicon-star half' key={i}></i>
                            : <i className='glyphicon glyphicon-star' key={i}></i>
                        : <i className='glyphicon glyphicon-star empty' key={i}></i>
                    )}
                    { displayValue === null ? null : <span className="-value">{displayValue || 0}</span>}
                </div>
            );
        }
    }
}
