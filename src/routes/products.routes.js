import express from "express";
import {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";
import { validadeProduct } from "../middlewares/validadeProduct.js";
const prodRouter = express.Router();

prodRouter.get("/", async (req, res) => {
  try {
    const products = await getAll();
    console.log(products);
    res.render("home", products);
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

prodRouter.get("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const product = await getById(id);
    console.log(product);
    res.render("home", product);
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

prodRouter.post("/", validadeProduct, async (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  try {
    await createProduct(newProduct);
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

prodRouter.put("/:id", async (req, res) => {});

prodRouter.delete("/:id", async (req, res) => {
  const code = req.params.id;
  try {
    const deletedProd = await deleteProduct(code);
    console.log(deletedProd);
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

export default prodRouter;
