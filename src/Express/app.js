import express from "express";
//importando o template engine do handlebars
import { engine } from "express-handlebars";
//path e url para trabalhar com caminhos
import path from "path";
import { fileURLToPath } from "url";
//imports do socket IO para real time.
import { Server as socketIO } from "socket.io";
import http from "http";
//Import das rotas!
import prodRouter from "../routes/products.routes.js";
import cartsRoutes from "../routes/carts.routes.js";
import realTimeRouter from "../routes/realTime.routes.js";

//config do express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config dos caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//confif pasta public

const staticPath = path.join(`${__dirname}/../public`);

app.use(express.static(staticPath));

//config do Handlebars
const pathView = path.resolve(`${__dirname}/../views/`);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", pathView);

//config das rotas!
app.use("/products", prodRouter);
app.use("/cart", cartsRoutes);
app.use("/realTime", realTimeRouter);

//import do Manaer para trazer o JSON de produtos
import ProductManager from "../models/ManagerProducts.js";
const prodManager = new ProductManager();

//config do socket io
const server = http.createServer(app);
const io = new socketIO(server);

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  const sendUpdatedProds = async () => {
    const productsList = await prodManager.readProductsFromFile();
    socket.emit("Updated_Products", productsList);
  };

  sendUpdatedProds().then();

  socket.on("delete", (data) => {
    const { id } = data;
    prodManager.deleteProductById(id);
  });
});

//export do server com o express e socket juntos.
export default server;
