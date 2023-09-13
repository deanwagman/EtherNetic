'use client';

import { useState, useEffect } from 'react';
import Container from './Container';
import { useBackdropFilter } from '../../contexts/backdrop-filter';

const FullScreenChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setBlur, setBrightness } = useBackdropFilter();

  const onEscape = (event) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onEscape);
    }
    return () => document.removeEventListener('keydown', onEscape);
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Close Button */}
      {isOpen ? <button onClick={toggleChat}>&times;</button> : null}

      {/* Launch Button */}
      {!isOpen ? <button onClick={toggleChat}>🤖</button> : null}

      {/* Chat Container */}
      {isOpen ? <Container /> : null}
    </div>
  );
};

export default FullScreenChat;
