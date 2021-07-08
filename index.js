let app = require('express');
let http = require('http').Server(app);
const options = { cors: { origin: '*', }, }; 
let io = require('socket.io')(http);
var fs = require('fs');
//io.origins('*:*')
io.on('connection', function(socket) {
  console.log('A user connected');
  socket.on('disconnect', function(){
         io.emit('users-changed', {user: socket.nickname, event: 'left'});   
       });
      
       socket.on('set-nickname', (nickname) => {
         socket.nickname = nickname;
         io.emit('users-changed', {user: nickname, event: 'joined'});    
       });
       
       socket.on('add-message', (message) => {
         if(message.type === 'message'){
         io.emit('message', {text: message.text, from: socket.nickname, created: new Date(), type: "message"});
         }
         else {
          io.emit('message', {fileName: message.fileName, file: message.file, from: socket.nickname, created: new Date(), type: "image"});
         }
         console.log('a message', message.from);   
       });
     
     socket.on('base64 file', function(msg) {
      console.log('received base64 file from' + msg.username);
    socket.username = msg.username;
    // socket.broadcast.emit('base64 image', //exclude sender
    io.sockets.emit('base64 file',  //include sender
 
        {
          username: socket.username,
          file: msg.file,
          fileName: msg.fileName
        }
 
    );
});
    });

    //  socket.on('image', async image => {
    //   const buffer = Buffer.from(image, 'base64');
    //   console.log('image came from chat', buffer);
    //   await fs.writeFile('/image', buffer).catch(console.error);
    //   });
  //Send a message after a timeout of 4seconds
//   setTimeout(function() {
//      socket.send('Sent a message 4seconds after connection!');
//   }, 4000);

//   socket.on('disconnect', function () {
//      console.log('A user disconnected');
//   });
// });


var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('socket running on port :' + port);
});
