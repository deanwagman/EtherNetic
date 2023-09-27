const { parentPort } = require('worker_threads');
const { encode } = require('gpt-3-encoder');

const countTokens = (messages) => encode(JSON.stringify(messages)).length;

// Set up an event listener to receive messages from the main thread
parentPort.on('message', (textChunk) => {
  const tokenCount = countTokens(textChunk);
  parentPort.postMessage(tokenCount);
});

