import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import ChatBubble from "./ChatBubble.jsx";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000");
socket.on("connect", function () {
  socket.on("users_count", function (data) {
    console.log(data);
  });

  socket.on("introduceto", function (data) {
    console.log(data);
  });
});

class Chat extends Component {
  state = {
    msg: [],
  };

  constructor(props) {
    super(props);
    socket.emit("introduction", this.props.user);
    let newMsg = {};
    newMsg["user"] = this.props.user;
    newMsg["msg"] = "Hello everyone, my name is " + this.props.user + "!";
    newMsg["isSelf"] = true;
    this.state.msg.push(newMsg);
    socket.emit("get-messages", newMsg);
  }

  componentDidMount = () => {
    let component = this;
    socket.on("send-messages", function (msg) {
      console.log("yes");
      let msgs = component.state.msg.slice();
      msgs.push(msg);
      msgs.reverse();
      console.log(msgs);
      component.setState({ msg: msgs });
    });
  };

  sendMessage = (msg) => {
    let sendMsg = { user: this.props.user, msg: msg, isSelf: false };
    socket.emit("get-messages", sendMsg);
    sendMsg.isSelf = true;
    let msgs = this.state.msg.slice();

    msgs.unshift(sendMsg);
    this.setState({ msg: msgs });
  };
  populateChat = () => {
    let msgs = [];
    this.state.msg.forEach((msg, index) => {
      msgs.push(
        <ChatBubble
          key={index}
          user={msg.user}
          msg={msg.msg}
          isSelf={msg.isSelf}
          style={{ fontSize: 2 * window.vH }}
        ></ChatBubble>
      );
    });
    return <React.Fragment>{msgs}</React.Fragment>;
  };
  render() {
    console.log("render");
    return (
      <div className="chat-container center-completely">
        <div className="chat">{this.populateChat()}</div>
        <ChatBar sendMessage={this.sendMessage}></ChatBar>
      </div>
    );
  }
}

export default Chat;
