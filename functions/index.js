const functions = require("firebase-functions");
const fetch = require("node-fetch");

const ALLOWED_ORIGINS = [
  "https://portfolio-aggregator-fb32a.web.app",
  "https://portfolio-aggregator-fb32a.firebaseapp.com",
  "http://localhost:5000",
  "http://127.0.0.1:5000"
];

const SYMBOL_PATTERN = /^[A-Za-z0-9.^=\-]{1,20}$/;

exports.getStockPrice = functions.https.onRequest(async (req, res) => {
  // Set CORS headers — restrict to known origins
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  const symbol = req.query.symbol;
  if (!symbol) {
    res.status(400).json({ error: "Missing symbol parameter" });
    return;
  }

  if (!SYMBOL_PATTERN.test(symbol)) {
    res.status(400).json({ error: "Invalid symbol format" });
    return;
  }

  try {
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;

    const response = await fetch(yahooUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    if (!response.ok) {
      res.status(response.status).json({ error: `Yahoo API returned ${response.status}` });
      return;
    }

    const data = await response.json();

    // Filter response — only return the fields the client needs
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta || !meta.regularMarketPrice) {
      res.status(404).json({ error: "No price data found for symbol" });
      return;
    }

    res.json({
      regularMarketPrice: meta.regularMarketPrice,
      currency: meta.currency || "USD",
      symbol: meta.symbol || symbol
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
