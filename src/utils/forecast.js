const request = require("postman-request");

const forecast = (Latitude, Longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=fbdf0094b804fb4d1e3855bf07a3b8f9&query=" +
    Latitude +
    "," +
    Longitude +
    "&units=m";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services.");
    } else if (body.error) {
      callback("Unable to find location.");
    } else {
      const {
        temperature,
        feelslike,
        weather_descriptions,
        wind_speed,
        humidity,
      } = body.current;

      callback(
        undefined,
        weather_descriptions +
          ". It is currently " +
          temperature +
          "°C outside and it feels like " +
          feelslike +
          "°C. The wind speed is " +
          wind_speed +
          "  m/s and humidity is " +
          humidity +
          "%."
      );
    }
  });
};

module.exports = forecast;
