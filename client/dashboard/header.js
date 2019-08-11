import React from 'react';
import SyncConnect from '../utilities/syncConnect';

const Header = () => {
  return (
    <div className="nav">
      <div className="container">
        <a className="nav-logo nav-left" href="/">
          <img src="https://s3.amazonaws.com/healthyhelp.life/stoffel/synclogo.png" alt="Synctools Logo"/>
        </a>
        <ul className="nav-right">
          <li className="nav-item">
            <a href="/" className="logout">
              <i className="fas fa-sign-out-alt"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header;
