import React from 'react';
import { styled } from 'styletron-react';
import TextInput from './TextInput';

export default (props) => {
  return <TextInput type="number" $style={{ maxWidth: '12ch' }} {...props} />;
};
