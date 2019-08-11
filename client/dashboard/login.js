import React from 'react';
import Axios from 'axios';

const Login = ({ set_login }) => {

  const handle_login = () => {
    const data = {
      username: document.getElementById('login-username').value,
      password: document.getElementById('login-password').value,
    };

    Axios.post('/api/dashboard/login', data)
    .then(response => {
      if(response.data.pass) {
        document.cookie = `login=true; max-age=259200`; // 3 days
        set_login();
      } else {
        // tell the user they are stupid and don't have the right password
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div className="login-wrapper">
      <div className="accent-header">
        <div className="login-container">
          <div className="logo">
            <img src="https://s3.amazonaws.com/healthyhelp.life/stoffel/synclogo.png" alt="Synctools Logo" />
          </div>          
          <form>
            <h1>Login</h1>
            <input className="input" id="login-username" type="text" placeholder="Username"></input>
            <input className="input" id="login-password" type="password" placeholder="Password"></input>
            <button className="btn-primary" onClick={handle_login}>LOGIN</button>   
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;