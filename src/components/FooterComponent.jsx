import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div
            className="text-center py-4 px-4 px-xl-5 bg-primary" style={{marginTop:"auto"}}>
    
            <div className="text-white mb-3 mb-md-0">
                Copyright © 2020. All rights reserved.
            </div>
            </div>
        );
    }
}

export default FooterComponent;
