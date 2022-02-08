const sharp = require("sharp");
const fs = require("fs");

const hojas = [
  {
    codigo: "A4",
    ancho_px: 796,
    altura_px: 1123,
    ancho_mm: 210,
    altura_mm: 297,
    ancho_inch: 8.27,
    altura_inch: 11.69,
  },
  {
    codigo: "Letter",
    ancho_px: 612,
    altura_px: 792,
    ancho_mm: 215.9,
    altura_mm: 279.4,
    ancho_inch: 8.5,
    altura_inch: 11,
  },
  {
    codigo: "Oficio",
    ancho_px: 816,
    altura_px: 1344,
    ancho_mm: 235,
    altura_mm: 345,
    ancho_inch: 9.2,
    altura_inch: 13.5,
  },
];


/**
 * Procesa la imagen de ser necesario
 * @param {*} buffer
 * @returns la información necesaria para mostrar al usuario
 */
async function procesarImagen(buffer, hoja = "A4", ui) {
  const hojaSeleccionada = hojas.find((h) => h.codigo === hoja);

  let imgResized = await sharp(buffer),
    metadata = await imgResized.metadata(),
    response = {
      position: "horizontal",
      hoja: hojaSeleccionada,
      configurada: false,
      formato: metadata.format,
      ancho_inicial: metadata.width,
      alto_inicial: metadata.height,
      ancho_final: metadata.width,
      alto_final: metadata.height,
      buffer: buffer,
    };

  if (
    metadata.width > metadata.height
  ) {
    //Posicion horizontal
    if (
      metadata.width > hojaSeleccionada.altura_px ||
      metadata.height > hojaSeleccionada.ancho_px
    ) {
      response.configurada = true;
      imgResized = await sharp(buffer).resize(
        hojaSeleccionada.altura_px,
        hojaSeleccionada.ancho_px,
        {
          fit: "inside",
        }
      );
    }
  } else {
    // Posicion vertical
    response.position = "vertical";
    if (
      metadata.height > hojaSeleccionada.altura_px ||
      metadata.width > hojaSeleccionada.ancho_px
    ) {
      response.configurada = true;
      imgResized = await sharp(buffer).resize(
        hojaSeleccionada.ancho_px,
        hojaSeleccionada.altura_px,
        {
          fit: "inside",
        }
      );
    }
  }

  let imgFinal = await imgResized.toBuffer(),
    metadataFinal = await sharp(imgFinal).metadata();

  response.alto_final = metadataFinal.height;
  response.ancho_final = metadataFinal.width;
  response.buffer = imgFinal;

  if(ui){
    console.log("SE GUARDA LA IMAGEN")
    fs.writeFileSync("src/public/results/img_result.jpg", imgFinal);
  }

  return response;
}

module.exports = { procesarImagen , hojas};
