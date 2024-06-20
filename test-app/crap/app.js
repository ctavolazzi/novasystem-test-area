// import express from 'express';
// import bodyParser from 'body-parser';
// import fetch from 'node-fetch';

// const app = express();
// const PORT = 3000;

// // Serve static files from the "public" directory
// app.use(express.static('public'));
// app.use(bodyParser.json());

// app.post('/query', async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const response = await fetch('http://localhost:11435/v1/chat/completions', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         model: 'llama2',
//         messages: [
//           { role: 'system', content: 'You are a helpful assistant.' },
//           { role: 'user', content: prompt }
//         ]
//       })
//     });

//     const data = await response.json();
//     res.json({ response: data.choices[0].message.content });
//   } catch (error) {
//     res.status(500).json({ error: 'Error querying the model.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// import express from 'express';
// import bodyParser from 'body-parser';
// import Ollama from 'ollama';

// const app = express();
// const PORT = 3000;

// app.use(express.static('public'));
// app.use(bodyParser.json());

// app.post('/query', async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const response = await Ollama.chat({
//       model: 'llama2',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant.' },
//         { role: 'user', content: prompt }
//       ]
//     });

//     res.json({ response: response.choices[0].message.content });
//   } catch (error) {
//     console.error('Error querying the model:', error);
//     res.status(500).json({ error: 'Error querying the model.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import ollama from 'ollama';

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/query', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch('http://localhost:11435/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama2',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Error querying the model:', error);
    res.status(500).json({ error: 'Error querying the model.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
