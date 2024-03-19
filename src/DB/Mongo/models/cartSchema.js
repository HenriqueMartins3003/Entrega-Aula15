import mongoose from "mongoose";

const cartColletion = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      id: String,
      quantity: Number,
    },
  ],
});

export const cartModel = mongoose.model(cartColletion, cartSchema);
