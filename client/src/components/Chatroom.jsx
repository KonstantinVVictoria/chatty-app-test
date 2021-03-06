import React, { Component } from "react";
import LoadingBar from "./LoadingBar.jsx";
import Login from "./Login.jsx";
import RoomList from "./RoomList.jsx";
import Chat from "./Chat.jsx";
class Chatroom extends Component {
  state = { username: null, stage: "login" };

  renderStage = () => {
    switch (this.state.stage) {
      case "login":
        return (
          <Login
            width={this.props.width * 0.7}
            height={this.props.height * 0.5}
            login={this.login}
          ></Login>
        );
      case "lobby":
        return <RoomList></RoomList>;
      case "chat":
        return <Chat user={this.state.username}></Chat>;
      default:
        return "";
    }
  };

  loading = (isLoading) => {
    return isLoading ? (
      <div
        className="center-completely"
        style={{
          width: this.props.width + "px",
          height: this.props.height + "px",
          position: "absolute",
        }}
      >
        <LoadingBar
          width={15 * window.vW}
          height={2.5 * window.vH}
          isLoading={this.state.mainLoader}
          setStage={this.setStage}
        ></LoadingBar>
      </div>
    ) : (
      ""
    );
  };

  login = (username) => {
    this.setState({ username: username, stage: "chat" });
  };

  render() {
    return (
      <div
        className="chatroom-container center-completely"
        style={{
          width: window.isMobile ? window.innerWidth : this.props.width + "px",
          height: window.isMobile
            ? window.innerHeight
            : this.props.height + "px",
          margin: "0 auto",
          marginTop: window.isMobile ? "0px" : window.vH * 10 + "px",
        }}
      >
        {this.renderStage()}
      </div>
    );
  }
}

export default Chatroom;
