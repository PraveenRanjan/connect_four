const express = require('express');
const cors = require('cors');
bodyParser = require('body-parser');

const app = express();

const gameRoute = require('./router/game');

app.use(cors());
// app.use((req, res, next) => {
// res.setHeader('Access-Control-Allow-Origin', '*');
// res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// parse application/json
app.use(bodyParser.json());

app.use('/game', gameRoute);

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      errors: [
        {
          title: 'Internal Server Error',
          detail: err,
          status: 500,
        },
      ],
    });
  }
});

const server = app.listen(4000);
const io = require('./socket').init(server);
io.on('connection', (socket) => console.log('Socket connection established!'));
