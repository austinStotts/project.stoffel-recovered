import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      list: this.props.list,
    }

    this.show_list = this.show_list.bind(this);
    this.hide_list = this.hide_list.bind(this);
    this.click_referer = this.click_referer.bind(this);
  }

  show_list () {
    this.setState({open: true});
  }

  hide_list () {
    this.setState({open: false});
  }

  click_referer (e) {
    this.hide_list();
    this.refs.referer.innerText = e.currentTarget.innerText
  }

  render () {
    return (
      <div className="dropdown-wrapper-main" onMouseLeave={this.hide_list}>
        <div className="dropdown-title-wrapper" onMouseEnter={this.show_list}>
          <div ref="referer" className={this.props.titleStyle ? this.props.titleStyle : 'dropdown-title'}>{this.props.title}</div>
        </div>
        <div className="dropdown-list-wrapper" hidden={!this.state.open}>
          {this.state.list.map(item => <div className="dropdown-list-item" onClick={this.click_referer} key={Math.random()}>{item}</div>)}
        </div>
      </div>
    )
  }
}

export default Dropdown;

// ! TODO !
// save all invite values using the placeholder property, see this.update
// save the referer dropdown when user selects it

// then ->
// add the edit / delete options ...
// be able to edit a user's data
// be able to delete a user
// be able to manually add a problem to user 