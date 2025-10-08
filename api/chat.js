// Vercel serverless API route for AI chat (POST /api/chat)
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1'
});

async function getJsonBody(req) {
  if (req.body && Object.keys(req.body).length !== 0) return req.body;
  return await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', err => reject(err));
  });
}

module.exports = async (req, res) => {
  // Allow simple CORS for testing (remove or tighten in production)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  try {
    const body = await getJsonBody(req);
    const message = (body && body.message) ? String(body.message) : '';

    if (!message) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Message is required' }));
      return;
    }

    const systemPrompt = `You are an expert agricultural AI assistant for Indian farmers. Your name is Farm AI Assistant. You help farmers with:
- Crop selection and planting advice
- Fertilizer and irrigation guidance
- Pest and disease management
- Soil health and testing
- Weather planning
- Government schemes and subsidies
- Market prices and selling tips
- Organic farming practices
- Farm technology and apps

Provide practical, actionable advice in simple language. Use relevant emojis. Keep responses concise but informative (2-4 sentences). Focus on solutions that work for small to medium farms in India.`;

    const response = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct:free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 300
    });

    const aiResponse = (response && response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) || '';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ response: aiResponse }));

  } catch (error) {
    console.error('/api/chat error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'AI request failed. Check server logs.' }));
  }
};