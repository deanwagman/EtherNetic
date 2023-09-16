import React, { useState, useEffect } from 'react';
import viewTransition from '../util/viewTransitions';

const useTyping = ({ text, speed }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        // View transition for entering text, otherwise just type
        const wrapper =
          currentIndex === 0 ? viewTransition : (callback) => callback();
        wrapper(() => {
          setCurrentText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        });
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, speed, text]);

  return currentText;
};

export default useTyping;
