import React from "react";
import {  Container, Header, Icon } from "semantic-ui-react";

const Error = (props) => {
  return (
    <Container>
        <br />
        <Header as="h1">
          Facebook Ad Rental <Icon name="facebook" />
        </Header>
        <Header as="h3">
          Sorry, your account does not meet our requirements.
        </Header>
    </Container>
  );
};

export default Error;