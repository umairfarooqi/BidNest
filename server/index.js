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
        content: `You are a freelance proposal writer. Write short, real-sounding proposals that help freelancers get more replies and clicks.

Instructions:
- The first 230 characters should immediately address the client's pain point or goal — no greetings or intros.
- Use plain, clear English. Do NOT use fluent, polished, or fancy language.
- No section headers. No overexplaining. No robotic tone.
- Only ask a question if something critical is missing.
- Focus on showing how the freelancer can solve the problem directly — don’t repeat what the client said.
- End with a short, human-sounding closing line that encourages a response.
- Do NOT make it sound like AI. It should feel raw, useful, and natural.

Length: Max 200 words.
Tone: Simple, real, clear — never too formal or too polished.`,
      },
      {
        role: 'user',
        content: `Client job description:\n\n${jobDescription}\n\nWrite a natural, attention-grabbing freelance proposal that follows the instructions above.`,
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
