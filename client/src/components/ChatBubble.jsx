import React, { Component } from "react";

class ChatBubble extends Component {
  state = {};
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
            }}
          >
            {this.props.msg}
          </div>
          <div style={{ display: "flex" }}>
            <p
              style={{
                marginTop: "0px",
                marginBottom: "0px",
                marginLeft: this.props.isSelf ? "auto" : 2 * window.vH + "px",
                color: "white",
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
