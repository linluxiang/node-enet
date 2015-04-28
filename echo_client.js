'use strict';
var Buffer = require('buffer').Buffer;
var enet = require('./build/Release/enet');
var readline = require('readline');

enet.enet_initialize();

var address = new enet.ENetAddress();
enet.enet_address_set_host(address, '127.0.0.1');
address.port = 1234;

var client = enet.enet_host_create(null, 1, 2, 0, 0);

if (client === null) {
  console.log('create client fail');
}

var peer = enet.enet_host_connect(client, address, 2, 0);

if (peer === null) {
  console.log('create peer fail');
}

var sendMessage = function(msg) {
  var buffer = new Buffer(msg, 'binary');
  var packet = enet.enet_packet_create(buffer.toString(),
    buffer.length,
    enet.ENET_PACKET_FLAG_RELIABLE);
  enet.enet_peer_send(peer, 0, packet);
  enet.enet_host_flush(client);
  console.log('send packet: ' + buffer);
};

var loop = true;
var ioloop = function() {
  if (!loop)
    return;
  var enetEvent = new enet.ENetEvent();
  var error = enet.enet_host_service(client, enetEvent, 0);
  while (error > 0) {
    switch (enetEvent.type) {
      case enet.ENET_EVENT_TYPE_CONNECT:
        console.log('connected');
        break;
      case enet.ENET_EVENT_TYPE_RECEIVE:
        var recvBuffer = new Buffer(enetEvent.packet.dataLength, 'binary');
        recvBuffer.write(enet.ConvertToString(enetEvent.packet.data));
        console.log('recived packet: ' + recvBuffer);
        enet.enet_packet_destroy(enetEvent.packet);
        break;
      case enet.ENET_EVENT_TYPE_DISCONNECT:
        console.log(enetEvent.peer.data, ' disconnected!');
        clearInterval(interval);
        loop = false;
        break;
    }
    error = enet.enet_host_service(client, enetEvent, 0);
  }
};

//ioloop();
var interval = setInterval(function() {
  if (!loop)
    clearInterval(interval);
  ioloop();
}, 10);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function(line) {
  if (line !== '') {
    sendMessage(line);
  }
});

//enet.enet_host_destroy(client);
