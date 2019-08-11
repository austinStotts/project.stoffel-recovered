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
  Icon,
  Table
} from "semantic-ui-react";
const headers = {
  "Content-type": "multipart/form-data"
};

class Step4 extends Component {
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
          <StepLabel highlight={'rgb(88, 211, 141)'}>{'step 4'}</StepLabel>
          <StepLabel >{'done'}</StepLabel>
        </Container>
        <br />
        <List ordered size="big">
          <List.Item>
            Go to 
            <a href="http://www.facebook.com"> facebook.com</a>
          </List.Item>
          <List.Item>
            Log out, and log back into your facebook account to finish setting everything up
          </List.Item>
          <List.Item>
            Once you are done click finish
          </List.Item>
        </List>
        <br/>
        <Button color="green" onClick={() => this.props.focus(5)}>Finish</Button>
        <br />
      </Container>
    );
  }
}

export default Step4;
