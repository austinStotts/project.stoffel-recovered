import React, { Component } from 'react';
import Axios from 'axios';
import Home from './landingpage/home';
import Dashboard from './dashboard/dashboard';
import Upload from './signup/upload';
import Install from './signup/install';
import Success from './signup/success';

const headers = {
  'Content-type': 'multipart/form-data',
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      step: 'home',
      fsKey: 0,
      user: {},
      id: '',
      fail: 'display-none'
    };
  
    this.focus = this.focus.bind(this);
    this.addResults = this.addResults.bind(this);
    this.addAccount = this.addAccount.bind(this);
    this.show_fail = this.show_fail.bind(this);
  }

  // I am going to cut this component open like a fucking fish...

  componentDidMount() {
    const path = window.location.pathname;
    if(path === '/help') this.setState({step: 'help'});
    else if(path === '/admin') this.setState({ step: 'admin'});
    else if(path.startsWith('/user')) {
      this.setState({ step: 'signup', id: path.split('/')[2] }, () => {
        Axios.get(`/api/personal?personalAccountID=${this.state.id}`) // FIX THIS SHIT !!
        .then(response => {
          console.log(response);
          if(response.data.status === 'uploaded') this.setState({ step: 'install' });
          else if(response.data.status === 'complete') this.setState({ step: 'success' });
        })
      });
    }
  }

  focus(object) {
    this.setState(object);
  }

  addResults(object) {
    this.set
    State(object);
  }

  addAccount(personalAccountID) {
    this.setState({ personalAccountID });
  }

  show_fail () {
    this.setState({ fail: 'display-block' });
  }

  render() {
    if (this.state.step === 'home') {
      return (<Home local_store={this.local_store}/>)
    }

    else if(this.state.step === 'admin') {
      return (<Dashboard local_store={this.local_store}/>)
    }

    else if(this.state.step === 'signup') {
      return (<Upload local_store={this.local_store} focus={this.focus} id={this.state.id} fail={this.state.fail} show_fail={this.show_fail}/>)
    }

    else if (this.state.step === 'install') {
      return (<Install focus={this.focus} id={this.state.id}/>)
    }

    else if (this.state.step = 'success') {
      return (<Success focus={this.focus} id={this.state.id}/>)
    }

    else {
      return (<p>error: the current step is not a defined component...</p>)
    }
  }
}

export default App;
