# Farmer Genius - Smart Solutions for Farmers

## Overview
Farmer Genius is a comprehensive farming assistant web application that provides smart tools and information to help farmers make informed decisions and improve their agricultural practices.

## Project Structure
This is a static HTML/CSS/JavaScript website with the following components:

### Files:
- `index.html` - Main homepage with hero section, about info, and navigation
- `tools.html` - Farming tools page with calculators and guides
- `styles.css` - Complete styling for all pages with responsive design
- `script.js` - Interactive JavaScript functionality including calculators and AI chat
- `logo.png` - Logo image for the application
- `server.js` - Node.js HTTP server to serve static files

### Features:
1. **Smart Calculators**
   - Fertilizer Calculator: NPK requirements based on crop and area
   - Irrigation Planner: Water requirement calculation
   
2. **Crop Calendar** 
   - Planting and harvesting schedules for different crops
   - Climate and growing period information

3. **Government Schemes**
   - Information about PM-KISAN, crop insurance, subsidies
   
4. **AI Assistant**
   - Real AI chatbot powered by Mistral 7B model via OpenRouter
   - Agriculture-focused responses with practical farming advice
   - Quick question buttons and intelligent, context-aware responses

5. **Soil Test Guide**
   - Step-by-step soil testing process
   - Improvement recommendations

## Technical Setup

### Server Configuration:
- **Host**: 0.0.0.0 (configured for Replit proxy)
- **Port**: 5000 (required for Replit frontend)
- **Cache Control**: Disabled for development (no-cache headers)
- **CORS**: Enabled for cross-origin requests

### Deployment:
- **Target**: Autoscale (stateless web application)
- **Command**: `node server.js`
- **Type**: Frontend static website

### Workflow:
- **Name**: Server
- **Command**: `node server.js`
- **Port**: 5000
- **Output**: webview

## Development Status
✅ Project successfully imported and configured for Replit environment
✅ Static file server running on port 5000
✅ All interactive features functional (calculators, chat, navigation)
✅ Deployment configuration completed
✅ Responsive design working across devices

## Recent Changes
- 2025-09-25: AI Chatbot upgraded to real Mistral 7B model
  - Replaced mock chatbot responses with real AI integration
  - Added backend API endpoint (/api/chat) for AI processing
  - Integrated OpenRouter API with Mistral 7B Instruct model
  - Configured agriculture-focused system prompts for farming advice
  - Real-time AI responses for farming questions and guidance
- 2025-09-21: GitHub import setup completed and verified
  - Confirmed Node.js server configuration (serving on 0.0.0.0:5000)
  - Workflow configuration verified and running
  - Deployment configuration set to autoscale
  - All interactive features tested and functional
- 2025-09-18: Initial import and setup completed
- Added Node.js server for static file serving
- Configured for Replit environment with proper host/port settings
- Set up autoscale deployment configuration

## User Preferences
- Clean, modern agricultural-themed design
- Interactive tools with real-time calculations
- Mobile-responsive layout
- Accessible interface with clear typography

## Architecture Notes
- Pure frontend application with client-side JavaScript
- No backend database required (uses hardcoded agricultural data)
- Scalable static hosting approach
- Easy to maintain and extend with additional farming tools