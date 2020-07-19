const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.options("*", cors());
const bodyParser = require("body-parser");
const path = require("path");

var io = require("socket.io")();
app.use(express.static(path.join("client/build")));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  console.log(port);
});

var userTable = {};
var users = 0;
var chat = [];
io.listen(3000);

io.on("connection", (socket) => {
  users++;
  console.log("connected");
  socket.emit("users_count", users);
  console.log(users);
  socket.on("introduction", function (name) {
    let msg = {};
    msg[`${name}`] = "Hello everyone, my name is " + name;
    socket.broadcast.emit("introduceto", msg);
  });
  socket.on("get-messages", function (msg) {
    socket.broadcast.emit("send-messages", msg);
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
