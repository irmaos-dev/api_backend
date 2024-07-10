const express = require("express");
const allItems = require("./allitems");
const itemId = require("./itemId");
const cors = require("cors");
const post = require("./post");
const put = require("./put");
const del = require("./delete");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.listen(port, () => {
  console.log(`Funcionando na porta ${port}`);
});

app.get("/pessoa", async (req, res) => {
  const query = await allItems();
  return res.status(200).json(query);  
});

app.get("/pessoa/:id", async (req, res) => {
  const id = req.params.id;
  const query = await itemId(id);
  if(query){
     return res.status(200).json(query);
  } else {
    return res.status(404).send();   
  }  
});

app.post("/pessoa", async (req, res) => {
  const { nome, email, tipo } = req.body;
  const query = await post(nome, email, tipo);
  return res.status(201).json(query);
});

app.put("/pessoa/:index", async (req, res) => {
  const { nome, email, tipo } = req.body;
  const id = req.params.index;
  const query = await put(nome, email, tipo, id);
  return res.status(200).json(query);
});

app.delete("/pessoa/:id", async (req, res) => {
  const id = req.params.id;

  const query = await del(id);
  return res.status(204).json(query);
});