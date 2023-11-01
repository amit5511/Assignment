const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const dotenv = require('dotenv');
dotenv.config()
const openai  = require('./openai');
const connectDatabase = require('./db/dbconnect');
const chatModel = require('./model/chatmodel')

//db connection
connectDatabase()

//get all search from db
app.get('/api/v1/allsearch',async(req,res)=>{
    try {
       let chat= await chatModel.find();
       res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error.message)
    }

})

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', async(socket) => {
  console.log('A user connected');
  socket.on("search",async(data)=>{
   data =JSON.parse(data).trim()
   console.log(data)
   let response=""
   try {
    chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
        { role: 'user', content: data }
        ],
        temperature: 0,
       });
    response=chatCompletion.choices[0].message.content
   } catch (error) {
    console.log(error)
   }
   socket.emit("search_result",JSON.stringify(response))
   await chatModel.create({query:data,result:response})
  })
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


const PORT=process.env.PORT||7000
server.listen(PORT, () => {
  console.log('Server listening on port : ',PORT);
});
