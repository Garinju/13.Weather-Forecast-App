require ('dotenv').config();
const express = require("express");
const app = express();
const https = require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true})); //don't put bodyParser inside the app.post//
app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req, res){
  const cityQuery = req.body.cityQuery;
  const unitQuery = "metric";
  const appId = process.env.APP_ID;
  const cityWeatherUrl= "https://api.openweathermap.org/data/2.5/weather?q="+cityQuery+"&units="+unitQuery+"&appid="+appId
  https.get(cityWeatherUrl, function(response){
    console.log(response.statusCode);
    response.on("data", function(DATA){
      const weatherData = JSON.parse(DATA);
      const weatherTemp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The weather of "+cityQuery+" is currently " + weatherDescription +".<h1>");
      res.write("<h3> The temperature is "+ weatherTemp +" degrees celcius.<h3>");
      res.write("<img src="+imageUrl+">");
      res.send();
    })
  })
});

app.listen(3000, function(){
  console.log("The server running on port 300");
});
