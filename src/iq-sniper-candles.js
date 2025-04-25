
const WebSocket = require('ws');

const PAIRS = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'EURJPY'];
const SOCKET_URL = 'wss://iqoption.com/echo/websocket';

const ws = new WebSocket(SOCKET_URL);

let heartbeatInterval;
let sessionId = `sniper-${Date.now()}`;

ws.on('open', () => {
  console.log('✅ Conectado ao WebSocket da IQ Option');

  send({ name: 'ssid', msg: sessionId });

  PAIRS.forEach(pair => {
    send({
      name: 'subscribeMessage',
      msg: {
        name: 'candle-generated',
        params: {
          routingFilters: {
            active_id: getActiveId(pair),
            size: 60,
            to: Date.now(),
          }
        }
      }
    });
  });

  heartbeatInterval = setInterval(() => send({ name: 'ping' }), 15000);
});

ws.on('message', data => {
  try {
    const parsed = JSON.parse(data);
    if (parsed.name === 'candle-generated') {
      const { active_id, size, value } = parsed.msg;
      const pair = getPairFromId(active_id);
      console.log(`📈 ${pair} | Abertura: ${value.open} | Fechamento: ${value.close}`);
    }
  } catch (e) {}
});

function send(data) {
  ws.send(JSON.stringify(data));
}

function getActiveId(pair) {
  const MAP = {
    EURUSD: 1,
    GBPUSD: 2,
    USDJPY: 3,
    AUDUSD: 4,
    EURJPY: 7,
  };
  return MAP[pair] || 1;
}

function getPairFromId(id) {
  const REVERSE = {
    1: 'EURUSD',
    2: 'GBPUSD',
    3: 'USDJPY',
    4: 'AUDUSD',
    7: 'EURJPY'
  };
  return REVERSE[id] || 'UNKNOWN';
}

process.on('exit', () => clearInterval(heartbeatInterval));
