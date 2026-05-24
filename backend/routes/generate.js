const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  try {

    const { prompt } = req.body;

    const response = await axios.post(
      'https://queue.fal.run/fal-ai/kling-video/v1/standard/text-to-video',
      {
        prompt
      },
      {
        headers: {
          Authorization: `Key ${process.env.FAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ error: 'Generation Failed' });
  }
});

module.exports = router;
