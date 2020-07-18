import React, { Component } from "react";
import LoadingBar from "./LoadingBar.jsx";
import Login from "./Login.jsx";
import RoomList from "./RoomList.jsx";
class Chatroom extends Component {
  state = { mainLoader: true, username: null, stage: null };

  constructor(props) {
    super(props);
    this.state.stage = props.stage;
  }

  setStage = (stage) => {
    this.setState({ stage: stage });
  };

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
    console.log(process.env);
    document.getElementsByClassName(
      "login-container center-completely"
    )[0].style.opacity = 0;
    this.setState({ username: username });
    fetch(window.domain + "/api/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username,
      }),
    }).then((waitForResponse) =>
      waitForResponse.json().then((response) => {
        console.log(response);
        this.setState({ stage: "lobby" });
      })
    );
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
        }}
      >
        {this.renderStage()}
      </div>
    );
  }
}

export default Chatroom;
