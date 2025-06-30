const express = require('express');
const router = express.Router();

router.get('/check', (req, res) => {
  res.json({
    status: "ok",
    message: "HealthEcho AI health check endpoint is working! 💙"
  });
});

module.exports = router;
