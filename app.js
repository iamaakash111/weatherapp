const express = require("express");
const bodyParser= require("body-parser");
const https = require("https");

const app= express();

const key="bdad43cbe754f33fda6964da98af09f0";
// ${cityName},${countryName}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    
    
   res.render("home");
});

app.post("/",function(req,res){
    const cityName= req.body.city;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${key}`;
    https.get(url,function(response){
        response.on("data",function(data){
           const weatherData= JSON.parse(data);
           console.log(weatherData);

           res.render("result",{temparature:weatherData.main.temp, descriptionData:weatherData.weather[0].description}); 
  
        } )
      })
   
})

app.listen(3000, function(){
    console.log("Server is running at the port : 3000");
});