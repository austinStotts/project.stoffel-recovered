import React, { Component } from "react";
import * as filestack from "filestack-js";
import Axios from "axios";
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

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const client = filestack.init(this.props.fsKey);
    client
      .picker(
        (this.options = {
          onFileUploadFinished: data => this.proccess(data),
          onFileUploadProgress: (file, event) =>
            this.percent(event.totalPercent),
          onFileSelected: file => this.validate(file),
          container: ".picker-content",
          disableTransformer: true,
          uploadInBackground: true,
          displayMode: "dropPane",
          accept: [".zip"],
          fromSources: ["local_file_system"],
          maxFiles: 1,
          uploadConfig: {
            intelligent: true
          },
          storeTo: {
            location: "s3",
            // need to update path !
            path: `${this.props.email}/`,
            access: "public"
          }
        })
      )
      .open();
  }

  validate(object) {
    this.setState({ filename: object.filename });
  }

  proccess(object) {
    Axios.post("/file/upload/", {
      key: object.key,
      email: this.props.email,
      url: this.props.personalAccountID
    })
    .then(data => {
      let payload = {
        personalAccountID: this.props.personalAccountID,
        status: "fbFileUploaded"
      };
      Axios.put("/api/personal/update", payload)
      this.props.focus(3);
    })
    .catch(err => {
      if (err.response.status === 418) {
        this.props.focus("error");
      }
    });
  }

  percent(perc) {
    this.refs.percent.innerText = `${perc}%`;
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
          <StepLabel highlight={'rgb(88, 211, 141)'}>{'step 2'}</StepLabel>
          <StepLabel >{'step 3'}</StepLabel>
          <StepLabel >{'step 4'}</StepLabel>
          <StepLabel >{'done'}</StepLabel>
        </Container>
        <Header as="h3" color="green">
          Congratulations on signing up!
        </Header>
        <Header as="h3">
          Next, follow these instructions to download you facebook data:
        </Header>
        <List ordered size="big">
          <List.Item>
            go to {' '}
            <a href="https://www.facebook.com/settings?tab=your_facebook_information" target="_blank">
              facebook.com
            </a>
          </List.Item>
          <List.Item>
            Click "Download Your Information" 
          </List.Item>
          <List.Item>
            Choose the <span className="json-style">JSON</span> format and
            change quality to <span className="low-style">LOW</span>
          </List.Item>
          <List.Item>{'Click "Create File"'}</List.Item>
          <List.Item>
          <span className="notice">*Notice, depending on the size of you profile, this process can take several minutes</span>
          </List.Item>
          <List.Item>Once facebook has created your file, download it</List.Item>
          <List.Item>Then use the upload tool below to upload the .zip file</List.Item>
          <List.Item>
            When the upload is finished, you will recieve an email with your results
          </List.Item>
        </List>
        <div className="upload-wrapper">
          <center>
            <p ref="percent" className="percent">
              0%
            </p>
          </center>
          <div className="picker-content" />
        </div>
      </Container>
    );
  }
}

export default Step2;
