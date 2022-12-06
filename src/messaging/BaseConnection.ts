import { Message } from "./messageTypes";

/*
  Class with definitions that are common
  to both the parent window and the child iframe.
*/
export class BaseConnection {
  private _onMessage: ((message: Message) => void) | null;
  private _windowMessageListener: ((event: MessageEvent) => void) | null;

  constructor() {
    this._onMessage = null;
    this._windowMessageListener = null;
  }

  /*
    Sets the onMessage callback.
    The callback will be called when a message is received.
  */
  public onMessage(_onMessage: ((message: Message) => void) | null): void {
    this._onMessage = _onMessage;
    if (this._windowMessageListener) {
      window.removeEventListener("message", this._windowMessageListener);
    }
    if (!_onMessage) {
      return;
    }
    this._windowMessageListener = (event: MessageEvent) => {
      if (this._onMessage) {
        this._onMessage(event.data as Message);
      }
    };
    window.addEventListener("message", this._windowMessageListener);
  }
}
