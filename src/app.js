const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express configuration

const public = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(public));

// Setup routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Check App",
    name: "Lubov Novozhilova",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Lubov Novozhilova",
  });
});

// Handling errors
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Lubov Novozhilova",
    message: "Contact me at: lubov.novozhilova@gmail.com.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please, provide a location",
    });
  }

  const command = req.query.address;

  geocode(command, (error, { latitude, longitude, place_name } = {}) => {
    if (error) {
      return res.send({ error: "error connecting to the server" });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: "error connecting to the server" });
      }
      res.send({
        location: place_name,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You should provide a search keyword",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    name: "Lubov Novozhilov",
    message: "Help article was not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    name: "Lubov Novozhilova",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
