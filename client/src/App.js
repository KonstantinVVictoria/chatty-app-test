import React from "react";
import LoadingBar from "./components/LoadingBar.jsx";
import Chatroom from "./components/Chatroom.jsx";
window.vW = window.innerWidth / 100;
window.vH = window.innerHeight / 100;
window.isMobile = window.innerWidth < 1200;
function App() {
  return (
    <div
      className="App"
      style={{
        paddingTop: 6 * window.vH,
      }}
    >
      <Chatroom
        width={40 * window.vW}
        height={80 * window.vH}
        stage="login"
      ></Chatroom>
    </div>
  );
}

export default App;
