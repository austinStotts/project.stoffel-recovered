import React, { Component } from "react";
import Axios from "axios";
import { formValidator } from "../utilities/validation.js";
import StepLabel from "../stepLabel";
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
const sources = [
  {
    key: "Milko",
    text: "Milko",
    value: "Milko",
    image: { avatar: false }
  }
];

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      fbEmail: "",
      fbProfileURL: "",
      phoneNumber: "",
      referer: ""
    };

    this.validate = this.validate.bind(this);
    this.submit = this.submit.bind(this);
  }

  validate() {
    // if input is valid
    let validation = formValidator(this.state);
    console.log(validation);
    if (validation.result) {
      this.props.addResults({ email: this.state.fbEmail });
      this.submit();
    } else {
      if (validation.code === 1) {
        //todo invalid phone
      } else if (validation.code === 2) {
        //todo invalid URL
      } else if (validation.code === 3) {
        //todo invalid email
      } else if (validation.code === 4) {
        //todo invalid names
      }
    }
  }

  submit() {
    // send data to server
    // store in database
    // on return give istructions to download facebook data
    let payload = {
      fbEmail: this.state.fbEmail,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      source: this.state.referer,
      fbProfileURL: this.state.fbProfileURL,
      phone: this.state.phoneNumber
    };
    Axios.post("/api/personal/add", payload)
      .then(results => {
        this.props.addAccount(results.data.personalAccountID);
        let update = {
          personalAccountID: results.data.personalAccountID,
          status: "personalAccountCreated"
        };
        Axios.put("/api/personal/update", update);
        this.props.focus(2);
      })
      .catch(err => {
        alert(err);
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("fbEmail").value = "";
        document.getElementById("fbProfileURL").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("referer").value = "";
        //catch stuff
      });
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
          <StepLabel highlight={"rgb(88, 211, 141)"}>{"step 1"}</StepLabel>
          <StepLabel>{"step 2"}</StepLabel>
          <StepLabel>{"step 3"}</StepLabel>
          <StepLabel>{"step 4"}</StepLabel>
          <StepLabel>{"done"}</StepLabel>
        </Container>
        <Header as="h3">Sign up:</Header>
        <List>
          <List.Item>
            <Input
              label="First Name"
              id="firstName"
              onChange={e => {
                this.setState({ firstName: e.currentTarget.value });
              }}
              placeholder="firstname"
            />
          </List.Item>
          <List.Item>
            <Input
              label="Last Name"
              id="lastName"
              onChange={e => {
                this.setState({ lastName: e.currentTarget.value });
              }}
              placeholder="lastname"
            />
          </List.Item>
          <List.Item>
            <Input
              label="Facebook Email address"
              id="fbEmail"
              onChange={e => {
                this.setState({ fbEmail: e.currentTarget.value });
              }}
              placeholder="facebook email"
            />
          </List.Item>
          <List.Item>
            <Input
              label="Facebook Profile URL"
              id="fbProfileURL"
              onChange={e => {
                this.setState({ fbProfileURL: e.currentTarget.value });
              }}
              placeholder="https://www.facebook.com/john-smith"
            />
          </List.Item>
          <List.Item>
            <Input
              label="Phone number including country code"
              id="phoneNumber"
              onChange={e => {
                this.setState({ phoneNumber: e.currentTarget.value });
              }}
              placeholder="phone number"
              value={this.state.phoneNumber}
            />
          </List.Item>
          <br />
          <List.Item>
            <Dropdown
              label="Select your Referrer"
              id="referer"
              options={sources}
              onChange={e => {
                this.setState({ referer: e.currentTarget.value });
              }}
              list="sources"
              placeholder="referer"
            />
          </List.Item>
          <br />
          <Button color="green" onClick={this.validate}>
            Submit
          </Button>
        </List>
      </Container>
    );
  }
}

export default Step1;
