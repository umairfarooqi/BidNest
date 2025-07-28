import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// OpenAI client using API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test route (optional)
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// POST route to generate proposal
app.post('/generate-proposal', async (req, res) => {
  const { jobDescription } = req.body;

  if (!jobDescription) {
    return res.status(400).json({ error: 'Job description is required.' });
  }

  console.log('Received job description:', jobDescription);
  console.log('Using API key:', process.env.OPENAI_API_KEY ? '✅ Loaded' : '❌ Not loaded');


  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a top-rated freelance proposal writer. Your job is to craft personalized, professional, and persuasive proposals that win jobs on platforms like Upwork and Fiverr.

The proposal should:
- Start with a friendly greeting and mention the client’s needs
- Briefly highlight the freelancer’s relevant experience and skills
- Include 1–2 specific reasons why the freelancer is a good fit
- End with a confident call to action or closing

Keep the tone warm, professional, and tailored to the job description. Keep it under 250 words.`,
        },
        {
          role: 'user',
          content: `Here is the job description:\n\n${jobDescription}\n\nWrite a tailored proposal.`,
        },
      ],
      temperature: 0.7,
    });

    const proposal = response.choices[0].message.content;
    res.json({ proposal });
  } catch (error) {
    console.error('Error generating proposal:', error);
    res.status(500).json({ error: 'Failed to generate proposal' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
