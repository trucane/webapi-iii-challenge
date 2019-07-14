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
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use('/api/users', router);

const port = 5000;

server.listen(port, () => console.log('I am on port 5000'))


module.exports = server;
