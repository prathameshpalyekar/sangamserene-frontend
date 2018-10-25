import React, { Component } from 'react';
import WhiteboardTitle from './WhiteboardTitle.jsx'
import WhiteboardSubTitle from './WhiteboardSubTitle.jsx'
import WhiteboardStubs from './WhiteboardStubs.jsx'
import WhiteboardSection from './WhiteboardSection.jsx'
import WhiteboardSectionTitle from './WhiteboardSectionTitle.jsx'
import WhiteboardHeader from './WhiteboardHeader.jsx'
import WhiteboardPull from './WhiteboardPull.jsx'

import './Whiteboard.less';

class Whiteboard extends Component {

    render() {
        return (
            <section className="whiteboard clearfix">
                {this.props.children}
            </section>
        );
    }
}

Whiteboard.Title = WhiteboardTitle;
Whiteboard.SubTitle = WhiteboardSubTitle;
Whiteboard.Pull = WhiteboardPull;
Whiteboard.Stubs = WhiteboardStubs;
Whiteboard.Section = WhiteboardSection;
Whiteboard.SectionTitle = WhiteboardSectionTitle;
Whiteboard.Header = WhiteboardHeader;

export default Whiteboard;
