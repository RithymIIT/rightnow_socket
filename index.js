let app = require('express');
let http = require('http').Server(app);
const options = { cors: { origin: '*', }, }; 
let io = require('socket.io')(http);

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
         io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
       });
     });
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
