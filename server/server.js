const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
const indexPath = path.join(__dirname, '../client/dist');
app.use(express.static(indexPath));


app.listen(3000, function () {
  console.log('Blackjack app listening on port 3000!')
});