const healthRoutes = require('./routes/health');
const analyzeRoutes = require('./routes/analyze');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('HealthEcho backend is running! 🚑');
});
app.use(express.json());
app.use('/api/health', healthRoutes);
app.use('/api/analyze', analyzeRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
