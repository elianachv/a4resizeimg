const { Router } = require("express");
const { procesarImagen } = require("../calc/calculos");
const axios = require("axios");
const router = Router();
const fs = require("fs");

/**
 * Muestra el formulario principal
 */
router.get("/ui", async (req, res) => {
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
router.post("/ui/subir", async (req, res) => {
  if (req.error) return res.status(400).render("error", { error: "Formato incorrecto" });
  const img = req.file;
  const hoja = req.body.hoja;
  if (!img) return res.status(400).render("error", { error: "Olvidó archivo" });
  const response = await procesarImagen(img.buffer, hoja, true);
  res.render("result", { response });
});

/**
 * Procesa la imagen proporcionada por el usuario mediante url
 */
router.post("/ui/url", async (req, res) => {
  const imgUrl = req.body.url;
  const hoja = req.body.hoja;
  if (!imgUrl)
    return res.status(400).render("error", { error: "No proporcionó url" });
  try {
    const img = await axios.get(imgUrl, { responseType: "arraybuffer" });
    const response = await procesarImagen(img.data, hoja,true);
    if (response.formato !== "jpeg" && response.formato !== "jpg")
      return res.status(400).render("error", { error: "Formato incorrecto" });
    res.render("result", { response });
  } catch (error) {
    res
      .status(400)
      .render("error", { error: "La url no apunta a una imagen válida" });
  }
});

module.exports = router;
