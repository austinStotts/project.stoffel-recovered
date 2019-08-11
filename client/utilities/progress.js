import React, { Component } from 'react';

const Progress = ({ upload, install, complete }) => {
    return (
        <div className="progress-bar">
            <div className={upload}>upload your info</div>
            <div className={install}>install extension</div>
            <div className={complete}>complete</div>
        </div>
    );    
}; 

export default Progress;