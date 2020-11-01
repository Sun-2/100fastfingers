import { Message } from "@100ff/shared";

export const REQUEST_SUBMIT_CHALLENGE = "REQUEST_SUBMIT_CHALLENGE";
export interface RequestSubmitChallenge
  extends Message<typeof REQUEST_SUBMIT_CHALLENGE> {
  type: typeof REQUEST_SUBMIT_CHALLENGE;
  wpm: number;
}
