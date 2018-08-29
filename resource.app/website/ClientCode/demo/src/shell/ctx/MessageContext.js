import React from 'react';
import Event from 'shell/Event';


class MessageManager
{
    constructor()
    {
        this.messages = [];

        this.OnMessageRemovedEvent = new Event("OnMessageRemoved");
        this.OnNewMessageEvent = new Event("OnNewMessage");

        this.AddInfo("Ready for new messages...");
    }

    AddInfo(text)
    {
        return this.AddMessage(text, "info");
    }
    AddWarning(text)
    {
        return this.AddMessage(text, "warning");
    }
    AddError(text)
    {
        return this.AddMessage(text, "error");
    }

    Remove(msg)
    {
        var idx = this.messages.indexOf(msg);
        if (idx >= 0)
        {
            this.messages.splice(idx, 1);
            this.OnMessageRemovedEvent.Raise(this, msg);
        }
    }

    AddMessage(text, severity)
    {
        var msg = {
            text: text,
            severity: severity,
            timestamp: new Date(),
            isClosed: false,
            isSeen: false
        }

        this.messages.push(msg);
        this.OnNewMessageEvent.Raise(this, msg);

        return msg;
    }
}

const MessageContext = React.createContext(new MessageManager());

export default MessageContext;
export { MessageManager };
//var api = { Context: MessageContext, Manager: MessageManager };
