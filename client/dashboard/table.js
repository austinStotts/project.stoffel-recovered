import React, { Component } from 'react';
import Map from './map';
import Options from './options';
import Invite from './invite';
import Edit from './edit';
import PageNavigation from './pageNavigation';
import Axios from 'axios';

class Table extends Component {
  constructor (props) {
    super(props);

    this.state = {
      view: 'active',
      showInvite: false,
      edit: false,
      page: 1,
      edit_data: '',
      dynamo_data: '',
      data: [],
    }
    
    this.view = this.view.bind(this);
    this.showInvite = this.showInvite.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
    this.manage = this.manage.bind(this);
    this.search = this.search.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  view (view) {
    this.setState({ view });
  }

  showEdit (state) {
    this.setState({edit: state});
  }

  manage (email) {
    Axios.post('/api/dashboard/user', { email })
    .then(response => {
      this.setState({ 
        edit_data: response.data[0],
        edit: true,
      })
    })
    .catch(error => console.log(error));
  }

  showInvite (state) {
    this.setState({ showInvite: state});
  }

  sendInvite (user) {
    // create user in dynamoDB
    // wont have fb profile url so add that when user signs up
    Axios.post('/api/personal/add', {
      fbEmail: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      source: user.referer,
      phone: user.phone
    }).then(response => {
      console.log(response);
      // send email to user
      Axios.post('https://synctoolsmail.net/new/user', {
        emailAddress: user.email,
        url: `https://api.synctools.net/user/${reponse.data.personalAccountID}`,
        source: user.referer
      })
    }).catch(err => console.log(err))
  }

  search (string) {
    if(string === '') {
      this.refresh()
    } else {
      let array = this.state.data.filter((user) => {
        // console.log(user);
        for(let i = 0; i < Object.keys(user).length; i++) {
          if(String(user[Object.keys(user)[i]]).toLowerCase().includes(string.toLowerCase())) {
            return user;
          }
        }
      })
      this.setState({data: array})
    }
  }

  refresh () {
    console.log('table refresh')
    Axios.get('/api/dashboard/all/users')
    .then(response => {
      this.setState({ data: response.data.Items });
    })
    .catch(error => console.log(error));
  }

  componentDidMount () {
    if(this.state.data.length === 0) {
      this.refresh();
    }
  }

  render () {
    return (
      <div className="table-wrapper-main">
        <div className="options-wrapper">
          <Options showInvite={this.showInvite} view={this.view} current_view={this.state.view} search={this.search}/>
        </div>
        <div className="table-wrapper">
          <div className="title-row" id="title-row"> 
            <h1 className="view-label">{this.state.view === 'active' ? 'Active Users' : this.state.view === 'invited' ? 'Invited Users' : 'Problems'}</h1>
          </div>
          <Map view={this.state.view} data={this.state.data} manage={this.manage}/>
          <PageNavigation/>
        </div>
        <Invite referers={this.props.referers} show={this.state.showInvite ? 'invite display-block' : 'invite display-none'} showInvite={this.showInvite} send_invite={this.send_invite} refresh={this.refresh}/>
        <Edit edit={this.state.edit ? 'edit display-block' : 'edit display-none'} data={this.state.edit_data} showEdit={this.showEdit} refresh={this.refresh}/>
      </div>
    )
  }
}

export default Table;
