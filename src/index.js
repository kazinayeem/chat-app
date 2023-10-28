const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const userRouter = require("./router/userRouter");
const http = require("http");
const path = require("path");
const app = express();

const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
  transports: ["websocket", "polling", "flashsocket"],
});
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>welcome</h1>");
});

app.use("/api", userRouter);

// sock

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("message", (data) => {
    const user = {
      data: data,
      id: socket.id,
    };
    console.log(user);
    io.emit("mess", user);
  });

  socket.on("disconnect", (reason) => {
    console.log("a user disconnect");
    console.log(reason);
  });
});

server.listen(process.env.PORT, () => {
 
  console.log(` app listening on port ${process.env.PORT}`);
});
