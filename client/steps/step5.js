import React, { Component } from "react";
import axios from "axios";
import StepLabel from '../stepLabel';
import {
  Button,
  Container,
  Form,
  Header,
  List,
  Input,
  Dropdown,
  Label,
  Icon
} from "semantic-ui-react";
const headers = {
  "Content-type": "multipart/form-data"
};

class Step5 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <br />
        <Header as="h1">
          Facebook Ad Rental <Icon name="facebook" />
        </Header>
        <br />
        <Container>
          <StepLabel color={'rgb(88, 211, 141)'}>{'step 1'}</StepLabel>
          <StepLabel color={'rgb(88, 211, 141)'}>{'step 2'}</StepLabel>
          <StepLabel color={'rgb(88, 211, 141)'}>{'step 3'}</StepLabel>
          <StepLabel color={'rgb(88, 211, 141)'}>{'step 4'}</StepLabel>
          <StepLabel highlight={'rgb(88, 211, 141)'}>{'done'}</StepLabel>
        </Container>
        <Header as="h3" color="green">
          Congratulations, you're all finished!
        </Header>
        <br />
        <Header as="h3" color="green">
          Please stay in contact with your Refferer to get paid!
        </Header>
        <br />
      </Container>
    );
  }
}

export default Step5;
