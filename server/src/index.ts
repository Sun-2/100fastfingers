import ws from 'websocket';
import * as http from "http";

const server = http.createServer(function (request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);


});

server.listen(8080, function() {
  console.log((new Date()) + ' Server is listening on port 8080');
});

const wsServer = new ws.server({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on('request', function(request) {

  var connection = request.accept();
  console.log((new Date()) + ' Connection accepted.');
  connection.on('message', function(message) {
    console.log('mes')
    console.log(message.utf8Data);
  });
  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});