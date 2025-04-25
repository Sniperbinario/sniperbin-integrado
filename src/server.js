
const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Frontend conectado ao WebSocket');

  setInterval(() => {
    const candle = {
      par: 'EUR/USD',
      horario: new Date().toLocaleTimeString(),
      open: (1.1000 + Math.random() * 0.01).toFixed(5),
      close: (1.1000 + Math.random() * 0.01).toFixed(5)
    };
    ws.send(JSON.stringify(candle));
  }, 3000);
});

server.listen(3001, () => {
  console.log('Servidor de candles em tempo real rodando na porta 3001');
});
