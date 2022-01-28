const { Router } = require("express");
const sharp = require("sharp");
const router = Router();
const axios = require("axios");

/**
 * Muestra info general sobre el programa
 */
router.get("/", async (req, res) => {
  res.send("¡Bienvenido! Para usar el procesador de imagenes debe acceder a alguna de las url siguientes: \n/subir => para archivos\n /url => para urls");
});

/**
 * Procesa la imagen proporcionada por el usuario
 */
router.post("/subir", async (req, res) => {
  if (req.error) return res.status(400).json({ error: "Formato incorrecto" });
  const img = req.file;
  if (!img) return res.status(400).json({ error: "Olvidó archivo" });
  const response = await procesarImagen(img.buffer);
  res.json(response);
});

/**
 * Procesa la imagen proporcionada por el usuario mediante url
 */
router.post("/url", async (req, res) => {
  const imgUrl = req.body.url;
  if (!imgUrl) return res.status(400).json({ error: "No proporcionó url" });
  try {
    const img = await axios.get(imgUrl, { responseType: "arraybuffer" });
    const response = await procesarImagen(img.data);
    if (response.formato !== "jpeg" && response.formato !== "jpg") return res.status(400).json({ error: "Formato inválido" });
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: "La url no apunta a una imagen válida" });
  }
});

/**
 * Procesa la imagen de ser necesario
 * @param {*} buffer
 * @returns la información necesaria para mostrar al usuario
 */
async function procesarImagen(buffer) {
  let imgResized = await sharp(buffer),
    metadata = await imgResized.metadata(),
    response = {
      position: "horizontal",
      configurada: false,
      formato: metadata.format,
      ancho_inicial: metadata.width,
      alto_inicial: metadata.height,
      ancho_final: metadata.width,
      alto_final: metadata.height,
      buffer: buffer,
    };

  if (metadata.width > metadata.height && metadata.height < 796) {
    //Posicion horizontal
    if (metadata.width > 1123 || metadata.height > 796) {
      response.configurada = true;
      imgResized = await sharp(buffer).resize(1123, 796, {
        fit: "inside",
      });
    }
  } else {
    // Posicion vertical
    response.position = "vertical";
    if (metadata.height > 1123 || metadata.width > 796) {
      response.configurada = true;
      imgResized = await sharp(buffer).resize(796, 1123, {
        fit: "inside",
      });
    }
  }

  let imgFinal = await imgResized.toBuffer(),
    metadataFinal = await sharp(imgFinal).metadata();

  response.alto_final = metadataFinal.height;
  response.ancho_final = metadataFinal.width;
  response.buffer = imgFinal;
  return response;
}

module.exports = router;
