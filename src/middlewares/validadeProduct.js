const validadeProduct = (req, res, next) => {
  const product = req.body;

  if (
    !product.title ||
    !product.description ||
    !product.price ||
    !product.stock ||
    !product.code
  ) {
    console.log("Produto com informaçoes faltando!");
    res.render("404");
  }
  next();
};

export { validadeProduct };
