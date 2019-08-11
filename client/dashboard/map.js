// this component is in charge of rendering all user 
// data to the correct place in the table

import React from 'react';

const Map = (props) => {
  if(props.view === 'active') {
    let filter = ['name', 'phone', 'email', 'payment', 'activity'];
    let rows = [];
    let titles = [];
    for(let title of filter) {
      title = title.split('_').join(' ');
      title = title.split('');
      title[0] = title[0].toUpperCase();
      title = title.join('');
      titles.push(<p key={Math.random()} className="table-header">{title}</p>)
    }
    rows.push(<div key={Math.random()} className="table-row" id="label-row">{titles}</div>)
    for(let i = 0; i < props.data.length; i++) {
      if(props.data[i].status === 'complete') {
        let row = [];
        row.push(<p key={Math.random()} className="table-body">{props.data[i].firstName + ' ' + props.data[i].lastName}</p>)
        row.push(<p key={Math.random()} className="table-body">{props.data[i].phone}</p>)
        row.push(<p key={Math.random()} className="table-body">{props.data[i].fbEmail}</p>)
        row.push(<p key={Math.random()} className="table-body">{'$' + props.data[i].payment}</p>)
        row.push(<p key={Math.random()} className="table-body">{props.data[i].activity}</p>)
        row.push(<i key={Math.random()} className="material-icons table-row-edit" onClick={e=>props.manage(e.currentTarget.previousSibling.previousSibling.previousSibling.innerText)}>more_vert</i>)
        rows.push(<div key={Math.random()} className="table-row">{row}</div>)
      }
    }
    return rows;
  } 
  
  
  else if (props.view === 'invited') {
    let filter = ['name', 'email', 'invited at', 'referer'];
    let rows = [];
    let titles = [];
    for(let title of filter) {
      title = title.split('_').join(' ');
      title = title.split('');
      title[0] = title[0].toUpperCase();
      title = title.join('');
      titles.push(<p key={Math.random()} className="table-header">{title}</p>)
    }
    rows.push(<div key={Math.random()} className="table-row" id="label-row">{titles}</div>)
    for(let i = 0; i < props.data.length; i++) {
      if(props.data[i].status === 'invited' || props.data[i].status === 'uploaded' || props.data[i].status === 'signup') {
        let row = [];
        row.push(<p key={Math.random()} className="table-body">{props.data[i].firstName + ' ' + props.data[i].lastName}</p>)
        row.push(<p key={Math.random()} className="table-body">{props.data[i].fbEmail}</p>)
        row.push(<p key={Math.random()} className="table-body">{props.data[i].invitedAt}</p>)

        row.push(<p key={Math.random()} className="table-body">{props.data[i].source}</p>)
        row.push(<i key={Math.random()} className="material-icons table-row-edit" onClick={e=>props.manage(e.currentTarget.previousSibling.previousSibling.previousSibling.innerText)}>more_vert</i>)
        rows.push(<div key={Math.random()} className="table-row">{row}</div>)
      }
    }
    return rows;
  } 
  
  
  else if (props.view === 'problems') {
    let filter = ['name', 'email', 'activity', 'error'];
    let rows = [];
    let titles = [];
    for(let title of filter) {
      title = title.split('_').join(' ');
      title = title.split('');
      title[0] = title[0].toUpperCase();
      title = title.join('');
      titles.push(<p key={Math.random()} className="table-header">{title}</p>)
    }
    rows.push(<div key={Math.random()} className="table-row" id="label-row">{titles}</div>)
    for(let i = 0; i < props.data.length; i++) {
      let row = []
      if(props.data[i].error) {
        row.push(<p key={Math.random()} className="table-body">{props.data[i].firstName + ' ' + props.data[i].lastName}</p>)
        row.push(<p key={Math.random()} className="table-body">{props.data[i].fbEmail}</p>)
        row.push(<p key={Math.random()} className="table-body">{props.data[i].activity}</p>)
        row.push(<p key={Math.random()} className="table-body">{props.data[i].error}</p>)
        row.push(<i key={Math.random()} className="material-icons table-row-edit" onClick={e=>props.manage(e.currentTarget.previousSibling.previousSibling.previousSibling.innerText)}>more_vert</i>)
        rows.push(<div key={Math.random()} className="table-row">{row}</div>)
      }
    }
    return rows;
  } else {
    return (<h1>error</h1>)
  }
}

// <p key={`${i}${j}`} className="table-body">{key[0] === 'payment' ? `$${key[1]}` : key[1]}</p>
// <i onClick={()=>console.log('do something please')} className="material-icons table-row-edit">more_vert</i>

export default Map;

