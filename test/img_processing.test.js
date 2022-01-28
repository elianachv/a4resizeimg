const { procesarImagen } = require("../src/calc/calculos");
const fs = require("fs");

describe("Process", () => {
  test("vertical small image should have position vertical and configurada false", async () => {
    const buffer = await fs.readFileSync("test/img/img-vertical.jpg");
    const result = await procesarImagen(buffer);
    expect(result.position).toBe("vertical");
    expect(result.configurada).toBe(false);
  });

  test("vertical big image should have position vertical and configurada true", async () => {
    const buffer = await fs.readFileSync("test/img/img-vertical-grande.jpg");
    const result = await procesarImagen(buffer);
    expect(result.position).toBe("vertical");
    expect(result.configurada).toBe(true);
  });

  test("horizontal big image should have position horizontal and configurada true", async () => {
    const buffer = await fs.readFileSync("test/img/img-horizontal-grande.jpg");
    const result = await procesarImagen(buffer);
    expect(result.position).toBe("horizontal");
    expect(result.configurada).toBe(true);
  });

  test("horizontal small image should have position horizontal and configurada false", async () => {
    const buffer = await fs.readFileSync("test/img/img-horizontal.jpg");
    const result = await procesarImagen(buffer);
    expect(result.position).toBe("horizontal");
    expect(result.configurada).toBe(false);

  });
});
