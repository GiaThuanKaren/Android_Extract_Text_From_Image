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
      console.log(data, id);
    });
  },
  ReciveText: function (socket) {
    socket.oon("recive-text", (data, id) => {});
  },
};

module.exports = { EventFromSocket };
