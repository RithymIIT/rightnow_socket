let app = require('express');
let http = require('http').Server(app);
var cors = require('cors');
//let io = require('socket.io')(http);
const allowedOrigins = [
   'capacitor://localhost',
   'ionic://localhost',
   'http://localhost',
   'http://localhost:8080',
   'http://localhost:8100'
 ];
const corsOptions = {
   origin: (origin, callback) => {
     if (allowedOrigins.includes(origin) || !origin) {
       callback(null, true);
     } else {
       callback(new Error('Origin not allowed by CORS'));
     }
   }
 }
 
 // Enable preflight requests for all routes
 app.options('*', cors(corsOptions));
 
 app.get('/', cors(corsOptions), (req, res, next) => {
   res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
 })
io.on('connection', function(socket) {
  console.log('A user connected');

  //Send a message after a timeout of 4seconds
  setTimeout(function() {
     socket.send('Sent a message 4seconds after connection!');
  }, 4000);

  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});


var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('socket running on port :' + port);
});

module.exports = app;
