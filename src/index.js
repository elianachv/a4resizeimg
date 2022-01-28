const app = require("./config/server");

//Levantar servidor
app.listen(app.get("port"), () => {
  console.log("Servidor levantado en " + app.get("port"));
});
