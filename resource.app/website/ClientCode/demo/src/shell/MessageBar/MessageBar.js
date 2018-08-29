import React from 'react';
import MessageContext from 'shell/ctx/MessageContext.js';
import { BindEventToComponent } from 'shell/Event'; 
//import TypeWrapper from 'shell/ctx/ContextInjector.js';
import './MessageBar.css';

console.log("This is the message context object:", MessageContext);
class MessageBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentMessage: this.getMessage() };

        BindEventToComponent('props.MessageManager.OnMessageRemovedEvent', this, this.OnMessageRemoved.bind(this));
        BindEventToComponent('props.MessageManager.OnNewMessageEvent', this, this.OnNewMessage.bind(this));
    };

    getMessage() {
        var message = null;
        if (this.props.MessageManager && this.props.MessageManager.messages) {
            message = this.props.MessageManager.messages[0];
        }

        if (!this.state || this.state.currentMessage !== message) {
            var newState = { ...this.state, currentMessage: message };
            this.setState(newState);
        }
        return message;
    }

    OnNewMessage() {
        if (!this.state.currentMessage) {
            this.getMessage();
        }
    }

    OnMessageRemoved(evt) {
        if (this.state.currentMessage === evt.data) {
            this.getMessage();
        }
    }

    componentWillMount() {
        //this.getMessage();
        //if (this.props.MessageManager) {
        //    this.props.MessageManager.OnMessageRemovedEvent.Subscribe(this.OnMessageRemoved.bind(this));
        //    this.props.MessageManager.OnNewMessageEvent.Subscribe(this.OnNewMessage.bind(this));
        //}
    }

    componentWillReceiveProps(nextProps) {
        console.log("This is the acutal componentWillReceiveProps life cycle hook for MessageBar");

        //if (!!this.props.MessageManager) {
        //    if (this.props.MessageManager !== nextProps.MessageManager) {
        //        this.props.MessageManager.OnMessageRemoved.Release(this.OnMessageRemoved);
        //        this.props.MessageManager.OnNewMessage.Release(this.OnNewMessage);
        //
        //        if (nextProps.MessageManager) {
        //            this.props.MessageManager.OnMessageRemovedEvent.Subscribe(this.OnMessageRemoved.bind(this));
        //            this.props.MessageManager.OnNewMessageEvent.Subscribe(this.OnNewMessage.bind(this));
        //        }
        //    }
        //}
    }

    componentWillUnmount() {
        console.log("This is the actual unmount code from component: message bar");

        //if (this.props.MessageManager) {
        //    this.props.MessageManager.OnMessageRemovedEvent.Release(this.OnMessageRemoved);
        //    this.props.MessageManager.OnNewMessageEvent.Release(this.OnNewMessage);
        //}
    }

    CloseMessage() {
        console.info("Closing the current message.", this.state.currentMessage);
         
        var message = this.state.currentMessage;
        var messageManager = this.props.MessageManager;
        
        if (message && messageManager) {
            messageManager.Remove(message);
        }

        this.getMessage();
    };

    render() {
        var message = this.state.currentMessage;
        debugger;
        if(!message)
        //If there are no messages: render an empty div.
        //if (!this.state.currentMessage)
            return <div className="app-shell-comp-messagebar empty">emptyyyyyy</div>;

        //var message = this.state.currentMessage.text;
        return <div className="app-shell-comp-messagebar">
            <span className="theMessage left">{message.text}</span>
            <span className="right" onClick={this.CloseMessage.bind(this)}>x</span>
        </div>;

    }
}
function Wrapper(props) {
        return <MessageContext.Consumer>
    {manager => <MessageBar MessageManager={manager} {...props} />}
</MessageContext.Consumer>;
}

export default Wrapper;