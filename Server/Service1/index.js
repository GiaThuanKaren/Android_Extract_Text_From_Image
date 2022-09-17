const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const { EventFromSocket } = require("./src/Events");

const PORT = process.env.PORT || 5000;
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
});
app.use("/", (req, res) => {
  res.send("...");
});

io.on("connection", function (socket) {
  console.log(socket.id);
  EventFromSocket.SendMessage(socket);
  socket.on("join-room", (room) => {
    console.log(room, "Joined");
    socket.join(room);
  });
});

server.listen(PORT, () => {
  console.log("Running at " + PORT);
});
