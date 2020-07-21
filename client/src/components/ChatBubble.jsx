import React, { Component } from "react";

class ChatBubble extends Component {
  state = {};

  componentDidMount = () => {
    document.getElementsByClassName(
      "chat-outer"
    )[0].scrollTop = document.getElementsByClassName(
      "chat-outer"
    )[0].scrollHeight;
  };
  render() {
    return (
      <div
        className="chatbubble-container"
        style={{ marginBottom: window.vH * 2 + "px" }}
      >
        <div
          style={{
            marginLeft: this.props.isSelf ? "auto" : 2 * window.vH + "px",
            marginRight: this.props.isSelf ? 2 * window.vH + "px" : "auto",
            maxWidth: "80%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="bubble"
            style={{
              padding:
                window.vH + "px " + window.vH * 2 + "px " + window.vH + "px",
              backgroundColor: this.props.isSelf
                ? "rgb(136, 81, 209)"
                : "rgb(134, 134, 134)",
              borderRadius: this.props.isSelf
                ? "100px 100px 0px 100px"
                : "100px 100px 100px 0px",
            }}
          >
            {this.props.msg}
          </div>
          <div style={{ display: "flex" }}>
            <p
              style={{
                marginTop: "0px",
                marginBottom: "0px",

                marginLeft: this.props.isSelf ? "auto" : "0px",
                color: "rgb(134, 134, 134)",
                fontSize: window.vH * 2,
              }}
            >
              {this.props.isSelf ? "" : this.props.user}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBubble;
