
import {
  GoogleGenAI,
}  from '@google/genai';

async function runChat(prompt) {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBvzKqgHQIb3kkl2tFvzn38oAnzlyV2j6o",
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.5-pro';
  const contents = [{
    role: 'user',
    parts: [{
      text: prompt,
    }, ],
  }, ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  let respose = ""
  for await (const chunk of response) {
     console.log(chunk.text);
    respose+=chunk.text
  }
  return respose
}

export default runChat;