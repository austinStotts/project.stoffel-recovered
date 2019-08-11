import React from 'react';
import Header from '../dashboard/header';
import Progress from '../utilities/progress';
import Axios from 'axios';

const Install = ({ id, focus }) => {

  const copy = () => {
    let element = document.getElementById('copy-element');
    element.select();
    document.execCommand("copy");
  }
  

  const validate = () => {
    Axios.put('/api/personal/update', { personalAccountID: id, status: 'complete' })
    .catch(error => console.log(error));
    window.location.reload(true);
  }
  
  
  Axios.post('/api/update/personal', { personalAccountID: id, status: 'uploaded' })
  .then(response => console.log(response))
  .catch(error => console.log(error));

  return (
    <div className="registration-wrapper">
      <div className="accent-header">
        <Header />
        <div className="small-container">
          <h1 className="center">Install the Sync Chrome Extension</h1>
          <Progress upload="complete" install="active" complete="inactive" />
        </div>
      </div>
      <div className="small-container pull-up">
        <div className="install-wrapper">
          <div className="video-wrapper">
            <center>
              <iframe className="video" src="https://www.youtube.com/embed/9C_HReR_McQ"></iframe>
            </center>
          </div>
          <h2 className="center">How to Install the Sync Chrome Extension</h2>
          <a className="btn-primary" href="https://s3.amazonaws.com/healthyhelp.life/stoffel/syncTool.zip">DOWNLOAD</a>
          <ol className="instructions-list">
            <li>Download and unzip the Sync .zip file</li>
            <li>
              Copy this URL:
              <span onClick={copy} className="copy-link"><i className="far fa-copy"></i> <input type="text" value="chrome://extensions/" id="copy-element"></input> </span>
              and open it in a new tab
            </li>
            <li>In the top right corner, turn on developer mode</li>
            <li>Then in the top left, click <strong>load unpacked</strong></li>
            <li>Find the Sync Tools folder you unziped</li>
            <li>Open: <em>synctools.zip</em></li>
            <li>Verify the instillation by clicking the button bellow</li>
          </ol>
          <div className="install-validation-wrapper">
            <button onClick={validate} className="install-validation btn-primary">CONNECT TO SYNC</button>
          </div>
        </div>                
      </div>
      <div className="footer">
        &copy; 2019 | Badger Media
      </div>
              
    </div>
  )
}

export default Install;