import React, { Component } from 'react'
import Header from './header';
import Table from './table';
import Login from './login';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      referers: ['Milko', 'Kevin', 'Reagan'],
      login: false,
    }

    this.set_login = this.set_login.bind(this);
  }

  set_login () {
    this.setState({ login: true });
  }

  componentDidMount () {
    let store = document.cookie.match('login');

    if(store) {
      this.setState({ login: true });
    }
  }

  render () {
      if(this.state.login) {
        return (      
        <div className="dashboard-wrapper">
          <div className="accent-header">
            <Header />
          </div>
          <div className="table-container container pull-up">
            <Table referers={this.state.referers}/>
          </div>
        </div>
        )
      }
    else {
    return (<Login show_login={this.show_login} set_login={this.set_login}/>)
    }
  }
}

export default Dashboard;