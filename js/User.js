class User {
  constructor(socket, name) {
    this.socket = socket;
    this.name = name;
  }
  getName() {
    return this.name;
  }
  getSocket() {
    return this.socket;
  }

  whisper(receiver, message) {
    receiver.emit("whisper", `from ${this.getName()}: ${message}`);
  }

  nickname(newName) {
    this.name = newName;
  }
}

module.exports = User;
