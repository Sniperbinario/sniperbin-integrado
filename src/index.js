
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });
console.log("Servidor WebSocket ativo na porta 3000.");

wss.on('connection', (ws) => {
  console.log("Cliente conectado!");
  setInterval(() => {
    const data = JSON.stringify({ price: (Math.random() * 100 + 1000).toFixed(2) });
    ws.send(data);
  }, 1000);
});
