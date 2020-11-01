import React, { CSSProperties, FC, useState } from "react";
import ReactDOM from "react-dom";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControlLabel,
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

  const onSubmitTest = () => {
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
  };

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
        <Button onClick={onSubmitTest} variant="contained" color="primary">
          Submit fake test
        </Button>
      </Box>
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

/*

const a = <Button onClick={submitChallenge}>Send msg</Button>
<Box display="flex" justifyContent="center" pb={2}>
  <FormControlLabel
    control={
      <Switch
        checked={cheatEnabled}
        onChange={disableCheat}
        name="cheatEnabled"
        color="primary"
      />
    }
    label={
      <Box>
        Cheat{" "}
        <Box component="span" color={cheatEnabled ? "red" : "gray"}>
          {cheatEnabled ? "ENABLED!" : "disabled."}
        </Box>
      </Box>
    }
  />
</Box>
<Typography variant="subtitle2" align="center">
  All races you finish will have their
  <br /> WPM modified before the result is reported.
</Typography>
<Box py={2}>
  <Divider />
</Box>
<Typography gutterBottom>
  What is the desired WPM you'd like to achieve? Please mind that this
  number is an inaccurate approximation, and might be overshot by a fair
  amount.
</Typography>
<Box display="flex" justifyContent="center" pt={1}>
  <TextField
    label="Desired WPM"
    type="number"
    onChange={onChange}
    value={desiredWpm}
  />
</Box>
<Box py={2}>
  <Divider />
</Box>
<Box>
  <Typography align="center" variant="subtitle2">
    Mind that some errors might appear on the page.
  </Typography>
</Box>;*/
