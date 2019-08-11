import React, { Component } from 'react';
import Dropdown from './dropdown';
import Axios from 'axios';

class Invite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      referer: '',
    }

    this.validate = this.validate.bind(this);
    this.update = this.update.bind(this);
  }

  validate (event) {
    event.preventDefault()
    const user = { // validate these inputs !!!
      firstName: document.getElementsByClassName('i-firstname')[0].value,
      lastName: document.getElementsByClassName('i-lastname')[0].value,
      phone: document.getElementsByClassName('i-phone')[0].value,
      fbEmail: document.getElementsByClassName('i-email')[0].value,
      source: document.getElementsByClassName('title-style-special')[0].innerText,
    }

    console.log('adding user to dynamodb');
    Axios.post('/api/personal/add', user)
    .then(response => {
      console.log(response);
      Axios.post('https://synctoolsmail.net/new/user', {
        emailAddress: user.fbEmail,
        url: `https://synctools.net/user/${response.data.personalAccountID}`,
        source: user.source
      }).then(response => {
        this.props.showInvite(false); 
        this.props.refresh();
      })
      .catch(err => console.log(err))
    }).catch(err => console.log(err))
  }

  update (e) {
    console.log(e.currentTarget.placeholder);
  }

  clear () {
    for (let element of document.getElementsByClassName('i-input')) element.value = '';
  }

  render () {
    return (
      <div className={this.props.show}>
        <section className="invite-main modal-wrapper">
          <div className="modal">
            <div className="modal-title">
              <h1>Invite User</h1>
              <button className="i-cancel" onClick={()=>{this.props.showInvite(false); this.clear()}}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="grid">
                  <input type="text" placeholder="First Name" className="i-firstname i-input"></input>
                  <input type="text" placeholder="Last Name" className="i-lastname i-input"></input>
                </div>
                <input type="text" placeholder="Phone Number ( include area code )" className="i-phone i-input"></input>
                <input type="text" placeholder="Email" className="i-email i-input"></input>
                <div className="i-referer i-input relative">
                  <Dropdown title="Referer" list={this.props.referers} titleStyle="title-style-special"/>
                  <i className="fas fa-caret-down"></i>
                </div>
                <div className="modal-footer flex flex-right">
                  <button onClick={this.validate}  className="btn-primary">send invite</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Invite;
