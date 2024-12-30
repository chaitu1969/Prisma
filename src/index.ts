import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const client = new PrismaClient();

app.get("/users", async (req, res) => {
  let users = await client.user.findMany();
  res.status(200).json(users);
});

app.get("/users/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let user = await client.user.findFirst({
      where: { id: Number(id) },
      select: { username: true, city: true, age: true, todos: true },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
});

app.get("/todo/:id", async (req, res) => {
  let id = req.params.id as unknown as Number;
  try {
    let user = await client.user.findFirst({
      where: { id: Number(id) },
      select: { todos: true },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
});

app.listen(3000, () => {
  console.log("Server up and running");
});
