import React, { Component } from "react";
class RoomList extends Component {
  state = { activeUsers: null };
  componentDidMount = () => {
    this.getUsers();
  };
  getUsers = () => {
    fetch(window.domain + "/api/get-users").then((response) => {
      response.json().then((response) => {
        console.log(response);
        this.setState({ activeUsers: response.user[0] });
      });
    });
  };
  render() {
    return (
      <div
        className="room-list-container"
        style={{ width: "80%", height: "90%" }}
      >
        {(() => {
          let string = [
            <h1>
              Active Users <br></br>
            </h1>,
          ];
          if (this.state.activeUsers)
            Object.values(this.state.activeUsers).forEach((name) => {
              string.push(
                <div>
                  {name}
                  <br />
                </div>
              );
            });
          return string;
        })()}
      </div>
    );
  }
}

export default RoomList;
