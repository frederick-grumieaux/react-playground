import React from 'react';

import('./menubar.css');

class Menubar extends React.Component {

    centerContent(content) {
        return (<div className="center-outter-box">
            <div className="center-inner-box">{content}</div>
        </div>);
    }

    render() {
        return (<header className="app-shell-comp-menubar">

            <ul className="left">
                <li>{this.centerContent("Home")}</li>
            </ul>
            <ul className="right">
                <li>{this.centerContent("Settings")}</li>
                <li>{this.centerContent("About")}</li>
                <li>{this.centerContent("Messages")}</li>
            </ul>

        </header>
        );
    }
};

export default Menubar;