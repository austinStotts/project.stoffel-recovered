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

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false
    };

    this.refresh = this.refresh.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  refresh() {
    this.setState({
      refresh: true
    });
  }
  componentDidMount() {
    let personalAccountID = this.props.personalAccountID;

    // redirecting user to use thier link
    if(window.location.href !== `http://synctools.net/user/${personalAccountID}`) {
      window.location.href = `http://synctools.net/user/${personalAccountID}`;
    }

    axios
      .get("/api/personal", {
        params: {
          personalAccountID
        }
      })
      .then(response => {
        let store = response.data;
        localStorage.setItem("firstName", store.firstName);
        localStorage.setItem("lastName", store.lastName);
        localStorage.setItem("phone", store.phone);
        localStorage.setItem("fbEmail", store.fbEmail);
        localStorage.setItem("source", store.source);
        localStorage.setItem("fbProfileURL", store.fbProfileURL);
        localStorage.setItem("personalAccountID", store.personalAccountID);

        
      })
      .catch(err => {

        alert("Something went wrong.");
      });
  }
  updateUser(e) {
    // do not prevent default, this will break the download
    let payload = {
      personalAccountID: this.props.personalAccountID,
      status: "extensionDownloaded"
    };
    axios
      .put("/api/personal/update", payload)
      .then(rez => {
        console.log("successful update to fbFileUploaded");
      })
      .catch(err => {
        console.log("error in step2 axios.put", err);
      });
  }

  render() {
    return (
      <Container>
        <br />
        <Header as="h1">
          Facebook Ad Rental <Icon name="facebook" />
        </Header>{' '}
        <br />
        <Container>
          <StepLabel color={'rgb(88, 211, 141)'}>{'step 1'}</StepLabel>
          <StepLabel color={'rgb(88, 211, 141)'}>{'step 2'}</StepLabel>
          <StepLabel highlight={'rgb(88, 211, 141)'}>{'step 3'}</StepLabel>
          <StepLabel >{'step 4'}</StepLabel>
          <StepLabel >{'done'}</StepLabel>
        </Container>{' '}
        <br />
        <Header as="h2"><span className="alert">We sent you an email with your results, but if you are reading this, you passed.</span></Header>
        <Header as="h2"><span className="alert">If you leave the site and need to come back, use the link sent to you in that email.</span></Header>
        <br />
        <Header as="h3">Next Steps</Header>
        <List ordered size="big">
          <List.Item>
            <a
              href="./assets/syncTool.zip"
              download
              className="crx-download"
              onClick={e => {
                this.updateUser(e);
              }}
            >
              download
            </a>{" "}
            the chrome extension .zip file
          </List.Item>
          <List.Item>
            Make sure you open the file to unzip it
          </List.Item>
          <List.Item>
            Once you have the extension downloaded, copy and paste <span className="chrome">chrome://extensions</span> into a new tab
          </List.Item>
          <List.Item>
            In the top-right corner turn on developer mode
          </List.Item>
          <List.Item>
              Then at top-left side click load unpacked, and select the unziped syncTools folder
          </List.Item>
          <List.Item>
            Only after you have installed the extension, click continue
          </List.Item>
        </List>{' '}
        <br />
        <Button color="green" onClick={this.refresh}> Continue </Button> <br />{' '}
        {this.state.refresh ? (
          <Container>
            <Header as="h1"> to continue, refresh the page </Header>{' '}
          </Container>
        ) : null}{' '}
      </Container>
    );
  }
}

export default Step3;
