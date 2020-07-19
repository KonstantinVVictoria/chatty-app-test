import React, { Component } from "react";
import sendSVG from "./images/send.svg";

class ChatBar extends Component {
  state = {};
  render() {
    return (
      <div className="chatbar-container">
        <div
          className="center-completely"
          style={{ width: "90%", height: "70%", margin: "0 auto" }}
        >
          <input
            className="chatbar-input"
            style={{
              padding: `0px ${window.vH * 40 * 0.1 * 0.9 * 0.5}px 0px`,
              fontSize: 3 * window.vH + "px",
            }}
          />
          <button
            className="chatbar-send"
            onMouseDown={() => {
              this.props.sendMessage(
                document.getElementsByClassName("chatbar-input")[0].value
              );
            }}
          >
            <img
              alt="Send"
              src={sendSVG}
              style={{
                height: "50%",
                width: "50%",
                marginLeft: window.vH * 1 + "px",
                filter: "invert()",
                pointerEvents: "none",
              }}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default ChatBar;
