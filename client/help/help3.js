import React from 'react';
import { Icon } from "semantic-ui-react";

const Help3 = (props) => {

  const step = (e) => {
    let step = e.currentTarget.innerText[e.currentTarget.innerText.length-1]
    props.focus(Number(step));
  }

  return (
    <div className="help-wrapper">
      <br/>
      <h1 className="title">Facebook Ad Rental <Icon name="facebook" /></h1>
      <div className="step-bar-wrapper">
        <a onClick={step} className="bar-step">Step 1</a>
        <a onClick={step} className="bar-step">Step 2</a>
        <a onClick={step} className="bar-step">Step 3</a>
        <a onClick={step} className="bar-step">Step 4</a>
        <a onClick={step} className="bar-step">Step 5</a>
      </div>
      <div className="help-content-wrapper">
        <div>
          <p className="help-title">Step 3</p>
          <p className="help-step">Extension</p>
        </div>
        <br></br>
        <p className="step-number">1</p>
        <p className="help-text">Download the Chrome extension</p>
        <p className="help-text">This file will be a .zip file. Once it has finished downloading, click on it to unzip it.</p>
        <br></br>
        <p className="step-number">2</p>
        <p className="help-text">Copy and paste chrome://extensions into a new chrome tab</p>
        <p className="help-text">In the top-right corner turn on developer mode.</p>
        <p className="help-text">In the top-left corner click "Load Unpacked" and select the unziped file.</p>
        <br></br>
        <p className="step-number">3</p>
        <p className="help-text">Once you have installed the extension, you will need to refresh the page.</p>
        <p className="help-text">If the extension was installed correctly, you will now be on Step 4.</p>
        <p className="break"></p>
      </div>
    </div>
  )
}

export default Help3;