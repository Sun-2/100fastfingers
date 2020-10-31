import { Message } from "./Message";

export const AntiCheatRequestType = "ANTICHEAT-REQUEST";

export interface AntiCheatRequest extends Message {
  type: typeof AntiCheatRequestType;
  cookie: string;
}
