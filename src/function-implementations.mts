import { ChatOpenAI } from "@langchain/openai";
import { writeFile, writeFileSync } from "fs";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { HumanMessage, SystemMessage, type MessageContent } from "langchain/schema";

const parseQuestion = async (question:string): Promise<MessageContent | null> => {
  const loader = new TextLoader("./context.md");
  const data = await loader.load()
  .then((res) => res)
  .catch((err) => {
    console.log('err', err);
    return [];
  });

  if (!data[0]) {
    return null;
  }
  const context = data[0]?.pageContent;

  const chat = new ChatOpenAI({ modelName: "gpt-4" });

  const { content } = await chat.invoke([
    new SystemMessage(`Answer the question based on the context provided. Make sure that you only answer when you are sure. If you are not sure about the answer, send "I dont know" message. \n
    ###CONTEXT###\n
    ${context}`),
    new HumanMessage(question),
  ]);

  return content;
};

const parseInformation = async (information:string): Promise<string> => { 
  const loader = new TextLoader("./context.md");
  const data = await loader.load()
  .then((res) => res)
  .catch((err) => {
    console.log('err', err);
    return [];
  });

  const newPageContent = data[0]?.pageContent + "\n" + information;
  writeFileSync("./context.md", newPageContent);

  return "Thanks for the information!";
}

export const functions = {
  parseQuestion,
  parseInformation
} as const;
