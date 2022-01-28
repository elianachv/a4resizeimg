const { Router } = require("express");
const { procesarImagen } = require("../calc/calculos");
const axios = require("axios");
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
  const response = await procesarImagen(img.buffer);
  res.render("result", { response });
});

/**
 * Procesa la imagen proveniente de la url proporcionada por el usuario
 */
router.post("/url", async (req, res) => {
  const imageURL = req.body.url;
  try {
    const img = await axios.get(imageURL, { responseType: "arraybuffer" });
    const response = await procesarImagen(img.data);
    res.render("result", { response });
  } catch (error) {
    res.render("error");
  }
});

module.exports = router;
