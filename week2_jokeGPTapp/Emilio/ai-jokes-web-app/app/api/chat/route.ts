import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  baseURL: 'http://127.0.0.1:5000/v1',
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, temperatureSetting } = await req.json();
  const temperature = temperatureSetting / 10
  console.log("temperature", temperature)

  const response = await openai.chat.completions.create({
    // WHY DO WE SPECIFY GPT-3.5 IF WE ARE USING LOCAL MODEL FORM OOBA TEXT-GEN-WEBUI?
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are a professional comedian who has been hired to write phenomenal jokes for your user. The jokes you create should adhere strictly to the requirements provided by the user. Specifically, the user will ask for you to write the joke about a particular topic and for the joke to have a particular tone. Try your absolute best to stick to the given topic and convey the given tone. You will be rewarded handsomely if you do a good job of that. For the most part, respond with the joke and only the joke. Do no write about what the user has requested. The only exception to this rule is that you can include a title for the joke if you think that you have come up with a uniquely good title. Do not include a title for the joke if the title is only mediocre or if it does not add to the joke.`,
      },
      ...messages,
    ],
    temperature
  });


  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
