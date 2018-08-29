import React from 'react';
import ReactDom from 'react-dom';
import MessageContext, { MessageManager } from 'shell/ctx/MessageContext';
import MViewer from 'shell/MessageBar/MessageBar';
import ShellComponent from 'shell/Component/Component';
import './window.css';

class Window extends ShellComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: 'window 1',
            popout: false,
            messageCtx: new MessageManager()
        };

        if (props.name) this.state.name = props.name;

        this.containerElement = null;
        this.externalWindow = null;

        //Note: best to 'unsubscribe' when window is unmounted...
        this.state.messageCtx.OnNewMessageEvent.Subscribe(() => this.setState(this.state));
        this.state.messageCtx.OnMessageRemovedEvent.Subscribe(() => this.setState(this.state));
    }

    closeWindow() {
        var nextstate = { ...this.state, closed: true };
        this.setState(nextstate);
        console.log("Window should be closed. (basically means that a parent should remove it from the render tree.");
    }

    togglePopup() {
        this.setState({ ...this.state, popout: !this.state.popout });
    }

    render() {

        var content = <section className="shell-window">
            <MessageContext.Provider value={this.state.messageCtx}>
                <header>
                    <span>{this.state.name}</span>
                    <div className="toolbar">
                        <span role="button" className="undock" onClick={this.togglePopup.bind(this)}>(un)dock</span>
                        <MessageContext.Consumer>
                            {value => <span className="pendingMessages">{value.messages.length}</span>}
                        </MessageContext.Consumer>
                        <button onClick={this.closeWindow.bind(this)}>X</button>
                    </div>
                    <div className="messages">
                        <MViewer />
                    </div>
                </header>
                <main>
                    {this.props.children}
                </main>
            </MessageContext.Provider>
        </section>;

        if (this.state.popout) {
            if (this.containerElement === null)
                this.containerElement = document.createElement('div');
            if (this.externalWindow === null) {
                this.externalWindow = window.open('', '', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,width=600,height=250,left=200,top=200');
                this.externalWindow.onbeforeunload = () => { this.setState({ ...this.state, popout: false }) };
                this.externalWindow.document.title = this.props.name;
                this.copyStyles(window.document, this.externalWindow.document);
            }
            this.externalWindow.document.body.appendChild(this.containerElement);
            return ReactDom.createPortal(content, this.containerElement);
        }
        else {
            if (this.containerElement !== null) this.containerElement = null;
            if (this.externalWindow !== null) {
                this.externalWindow.close();
                this.externalWindow = null;
            }
            return content;
        }
    }

    copyStyles(sourceDoc, targetDoc) {
        Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
            if (styleSheet.cssRules) { // for <style> elements
                const newStyleEl = sourceDoc.createElement('style');
    
                Array.from(styleSheet.cssRules).forEach(cssRule => {
                    // write the text of each rule into the body of the style element
                    newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
                });
    
                targetDoc.head.appendChild(newStyleEl);
            } else if (styleSheet.href) { // for <link> elements loading CSS from a URL
                const newLinkEl = sourceDoc.createElement('link');
    
                newLinkEl.rel = 'stylesheet';
                newLinkEl.href = styleSheet.href;
                targetDoc.head.appendChild(newLinkEl);
            }
        });
    }
}

export default Window;