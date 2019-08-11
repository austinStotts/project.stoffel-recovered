import React, { Component } from 'react';
import Axios from 'axios';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delete: false,
    }

    this.names = ['Firstname', 'Lastname', 'Email', 'Referer', 'Profile URL', 'Phone', 'Status', 'Payment' ];
    this.vars = ['firstName', 'lastName', 'fbEmail', 'source', 'fbProfileURL', 'phone', 'status', 'payment'];

    this.toggle_delete = this.toggle_delete.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
    this.clear = this.clear.bind(this);
  }

  // toggle the delete confirmation 
  toggle_delete () {
    this.setState({ delete: !this.state.delete });
  }

  // ¡ TODO !
  // delete user from dynamoDB
  delete () {
    // Axios.post('api/delete/user', { paid: this.props.data.personalAccountID })
    // .then(response => console.log(response))
    // .catch(error => console.log(error));
    Axios.put('/api/personal/update', { personalAccountID: this.props.data.personalAccountID, status: 'deleted' })
    .then(response => {console.log('user deleted'); this.props.showEdit(false); this.props.refresh()})
    .catch(error => console.log(error));
    // console.log(this.props.data.personalAccountID)
  }

  // save to changes for that user in dynamoDB
  save () {
    let object = this.props.data;
    for(let pair of document.getElementsByClassName('edit-row')) {
      if(pair.childNodes[1].value) {
        object[this.vars[this.names.indexOf(pair.childNodes[0].innerText)]] = pair.childNodes[1].value;
      }
    }

    console.log(this.props.paid);
    object['personalAccountId'] = this.props.paid;
    
    Axios.put('/api/personal/update', object)
    .then(response => {
      this.props.showEdit(false);
      this.props.refresh();
    })
    .catch(error => console.log(error));
  }




  clear () {
    for(let element of document.getElementsByClassName('edit-input')) element.value = '';
  }

  render () {
    if (this.state.delete === false) {
      return (
        <div className={this.props.edit}>
          <div className="edit-main modal-wrapper hidden">
            <div className="modal">
              <div className="edit-row-header modal-title">
                <h1 className="edit-header">Edit User</h1>
                <div className="i-cancel" onClick={() => {this.props.showEdit(false); this.clear()}}>
                  <i className="fas fas-times"></i>
                </div>
              </div>
              <div className="modal-body">
                {Object.keys(this.props.data).map((item, i) => {
                  if(this.names[i]) {
                    return(<div className="edit-row"><p className="edit-label">{this.names[i]}</p><input className="edit-input" autoComplete="off" type="text" placeholder={this.props.data[this.vars[i]]}></input></div>)
                  }
                }) }
              </div>
              <div className="edit-row-options modal-foote">
                <button className="btn-secondary" onClick={this.toggle_delete}>delete</button>
                <button className="btn-primary" onClick={this.save}>save</button>
              </div>              
            </div>
          </div>
        </div>
      )
    }

    else if (this.state.delete === true) {
      return (
        <div className={this.props.edit}>
          <div className="edit-delete-box modal-wrapper">
            <div className="edit-are-you-sure-wrapper modal small-modal">
              <div className="edit-delete-label-wrapper modal-title">
                <h1>{'Are You sure?'}</h1>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={this.toggle_delete}>cancel</button>
                <button className="btn-primary" onClick={this.delete}>yes</button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    else {
      return (<div>error</div>)
    }
  }
}

export default Edit;
