const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaGFydG1hbi1uaWNob2xhcyIsImEiOiJja2gwanY1dW4wNTc0MnJxNWczejZia3V0In0.yz3hoW6pezXK_pFOAu4xEQ&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geolocation services.");
    } else if (body.features.length === 0) {
      callback("Location was not found, please enter a new location.");
    } else {
      const {
        center: latitude,
        center: longitude,
        place_name,
      } = body.features[0];

      callback(undefined, {
        latitude,
        longitude,
        place_name,
      });
    }
  });
};

module.exports = geocode;
