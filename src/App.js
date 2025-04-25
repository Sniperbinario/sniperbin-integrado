
import React, { useEffect, useState } from 'react';

function App() {
  const [candle, setCandle] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCandle(data);
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>SniperBin (Live Data)</h1>
      {candle ? (
        <div>
          <h3>Par: {candle.par}</h3>
          <p>Horário: {candle.horario}</p>
          <p>Direção: {candle.tendencia || '-'}</p>
          <p>Open: {candle.open}</p>
          <p>Close: {candle.close}</p>
        </div>
      ) : (
        <p>Aguardando dados em tempo real...</p>
      )}
    </div>
  );
}

export default App;
