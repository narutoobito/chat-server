const PORT = process.env.PORT || 3000
const express= require("express")
const app = express()
const server = require("http").createServer(app)
const io = require('socket.io')(server)

const users = {}

io.on('connect',socket=>{
    console.log("a user connected")
    
    socket.on('new-user',user=>
    {
        if(!user) user="given name"
        console.log("connected",user)
        users[socket.id]=user;
        socket.broadcast.emit('user-connected',user)
        a=Object.keys(io.sockets.sockets)
        for(i of a) console.log(users[i])
    }) 
    
    socket.on('send-chat-message', message=>{
        console.log(message, "message")
        socket.broadcast.emit('chat-message',{user: users[socket.id],message})
    })
    

    socket.on('get-active-users',()=>{
        
        activeUsersId=Object.keys(io.sockets.sockets)
        activeUsers=[]
        for(i of activeUsersId) activeUsers.push(users[i])
        socket.emit('all-users',{activeUsers})
        
    })

    socket.on('disconnect', (reason)=>{
        if(!users[socket.id])users[socket.id]="fuddu"
        console.log(users[socket.id], "disconnected")
        console.log(reason)
        socket.broadcast.emit('user-disconnect', users[socket.id])
        delete users[socket.id]
    })

})


app.use("/",(req,res)=>res.send("hello"))

server.listen(PORT, ()=> console.log("listenning at ",PORT ))