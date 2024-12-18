'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket: any;

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    socket = io('http://localhost:8080');

    socket.on('job-progress', ({ jobId, progress }) => {
      setProgress(progress);
    });
    socket.on('job-completed', ({ testcases }) => {
      setResult(JSON.stringify(testcases));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/v1/testcases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ use_cases: input })
    });

    if (!response.ok) {
      console.error('Failed to submit task');
    }
    setProgress(0);

    console.log(response);
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Use case Generator</h1>
      <div className='flex items-center '>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
              className='w-[500px] h-[500px] p-4 border-2 rounded-lg border-red-200'
            ></textarea>
          </div>
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Submit
          </button>
        </form>
        <div className='ml-4'>
          <div className='flex items-center gap-4'>
            <h2>Progress: {progress != null ? `${progress}%` : 'not started'}</h2>
            {progress != null && progress != 100 && (
              <div className='w-[24px] h-[24px] border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
            )}
          </div>
          <textarea
            className='w-[800px] h-[500px] p-4 border-2 rounded-lg border-red-200'
            value={result}
            readOnly
          ></textarea>
        </div>
      </div>
    </main>
  );
}
