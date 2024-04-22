"use strict";

//Modules setup
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate"); //Partials and layout
const app = express(); //Express app starting point

//Express setup
app.set("view engine", "ejs"); //EJS setup
app.set("views", path.join(__dirname, "views")); //Set app to find views in said directory
app.engine("ejs", ejsMate); //Set up Partials and layouts
app.use(express.static("public")); //Setup html files to get styling, scripts and resources from the public folder

//First route: localhost:3000/
app.get("/", (req, res) => {
  //When an https request to the base domain is sent this is the answer. Render index.ejs in the views folder(the path does not have to be specified because we already told the app to use the views directory).
  res.render("index");
});

app.get("/links", (req, res) => {
  res.render("links");
});

app.get("/blog", (req, res) => {
  res.render("blog/index");
})

app.get("/blog/article", (req, res) => {
  res.render("blog/article");
});

// this route catches all request that have not been specified(basically every request but the base domain for this simple application). Then, it renders notfound.ejs from the views directory to show the error page.
app.all("*", (req, res) => {
  res.render("notfound");
});

//Make app listen on port 3000
app.listen(3000, () => {
  console.log("Serving on port 3000");
});
