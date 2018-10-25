import React from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';

// import LogoSvg from '../../../assets/images/logo-icon.svg';

const Logo = (props) => {
    return (
        <Link to="/" className="logo">
            <ReactSVG path={LogoSvg} />
        </Link>
    );
};

export default Logo;
