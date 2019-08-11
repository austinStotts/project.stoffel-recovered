import React from 'react';

const Options = (props) => {
  const update = (e) => {
    document.getElementsByClassName('active')[0].setAttribute('class', 'view-btn');
    e.currentTarget.setAttribute('class', 'view-btn active')
    props.view(e.currentTarget.innerText.toLowerCase());
  }

  return (
    <div className="options-bar-wrapper flex">
      <div className="search-wrapper">
        <div className="relative">
          <i className="fas fa-search"></i>
          <input className="options-search" placeholder="Search Users" type="text" onChange={(e) => props.search(e.currentTarget.value)}></input>
        </div>
      </div>
      <div className="view-btn-wrapper">
        <div className="toggle">
          <button onClick={update} className="view-btn active">Active</button>
          <button onClick={update} className="view-btn">Invited</button>
          <button onClick={update} className="view-btn">Problems</button>
        </div>
      </div>
      <div className="invite-btn-wrapper">
        <button onClick={() => props.showInvite(true)} className="btn-primary">NEW INVITE</button>
      </div>
    </div>
  )
}

export default Options;