class User {
  constructor(socket, name) {
    this.socket = socket;
    this.name = name;
  }

  whisper(receiver, message) {}

  getName() {
    return this.name;
  }
  getSocket() {
    return this.socket;
  }
}
