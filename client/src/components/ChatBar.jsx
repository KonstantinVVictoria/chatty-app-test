import React, { Component } from "react";
import sendSVG from "./images/send.svg";

class ChatBar extends Component {
  state = {};
  render() {
    console.log(window.vH * (window.isMobile ? 100 : 80) * 0.1 + "px");
    return (
      <div
        className="chatbar-container"
        style={{
          height: window.vH * (window.isMobile ? 100 : 80) * 0.1 + "px",
          width: window.vW * (window.isMobile ? 100 : 40) + "px",
        }}
      >
        <div
          className="center-completely"
          style={{
            width: window.vW * (window.isMobile ? 100 : 40) * 0.9 + "px",
            height: window.vH * (window.isMobile ? 100 : 80) * 0.7 * 0.1 + "px",
            margin: "0 auto",
          }}
        >
          <input
            className="chatbar-input"
            style={{
              width: window.vW * (window.isMobile ? 100 : 40) * 0.9 + "px",
              height:
                window.vH * (window.isMobile ? 100 : 80) * 0.7 * 0.1 + "px",
              padding: `0px ${window.vH * 40 * 0.1 * 0.9 * 0.5}px 0px`,
              fontSize: 3 * window.vH + "px",
            }}
            onChange={(e) => {
              e.target.value =
                e.target.value.length <= 250
                  ? e.target.value
                  : e.target.value.substring(0, 250);
            }}
          />
          <button
            className="chatbar-send"
            style={{
              width:
                window.vW * (window.isMobile ? 100 : 40) * 0.9 * 0.1 + "px",
              height:
                window.vH * (window.isMobile ? 100 : 80) * 0.7 * 0.1 + "px",
            }}
            onMouseDown={() => {
              this.props.sendMessage(
                document.getElementsByClassName("chatbar-input")[0].value
              );
              document.getElementsByClassName("chatbar-input")[0].value = "";
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
