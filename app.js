const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const socketIO = require('socket.io')
const dotEnv = require('dotenv')
const router = require('./router/router')
const completionsIA = require('./function/ia-bot.js')

const app = express()
const  http = require('http').Server(app)
const io = socketIO(http)


dotEnv.config()

app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use (bodyParser.urlencoded( {extended : true} ) );
app.use(express.static(__dirname + '/public'));


app.use('/', router)

let history = [{"role": "system", "content": "You are a helpful assistant."}]

io.on('connect', (socket) => {
    console.log('user connect')

    socket.emit('chat prompt', history[0].content)

    socket.on('disconnect', () =>{
        console.log('user disconnect')
    })

    socket.on('chat prompt', async (text) => {
        history = await completionsIA(text, history);
        socket.emit('chat prompt', history[history.length - 1].content)
    })
})



http.listen(3000, () => {
    console.log("server running on 3000")
})
