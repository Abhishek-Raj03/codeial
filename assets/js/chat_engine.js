class ChatEngine{
    constructor(chatBoxId,userEmail,userName){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.name=userName

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
      $('#button-addon2').click(function(){
        // e.preventDefault();
        console.log('button clicked');
        let msg=$('#chat-message-input').val();
            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    user_name:self.name,
                    chatroom: 'codeial'
                });
            }
      })
      self.socket.on('receive_message',function(data){
  
      let newMessage1=$(`<div class="d-flex justify-content-between">
      <p class="small mb-1" id="name" ></p>
      <p class="small mb-1 text-muted" id="date"></p>
    </div>
    <div class="d-flex flex-row justify-content-start">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
        alt="avatar 1" style="width: 45px; height: 100%;">
      <div>
        <p class="small p-2 ms-3 mb-3 rounded-3" id="ab" style="background-color: #f5f6f7;"></p>
      </div>
    </div>`);

    let newMessage2=$(`<div class="d-flex justify-content-between">
    <p class="small mb-1 text-muted" id="date"></p>
    <p class="small mb-1" id="name"></p>
  </div>
  <div class="d-flex flex-row justify-content-end mb-4 pt-1">
    <div>
      <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-warning" id="ab"></p>
    </div>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
      alt="avatar 1" style="width: 45px; height: 100%;">
  </div>`);

        let d=new Date();
        if (data.user_email == self.userEmail){
                   $(' #date',newMessage2).html(d.toLocaleTimeString());
                    $(' #name',newMessage2).html(data.user_name);
                    $(' #ab',newMessage2).html(data.message);
                    $('#xyz').append(newMessage2);
                }
                else{
                  $(' #date',newMessage1).html(d.toLocaleTimeString());
                  $(' #name',newMessage1).html(data.user_name);
                  $(' #ab',newMessage1).html(data.message);
                    $('#xyz').append(newMessage1);
                }
            
      })
      // for handmade chatbox
      // send the message by clicking the send message button
        // $('#send-message').click(function(){
        //     let msg=$('#chat-message-input').val();
        //     if (msg != ''){
        //         self.socket.emit('send_message', {
        //             message: msg,
        //             user_email: self.userEmail,
        //             chatroom: 'codeial'
        //         });
        //     }
        // })

        // self.socket.on('receive_message',function(data){
        //     console.log('message received', data.message);

        //     let newMessage = $('<li>');

        //     let messageType = 'other-message';

        //     if (data.user_email == self.userEmail){
        //         messageType = 'self-message';
        //     }

        //     newMessage.append($('<span>', {
        //         'html': data.message
        //     }));

        //     newMessage.append($('<sub>', {
        //         'html': data.user_email
        //     }));

        //     newMessage.addClass(messageType);

        //     $('#chat-messages-list').append(newMessage);
        // })
    
    }
}