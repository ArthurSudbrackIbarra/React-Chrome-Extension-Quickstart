/*
  Messages that will be transferred between
  the child iframe and the parent window.
*/

/*
  MessageTitle type is used to identify the message.
*/
type MessageType = "HELLO_REQUEST" | "HELLO_RESPONSE";

/*
  Generic message interface.
*/
export interface Message {
  type: MessageType;
  content?: any;
}

/*
  Specific message interfaces.
  Add more as needed by extending the Message interface.
*/
export interface HelloRequestMessage extends Message {
  type: "HELLO_REQUEST";
  content: {
    message: string;
  };
}
export interface HelloResponseMessage extends Message {
  type: "HELLO_RESPONSE";
  content: {
    message: string;
  };
}
