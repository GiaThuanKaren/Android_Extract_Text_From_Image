const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { EventFromSocket } = require("./src/Events");
const Routes = require("./src/Routes");

const PORT = process.env.PORT || 443;
app.use(cors());
const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });
const io = require("socket.io")(server);
app.get("/", (req, res) => {
  res.send("Hi This Is Init Route");
});

Routes(app, io);

io.on("connection", function (socket) {
  console.log(socket.id);
  EventFromSocket.SendText(socket);
  EventFromSocket.CreateNewSession(socket);
});

server.listen(PORT, () => {
  console.log("Running at " + PORT);
});
