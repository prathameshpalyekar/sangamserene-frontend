import React from 'react';

const DayPickerNavbar = (props) => {
    return (
        <div className="day-picker-navbar">
            <a href="" className="prev-month" onClick={(e) => {
                e.preventDefault();
                props.onPreviousClick()
            }}><i className="icon-angle-left"></i></a>
            <a href="" className="next-month" onClick={(e) => {
                e.preventDefault();
                props.onNextClick()
            }}><i className="icon-angle-right"></i></a>
        </div>
    );
};

export default DayPickerNavbar;
