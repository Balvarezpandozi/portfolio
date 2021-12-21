"use strict";

//Modules setup
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate"); //Partials and layout
const app = express();

//Express setup
app.set("view engine", "ejs"); //EJS setup
app.set("views", path.join(__dirname, "views")); //Set app to find views in said directory
app.engine("ejs", ejsMate); //Set up Partials and layouts
app.use(express.static("public")); //Setup html files to get styling, scripts and resources from the public folder

//Make app listen on port 3000. URL to access: localhost:3000
app.listen(3000, () => {
  console.log("Serving on port 3000");
});

//First route: localhost:3000/
app.get("/", (req, res) => {
  res.render("index");
});
