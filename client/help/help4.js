import React from 'react';
import { Icon } from "semantic-ui-react";

const Help4 = (props) => {

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
          <p className="help-title">Step 4</p>
          <p className="help-step">Facebook</p>
        </div>
        <br></br>
        <p className="step-number">1</p>
        <p className="help-text">All that you need to do now, is go back to <a target="_blank" href="https://facebook.com/profile">facebook.com</a>, logout and log back in.</p>
        <p className="help-text">That is the last step. one you are done, your referer will handle payment.</p>
      </div>
    </div>
  )
}

export default Help4;