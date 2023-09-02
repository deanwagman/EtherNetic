import { flushSync } from 'react-dom';

export default (callback = () => {}) => {
  let wrapper = (callback) => {
    callback();
  };

  // If the browser supports view transitions
  if (document?.startViewTransition) {
    wrapper = (callback) => {
      document.startViewTransition(() => {
        flushSync(() => {
          callback();
        });
      });
    };
  }

  wrapper(callback);
};
