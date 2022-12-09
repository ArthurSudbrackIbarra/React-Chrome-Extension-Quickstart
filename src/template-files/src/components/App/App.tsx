import { useEffect, useState } from "react";
import { ParentWindow } from "../../messaging/ParentWindow";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  /*
    Instantiate a new ParentWindow object.
    This object will be used to send and receive messages from the parent window.
  */
  const parentWindow = new ParentWindow();
  useEffect(() => {
    /*
      Register a callback function that will be called
      when a message is received from the parent window.
    */
    parentWindow.onMessage((message) => {
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
  return (
    <div className="App">
      <h2 className="title">::EXTENSION_NAME=My React Extension::</h2>
      <p>This is your React extension! Here are some tips:</p>
      <h3>Messaging</h3>
      <p>
        Trade messages with the parent window by using the ParentWindow class,
        try it!
      </p>
      <button
        onClick={() => {
          parentWindow.sendMessage({
            type: "HELLO_REQUEST",
            content: {
              message: "Hello, parent!",
            },
          });
        }}
        style={{ margin: "0.5rem 0" }}
      >
        Say Hello to the Parent Window
      </button>
      <p>Message received from parent: {message}</p>
      <h3>Toggle Extension On/Off</h3>
      <p>
        Toggle the extension on/off by pressing the
        ::TOGGLE_EXTENSION_KEYBIND=Alt:: key.
      </p>
      <h3>Be Creative!</h3>
      <p>
        Be creative and build your extension just like a normal React app, with
        the benefits of TypeScript and all the React ecosystem!
      </p>
    </div>
  );
}

export default App;
