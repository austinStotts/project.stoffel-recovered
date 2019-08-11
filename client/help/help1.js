import React from 'react';
import { Icon } from "semantic-ui-react";

const Help1 = (props) => {

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
          <p className="help-title">Step 1</p>
          <p className="help-step">Sign Up</p>
        </div>
        <br/>
        <p className="step-number">1</p>
        <p className="help-text">This information is needed to make your account.</p>
        <table className="help-table-wrapper">
          <tbody className="help-table">
            <tr>
              <td className="help-table-left">Firstname</td>
              <td className="help-table-right">Your firstname</td>
            </tr>
            <tr>
              <td className="help-table-left">Lastname</td>
              <td className="help-table-right">Your lastname</td>
            </tr>
            <tr>
              <td className="help-table-left">Facebook Email Address</td>
              <td className="help-table-right">The email address associated with your facebook account. Make sure you have access to this email, as you will recieve emails from us regarding your account.</td>
            </tr>
            <tr>
              <td className="help-table-left">Facebook Profile URL</td>
              <td className="help-table-right">To find this, go you your facebook account. On your profile look in the URL bar at the top of your browser, this is your facebook URL. If you cant find your facebook URL go to <a target="_blank" href="https://facebook.com/profile">facebook.com/profile</a> is will look something like, "https://facebook.com/your-username"</td>
            </tr>
            <tr>
              <td className="help-table-left">Phone Number</td>
              <td className="help-table-right">Your Phone number, including your area code. this will not be used to contact users.</td>
            </tr>
            <tr>
              <td className="help-table-left">Referer</td>
              <td className="help-table-right">Select your referer from the drop down menu.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Help1;