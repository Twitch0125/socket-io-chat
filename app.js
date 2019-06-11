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
  let newUser = new User(socket, name.first());
  users.addUser(newUser);
  console.log("a user connected ");

  socket.on("disconnect", () => {
    users.removeUser(newUser);
    console.log(`user disconnected`);
  });
  socket.on("chat message", msg => {
    runCommand(newUser, msg);
    io.emit("chat message", `${newUser.getName()}: ${msg}`);
  });
});

function runCommand(user, message) {
  let messageReducer = (accumulator, currentValue) =>
    accumulator + " " + currentValue;
  let commands = message.split(" ");
  switch (commands[0]) {
    case "/w":
      let receiver = commands[1];
      commands.splice(0, 2); //removes /w and receiver
      let message = commands.reduce(messageReducer);
      user.whisper(receiver, message);
      break;
    case "/nickname":
      commands.splice(0, 1);
      user.nickname(commands.reduce(messageReducer));
      break;
    default:
      return 0;
  }
}

http.listen(3000, () => {
  console.log("listening on *:3000");
});
