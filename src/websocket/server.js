const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(express.static(__dirname));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('链接成功！');
  ws.on('message', (data) => {
    /**
     * 把消息发送到所有的客户端
     * wss.clients获取所有链接的客户端
     */
    wss.clients.forEach((client) => {
      client.send(data);
    });
  });
});

server.listen(8000, function listening() {
  console.log('服务器启动成功！');
});
