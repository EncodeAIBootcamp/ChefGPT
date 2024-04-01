'use client';
import React, { useState } from 'react';
import { useChat } from 'ai/react';
import { ImSpinner5 } from 'react-icons/im';

const FullPageLoader = () => {
  return (
    <div className='flex flex-col justify-center items-center content-center min-h-52'>
      <ImSpinner5 className='mb-4 text-6xl animate-spin' />
      <p>Loading...</p>
    </div>
  );
};

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const topics = [
  'animals',
  'people',
  'plants',
  'rocks',
  'words',
  'food',
  'politics',
];
const tones = [
  'dull',
  'deadpan',
  'absurd',
  'strange',
  'clever',
  'witty',
  'silly',
  'goofy',
  'dark',
  'normal',
];
const chaosLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ChatInterface: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('animals');
  const [selectedTone, setSelectedTone] = useState<string>('clever');
  const [selectedChaos, setSelectedChaos] = useState<number>(3);

  const { messages, append, isLoading, setMessages } = useChat({
    body: {
      temperatureSetting: selectedChaos,
    },
  });

  // console.log("messages:", messages);

  return (
    <div className='max-w-md mx-auto px-4 py-2 border border-gray-300 rounded-lg'>
      <div className='flex flex-col items-center'>
        <h1 className='font-extrabold text-xl'>Unlimited Jokens</h1>
      </div>

      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div
          hidden={
            messages.length === 0 ||
            messages[messages.length - 1]?.content.startsWith('Generate') ||
            messages[messages.length - 1]?.content.startsWith('Rate')
          }
          className='bg-opacity-25 bg-gray-700 rounded-lg p-4'
        >
          {messages[messages.length - 2]?.content.startsWith('Rate') && (
            <>
              <div>{messages[messages.length - 3]?.content}</div>
              <br />
            </>
          )}
          <div>{messages[messages.length - 1]?.content}</div>
        </div>
      )}

      {!isLoading && (
        <div className='flex flex-col items-center'>
          <button
            className='mx-auto px-2.5 py-1.25 my-2.5 bg-transparent hover:bg-black font-semibold hover:text-white border border-black hover:border-transparent rounded'
            onClick={() =>
              // IS THERE A WAY TO DELETE MESSAGES? I TRIED USING setMessages BUT HAD NO LUCK
              append({
                role: 'user',
                content: `Generate a joke about the topic of ${selectedTopic} in a very ${selectedTone} tone`,
              })
            }
          >
            {`Generate ${capitalize(selectedTone)} ${capitalize(
              selectedTopic
            )} Jokens`}
          </button>
        </div>
      )}

      {messages.length > 0 && !isLoading && (
        <div className='flex flex-col items-center'>
          <button
            className='mx-auto px-2.5 py-1.25 mb-2.5 bg-transparent hover:bg-black font-semibold hover:text-white border border-black hover:border-transparent rounded'
            onClick={() =>
              append({
                role: 'user',
                content: `Rate the joke you just created on a scale of 1-10`,
              })
            }
          >
            {`Rate ${capitalize(selectedTone)} ${capitalize(
              selectedTopic
            )} Jokens`}
          </button>
        </div>
      )}

      <div className='flex flex-wrap justify-between'>
        <div className='p-1 mt-1 bg-gray-200 rounded-lg'>
          <label>
            Topic:
            <select
              className='ml-1'
              name='selectedTopic'
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className='p-1 mt-1 bg-gray-200 rounded-lg'>
          <label>
            Tone:
            <select
              className='ml-1'
              name='selectedTone'
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
            >
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className='p-1 mt-1 bg-gray-200 rounded-lg'>
          <label>
            Chaos LVL:
            <select
              className='ml-1'
              name='selectedChaos'
              value={selectedChaos}
              onChange={(e) => setSelectedChaos(+e.target.value)}
            >
              {chaosLevels.map((chaosLevel) => (
                <option key={chaosLevel} value={chaosLevel}>
                  {chaosLevel}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
