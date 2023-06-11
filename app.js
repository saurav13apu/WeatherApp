const express= require("express");
const https= require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req, res) {

    res.sendFile(__dirname+ "/index.html")
  
 } )

 app.post("/", function(req, res){
    //console.log(req.body.CityName);
    const query= req.body.CityName;
    const apiKey= "ace021dd6a7dccfbeeacdf5f3a04a447";
    const unit="metric";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey +"&units="+ unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData= JSON.parse(data);
        const temp= weatherData.main.temp;
        console.log(temp);
        const descip= weatherData.weather[0].description;
        console.log(descip);
        const icon = weatherData.weather[0].icon;
        const imageUrl= "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.write("<p>Here the cloud is "+ descip+"</p>");
        res.write("<h1> and temp in " + query+ " is " + temp +" in degree celsius.</h1>")
        res.write("<img src=" + imageUrl+ ">")
        res.send();
    })

    })

 })



    app.listen(3000, function(){
        console.log("The server is running at port 3000");
    })