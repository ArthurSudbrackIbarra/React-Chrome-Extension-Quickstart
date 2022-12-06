import { useEffect, useState } from "react";
import { ParentWindow } from "../../messaging/ParentWindow";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  /*
    Instantiate a new Parent object.
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
      <h1>My React Extension</h1>
      <button
        onClick={() => {
          parentWindow.sendMessage({
            type: "HELLO_REQUEST",
            content: {
              message: "Hello, parent!",
            },
          });
        }}
      >
        Say Hello to Parent Window
      </button>
      <p>Message received from parent: {message}</p>
    </div>
  );
}

export default App;
