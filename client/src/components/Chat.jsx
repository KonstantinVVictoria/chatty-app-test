import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import ChatBubble from "./ChatBubble.jsx";

import openSocket from "socket.io-client";
window.domain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://chatty-app-test.herokuapp.com";

const socket = openSocket(window.domain);
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
    let newMsg = {};
    newMsg["user"] = this.props.user;
    newMsg["msg"] = "Hello everyone, my name is " + this.props.user + "!";
    newMsg["isSelf"] = true;
    this.state.msg.push(newMsg);
    let sendMsg = {
      user: newMsg.user,
      msg: newMsg.msg,
      isSelf: false,
      id: socket.id,
    };
    socket.emit("get-messages", sendMsg);
  }

  componentDidMount = () => {
    window.onbeforeunload = () => {
      socket.emit("get-messages", {
        user: this.props.user,
        msg: "Goodbye everybody!",
        isSelf: false,
      });
    };

    let component = this;
    socket.on("send-messages", function (msg) {
      console.log(msg);
      let msgs = msg.map((msg) => {
        if (msg.id === socket.id) {
          return { user: msg.user, msg: msg.msg, isSelf: true };
        } else {
          return { user: msg.user, msg: msg.msg, isSelf: false };
        }
      });
      component.setState({ msg: msgs });
    });
  };

  sendMessage = (msg) => {
    let sendMsg = {
      user: this.props.user,
      msg: msg,
      isSelf: false,
      id: socket.id,
    };
    socket.emit("get-messages", sendMsg);
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
      <div
        className="chat-container center-completely"
        style={{ justifyContent: "start" }}
      >
        <div className="top-bar-shadow"></div>
        <div className="chat-outer">
          <div className="chat">{this.populateChat()}</div>
        </div>
        <ChatBar sendMessage={this.sendMessage}></ChatBar>
      </div>
    );
  }
}

export default Chat;
