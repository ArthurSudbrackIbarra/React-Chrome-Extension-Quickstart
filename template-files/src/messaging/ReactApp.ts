import { Message } from "./messageTypes";
import { ConnectionInterface } from "./ConnectionInterface";
import { BaseConnection } from "./BaseConnection";

/*
  ConnectionInterface implementation to communicate with
  the child iframe containing the React App.
*/
export class ReactApp extends BaseConnection implements ConnectionInterface {
  private child: HTMLIFrameElement | null = null;

  constructor(child: HTMLIFrameElement | null) {
    super();
    this.child = child;
  }

  /*
    Sends a message to an iframe element.
    The injected iframe is listening and will receive the message.
  */
  public sendMessage(message: Message): void {
    if (!this.child) {
      return;
    }
    if (!this.child.contentWindow) {
      return;
    }
    this.child.contentWindow.postMessage(message, "*");
  }
}
