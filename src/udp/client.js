const dgram = require('dgram');

/**
 * (node:14008) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues.
 * Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
 * @type {Buffer|Buffer}
 */
const message = new Buffer('深入浅出node.js');
const client = dgram.createSocket('udp4');
/**
 * 要发送的buffer
 * buffer的偏移量
 * buffer的长度
 * 目标端口目标地址
 * 发送后的回调
 */
client.send(message, 0, message.length, 41234, 'localhost', (error, bytes) => {
  client.close();
});
