require("dotenv").config();
const express = require("express");
const Router = require("./routes");
const connectdb = require("./database");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

connectdb();
app.use(express.urlencoded({ extended: true }));
app.use("/", Router);

app.listen(port, () => {
  console.log("Server is running at port ", port);
});
