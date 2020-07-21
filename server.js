const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.options("*", cors());
const bodyParser = require("body-parser");
const path = require("path");
const e = require("express");

app.use(express.static(path.join("client/build")));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

server = require("http").createServer(app);
server.listen(port);
var io = require("socket.io").listen(server);

var userTable = {};
var users = 0;
var msgs = [];
io.on("connection", (socket) => {
  users++;
  console.log("connected");
  socket.emit("users_count", users);
  console.log(users);
  socket.on("get-messages", function (msg) {
    if (msgs.length < 25) {
      msgs.unshift(msg);
    } else {
      msgs.unshift(msg);
      msgs.pop();
    }
    console.log(msgs.length);
    io.sockets.emit("send-messages", msgs);
  });
  socket.on("disconnect", (reason) => {
    users--;
    console.log("disconnected");
  });
});

app.get("/api/get-users", (request, response) => {
  console.log("recieved");

  response.json({ user: userTable, total: users });
});

app.post("/api/login", (request, response) => {
  users++;
  let ip =
    request.headers["x-forwarded-for"] ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    (request.connection.socket
      ? request.connection.socket.remoteAddress
      : null);
  userTable[ip] = request.body.username;
  response.json({ ip: ip, users: userTable });
});
