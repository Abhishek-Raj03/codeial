// npm install cors(cross origin resourse sharing)
const Chat=require('../models/chat');
const User=require('../models/user');

module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer,{cors:{origin:"*"}});

    io.sockets.on('connection',function(socket){ 
        console.log('new connection recieved',socket.id);

        socket.on('disconnect',function(){
            console.log('sockets disconnected');
        });
       
        socket.on('join_room',function(data){
            console.log('joining request rec',data);

            socket.join(data.chatroom);
            
            io.in(data.chatroom).emit('user_joined',data);
        });
        
        // detect send_message and broadcast to everyone in the room
        socket.on('send_message',function(data){
            Chat.create({
                content:data.message,
                user:data.user_id
            },function(err,chat){
                User.findById(data.user_id,function(err,user){
                    user.chats.push(chat);
                    user.save();
                });
                // data.chat_id=chat;
                
            })
           
            io.in(data.chatroom).emit('receive_message',data);

        })
     
    });
}