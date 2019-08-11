import React, { Component } from 'react';

class Home extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="landing-container">
        <div className="nav">
          <div className="container">
            <a className="nav-logo nav-left" href="/">
              <img src="https://s3.amazonaws.com/healthyhelp.life/stoffel/synclogo.png" alt="Synctools Logo"/>
            </a>
            <ul className="nav-right">
              <li>
                <a className="nav-item" href="">how it works</a>
              </li>
              <li>
                <a className="nav-item" href="">faq</a>
              </li>
              <li>
                <a className="nav-item" href="">contact</a>
              </li>
              <li>
                <a className="cta-button" href="">get started</a>
              </li>
            </ul>
          </div>
        </div>
        <section className="hero-container container">
          <div className="hero-inner-grid">
            <div className="hero-text">
              <h1>Earn extra money leasing your <br /><b>Facebook Ads Manager</b></h1>
              <a className="cta-button" href="/">get started</a>
            </div>
            <div className="hero-graphic">
              <img src="https://s3.amazonaws.com/healthyhelp.life/stoffel/adillustration.png" className="illustration"/>
            </div>
          </div>
        </section>
        <section className="content-container container">
          <div className="inner-section">
            <div className="section-header">
              <h1>How does it work?</h1>
              <div className="section-divider"></div>
            </div>
            <div className="content-grid">
                <div className="column center">
                  <img src="https://s3.amazonaws.com/healthyhelp.life/stoffel/apply.png" className="large-icon"/>
                  <h2>Apply</h2>
                  <p>We’ll ask you a few simple questions regarding your Facebook account. Don’t worry, this takes less than 2 minutes.</p>
                </div>
                <div className="column center">
                  <img src="https://s3.amazonaws.com/healthyhelp.life/stoffel/setup.png" className="large-icon"/>
                  <h2>Setup</h2>
                  <p>If your Facebook account matched all of our criteria and is eligible, the next step is for us to setup the ads. This requires no work on your end.</p>                  
                </div>
                <div className="column center">
                  <img src="https://s3.amazonaws.com/healthyhelp.life/stoffel/earn.png" className="large-icon"/>
                  <h2>Earn</h2>
                  <p>Once the first ads are posted, approved and getting traffic - you will get paid.</p>  
                </div>
              </div>            
          </div>
          <div className="inner-section">
            <div className="section-header">
              <h1>When do I get paid?</h1>
              <div className="section-divider"></div>
              <p className="header-text center">
                Typically, we lease your Ads Manager for 3 to 6 months. You earn your first payment once your account is setup and we pay you weekly after that.  
              </p>
            </div>
            <div className="timeline center">
              <img src="https://s3.amazonaws.com/healthyhelp.life/stoffel/timeline.png" alt="Lease timeline graphic." />
            </div>
          </div>
          <div className="inner-section">
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
            <div className="footer">
              &copy; 2019 | Badger Media
            </div>
          </div>          
        </section>
      </div>
    )
  }
}

export default Home;
