const express = require("express");
const app = express();
let User = require("./js/User");
let UserList = require("./js/UserList");
const http = require("http").Server(app);
const io = require("socket.io")(http);
var name = require("random-name");

let users = new UserList();

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});
io.on("connection", socket => {
  let newUser = new User(socket, name());
  UserList.addUser(newUser);
  console.log(UserList.getUsers());

  console.log("a user connected ");

  socket.on("disconnect", () => {
    console.log(`user disconnected`);
  });
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
