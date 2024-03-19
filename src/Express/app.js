//importando o express
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
import chatRouter from "../routes/chat.routes.js";
//import do mongoose
import mongoose from "mongoose";

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
app.use("/chat", chatRouter);

//conectando o mongoose no MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://hiikemartins:q2nEaRcN08JdWvoq@ecommerce-coderhouse.sflaon8.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce-CoderHouse"
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

//import dos service para listar produtos

import { getAll, deleteProduct } from "../services/product.service.js";

//config do socket io
const server = http.createServer(app);
const io = new socketIO(server);

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  const sendUpdatedProds = async () => {
    const productsList = await getAll();
    socket.emit("Updated_Products", productsList);
  };

  sendUpdatedProds().then();

  socket.on("delete", async (data) => {
    const { id } = data;
    try {
      await deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  });
});

//export do server com o express e socket juntos.
export default server;
