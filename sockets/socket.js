const io = require('../server').io;

io.on('connection',(socket)=>{
    socket.send("hello")
})


module.exports=io