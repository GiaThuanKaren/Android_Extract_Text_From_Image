const EventFromSocket = {
  SendMessage: function (socket) {
    socket.on("send-message", (data, id) => {
      console.log(id, "id User", data);
      if (data !== "") {
        if (id === "") {
          console.log("Send All");
          socket.broadcast.emit("received-message", data);
        } else {
          console.log("Send one, to " + id);
          socket.to(id).emit("received-message", data);
        }
      }
      console.log(data);
    });
  },
  SendText: function (socket) {
    socket.on("send-text", (data, id) => {
      socket.broadcast.emit("pass_text",data);
      // console.log(data, id);
    });
  },
  ReciveText: function (socket) {
    socket.on("recive-text", (data, id) => {});
  },
  CreateNewSession: function (socket) {
    socket.on("join-room", (room) => {
      console.log(room, "Joined");
      socket.join(room);
    });
  },
};

module.exports = { EventFromSocket };
