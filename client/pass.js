import React from "react";
import { Button, Header, List, Container } from "semantic-ui-react";
import axios from "axios";

const handleEverything = () => {
  //axios to server /generate/profile
  //returns uuid
  //save to chrome.storage
  //install extension
  //maybe display instructions
};

const Pass = () => {
  return (
    <Container>
      <Header as="h3">Great! we've got you .zip file and you passed the tests. Now just a few more steps</Header>
      <List ordered size="big">
        <List.Item>Copy and paist <span className="chrome-style">chrome://extensions/</span> into a new tab to navigate to your extentions</List.Item>
        <List.Item>Enable Developer tools in top-right corner</List.Item>
        <List.Item>Select 'Load Unpacked' and select the .crx file that was downloaded.</List.Item>
        <List.Item>Turn on our cookie extension!</List.Item>
      </List>
      <br></br>
      <Header as="h3">One last thing...</Header>
      <List ordered size="big">
        <List.Item>Go back to <a target="_blank" href="https://facebook.com">facebook.com</a></List.Item>
        <List.Item>Logout and then Login again</List.Item>
        <List.Item>Click Continue to finish!</List.Item>
      </List>
      <Button color="green" onClick={() => {}}>Continue</Button>
    </Container>
  );
};

export default Pass;
