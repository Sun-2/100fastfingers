import React, {useEffect, useLayoutEffect, useState} from "react";
import ReactDOM from "react-dom";
import {Box, CssBaseline, Paper, Tab, Tabs,} from "@material-ui/core";
import styled, {createGlobalStyle, css} from "styled-components";
// @ts-ignore
import typingGif from "./assets/typing.gif";
import {NormalView} from "./Normal";

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