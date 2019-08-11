import React from 'react';
import * as filestack from "filestack-js";
import Header from '../dashboard/header';
import Progress from '../utilities/progress';
import Axios from 'axios';
import m from 'moment';

const Upload = ({ id, focus, fail, show_fail }) => {
  const validate = () => {
    console.log('VALIDATE');
  }
  
  const proccess = ({ key }) => {
    console.log('PROCCESS');
    Axios.post('/file/upload', { key })
    .then(response => {
      focus({ step: 'install' });
      Axios.put('/api/personal/update', { personalAccountID: id, fbProfileURL: response.data, status: 'created', createdAt: m().format('MM/DD/YYYY HH:mm:ss')})
      .then(response => {})
      .catch(error => console.log(error));
    })
    .catch(error => show_fail());
  }
  
  const percent = (percent) => {
    document.getElementById('percent').innerText = `${percent}%`;
  }

  // had trouble getting the key from the server so, I hard coded it...
  // but its in base 64 to help bots not find it...
  const client = filestack.init(atob('QWkxeVIydmFwVElpSXBiTWlteFpaeg=='));


  console.log('user id:', id);
  Axios.post('/api/dashboard/user/id', { id })
  .then((response) => {
    let user = response.data[0];
    client.picker(({
      onFileUploadFinished: data => proccess(data),
      onFileSelected: file => validate(file),
      onFileUploadProgress: (file, event) => percent(event.totalPercent),
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
        path: `${user.fbEmail}/`,
        access: "public"
      }
    })).open()
  })
  .catch(error => console.log(error));




  return (
    <div className="registration-wrapper">
      <div className="accent-header">
        <Header />
        <div className="small-container">
          <h1 className="center">Submit your Application</h1>
          <Progress upload="active" install="inactive" complete="inactive" />
        </div>
      </div>
      <div className="small-container pull-up">
        <div className="upload-wrapper">
          <div className="video-wrapper">
            <center>
              <iframe className="video" src="https://www.youtube.com/embed/g1X0kzDKXyQ"></iframe>
            </center>
          </div>
          <div className="upload-label-wrapper">
            <h2 className="center">Upload your file below:</h2>
          </div>
          <div className="upload-area picker-content">
            <div className="center muted">
              <div className="upload-icon"><i className="fas fa-file-upload"></i></div>
              <span>drag &amp; drop file or <span className="underline">click here</span> to upload</span>
            </div>
            <div className="picker-percent-wrapper">
                <center>
                    <p id="percent" className="picker-percent"></p>
                </center>
            </div>
          </div> 
        </div>
        <h2 className="center">How to download your Facebook data:</h2>
        <ol className="instructions-list">
          <li>Click to the top right of facebook and click <img src="https://s3.amazonaws.com/healthyhelp.life/stoffel/download-icon.png" alt="Facebook menu icon" /></li>
          <li>Click <strong>Settings</strong></li>
          <li>Click your <strong>Facebook Information</strong></li>
          <li>Go to <strong>Download Your Information</strong> and click <strong>View</strong></li>
          <li>Select TODO: add categories here</li>
          <li>
            <span>Under format and quality options select:</span>
            <ul>
              <li>Format: <strong>JSON</strong></li>
              <li>Quality: <strong>LOW</strong></li>
            </ul>
          </li>
          <li>Click <strong>Create File</strong> to confirm the download request</li>
          <li>Upload the Zip file to the form above</li>
        </ol>
      </div>
      <div className="footer">
        &copy; 2019 | Badger Media
      </div>      
      <div className="">
        <div className={`fail-main modal-wrapper ${fail}`}>
          <div className="fail-label-wrapper modal small-modal">
            <div className="modal-header">
              <h1>Sorry!</h1>              
            </div>
            <div className="modal-body">
              <p>Your account does not meet our requirements. Please contact your recruiter for more information. </p>
            </div>
            <div className='modal-footer'>
              <button className="btn-secondary" onClick={() => focus({ step: 'home' })}>CLOSE</button>              
            </div>
          </div>
        </div>
      </div>        
    </div>
  )
}

export default Upload;