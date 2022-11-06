const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

// fetch data from external server
const https = require("https");

// can have only 1 res.send method in 1 app.get method
app.get('/',(req,res) => {
    res.sendFile(__dirname + "/index.html");
})


app.post('/', function(req,res){

    const query = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=cbf04a5926dc62ad1fd20d61fa66b75e&units=metric";

    https.get(url, function(response) {

        console.log(response.statusCode);

        // Search response for some data
        response.on("data", function(data) {    // call back function that contains the data that we get
            
            // data is in hexadecimal format
            // convert data into javascript object
            const weatherData = JSON.parse(data);
            
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            // Wrap the text in res.write and then send this at once using res.send()
            res.write("<p> The Weather is currently " + weatherDescription + "</p>");
            res.write("<h1> The Temperature in " + query + " is " + temp + " degree celcius. </h1>");
            res.write("<img src=" + image + ">");

            res.send();
        })
    })

})

app.listen(3000, () => {
    console.log("Server is on 3000");
})