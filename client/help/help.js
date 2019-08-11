import React , { Component }from 'react';
import Help1 from './help1';
import Help2 from './help2';
import Help3 from './help3';
import Help4 from './help4';
import Help5 from './help5';

class Help extends Component {
  constructor(props) {
    super(props);

    this.state = {
      help: 1
    }

    this.focus = this.focus.bind(this);
  }

  focus (help) {
    this.setState({ help });
  }

  render() {
    if(this.state.help === 1) {
      return <Help1 focus={this.focus}/>
    } else if(this.state.help === 2) {
      return <Help2 focus={this.focus}/>
    } else if(this.state.help === 3) {
      return <Help3 focus={this.focus}/>
    } else if(this.state.help === 4) {
      return <Help4 focus={this.focus}/>
    } else if(this.state.help === 5) {
      return <Help5 focus={this.focus}/>
    }
  }
}

export default Help;