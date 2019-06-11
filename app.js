const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
var name = require("random-name");
let users = [];

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});
io.on("connection", socket => {
  let connectedUser = { socket: socket, name: name() };
  users.push(connectedUser);
  console.log("a user connected " + connectedUser.name);

  socket.on("disconnect", () => {
    console.log(`user disconnected ${connectedUser.name}`);
  });
  socket.on("chat message", msg => {
    io.emit("chat message", `${connectedUser.name}: ${msg}`);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
