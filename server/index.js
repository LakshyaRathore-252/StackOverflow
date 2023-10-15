import express from "express";
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai";
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import asnwerRoute from './routes/Answer.js'
const app = express();
// 👇️ configure CORS
app.use(cors());

dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));


app.get('/', (req, res) => {
    res.send("Stack Overflow clone")
})
app.use('/user', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answer', asnwerRoute);


const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config);

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 512,
        temperature: 0,
        prompt: prompt,

    })

    res.send(completion.data.choices[0].text)
})

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => app.listen(PORT, () => { console.log(`Server Running at ${PORT}`) }))
    .catch((err) => console.log(err.message))


