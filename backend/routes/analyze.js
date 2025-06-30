const express = require('express');
const router = express.Router();

router.post('/symptoms', (req, res) => {
  const { symptoms } = req.body;

  // "Fake AI" logic for now
  let advice = "Please consult a professional doctor for further evaluation.";

  if (symptoms?.toLowerCase().includes("headache")) {
    advice = "It looks like a headache. Drink water and get some rest.";
  } else if (symptoms?.toLowerCase().includes("cough")) {
    advice = "It might be a cold or flu. Consider resting and monitor your temperature.";
  }

  res.json({ status: "ok", advice });
});

module.exports = router;
