import { Message } from "./messageTypes";

/*
  Connection interface has 2 implementations,
  one for the child iframe and one for the parent window.
*/
export interface ConnectionInterface {
  onMessage: (_onMessage: ((message: Message) => void) | null) => void;
  sendMessage: (message: Message) => void;
}
