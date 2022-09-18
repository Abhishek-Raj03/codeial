// npm install cors(cross origin resourse sharing)
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
        })
    });
}