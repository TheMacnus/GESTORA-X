import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

// Crear un usuario
app.post("/usuarios", async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const nuevoUsuario = await prisma.usuario.create({
      data: { nombre, email, password }
    });
    res.json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: "Error creando usuario" });
  }
});

// Obtener un usuario por id
app.get("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) }
  });
  res.json(usuario);
});

// Actualizar usuario
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;
  try {
    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nombre, email, password }
    });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: "Error actualizando usuario" });
  }
});

// Eliminar usuario
app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({
      where: { id: Number(id) }
    });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(400).json({ error: "Error eliminando usuario" });
  }
});

export default app;
