import { Message } from "./Message";

export const AntiCheatRequestType = "ANTICHEAT-REQUEST";

export interface AntiCheatRequest extends Message<typeof AntiCheatRequestType> {
  type: typeof AntiCheatRequestType;
  cookie: string;
}
