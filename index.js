const express = require("express");
const https = require("https");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var city = req.body.cityName;
  console.log(city);
  const apiKey = "be211f6b4be3155442bc14bbe8a27867";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const disc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const humid = weatherData.main.humidity;
      const speed = weatherData.wind.speed;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.json({
        city: req.body.cityName,
        temp: temp,
        disc: disc,
        icon: imgUrl,
        humid: humid,
        speed: speed,
      });
    });
  });
});

app.listen(port, function () {
  console.log("SERVER STARTED :", port);
});

// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

// apikey= be211f6b4be3155442bc14bbe8a27867
