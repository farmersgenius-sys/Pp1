const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const OpenAI = require('openai');

// Initialize OpenAI client for Mistral API via OpenRouter
// Using OpenAI client with OpenRouter base URL for Mistral model support
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1'
});

const PORT = 5000;
const HOST = '0.0.0.0';

// MIME types mapping
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

// Chat API endpoint using Mistral via OpenAI-compatible API
async function handleChatAPI(req, res) {
    if (req.method !== 'POST') {
        res.writeHead(405);
        res.end('Method Not Allowed');
        return;
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const { message } = JSON.parse(body);
            
            if (!message) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Message is required' }));
                return;
            }

            // Create farming-focused system prompt
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
                model: 'mistralai/mistral-7b-instruct:free', // Using Mistral model via OpenRouter
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                max_tokens: 300
            });

            const aiResponse = response.choices[0].message.content;
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ response: aiResponse }));
            
        } catch (error) {
            console.error('Chat API error:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ 
                error: 'Sorry, I\'m having trouble right now. Please try asking me about crops, fertilizers, irrigation, or other farming topics!' 
            }));
        }
    });
}

const server = http.createServer((req, res) => {
    // Add CORS headers and cache control
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    
    // Handle chat API endpoint
    if (parsedUrl.pathname === '/api/chat') {
        handleChatAPI(req, res);
        return;
    }

    let filePath = req.url === '/' ? './index.html' : `.${req.url}`;
    
    // Remove query parameters
    filePath = filePath.split('?')[0];
    
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, serve index.html for SPA routing
                fs.readFile('./index.html', (err, content) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Server Error');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`🌾 Farmer Genius server running on http://${HOST}:${PORT}`);
    console.log('✅ Static files being served from current directory');
    console.log('🚀 Ready to help farmers with smart solutions!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Server shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('Server shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});