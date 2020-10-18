const dgram = require('dgram');

const server = dgram.createSocket('udp4');
server.on('message', (message, remoteInfo) => {
  console.log(message, remoteInfo);
});
server.on('listening', () => {
  const address = server.address();
  console.log(address.address);
});
server.bind(41234);
