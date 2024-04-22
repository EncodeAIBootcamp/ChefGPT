'use client';
import OpenAI from 'openai';
import Image from 'next/image';
import React, { useState } from 'react';
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

const styles = [
  'glitch',
  'dull',
  'psychedelic',
  'dark',
  'vibrant',
  'surreal',
  'baroque',
  'black and white',
];
const themes = [
  'landscape',
  'still life',
  'real life',
  'portrait',
  'abstract',
  'religious',
];

const ChatInterface: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('landscape');
  const [selectedStyle, setSelectedStyle] = useState<string>('glitch');
  const [isTextLoading, setIsTextLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    OpenAI.Beta.Threads.Messages.Message[]
  >([]);
  const [description, setDescription] = useState<string>('');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');

  const handleClickGenerateDescription = async () => {
    setImage('')
    setIsTextLoading(true);
    try {
      const response = await fetch('api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: `Generate a description of a ${selectedStyle} ${selectedTheme} painting`,
        }),
      });

      const newMessages: OpenAI.Beta.Threads.Messages.Message[] =
        await response.json();
      if (newMessages.length > 0) {
        setMessages(newMessages);
        // console.log('newMessages:', newMessages);
        newMessages.forEach((message) => {
          if (message.role === 'assistant') {
            const newDescription = message.content[0].text.value;
            setDescription(newDescription);
          }
        });
      }
    } finally {
      setIsTextLoading(false);
    }
  };

  const handleClickGenerateArt = async () => {
    setIsImageLoading(true);
    try {
      const response = await fetch('api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: `${description}`,
        }),
      });

      const newImage = await response.json();
      console.log('newImage:', newImage);
      setImage(newImage);
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div className='max-w-fit mx-auto px-4 py-2 border border-gray-300 rounded-lg'>
      <div className='flex flex-col items-center'>
        <h1 className='font-extrabold text-xl'>Generate Art</h1>
      </div>

      {isTextLoading ? <FullPageLoader /> : <div>{description}</div>}

      {isImageLoading ? (
        <FullPageLoader />
      ) : (
        <div>
          {image && (
            <Image
              alt='image of art generated from description'
              width={1024}
              height={1024}
              className='w-full h-1/2 p-4 bg-white rounded-lg'
              src={`data:image/jpeg;base64,${image}`}
            />
          )}
        </div>
      )}

      <div className='flex flex-col'>
        {!isTextLoading && !isImageLoading && (
          <button
            className='mx-auto px-2.5 py-1.25 my-2.5 bg-transparent hover:bg-black font-semibold hover:text-white border border-black hover:border-transparent rounded'
            onClick={handleClickGenerateDescription}
          >
            {`Generate a Description of a ${capitalize(
              selectedStyle
            )} ${capitalize(selectedTheme)} Painting`}
          </button>
        )}

        {description &&
          !isTextLoading &&
          !isImageLoading &&
          messages.length < 3 && (
            // {description && !isLoading && !messages[messages.length - 1]?.content[0].startsWith('Generate') && (
            <div className='flex flex-col items-center'>
              <button
                className='mx-auto px-2.5 py-1.25 mb-2.5 bg-transparent hover:bg-black font-semibold hover:text-white border border-black hover:border-transparent rounded'
                onClick={handleClickGenerateArt}
              >
                {`Generate Art from Description`}
              </button>
            </div>
          )}

        <div className='flex flex-wrap justify-between'>
          <div className='p-1 mt-1 bg-gray-200 rounded-lg'>
            <label>
              Style:
              <select
                className='ml-1'
                name='selectedStyle'
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                {styles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='p-1 mt-1 bg-gray-200 rounded-lg'>
            <label>
              Theme:
              <select
                className='ml-1'
                name='selectedtheme'
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
              >
                {themes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
