require("dotenv").config();
const express = require("express");
const Router = require("./routes/userRoute.js.js");
const connectdb = require("./database");

const app = express();

app.use(express.json());

connectdb();
app.use(express.urlencoded({ extended: true }));
app.use("/", Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
