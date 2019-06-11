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
    checkMessage(msg, connectedUser);
    io.emit("chat message", `${connectedUser.name}: ${msg}`);
  });
});

function checkMessage(msg, sender) {
  const msgReducer = (acc, cur) => acc + " " + cur;

  switch (msg) {
    case msg.includes("/w"):
      let whisper = msg.split(" ");
      let receiver = msg[1];
      msg.splice(0, 2); //removes /w and receiver name
      let message = msg.reduce(msgReducer);
      //find socket with given name
      let receiverSocket = users.filter(user => user.name === receiver);
      io.emit("whisper", receiverSocket, message);
      break;

    default:
      console.log("msg is not a command");
      break;
  }
}

http.listen(3000, () => {
  console.log("listening on *:3000");
});
