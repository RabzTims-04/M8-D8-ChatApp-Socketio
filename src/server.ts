import express from "express"
import cors from "cors"
import { createServer } from "http"
import  { Server } from "socket.io"


const app = express()
app.use(cors())
app.use(express.json())

const server = createServer(app)

const io = new Server(server, {
    allowEIO3: true
})

io.on('connection', socket => {
    console.log("new connection");

    //welcome to just the current user
    socket.emit('message', 'welcome to chat')

    //everyone is notified that user has connected except the user itself
    socket.broadcast.emit('message', 'A user has joined the chat')

    socket.on('disconnect', () => {
        //everyone is notified that user is leaving including the user
        io.emit('message', 'A user has left the chat')
    })

    //listen to chatmessage
    socket.on('chatMessage', (text) => {
        console.log(text);
        io.emit('message', text)
    })
})

const port = 3002 || process.env.PORT

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})