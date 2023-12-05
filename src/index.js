//importações necessárias para o projeto
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");

//configuração de json e cors
app.use(bodyParser.json());
app.use(cors());

//rota que lista todos os usuários cadastrados
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

//rota que cadastra um usuário
app.post("/user", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json(user);
});

//rota que apaga um usuário, passando o id
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

//rota que atualiza um usuário, pelo id
app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
    },
  });
  res.json(user);
});

//rota que lista usuários que contenham o nome específico
app.get("/users/:name", async (req, res) => {
  const { name } = req.params;
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
  res.json(users);
});

//rota que lista um usuário pelo id
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findOne({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

// Inicie o servidor na porta especificada
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = { app, server };