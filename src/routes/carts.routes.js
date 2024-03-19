import express from "express";

import {
  getAll,
  getCartByID,
  createCart,
  deleteCart,
} from "../services/cart.service.js";

const cartRoutes = express.Router();

cartRoutes.post("/", async (req, res) => {
  const cartBody = req.body;
  try {
    const newCart = await createCart(cartBody);
    res.render("home");
  } catch (err) {
    console.log(err);
    res.render("404");
  }
});

cartRoutes.get("/", async (req, res) => {
  try {
    const cart = await getAll();
    console.log(cart);
    res.render("cart", { cart });
  } catch (err) {
    console.log(err);
    res.render("404");
  }
});

cartRoutes.get("/:cid", async (req, res) => {
  const id = req.params.cid;
  try {
    const foundCart = await getCartByID(id);
    res.render("home");
  } catch (err) {
    console.log(err);
    res.render("404");
  }
});

cartRoutes.delete("/:cid", async (req, res) => {
  const id = req.params.cid;
  try {
    const deletedCart = await deleteCart(id);
    res.render("home");
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

// cartRoutes.post("/:cid/product/:pid", addProductInCart);

export default cartRoutes;
