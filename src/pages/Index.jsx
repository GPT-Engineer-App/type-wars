import React, { useState, useEffect, useRef } from 'react';
import { FaPlus } from "react-icons/fa"; // example - use react-icons/fa for icons

const words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon"];

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const Index = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [typedWord, setTypedWord] = useState('');
  const [score, setScore] = useState(0);
  const [wordPosition, setWordPosition] = useState({ x: 300, y: 100 });
  const gameAreaRef = useRef(null);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'w':
        setPosition((prev) => ({ ...prev, y: prev.y - 10 }));
        break;
      case 'a':
        setPosition((prev) => ({ ...prev, x: prev.x - 10 }));
        break;
      case 's':
        setPosition((prev) => ({ ...prev, y: prev.y + 10 }));
        break;
      case 'd':
        setPosition((prev) => ({ ...prev, x: prev.x + 10 }));
        break;
      default:
        break;
    }
  };

  const handleTyping = (e) => {
    const { value } = e.target;
    setTypedWord(value);

    if (value === currentWord) {
      setScore((prev) => prev + 10);
      setCurrentWord(getRandomWord());
      setTypedWord('');
      setWordPosition({ x: Math.random() * 500, y: Math.random() * 300 });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-blue-100" ref={gameAreaRef}>
      <div className="absolute top-4 right-4 text-2xl font-bold">
        Score: {score}
      </div>
      <div
        className="absolute bg-red-500 w-10 h-10"
        style={{ top: position.y, left: position.x }}
      ></div>
      <div
        className="absolute text-xl font-bold"
        style={{ top: wordPosition.y, left: wordPosition.x }}
      >
        {currentWord}
      </div>
      <input
        type="text"
        value={typedWord}
        onChange={handleTyping}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-2 border border-gray-400"
        placeholder="Type the word..."
      />
    </div>
  );
};

export default Index;