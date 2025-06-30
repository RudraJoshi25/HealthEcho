const express = require('express');
const router = express.Router();
require('dotenv').config();
const fetch = require('node-fetch');


const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

router.post('/symptoms', async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ status: "error", message: "Symptoms are required." });
    }

    const prompt = `
    You are a professional health assistant.
    A user describes their symptoms as: "${symptoms}".
    Give one short, friendly paragraph of advice (maximum 1-2 sentences). Not all the possibile remedies but 1 or 2 which is effective. Keep it clear and easy to understand. Always mention seeing a doctor if needed.
    `;



    const response = await fetch(HUGGING_FACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 150
        }
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error(data);
      return res.status(500).json({ status: "error", message: data.error });
    }

    const fullText = data[0]?.generated_text || "Sorry, I could not generate advice.";

    const advice = fullText.replace(prompt, '').trim();

    res.json({ status: "ok", advice });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Something went wrong." });
  }
});

module.exports = router;
