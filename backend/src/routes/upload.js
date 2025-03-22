import express from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 } // 4MB limit
});

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Enhanced image validation
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validImageTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ 
        error: 'Invalid image format', 
        details: 'Please upload a JPEG, PNG, or WebP image' 
      });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",  // Updated model name
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1024,
      }
    });

    const prompt = `Analyze this plant image and provide detailed information in this exact format:

🌿 Plant Identification
-------------------------
Common Name: [name]
Scientific Name: [name]
Family: [family]
Origin: [origin]

🎯 Key Features
-------------------------
Plant Type: [type]
Height/Spread: [size]
Leaf Description: [description]
Flowering: [flowering info]
Growth Rate: [rate]

🌍 Growing Conditions
-------------------------
Light Requirements: [light]
Water Needs: [water]
Soil Type: [soil]
Temperature Range: [temp]
Humidity Level: [humidity]

💪 Benefits & Uses
-------------------------
Main Uses: [uses]
Environmental Benefits: [benefits]
Medicinal Properties: [properties]
Cultural Significance: [significance]

⚠️ Care & Precautions
-------------------------
Common Issues: [issues]
Toxicity: [toxicity]
Special Care Notes: [care]
Warning Signs: [warnings]

Please replace the bracketed text with relevant information. If information is not available, write "Not Available".`;

    // Simplified content structure for new API
    try {
      console.log('Sending request to Gemini API...');
      const result = await model.generateContent({
        contents: [{
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: Buffer.from(req.file.buffer).toString('base64')
              }
            }
          ]
        }]
      });

      const response = await result.response;
      console.log('Received response from Gemini API');

      // Check for blocked response
      if (response.promptFeedback?.blockReason) {
        throw new Error(`Content blocked: ${response.promptFeedback.blockReason}`);
      }

      const text = response.text();
      
      if (!text || text.trim() === '') {
        throw new Error('Empty response from AI model');
      }

      // Process the response to ensure proper formatting
      const formattedText = text
        .replace(/•/g, '→')  // Replace bullets with arrows
        .replace(/\n\n+/g, '\n\n')  // Remove extra blank lines
        .trim();

      res.json({ 
        success: true,
        description: formattedText
      });

    } catch (aiError) {
      console.error('Detailed AI Error:', {
        message: aiError.message,
        name: aiError.name,
        stack: aiError.stack
      });

      // More specific error handling
      const errorMessage = aiError.message?.includes('quota')
        ? 'API quota exceeded. Please try again later.'
        : 'Unable to process the image. Please ensure it\'s a clear photo of a plant.';

      res.status(422).json({ 
        success: false,
        error: 'AI processing failed',
        details: errorMessage
      });
    }
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error',
      details: error.message || 'An unexpected error occurred.'
    });
  }
});

export default router;
