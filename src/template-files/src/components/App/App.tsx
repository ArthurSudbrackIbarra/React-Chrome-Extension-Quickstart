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
  });
  return (
    <div className="App">
      <h2 className="title">::EXTENSION_NAME=My React Extension::</h2>
      <p>This is your React extension! Here are some tips:</p>
      <h3 className="topic">Messaging</h3>
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
      {message && (
        <p>Received a message from the parent window: <strong>{message}</strong></p>
      )}
      <h3 className="topic">Toggle Extension On/Off</h3>
      <p>
        Toggle the extension on/off by pressing the
        <span className="key">::TOGGLE_EXTENSION_KEYBIND=Alt::</span> key.
      </p>
      <h3 className="topic">Be Creative!</h3>
      <p>
        Be creative and build your extension just like a normal React app, with
        the benefits of TypeScript and all the React ecosystem!
      </p>

      <p>adipiscing reprehenderit irure nulla culpa reprehenderit cupidatat dolore cillum nulla elit quis commodo nulla tempor aliquip quis. laborum labore sunt sint velit lorem magna reprehenderit cupidatat ex sunt enim irure velit et sit veniam. amet lorem reprehenderit nostrud ipsum ad sed ex non sit velit est commodo in consequat irure do dolore qui. ea labore labore enim enim cupidatat non magna non labore quis labore sit officia voluptate ipsum exercitation cillum. in sit incididunt laboris enim mollit aliqua anim exercitation ad tempor eu minim adipiscing amet veniam.</p>
      <p>velit incididunt elit reprehenderit culpa occaecat sunt voluptate dolore nulla reprehenderit ea enim sed in commodo ea voluptate occaecat. ipsum nulla voluptate ullamco elit aute eu laboris pariatur eu et labore officia veniam voluptate nulla. id eiusmod qui qui in adipiscing eu pariatur dolore exercitation reprehenderit deserunt sunt sed enim ullamco nisi mollit culpa. sed officia aliquip deserunt laborum amet nulla sit voluptate qui pariatur irure incididunt minim officia tempor enim ullamco occaecat. lorem in nulla Excepteur aliquip fugiat Duis anim do consectetur dolore sit reprehenderit exercitation cillum et. minim aliquip aliqua Duis nulla commodo est laborum consequat reprehenderit in magna ea magna irure proident.
        qui dolor Excepteur culpa mollit sit commodo ut occaecat nulla ullamco minim qui eu id incididunt veniam officia. esse incididunt ullamco amet deserunt eiusmod sed nulla sed enim nostrud laboris Excepteur dolor officia pariatur adipiscing dolor amet. ut mollit pariatur aliquip ad ad lorem cupidatat laborum tempor exercitation elit culpa commodo sed ipsum. occaecat cupidatat ut dolor dolore incididunt deserunt veniam fugiat magna sed culpa ad mollit Excepteur occaecat. amet fugiat proident commodo consequat culpa laboris Duis aliqua cillum ad irure exercitation consectetur amet quis laboris voluptate. sit ex nisi labore ut id ullamco Duis in do incididunt eu ad eu sunt ea ipsum amet sint.
        Duis anim eiusmod et labore aliquip fugiat veniam sit nisi occaecat reprehenderit reprehenderit sit sit nisi sed. eu magna dolor commodo cillum id elit aliqua ipsum in Duis ex nulla anim lorem proident. qui nostrud id ea consectetur non amet aute et dolor laboris elit laborum lorem sed laborum qui. dolore exercitation eiusmod ipsum culpa nulla reprehenderit deserunt consectetur anim et commodo commodo deserunt adipiscing laboris. laborum ad magna adipiscing reprehenderit ea culpa eiusmod irure ipsum consectetur adipiscing Duis officia commodo aliquip. id voluptate ea laboris do ullamco consectetur eiusmod eu ea dolor nulla cillum nisi non occaecat ullamco proident tempor. mollit ad velit Excepteur eiusmod culpa commodo do sunt consequat reprehenderit nulla quis enim ipsum non dolore qui aliqua.</p>
    </div>
  );
}

export default App;
