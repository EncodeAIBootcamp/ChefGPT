import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  baseURL: "http://127.0.0.1:5000/v1",
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: "system",
        content:
          `You are a professional comedian who has been hired to write a series of jokes for the users. The jokes should be really imaginative. They should be created matching what the user is asking related to topics(work, people, animals, food or coding apps), tones(witty, sarcastic, silly, dark or goofy), types (Knock-Knock or story), and the level of fun (low, medium or high). Each joke should be unique and memorable, and be based on the users requests. At all times you should just write the joke: don't write in the response the literal request made by the user, don't write a title for the joke.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}