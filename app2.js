const express = require("express");
const {MongoClient} = require("mongodb");
const url = ("mongodb://127.0.0.1:27017")
const bodyParser = require('body-parser');
const app = express();
const client = new MongoClient(url);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

client.connect();

let db = client.db("Students");
let users = db.collection("Products");

app.get("/test", async (req,res) => {
  const products = await users.find().toArray();
  res.send(products);
});

app.post('/test', async (req, res) => {
  const data = req.body;
  await users.insertOne(data);
  res.send(data);
});

app.listen(3010);