const { Router } = require("express");
const { procesarImagen } = require("../calc/calculos");
const router = Router();
const axios = require("axios");

/**
 * Muestra info general sobre el programa
 */
router.get("/", async (req, res) => {
  res.send(
    "¡Bienvenido! Para usar el procesador de imagenes debe acceder a alguna de las url siguientes: \n/subir => para archivos\n /url => para urls"
  );
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
    if (response.formato !== "jpeg" && response.formato !== "jpg")
      return res.status(400).json({ error: "Formato incorrecto" });
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: "La url no apunta a una imagen válida" });
  }
});

module.exports = router;
