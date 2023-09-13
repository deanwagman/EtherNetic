import React from 'react';
import { styled } from 'styletron-react';

const Message = styled('div', {
  borderInlineStart: '0.5em solid #fff',
  paddingInlineStart: '1em',
  paddingInlineEnd: '1em',
});

export default ({ message, direction }) => {
  return (
    <Message className={[direction === 'out' ? '' : ''].join(' ')}>
      {message}
    </Message>
  );
};
