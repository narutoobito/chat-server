const PORT = process.env.PORT
const io = require('socket.io')(PORT||3000)
io.on('connection',socket=>{
const users= {}
socket.on('new-user',user=>
{
users[socket.id]=user;
socket.broadcast.emit('user-connected',user)
})
socket.on('send-chat-message', message=>{
socket.broadcast.emit('chat-message',{user: users[socket.id],message})
})
socket.on('disconnect', ()=>{
socket.broadcast.emit('user-disconnect', users[socket.id])
delete users[socket.id]
})

})
