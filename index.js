const express = require('express');
const { MongoClient } = require('mongodb');
const { PORT, DB_URL } = require('./config');
const bodyParser = require('body-parser');
const app = express();
const client = new MongoClient(DB_URL);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

client.connect();

let db = client.db('Students');
let users = db.collection('Products');

app.get('/test', async (req, res) => {
  const products = await users.find().toArray();
  res.send(products);
});

app.post('/test', async (req, res) => {
  const data = req.body;
  await users.insertOne(data);
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
