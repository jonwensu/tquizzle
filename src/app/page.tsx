'use client';

import { shuffle } from '@app/lib/utils';
import Image from 'next/image';
import { getSongs, Song } from '@app/server/services/songs';
import { useRef, useState } from 'react';
import { getAlbums } from '@app/server/services/albums';
import clsx from 'clsx';

function generateQuestions(songs: Song[], totalItems: number): Song[] {
  if (songs.length === 0) throw new Error('No songs to pick from');

  const total = Math.min(songs.length, totalItems);

  const shuffled = shuffle(songs);

  return shuffled.slice(0, total);
}

const TOTAL_QUESTIONS = 5;

export default function Page() {
  const pool = useRef(getSongs());
  const albums = useRef(getAlbums());
  const [questions] = useState(generateQuestions(pool.current, TOTAL_QUESTIONS));
  const [answers, setAnswers] = useState(Array(TOTAL_QUESTIONS).fill(undefined));
  const allAnswered = answers.every(Boolean);

  const handleSubmit = () => {
    const score = questions.reduce((acc, curr, i) => {
      const isCorrectAnswer = curr.album.id === answers[i];
      if (isCorrectAnswer) return acc + 1;
      return acc;
    }, 0);
    const answerKey = questions.map((question, i) => ({
      question: question.name,
      yourAnswer: albums.current.find(({ id }) => answers[i] === id)?.name,
      correctAnswer: question.album.name
    }));
    console.log({ answerKey });
    console.log({ score });
    alert(`Score: ${score}`);
  };

  const selectAnswer = (index: number, value: string) => {
    setAnswers(prevValue =>
      prevValue.map((v, i) => {
        if (i !== index) return v;
        return value;
      })
    );
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="max-w-3xl py-8 text-center text-2xl font-bold uppercase tracking-widest sm:text-4xl sm:leading-10">
        The Mareng Taylor Marie Joy Batumbakal Dimagiba Swift Quiz
      </h1>
      <div className="flex w-full max-w-xl flex-col items-center divide-y divide-gray-700">
        {questions.map(({ name }, i) => (
          <div key={i} className="flex w-full flex-col items-center justify-center py-7">
            <div className="my-3 flex aspect-square w-9 items-center justify-center rounded-full border border-gray-500 text-gray-500">
              {i + 1}
            </div>
            <h1 className="mb-3 py-2 text-center text-3xl uppercase tracking-widest sm:py-4 sm:text-4xl">
              {name}
            </h1>
            <div className="flex flex-row flex-wrap items-baseline justify-center space-x-1">
              {albums.current.map(album => {
                const isSelected = answers[i] === album.id;
                return (
                  <div
                    key={album.id}
                    className={clsx(
                      'flex w-1/4 cursor-pointer flex-col space-y-2 rounded-b-md  pb-1 transition-all duration-500 ease-in-out',
                      {
                        'z-10 m-1 w-2/5 shadow-2xl shadow-white sm:m-5': isSelected
                      }
                    )}
                    onClick={() => selectAnswer(i, album.id)}>
                    <div className="relative aspect-square">
                      <Image src={album.artwork} layout="fill" objectFit="cover" alt="album art" />
                    </div>
                    <h2
                      className={clsx('text-center text-xs text-transparent transition-all', {
                        'text-md font-bold text-white sm:text-lg': isSelected
                      })}>
                      {album.name}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
        className="w-full max-w-sm cursor-pointer rounded-md bg-white px-5 py-3 uppercase tracking-widest text-black hover:bg-white/75 active:bg-white disabled:pointer-events-none disabled:bg-zinc-800 disabled:text-gray-900">
        Submit
      </button>
    </div>
  );
}
