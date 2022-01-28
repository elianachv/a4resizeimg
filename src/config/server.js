const express = require("express");
const path = require("path");

//Inicializaciones
const app = express();

//Configuraciones
app.set("port", process.env.PORT || 3005);
app.set("views", "src/views");
app.set("view engine", "ejs");
const multer = require("multer");

//Configuracion de multer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg/;
  const mimetype = fileTypes.test(file.mimetype);
  const extencion = fileTypes.test(path.extname(file.originalname));
  if (mimetype && extencion) {
    return cb(null, true);
  }
  req.error = "error";
  cb(null, false);
};

const multerConfig = multer({
  dest: "src/public/uploads",
  storage,
  fileFilter,
}).single("imagen");

//Middlewares
app.use(express.json());

app.use(multerConfig);

//Contenido estatico
app.use(express.static("src/public"));

//Rutas
app.use(require("../routes/images.routes"));

module.exports = app;