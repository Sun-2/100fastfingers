import {Message} from "./Message";

export const REQUEST_SUBMIT_CHALLENGE = "REQUEST_SUBMIT_CHALLENGE";
export interface RequestSubmitChallenge  extends Message {
  type: typeof REQUEST_SUBMIT_CHALLENGE,
  wpm: number
}