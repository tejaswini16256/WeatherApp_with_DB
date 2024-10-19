const express = require('express');
const path = require('path');
const connectDB = require('./database');
const weatherMonitor = require('./weatherMonitor');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/weather-summary', async (req, res) => {
  try {
    const summary = await weatherMonitor.getWeatherSummary();
    res.json(summary);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/alerts', async (req, res) => {
  const threshold = parseInt(req.query.threshold) || 35;
  try {
    const alerts = await weatherMonitor.getAlerts(threshold);
    res.json(alerts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

weatherMonitor.startMonitoring();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
