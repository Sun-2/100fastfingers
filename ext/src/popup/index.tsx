import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Box,
  CssBaseline,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import styled, { createGlobalStyle, css } from "styled-components";

/* Yes, adding React for this is an overkill. I know. */

const App = () => {
  const [desiredWpm, setDesiredWpm] = useState(50);
  const [cheatEnabled, setCheatEnabled] = useState(true);

  const disableCheat = (e) => setCheatEnabled(e.target.checked);

  const onChange = (e) => {
    setDesiredWpm(e.target.value);
  };

  return (
    <Wrapper>
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
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 500px;
  padding: 24px;
  border: 2px dashed lightgray;
  margin: 16px;
`;

const GlobalStyles = createGlobalStyle`${css``}`;

const root = document.getElementById("root");

const Root = () => (
  <>
    <GlobalStyles />
    <CssBaseline />
    <App />
  </>
);

ReactDOM.render(<Root />, root);
