const express = require('express');

const app = express();
const bodyParser = require('body-parser');



const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const router = require('./router');
app.use("/forcasts/", router);

app.use(express.static('public'));

app.get('/', (req, res) => {
  const d = new Date();
  res.json({ currenttime: d.toTimeString() });
  console.log('Received GET request...');
});

app.listen(PORT, '127.0.0.1', () => {

  console.log(`Server is listening on port ${PORT}...`);

});
