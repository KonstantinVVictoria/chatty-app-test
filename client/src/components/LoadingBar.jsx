import React, { Component } from "react";
class LoadingBar extends Component {
  state = { isLoading: false };
  componentDidMount = () => {
    document.getElementsByClassName(
      "loading-bar-container"
    )[0].style.opacity = 0;
    if (this.state.isLoading) {
      setTimeout(() => {
        document.getElementsByClassName(
          "loading-bar-container"
        )[0].style.opacity = 1;
        this.loadingAnimation();
      }, 1000);
    }
  };
  loadingAnimation = () => {
    if (this.state.isLoading) {
      document.getElementsByClassName("loading-ball 1")[0].style.marginLeft =
        -this.props.height + "px";

      setTimeout(() => {
        document.getElementsByClassName("loading-ball 1")[0].style.marginLeft =
          this.props.width + this.props.height + "px";
        setTimeout(() => {
          this.loadingAnimation(this.state.isLoading);
        }, 1000);
      }, 1000);
    } else {
      document.getElementsByClassName("loading-ball 1")[0].style.transition =
        "margin-left 1000ms ease;";
      document.getElementsByClassName("loading-ball 1")[0].style.marginLeft =
        0 + "px";
      setTimeout(() => {
        document.getElementsByClassName(
          "loading-bar-container"
        )[0].style.width = this.props.height + "px";
        setTimeout(() => {
          document.getElementsByClassName(
            "loading-bar-container"
          )[0].style.opacity = 0;
          setTimeout(() => {
            document.getElementsByClassName(
              "loading-bar-container"
            )[0].style.display = "none";
          }, 1000);
        }, 500);
      }, 1000);
    }
  };
  static getDerivedStateFromProps(props, current_state) {
    if (current_state.isLoading !== props.isLoading) {
      return {
        isLoading: props.isLoading,
      };
    }
    return null;
  }
  render() {
    return (
      <React.Fragment>
        <div
          className="loading-bar-container"
          style={{
            width: this.props.width,
            height: this.props.height,
          }}
        >
          <div
            className="loading-ball 1"
            style={{ width: this.props.height, marginLeft: -this.props.height }}
          ></div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoadingBar;
