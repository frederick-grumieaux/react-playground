//import React from 'react';

//function injector(name, value, props) {
//    var newprops = { ...props };
//    newprops[name] = value;
//    return newprops;
//}


////function Wrapper(props) {
////        return <MessageContext.Consumer>
////    {manager => <MessageBar MessageManager={manager} {...props} />}
////</MessageContext.Consumer>;
////}





//class TypeWrapper {
//    constructor(Type) {
//        this.Type = Type;
//    }
//    WithContextInjection(Context, Name) {
//        var magic = new TypeWrapper(this.AsExportable());
//        magic.Context = Context;
//        magic.Name = Name;

//        return magic;
//    }

//    AsExportable() {
//        var captured = this;
//        return function HigherOrderComponent(props) {            
//            var Context = captured.Context;
//            if (!Context) //We have arrived at the actual type that was wrapped.
//                return React.createElement(captured.Type(), props);
//            else //There are more wrappers available
//                return <Context.Consumer> 
//                    {value => React.createElement(captured.Type(props), { ...injector(captured.Name, value, props)})}
//            </Context.Consumer>;
//        }
//    }
//}
//export default TypeWrapper;