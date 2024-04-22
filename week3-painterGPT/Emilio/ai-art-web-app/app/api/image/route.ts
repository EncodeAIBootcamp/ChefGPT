// // @ts-nocheck

// ATTEMPT AT USING https://github.com/nerdenough/node-sd-webui

// import sdwebui from 'node-sd-webui';
// import { writeFileSync } from 'fs';

// export async function POST(req: Request) {
//   const { userPrompt } = await req.json()
//   console.log(userPrompt)

//   sdwebui()
//     .txt2img({
//       prompt: userPrompt,
//     })
//     .then(({ images }) =>
//       writeFileSync('/public/image.png', images[0], 'base64')
//     )
//     .catch((err: Error) => console.error(err));
// }

import OpenAI from "openai";

const openai = new OpenAI({
  // baseURL: 'https://api.openai.com/v1',
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { description } = await req.json();
  console.log("description:", description)
  const prompt = `Generate an image of a painting based on the following description: ${description}`;
  const response = await openai.images.generate({
    // model: "dall-e-2",
    model: "dall-e-3",
    // prompt: prompt.substring(0, Math.min(prompt.length, 500)),
    prompt: prompt,
    size: "1024x1024",
    quality: "standard",
    response_format: "b64_json",
    n: 1,
  });
  return new Response(JSON.stringify(response.data[0].b64_json))
}



