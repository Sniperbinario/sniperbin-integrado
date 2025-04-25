
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>SniperBin Backend Online ✅</h1>');
}
