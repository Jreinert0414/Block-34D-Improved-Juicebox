const server = require("./server")
require("dotenv").config();

server.listen(process.env.PORT, ()=>{
  console.log(`listening on ${process.env.PORT}`)
})