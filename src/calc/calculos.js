const sharp = require("sharp");
const fs = require("fs");

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

  response.buffer = imgFinal;
  response.alto_final = metadataFinal.height;
  response.ancho_final = metadataFinal.width;
  fs.writeFileSync("src/public/results/img_result.jpg", imgFinal);

  return response;
}

module.exports = { procesarImagen };
