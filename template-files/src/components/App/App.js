"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ParentWindow_1 = require("../../messaging/ParentWindow");
require("./App.css");
function App() {
    var _a = (0, react_1.useState)(""), message = _a[0], setMessage = _a[1];
    /*
      Instantiate a new ParentWindow object.
      This object will be used to send and receive messages from the parent window.
    */
    var parentWindow = new ParentWindow_1.ParentWindow();
    (0, react_1.useEffect)(function () {
        /*
          Register a callback function that will be called
          when a message is received from the parent window.
        */
        parentWindow.onMessage(function (message) {
            console.log("Message received from parent window: ", message);
            /*
              Handle the message based on its type.
              Each message type should be handled in a different case.
      
              Create new message types in the messaging/messageTypes.ts file.
            */
            switch (message.type) {
                case "HELLO_RESPONSE":
                    setMessage(message.content.message);
                    break;
            }
        });
    }, []);
    return (<div className="App">
      <h1>My React Extension</h1>
      <button onClick={function () {
            parentWindow.sendMessage({
                type: "HELLO_REQUEST",
                content: {
                    message: "Hello, parent!",
                },
            });
        }}>
        Say Hello to Parent Window
      </button>
      <p>Message received from parent: {message}</p>
    </div>);
}
exports.default = App;
