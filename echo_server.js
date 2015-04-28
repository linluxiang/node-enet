'use strict';
var Buffer = require('buffer').Buffer;
var enet = require('./build/Release/enet');

enet.enet_initialize();

var address = new enet.ENetAddress();
enet.enet_address_set_host(address, '0.0.0.0');
address.port = 1234;

var server = enet.enet_host_create(address, 32, 2, 0, 0);

if (server === null) {
  console.log('create server fail');
}

var ioloop = function() {
  var enetEvent = new enet.ENetEvent();
  var error = enet.enet_host_service(server, enetEvent, 0);
  while (error > 0) {
    switch (enetEvent.type) {
      case enet.ENET_EVENT_TYPE_CONNECT:
        console.log('A new client connect');
        break;
      case enet.ENET_EVENT_TYPE_RECEIVE:
        var buffer = new Buffer(enetEvent.packet.dataLength, 'binary');
        buffer.write(enet.ConvertToString(enetEvent.packet.data));
        console.log('recived packet: ' + buffer);

        var packet = enet.enet_packet_create(buffer.toString(),
          buffer.length,
          enet.ENET_PACKET_FLAG_RELIABLE);
        enet.enet_peer_send(enetEvent.peer, 0, packet);
        console.log('send packet: ' + buffer);

        // Clean up the packet
        enet.enet_packet_destroy(enetEvent.packet);
        break;
      case enet.ENET_EVENT_TYPE_DISCONNECT:
        console.log(enetEvent.peer.data, ' disconnected!');
        enetEvent.peer.data = null;
    }
    error = enet.enet_host_service(server, enetEvent, 0);
  }
};

setInterval(function() {
  ioloop();
}, 10);

//enet.enet_host_destroy(server);
