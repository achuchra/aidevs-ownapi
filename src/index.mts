import exp from 'constants';
import * as dotenv from 'dotenv';
import express from 'express';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BaseMessageChunk, HumanMessage, SystemMessage } from 'langchain/schema';
import { informationSchema, questionSchema } from './function-schemas.mjs';
import { functions } from './function-implementations.mjs';

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

  app.post('/call-gpt-pro', async (req, res) => {
    const { question } = req.body as { question: string };

    const model = new ChatOpenAI({ modelName: "gpt-4-0613" })
      .bind({ functions: [questionSchema, informationSchema] });

    const result = (await model.invoke([new HumanMessage(question)])) as BaseMessageChunk;
    if (result?.additional_kwargs?.function_call) {
      const name = result.additional_kwargs.function_call.name as "parseQuestion" | "parseInformation";
      const args = JSON.parse(result.additional_kwargs.function_call.arguments) as { arg: string };

      const reply = await functions[name](args.arg);
      res.status(200).send({ reply });
    } else {
      res.status(200).send({ reply: "Something wen wrong" });
    }
  });

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}

initalize();