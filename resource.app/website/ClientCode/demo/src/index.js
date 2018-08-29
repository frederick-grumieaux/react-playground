import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import MenuBar from './shell/MenuBar/menubar.js';
import MessageBar from 'shell/MessageBar/MessageBar';
import MessageCtx, { MessageManager } from 'shell/ctx/MessageContext';
import MessageAdder from 'comp/MessageAdder/MessageAdder';
import Window from 'shell/Window/window';
import ShellComponent from 'shell/Component/Component';

class App extends ShellComponent {

    constructor(props) {
        super(props);

        this.messages = [];
        this.messages.push({ text: "Failed to load stuff.", severity: 'warning' });

        this.state = {};
        this.state.Mctx = new MessageManager();
        this.state.showMessageBar = true;
        console.log("The child message context = ", this.state.Mctx);
        console.log("By the way these are the default props: ", this.props);
    }

    toggleShowMessageBar() {
        var n = { ...this.state, showMessageBar: !this.state.showMessageBar };
        this.setState(n);
    }

    render() {
        var mbar = <MessageBar />;
        if (!this.state.showMessageBar)
            mbar = null
        return (
            <div>
                <MenuBar />
                <MessageBar/>
                <span onClick={this.toggleShowMessageBar.bind(this)}>Above you find ..the default message provider.</span>
                {this.state.showMessageBar?<MessageAdder />:null}
                <main>
                    <h1>The actual content</h1>
                    <p>some text in a paragraph</p>
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                    </ul>

                    <div>
                        <h1>This is an independent message provider</h1>
                        <MessageCtx.Provider value={this.state.Mctx}>
                            <MessageBar />
                            {0 ? <MessageAdder /> : null}
                        </MessageCtx.Provider>
                    </div>

                    <Window name="my window">
                        <h1>Title</h1>
                        <p>Hello world <br />nextr line</p>
                        <p>Second paragraph</p>
                        <h2>sub title</h2>
                        {1 ? null : <MessageAdder /> }
                        {1 ? null : <MessageAdder /> }
                        {1 ? null : <MessageAdder /> }
                        {1 ? null : <MessageAdder />}
                        <p>and some more text</p>
                    </Window>
                </main>
                <footer>
                    This is the end of the page.
                </footer>
            </div>
        )
    }
}


ReactDom.render(<App />, window.document.getElementById('root'));