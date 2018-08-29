export default class Event {
    constructor(name) {
        this.name = name;
        this.subscribers = [];
    }
    Raise(source, evt) {
        for (var idx = 0; idx < this.subscribers.length; idx++) {
            var callback = this.subscribers[idx];
            var obj = { source: source, name: this.name, data: evt };
            callback(obj);
        }
    }
    Subscribe(callback) {
        this.subscribers.push(callback);
    }
    Release(callback) {
        var idx = this.subscribers.indexOf(callback);
        if (idx > 0) this.subscribers.splice(idx, 1);
    }


};

var BindEventToComponent = function (event, component, handler) {
    if (!event) return;
    if (!component) return;
    if (!handler) return;

    console.log("Fyi; binding event", event, "to component:", component, "with handler:", handler);

    function getActualEvent(comp) {
        if (typeof (event) !== 'string')
            return event;
        var pointer = comp;
        for (var item of event.split('.')) {
            if (pointer) {
                pointer = pointer[item];
            }
        }
        return pointer;
    }

    var actualEvent = getActualEvent(component);
    console.log("Retrieved actual event:", actualEvent);
    if (actualEvent)
        actualEvent.Subscribe(handler);

    var newprophandler = component.componentWillReceiveProps;
    component.componentWillReceiveProps = function (newProps) {
        console.log("Note -> component will receive new props. The component:", component, "new props:", newProps);
        var oldEvent = getActualEvent(component);
        console.log("'-> the old event:", oldEvent);
        var newEvent = getActualEvent({ ...component, props: newProps });
        console.log("'-> the new event:", newEvent);
        if (oldEvent !== newEvent) {
            console.log("'-> change detected: releasing old and binding new.");
            if (oldEvent) oldEvent.Release(handler);
            if (newEvent) newEvent.Subscribe(handler);
        }
        if (newprophandler) {
            console.log("Call actual componentWillReceiveProps method.")
            newprophandler(...arguments);
        }
        else console.log('Note: component did not implement life cycle hook: componentWillReceiveProps');
    }

    var willUnMountHook = component.componentWillUnmount;
    component.componentWillUnmount = function () {
        console.log("Event 2 component binding -> intercept life cycle hook componentWillUnmount");
        var unmountEvent = getActualEvent(willUnMountHook);
        console.log("Releasing event:", unmountEvent);
        if (unmountEvent) unmountEvent.Release(handler);
        if (willUnMountHook) {
            console.log("Call actual componentWillUnmount method");
            willUnMountHook(...arguments);
        }
        else console.log("component did not implement life cycle hook: componentWillUnmount");
    }

};

export { Event, BindEventToComponent };