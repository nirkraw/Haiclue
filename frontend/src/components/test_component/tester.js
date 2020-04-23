import React, { Component } from "react";
import socketIOClient from "socket.io-client";
// import io from "socket.io-client";

export default class Tester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      message: "",
      endpoint: "http://localhost:5000"
    };
    //  const { endpoint } = this.state;
    // this.socket = socketIOClient(endpoint);
    // this.socket = null;
    this.emiter = this.emiter.bind(this);
  }

  componentDidMount() {
    // debugger
    const { endpoint } = this.state;

    this.socket = socketIOClient(endpoint);
    // this.socket.on("outgoing", (data) => this.setState({ test: data.num }));
    // if (this.state.test < 1) {
      this.socket.on("outgoing", (data) => {
      // this.socket.on("incoming data", (data) => {
        // debugger 
        this.setState({ test: data.num});
      });
    // }

    // this.socket = io("http://localhost:4000");
    this.socket.on("connect", (socket) => {
      console.log("Frontend Connected! Socket Id: " + this.socket.id);
    });
  }

  emiter() {
    // debugger
    // let newNum = this.state.test + 1;
    let toggle = true
    if(this.state.test) toggle = false;
    this.socket.emit("incoming data", toggle);
    // this.setState({ test: toggle });
    // this.setState({test: newNum}) <---------
  }

  emiter2() {
    // this.socketNsp = socketIOClient('/my-namespace');
  }
  // emiter() { working with numbers
  //   // debugger
  //   let newNum = this.state.test + 1;
  //   this.socket.emit("incoming data", newNum);
  //   this.setState({ test: newNum });
  //   // this.setState({test: newNum}) <---------
  // }

  render() {
    if (this.state.test)
      return (
        <div>
          <h1>it worked!</h1>
          <button onClick={this.emiter}>Click</button>
          {/* <button onClick={this.emiter2}>Click2</button> */}
        </div>
      );
    else {
      return (
        <div>
          <h1>it did NOT work!</h1>
          <button onClick={this.emiter}>Click</button>
          <button onClick={this.emiter2}>Click2</button>
        </div>
      );
    }
  }
}
