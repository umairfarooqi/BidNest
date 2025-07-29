import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk'; // ✅ CORRECT!

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get('/', (req, res) => {
  res.send('Groq backend is running 🚀');
});

app.post('/generate-proposal', async (req, res) => {
  const { jobDescription } = req.body;

  if (!jobDescription) {
    return res.status(400).json({ error: 'Job description is required.' });
  }

  try {
    const response = await groq.chat.completions.create({
      model: 'llama3-70b-8192',
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
    });

    const proposal = response.choices[0].message.content;
    res.json({ proposal });
  } catch (error) {
    console.error('Error generating proposal:', error.message);
    res.status(500).json({ error: 'Failed to generate proposal' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Groq server running at http://localhost:${port}`);
});
