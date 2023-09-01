import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};
