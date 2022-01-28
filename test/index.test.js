const app = require("../src/config/server");
const request = require("supertest");

describe("GET /", () => {
  test("should respond with status code 200", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /url", () => {
  test("with a valid url and correct format should respond status 200", async () => {
    const url =
      "https://cumbrepuebloscop20.org/wp-content/uploads/2018/09/Le%C3%B3n-2.jpg";
    const response = await request(app).post("/url").send({ url: url });
    expect(response.status).toBe(200);
  });

  test("with a valid url but incorrect format should respond error 'Formato inválido'", async () => {
    const url =
      "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c325.png";
    const response = await request(app).post("/url").send({ url: url });
    expect(response.body).toStrictEqual({
      error: "Formato inválido",
    });
  });

  test("with an invalid url should respond error 'La url no apunta a una imagen válida'", async () => {
    const url =
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.stickpng.com%2Fes%2Fimg%2Fjuegos%2Fpokemon%2Fpokemon-pikachu&psig=AOvVaw3NLNfoBsS8UWZ-gCNjzQDY&ust=1643470786879000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjfsvXj1PUCFQAAAAAdAAAAABAD";
    const response = await request(app).post("/url").send({ url: url });
    expect(response.body).toStrictEqual({
      error: "La url no apunta a una imagen válida",
    });
  });

  test("with no url should respond error 'No proporcionó url'", async () => {
    const url = "";
    const response = await request(app).post("/url").send({ url: url });
    expect(response.body).toStrictEqual({
      error: "No proporcionó url",
    });
  });

  test("with undefined url should respond error 'No proporcionó url'", async () => {
    const url = undefined;
    const response = await request(app).post("/url").send({ url: url });
    expect(response.body).toStrictEqual({
      error: "No proporcionó url",
    });
  });

  test("with null url should respond error 'No proporcionó url'", async () => {
    const url = null;
    const response = await request(app).post("/url").send({ url: url });
    expect(response.body).toStrictEqual({
      error: "No proporcionó url",
    });
  });
});
