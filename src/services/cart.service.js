import { cartModel } from "../DB/Mongo/models/cartSchema.js";

const getAll = async () => {
  let carts = await cartModel.find();

  carts = carts.map((cart) => {
    cart.toJSON();
  });

  return carts;
};

const createCart = async (cart) => {
  const newCart = await cartModel.create(newCart);
  return cart;
};

const getCartByID = async (id) => {
  const cartFound = await cartModel.findById(id);
  return [cartFound];
};

const deleteCart = async (id) => {
  const deletedCart = cartModel.deleteOne({ _id: id });
  return deletedCart;
};

export { getAll, getCartByID, createCart, deleteCart };
