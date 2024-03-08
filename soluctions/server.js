import express from "express";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let list = [];

const api = () => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("Hola esta es un api con express!");
  });

  router.get("/items", (req, res) => {
    res.send({
      items: list,
      message: "Lista de nombres",
      statusCode: 200,
      error: false,
    });
  });

  router.post("/add", (req, res) => {
    const newItem = req.body;
    list.push(newItem);
    res.send({
      message: "Item agregado con exito",
      item: newItem,
      statusCode: 200,
      error: false,
    });
  });

  router.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedItem };
      res.send({
        message: "Item actualizado",
        newItem: list[index],
        statusCode: 200,
        error: false,
      });
    } else {
      res.status(404).json({ message: "Item no encontrado" });
    }
  });

  router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const filteredList = list.filter((item) => item.id !== id);

    if (filteredList.length < list.length) {
      res.send({
        message: "Item eliminado",
        statusCode: 200,
        error: false,
      });
      list = filteredList;
    } else {
      res.status(404).json({ message: "Item no encontrado" });
    }
  });

  return router;
};

app.use("/api", api());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
