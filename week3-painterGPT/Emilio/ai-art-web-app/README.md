## Weekend Project

For consolidating the knowledge acquired in this week, the students should complete the following project:

1. Create a github repository for your project
2. Add all members of your group
3. Create a README.md file that describes your project
4. Create a new application from scratch using NextJS
5. Create an assistant in OpenAI that composes descriptions of paintings

   * The assistant should be able to suggest and describe the details of a painting based on a short description from the user

6. Configure the assistant prompt to be efficient at answering strictly painting descriptions with details about its elements, style, details, and colors
7. Create a page for the user to pick an option from a selection of painting themes
8. Include a button to send a message to the assistant for it to generate a painting description with the selected theme

   * Use the OpenAI [Assistants API](https://platform.openai.com/docs/assistants/overview) to create threads and messages for the assistant

9. When the assistant answers, display the generated text output in a text box
10. Create a button for the user to request the image to be generated based on the content of the text box
11. Create a short form after the button for the user to choose the image generation parameters
12. Include a button to request the image to be generated
13. Ask the Image Generation API to generate the image
14. Display a loader while the image is being generated
15. Display the image in the page when it is generated
16. Submit your project in the submission form

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Next, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
