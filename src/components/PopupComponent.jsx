
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { Component } from 'react';

class PopupComponent extends Component {
    render() {
        return (
            <Popup trigger={<button> Trigger</button>} position="right center">
            <div>Popup content here !!</div>
            </Popup>  
        );
    }
}

export default PopupComponent;