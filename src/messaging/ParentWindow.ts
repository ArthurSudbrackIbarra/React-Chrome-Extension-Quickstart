import { Message } from "./messageTypes";
import { ConnectionInterface } from "./ConnectionInterface";
import { BaseConnection } from "./BaseConnection";

/*
  ConnectionInterface implementation to
  communicate with the parent window.
*/
export class ParentWindow
  extends BaseConnection
  implements ConnectionInterface
{
  constructor() {
    super();
  }

  /*
    Sends a message to the parent window.
    The parent window is listening and will receive the message.
  */
  public sendMessage(message: Message): void {
    if (!window.parent) {
      return;
    }
    window.parent.postMessage(message, "*");
  }
}
