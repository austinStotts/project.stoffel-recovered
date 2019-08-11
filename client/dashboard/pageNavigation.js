import React, { Component } from 'react';

class PageNavigation extends Component {
  constructor(props) {
    super(props)
  }

  render () { // this shit is broken... cant get the boxes to line up...
    return (
      <div className="title-row" id="foot-row">
        <div className="page-nav-wrapper">
          <div className="prev">
            <div className="page-label">{'<'}</div>
          </div>
          <div className="page">
            <div className="page-label">1</div>
          </div>
          <div className="next">
            <div className="page-label">{'>'}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageNavigation;
