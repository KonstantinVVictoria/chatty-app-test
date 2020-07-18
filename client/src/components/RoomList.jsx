import React, { Component } from "react";
class RoomList extends Component {
  state = { activeUsers: null };
  componentDidMount = () => {
    this.getUsers();
  };
  getUsers = () => {
    fetch("http://localhost:5000/api/get-users").then((response) => {
      response.json().then((response) => {
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
              Active Users <br />
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
