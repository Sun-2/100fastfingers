import React, { CSSProperties, FC, useState } from "react";
import ReactDOM from "react-dom";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControlLabel,
  LinearProgress,
  Paper,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import styled, { createGlobalStyle, css } from "styled-components";
// @ts-ignore
import typingGif from "./assets/typing.gif";
import { RequestSubmitChallenge } from "../const";
import { sleep } from "@100ff/shared";

/* Yes, adding React for this is an overkill. I know. */

const App = () => {
  const [tab, setTab] = useState(0);
  const onTabChange = (_, nextTab) => setTab(nextTab);

  return (
    <Box width="500px">
      <img width="100%" src={typingGif} alt="" />
      <Paper square>
        <Tabs
          centered
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          value={tab}
          onChange={onTabChange}
        >
          <Tab label="Normal" />
          <Tab label="Anti-Cheat" />
        </Tabs>
      </Paper>
      <Wrapper>{tab === 0 ? <NormalView /> : null}</Wrapper>
    </Box>
  );
};

const NormalView = () => {
  const [wpm, setWpm] = useState(80);
  const onWpmChange = (e) => setWpm(e.target.value);

  const [progress, setProgress] = useState(0);

  const onSubmitTest = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs.length) return console.log("No tabs found");

      const msg: RequestSubmitChallenge = {
        type: "REQUEST_SUBMIT_CHALLENGE",
        wpm,
      };
      chrome.tabs.sendMessage(tabs[0].id!, msg, function (response) {
        console.log(`Tabs response:`, response);
      });
    });

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

const Wrapper = styled.main`
  padding: 24px;
  border: 2px dashed lightgray;
  margin: 16px;
`;

const GlobalStyles = createGlobalStyle`${css`
  img {
    display: block;
  }
`}`;

const root = document.getElementById("root");

const Root = () => (
  <>
    <GlobalStyles />
    <CssBaseline />
    <App />
  </>
);

ReactDOM.render(<Root />, root);