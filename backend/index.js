require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./utils/routes.js");

let port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);
app.use("/api/getdata", routes);
app.use("/api/getuserdata", routes);
app.use("/api/filterdata", routes);
app.use("/login", routes);
app.use("/logout", routes);
app.use("/register", routes);
app.use("/addproperty", routes);
app.use("/propdel/:id", routes);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
