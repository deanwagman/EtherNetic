// TODO: ADD FILE UPLOAD

export default async (req, res) => {
  const formData = new FormData();
  formData.append('purpose', 'fine-tune');
  formData.append('file', fs.createReadStream('mydata.jsonl'));

  try {
    const response = await fetch('https://api.openai.com/v1/files', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};


// From ChatGPT
// const fetch = require('node-fetch');
// const FormData = require('form-data');
// const { Readable } = require('stream');

// const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your API key

// // Sample list of JSON objects
// const jsonObjects = [
//     { "name": "John", "age": 30 },
//     { "name": "Jane", "age": 25 },
//     { "name": "Doe", "age": 28 }
// ];

// // Convert the list of JSON objects to a JSONL string
// const jsonlString = jsonObjects.map(obj => JSON.stringify(obj)).join('\n');

// // Create a readable stream from the JSONL string
// const jsonlStream = Readable.from([jsonlString]);

// async function uploadData() {
//     const formData = new FormData();
//     formData.append('purpose', 'fine-tune');
//     formData.append('file', jsonlStream, { filename: 'mydata.jsonl' }); // Provide a filename for the stream

//     try {
//         const response = await fetch('https://api.openai.com/v1/files', {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'Authorization': `Bearer ${OPENAI_API_KEY}`
//             }
//         });

//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Error uploading data:', error);
//     }
// }

// uploadData();