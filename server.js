const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.options("*", cors());
const bodyParser = require("body-parser");
const path = require("path");

var userTable = {};
var users = 0;

app.use(express.static(path.join("client/build")));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  console.log(port);
});
app.get("/api/get-users", (request, response) => {
  console.log("recieved");
  users++;
  response.json({ user: [userTable], total: users });
});
app.post("/api/login", (request, response) => {
  let ip =
    request.headers["x-forwarded-for"] ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    (request.connection.socket
      ? request.connection.socket.remoteAddress
      : null);
  userTable[ip] = request.body.username;
  console.log(userTable);
  response.json({ ip: ip });
});
