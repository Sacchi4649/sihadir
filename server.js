require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Router = require("./routes");
const connectdb = require("./database");
const errorHandling = require("./middlewares/errorHandling");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

connectdb();
app.use(express.urlencoded({ extended: true }));
app.use("/", Router);
app.use(errorHandling);

app.get("/", (_, response) => {
  console.log("Response success");
  response.send("SIHADIR Backend response success!");
});
app.listen(port, () => {
  console.log("Server is running at port ", port);
});
