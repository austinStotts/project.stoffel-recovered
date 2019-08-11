import React, { Component } from 'react';

const SyncConnect = ({ linked, unlinked }) => {
    return (
        <div className="sync-connect">
            <div>
                Not Connected
            </div>
            <div className="status-icon">
                <div className="indicator"></div>
            </div>
        </div>
    );    
}; 

export default SyncConnect;