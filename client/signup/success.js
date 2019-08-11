import React from 'react';
import Header from '../dashboard/header';
import Progress from '../utilities/progress';

const Success = (props) => {
  return (
    <div className="registration-wrapper">
      <div className="success-wrapper">
        <Header />
        <div className="small-container">
          <h1 className="center">Success!</h1>
          <Progress upload="complete" install="complete" complete="complete" />
        </div> 
        <div className="container success-container">
          <div className="flex">
            <div className="success-prompt">
              <div className="section-header">
                <h1>You're all set!</h1>
                <div className="section-divider"></div>
              </div>
              <p>
                Thank you for joining our Facebook Ads Manager leasing program. We’ll will get in touch with your shortly to begin the setup process and to arrange your first payment.
              </p>
              <p><strong>Here's what's next:</strong></p>
              <ol>
                <li>
                  Your recruiter will contact you. Here's your recruiter's details:
                  <ul className="recruiter-details">
                    <li>Name: </li>
                    <li>Email: </li>
                    <li>Phone: </li>
                  </ul>
                </li>
                <li>We'll setup <strong>Ads Manager</strong> and create a <strong>Fan Page</strong> on your Faceboook</li>
                <li>We'll setup your payment method and schedule</li>
              </ol>
            </div>
            <div className="success-contact">
              <div className="section-header">
                <h1>Contact us</h1>
                <div className="section-divider"></div>
              </div>
              <div className="form-container">
                <form className="contact-form" id="landingForm">
                  <fieldset>
                    <div className="grid">
                      <div className="column">
                        <input placeholder="First Name" name="firstName" />
                      </div>
                      <div className="column">
                        <input placeholder="Last Name" name="lastName" />  
                      </div>  
                    </div>
                    <div>
                      <input placeholder="Email" name="email" />
                    </div>
                    <div>
                      <textarea placeholder="Message" rows="4"></textarea>
                    </div>
                    <button className="cta-button" type="submit" form="landingContact" value="Submit">Send</button>
                  </fieldset>
                </form>
              </div>              
            </div>
          </div>
        </div>    
      </div>
    </div>
  )
}

export default Success;