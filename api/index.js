const express = require('express');
const data = require('./data.json');

const app = express();
const port = 3000;

app.get('/characters', function (reqest, response) {
  response.send({
    results: data.characters,
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
