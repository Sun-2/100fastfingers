import React, { FC, useState } from "react";
import { Box, Button, ButtonGroup, Typography } from "@material-ui/core";
import { sendMessage } from "../../utils/sendMessage";
import {
  RecognizeAnswer,
  RecognizeRequest,
  TESS_SERVER_DEFAULT_HOST,
  TESS_SERVER_DEFAULT_PORT,
} from "@100ff/shared";
import recogImagePlaceholder from "../assets/recog-image-placeholder.jpeg";

export type AntiCheatChallengeViewProps = {};

const TESS_SERVER_HOST = TESS_SERVER_DEFAULT_HOST;
const TESS_SERVER_PORT = TESS_SERVER_DEFAULT_PORT;
export const AntiCheatChallengeView: FC<AntiCheatChallengeViewProps> = (
  props
) => {
  const { ...rest } = props;
  const [recognizedText, setRecognizedText] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  async function onRunAntiCheatClick() {
    console.log("requested image");
    const image = (await sendMessage(
      { type: "GET_ANTICHEAT_IMAGE" },
      "content"
    )) as string;
    setImageBase64(image);
    const recogRequestBody: RecognizeRequest = {
      image,
    };
    const recogAnswer: RecognizeAnswer = await fetch(
      `http://${TESS_SERVER_HOST}:${TESS_SERVER_PORT}/recognize`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(recogRequestBody),
      }
    ).then((resp) => resp.json());
    const prettyAnswer = recogAnswer.text.trim().replace(/\s+/g, " ");
    setRecognizedText(prettyAnswer);
  }

  const [response, setResponse] = useState("");
  async function onSubmitAntiCheat() {
    const respHtml = await fetch(
      "https://10fastfingers.com/anticheat/auswertung_anticheat",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,pl;q=0.8",
          "cache-control": "no-cache",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          pragma: "no-cache",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: "https://10fastfingers.com/anticheat/view/1/9",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `eingabe_string=${recognizedText}&backspace_counter=2`,
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    ).then((resp) => resp.text());
    setResponse(respHtml);
  }

  function onReset() {
    setRecognizedText("");
    setImageBase64("");
    setResponse("");
  }

  return (
    <div {...rest}>
      <Box>
        <ul>
          <li>
            <Typography variant="body2">
              Click the
              <Typography variant="body2" color="primary" component="span">
                {" "}
                RUN ANTICHEAT{" "}
              </Typography>
              button.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              The text-as-image meant to test you will appear underneath, as
              well as its extracted text that will be used as the answer.
            </Typography>
          </li>
          <li>
            If you're satisfied with it, press the
            <Typography variant="body2" color="primary" component="span">
              {" "}
              SUBMIT RECOGNIZED{" "}
            </Typography>
            button.
          </li>
          <li>
            <Typography variant="body2">
              If not, you may rerun the AntiCheat test as many times as you
              like.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Mind that completing the test too quickly{" "}
              <Typography variant="body2" color="error" component="span">
                will get you banned
              </Typography>
              .
            </Typography>
          </li>
        </ul>
      </Box>
      <Box border={"1px dashed lightgray"}>
        <img
          width={"100%"}
          src={
            imageBase64
              ? `data:image/jpeg;base64,${imageBase64}`
              : recogImagePlaceholder
          }
          alt="anticheat image"
        />
      </Box>
      <Box py={2}>
        <Typography align="center">
          {recognizedText || "Recognized text will appear here."}
        </Typography>
      </Box>
      <ButtonGroup variant="contained" color="primary" fullWidth>
        <Button onClick={onReset}>Reset</Button>
        <Button
          onClick={onRunAntiCheatClick}
          disabled={Boolean(recognizedText)}
        >
          Run AntiCheat
        </Button>
        <Button onClick={onSubmitAntiCheat} disabled={!recognizedText}>
          Submit recognized
        </Button>
      </ButtonGroup>
      <Box pt={2}>
        {response && <Box dangerouslySetInnerHTML={{ __html: response }} />}
      </Box>
    </div>
  );
};
