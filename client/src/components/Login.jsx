import React, { Component } from "react";
class Login extends Component {
  render() {
    return (
      <div
        className="login-container center-completely"
        style={{
          width: this.props.width + "px",
          height: this.props.height + "px",
          opacity: "100%",
        }}
      >
        <h1 style={{ marginBottom: 2 * window.vH, fontSize: window.vH * 8 }}>
          Login
        </h1>
        <div
          style={{
            width: window.isMobile
              ? window.vH * 40 * 0.8
              : this.props.width * 0.7,
            height: 4 * window.vH,
            overflow: "hidden",
            borderRadius: "100px",
            positive: "relative",
            display: "flex",
          }}
        >
          <input
            className="login-input"
            style={{
              width: "100%",
              height: "100%",
              fontSize: 3 * window.vH,
              padding: "0px " + 2 * window.vH + "px 0px",
            }}
            onKeyDown={(e) => {
              e.target.value =
                e.target.value.length <= 15
                  ? e.target.value
                  : e.target.value.substring(0, 15);
            }}
          />
          <div
            className="login-error-alert"
            style={{
              width: 2 * window.vH + "px ",
              height: "100%",
              fontSize: 3 * window.vH,
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "rgba(255, 255, 255, 1)";
              e.target.style.width = e.target.parentElement.offsetWidth + "px";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "rgba(255, 255, 255, 0)";
              e.target.style.width = 2 * window.vH + "px";
            }}
          ></div>
        </div>
        <button
          onMouseDown={() => {
            let input = document.getElementsByClassName("login-input")[0].value;
            let errorAlert = document.getElementsByClassName(
              "login-error-alert"
            )[0];
            let isValidLogin = input.length <= 15 && input.length > 0;
            if (isValidLogin) {
              errorAlert.style.visibility = "hidden";
              this.props.login(
                document.getElementsByClassName("login-input")[0].value
              );
            } else {
              if (input.length === 0) {
                errorAlert.textContent = "Please enter a username";
                errorAlert.style.visibility = "visible";
              }
            }
          }}
          className="login-button center-completely"
          style={{
            width: window.isMobile
              ? window.vH * 40 * 0.5
              : this.props.width * 0.4,
            height: 6 * window.vH,
            fontSize: 3 * window.vH,
            marginTop: 4 * window.vH,
          }}
        >
          Enter
        </button>
      </div>
    );
  }
}

export default Login;
