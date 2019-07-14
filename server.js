require('dotenv').config()
const express = require('express');
const router = require('./users/userRouter')



const server = express();


//custom middleware
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${req.get('Origin')}`);
  next();
};


server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>I need to do some styling!</h2>`)
});

server.use('/api/users', router);


const port = process.env.PORT;

server.listen(port, () => console.log('I am on port 5000'))


module.exports = server;
