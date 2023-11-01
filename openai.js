const OpenAIApi = require('openai');
const openai = new OpenAIApi.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
module.exports= openai;