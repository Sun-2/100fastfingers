import React, { useState } from "react";
import { RequestSubmitChallenge } from "../../const";
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import { sendMessage } from "../../utils/sendMessage";

export const NormalView = () => {
  const [wpm, setWpm] = useState(80);
  const onWpmChange = (e) => setWpm(e.target.value);

  const [progress, setProgress] = useState(0);

  const onSubmitTest = async () => {
    const msg: RequestSubmitChallenge = {
      type: "REQUEST_SUBMIT_CHALLENGE",
      wpm,
    };
    const response = await sendMessage(msg, "content");
    console.log(`Tabs response:`, response);

    let lastFrame;
    const increaseProgress = (progress: number) => (time: number) => {
      const minute = 60 * 1000;
      const thisFrame = !lastFrame ? 16 : time - lastFrame;
      console.log(thisFrame);
      const nextProgress = Math.min(progress + thisFrame / minute, 100);
      setProgress(nextProgress * 100);
      lastFrame = time;
      if (nextProgress === 100) {
        setProgress(0);
      } else requestAnimationFrame(increaseProgress(nextProgress));
    };

    increaseProgress(0)(16);
  };

  console.log("prog", progress);
  const isSubmitDisabled = progress !== 0;

  return (
    <Box display>
      <Box pb={2}>
        <Typography gutterBottom variant="body2" align="center">
          This will act as if you completed a test with the chosen WPM.
        </Typography>
        <Typography variant="body2" align="center">
          Mind that{" "}
          <Typography variant="body2" display="inline" color="secondary">
            the desired WPM is an approximation
          </Typography>
          , and the number saved by
          <Typography variant="body2" display="inline" color="primary">
            {" "}
            10fastfingers.com{" "}
          </Typography>
          might be{" "}
          <Typography variant="body2" display="inline" color="secondary">
            20-30 higher
          </Typography>{" "}
          on occasion.
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        border={"1px dashed lightgray"}
        p={2}
      >
        <Box p={1} pb={2}>
          {" "}
          <STextField
            type="number"
            label="Desired WPM"
            onChange={onWpmChange}
            value={wpm}
          />
        </Box>
        <Button
          disabled={isSubmitDisabled}
          onClick={onSubmitTest}
          variant="contained"
          color="primary"
        >
          Submit fake test
        </Button>
      </Box>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

const STextField = styled(TextField)`
  text-align: center;
  width: 160px;

  && input {
    text-align: center;
  }
`;
