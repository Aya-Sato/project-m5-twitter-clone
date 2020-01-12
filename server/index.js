const path = require('path');
const express = require('express');

const PORT = 31415;

var app = express();

app.use(express.json());

app.use(require('./routes/me'));
app.use(require('./routes/profile'));
app.use(require('./routes/tweets'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const server = app.listen(PORT, function() {
  console.info('🌍 Listening on port ' + server.address().port);
});
