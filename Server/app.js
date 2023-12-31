const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const http = require("http"); 
const redis = require("redis");
const { Server } = require("socket.io"); 
var cron = require('node-cron');

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const pollRoutes = require("./routes/pollRoutes.js");
const notifRoutes=require("./routes/notiRoutes.js")

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

cron.schedule('* * * * *', () => {
  console.log('Running every minute');
});
   

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const redisClient = redis.createClient();

io.on("connection", (socket) => {
  console.log("A user connected");
  redisClient.subscribe("poll-updates");

  socket.on("vote", (pollId, optionIndex) => {
 
    redisClient.publish("poll-updates", pollId);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    redisClient.unsubscribe("poll-updates");
  });
  socket.on('newPollNotification', (data) => {
    io.emit('newPollNotification', data); 
    console.log("new poll created",data)
  });
  socket.on('Vote', (data) => {
    console.log('Vote received by:', data.username)
    io.emit('Vote', data); 
  })  
});

const mongoUrl = "mongodb://0.0.0.0:27017/livevoting";
mongoose.connect(mongoUrl, (err) => {
  if (err) throw err;
  console.log("Mongodb connected...🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/notification", notifRoutes);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
