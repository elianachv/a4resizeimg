const { Router } = require("express");
const sharp = require("sharp");
const router = Router();
const fs = require("fs");

/**
 * Muestra el formulario principal
 */
router.get("/", async (req, res) => {
  try {
    await fs.unlinkSync("src/public/results/img_result.jpg");
  } catch (err) {
    console.log("No habia img");
  } finally {
    res.render("index");
  }
});

/**
 * Procesa la imagen proporcionada por el usuario
 */
router.post("/subir", async (req, res) => {
  if (req.error) return res.render("error");

  const img = req.file;
  const response = await cambiar(img.buffer);
  res.render("result", { response });
});

/**
 * Procesa la imagen de ser necesario
 * @param {*} buffer
 * @returns la información necesaria para mostrar al usuario
 */
async function cambiar(buffer) {
  let imgResized = await sharp(buffer),
    metadata = await imgResized.metadata(),
    response = {
      position: "horizontal",
      configurada: false,
      ancho_inicial: metadata.width,
      alto_inicial: metadata.height,
      ancho_final: metadata.width,
      alto_final: metadata.height,
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
  fs.writeFileSync("src/public/results/img_result.jpg", imgFinal);

  return response;
}

module.exports = router;
