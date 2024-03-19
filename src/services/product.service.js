import { productsModel } from "../DB/Mongo/models/productSchema.js";

const getAll = async () => {
  let products = await productsModel.find();

  products = products.map((prod) => prod.toJSON());

  return products;
};

const getById = async (id) => {
  const productFound = await productsModel.findById({ code: id });

  return productFound;
};

const createProduct = async (product) => {
  const newProduct = await productsModel.create(product);
  return newProduct;
};

const updateProduct = async (
  { title, description, price, code, stock },
  id
) => {
  const updatedProduct = await productsModel.updateOne(
    { _id: id },
    { title, description, price, code, stock }
  );
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const deletdProd = await productsModel.deleteOne({ code: id });

  return deletdProd;
};

export { getAll, getById, createProduct, updateProduct, deleteProduct };
