import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

class SubmitTest extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.socket.emit("submit", this.props.roomName);
    }

    render() {
        return (
            <div>
                <button onClick={this.handleSubmit}>Click ME!</button>
            </div>
        );
    }
}

export default SubmitTest;


