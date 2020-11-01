import {Message} from "./Message";

export const OK = "OK";

export interface OkMessage extends Message{
  type: typeof OK
}