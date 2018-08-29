import React from 'react';
import './Component.css';

export default class Component extends React.Component {

    actualRenderMethod = null;

    constructor(props) {
        console.log("Creating component.");
        super(props);
        this.state = { ...this.state, failedRendering: false, renderErrorMessage: '', renderErrorInfo: null };
        this.actualRenderMethod = this.render;
        this.render = this.protectedRendering;
    }

    reset() {
        console.log("reset render error");
        this.setState({ ...this.state, failedRendering: false, renderErrorMessage: '', renderErrorInfo: null });
    }

    protectedRendering() {        
        var fallback = 'renderfailure';
        if (!this.state.failedRendering)
        {
            try {
                return this.actualRenderMethod();
            }
            catch (err) {
                fallback += " rootcause";
                console.error("Component failed to render:", err);
            }
        }

        return <div className={fallback} onClick={this.reset.bind(this)}>
            Render Error
                </div>
    }

    componentDidCatch(error, info) {
        console.log("Catched exception:", error, info);
        this.setState({ ...this.state, failedRendering: true, renderErrorMessage: error, renderErrorInfo: info });
    }
}