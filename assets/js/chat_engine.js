class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler(); 
        }
    }
    connectionHandler(){
        let self=this;

        this.socket.on('connect',function(){
            console.log('connection established using sockets...!');
           
// a user sends(emits) request to join room ---> goes to server side(on) ---> server emits back to frontend user ---> user
//handles via (on) request
// user(emits) ---> server(on) ---> server(emits) ---> user(on)
            self.socket.emit('join_room',{ //emit name should be same of server side socket
                user_email:self.userEmail,
                chatroom:'codeial'
            });

            self.socket.on('user_joined',function(data){ //on name should be same of server side socket
                console.log('a user joined',data);
            });

      });
    
    }
}