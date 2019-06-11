class UserList {
  constructor() {
    this.users = [];
  }

  removeUser(targetUser) {
    this.users = this.users.filter(user => user != targetUser);
  }
  addUser(user) {
    this.users.push(user);
  }
  findUser(targetUser) {
    return this.users.filter(user => user == targetUser);
  }
  getUsers() {
    return this.users;
  }
  showUsers(socket) {
    socket.emit("show users", this.getUsers());
  }
}

module.exports = UserList;
