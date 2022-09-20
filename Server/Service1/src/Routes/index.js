const Routes = function (app, IoSocket) {
  app.post("/join", (req, res) => {
    IoSocket.on("connection", (socket) => {
      console.log(socket.id);
    });
  });
};

module.exports = Routes;
