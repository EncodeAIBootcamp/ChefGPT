import OpenAI from 'openai';

const openai = new OpenAI({
  // baseURL: 'http://127.0.0.1:5000/v1',
  // baseURL: 'https://api.openai.com/v1',
  apiKey: process.env.OPENAI_API_KEY,
});

const storedAssistantId = 'asst_bux1GmMjIrMSb9CKqr2SGn8x';

export const runtime = 'edge';

let assistant: OpenAI.Beta.Assistant;

export async function POST(req: Request) {
  // Create an assistant if needed
  // if (!assistant) {
  //   assistant = await openai.beta.assistants.create({
  //     name: 'Painting Describer',
  //     instructions:
  //       'You are an expert at providing a detailed description of a painting that could be painted based on a short description from the user. You always respond with 2 paragraphs. You always respond exclusively with details that would be relevant to a painter who would rely on your description to paint a painting from. Examples of such details include the potential elements, style, and colors of the painting.',
  //     // model: '',
  //     model: 'gpt-3.5-turbo-0613',
  //   });
  //   console.log('Created Assistant with Id: ' + assistant.id);
  // } else {
  //   console.log('Existing Assistant has Id: ' + assistant.id);
  // }

  // Retrieve assistant if needed
  if (!assistant) {
    assistant = await openai.beta.assistants.retrieve(storedAssistantId);
    console.log('Retrieved Assistant has Id: ' + assistant.id);
  } else {
    console.log('Existing Assistant has Id: ' + assistant.id);
  }

  const assistantId = assistant.id;

  // Parse the request body
  const input: {
    threadId: string | null;
    userMessage: string;
  } = await req.json();

  let threadId;
  // Create a thread if needed
  if (!input.threadId) {
    threadId = (await openai.beta.threads.create()).id;
    console.log('Created Thread with Id: ' + threadId);
  } else {
    threadId = input.threadId;
    console.log('Existing Thread has Id: ' + threadId);
  }

  // Add a message to the thread
  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.userMessage,
  });

  const run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
    // additional_instructions:
    //   'Please address the user as Jane Doe. The user has a premium account.',
  });

  console.log('Run finished with status: ' + run.status);

  if (run.status == 'completed') {
    const messages = await openai.beta.threads.messages.list(threadId);
    return new Response(JSON.stringify(messages.data));
  } else {
    console.log(run.status);
  }
}
