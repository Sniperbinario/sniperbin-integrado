const WebSocket = require('ws');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('Cliente conectado ao WebSocket');
  ws.send(JSON.stringify({ msg: 'Conexão WebSocket estabelecida com sucesso!' }));
});

server.listen(3000, () => {
  console.log('Servidor WebSocket e HTTP rodando na porta 3000');
});