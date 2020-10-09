const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
app.use(express.json());
routes(app);

mongoose.connect("mongodb://localhost/clase06_ejercicio02", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

mongoose.connection.once("open", () => console.log("Conexion establecida"));

app.listen(3000);
