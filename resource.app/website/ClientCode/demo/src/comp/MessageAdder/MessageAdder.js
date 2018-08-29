import React from 'react';
import MessageContext from 'shell/ctx/MessageContext';
import ShellComponent from 'shell/Component/Component';

class MessageAdder extends ShellComponent {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };

        
        //throw "Failure in constructor";
    }

    addMessage() {
        if (this.props.MessageManager) {
            var nextstate = { ...this.state, counter: this.state.counter + 1 };
            this.setState(nextstate);
            var txt = "This is message " + this.state.counter;
            this.props.MessageManager.AddInfo(txt);
        }
    }

    render() {
        //if (Math.random() > 0.5) throw "Failure in render method";
        return <div className="Comp-MessageAdder">
            <p>Click this button to add a message to the message context service.</p>
            <button onClick={this.addMessage.bind(this)}>+ message</button>
            </div>
    }

}

function Wrapper(props) {
    return <MessageContext.Consumer>
        {manager => <MessageAdder MessageManager={manager} {...props} />}
    </MessageContext.Consumer>;
}

export default Wrapper;