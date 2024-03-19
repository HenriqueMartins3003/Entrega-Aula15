import mongoose from "mongoose";

const productColletion = "products";

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  code: {
    type: String,
    unique: true,
  },
  thumbmail: String,
});

export const productsModel = mongoose.model(productColletion, productsSchema);
