import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
          res.send('Hello World!');
});

app.get("/apple", (req, res) => {
          res.send("This is the response from the apple endpoint");
});

app.post("/mobile", (req, res) => {
          const { name, price } = req.body;
          res.json({
                    name: name,
                    price: price
          });
});

const userNamespace = io.of('/user');
userNamespace.on("connection", (socket) => {
          console.log("namespace user connected");
});

io.on('connection', (socket) => {
          console.log('a user connected');

          socket.on("message", (value) => {
                    socket.emit("serverres", value);
          });

          socket.on('disconnect', () => {
                    console.log('user disconnected');
          });
});

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
          console.log(`Server is running on port ${ PORT }`);
});
