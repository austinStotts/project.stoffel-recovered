import React from 'react';
import { Icon } from "semantic-ui-react";

const Help2 = (props) => {

  const step = (e) => {
    let step = e.currentTarget.innerText[e.currentTarget.innerText.length-1]
    props.focus(Number(step));
  }

  return (
    <div className="help-wrapper">
      <br></br>
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
          <p className="help-title">Step 2</p>
          <p className="help-step">Upload</p>
        </div>
        <br></br>
        <p className="step-number">1</p>
        <p className="help-text">To download your user data, use the link to go to your user information.</p>
        <p className="help-text">Once here, click "Download Your Information"</p>
        <img className="help-image" src="https://d2l99xxr0g5lns.cloudfront.net/images/stoffel-downloadhelp-1.png"/>
        <br></br>
        <p className="step-number">2</p>
        <p className="help-text">Change the format to JSON. this is very important, your account will fail if this stays as HTML.</p>
        <p className="help-text">Then change your media quality to "Low". this will save a lot of time when downloading and updating your file.</p>
        <img className="help-image" src="https://d2l99xxr0g5lns.cloudfront.net/images/stoffel-downloadhelp-2.png"/>
        <br></br>
        <p className="step-number">3</p>
        <p className="help-text">Once you click "Create File", facebook will begin to make your file. this will take some time.</p>
        <p className="help-text">Facebook will notify you when it has been made. It will be located under "Available Files".</p>
        <br></br>
        <p className="step-number">4</p>
        <p className="help-text">When you have downloaded your file, find it. By default, it will be in your downloads folder named "facebook-yourusername.zip"</p>
        <p className="help-text">once you have it, drag and drop it onto the file uploader, or click the file uploader and find it there.</p>
        <p className="help-text">this will begin the file upload proccess. depending on the size of your file, this could take several minutes.</p>
        <br></br>
        <p className="step-number">5</p>
        <p className="help-text">You will get an email once your file has uploaded. Use the link emailed to you to return.</p>
        <p className="break"></p>
      </div>
    </div>
  )
}

export default Help2;