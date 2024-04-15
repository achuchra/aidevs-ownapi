import exp from 'constants';
import * as dotenv from 'dotenv';
import express from 'express';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from 'langchain/schema';

dotenv.config();

const initalize = async () => {

  const app = express();

  app.use(express.json())

  app.post('/call-gpt', async (req, res) => {
    const { question } = req.body as { question: string };

    const chat = new ChatOpenAI({ modelName: "gpt-4" });
    const { content } = await chat.invoke([
      new SystemMessage('Answer the question based on your best knowledge. Make sure that you only answer when you are sure. If you are not sure about the answer, send "I dont know" message.'),
      new HumanMessage(question),  
    ])
    res.status(200).send({ reply: content });
  });

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}

initalize();