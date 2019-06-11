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

  whisper() {}
}

module.exports = User;
