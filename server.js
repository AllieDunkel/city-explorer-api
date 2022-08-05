'use strict'
console.log('server is connected!!!')

//================================================//

//REQUIRE
//1. npm i express
const express= require('express');

//how we bring in the env file
require('dotenv').config();
let weatherData = require('./data/weather.json');

//now include cors to share resourses over the web
const cors= require('cors');
const{response}= require('express');

//================================================//

//USE
// this is where we assign the reqired file a variable name

//2. 
const app= express();
app.use(cors()); 

// npm i dotenv - define our port, validate that my .env file is working.
const PORT = process.env.PORT || 3001;

//================================================//

//ROUTES we will use to access our end point

//add weather route
app.get('/weather', (request, response)=> {
  try{
  let lat= request.query.lat;
  let lon= request.query.lon;
  let searchQuery= request.query.query;

  //add data file and look at find(will find the first and returns only that match)
  let cityLat= data.find(cityLat=>cityLat.lat===lat);
    console.log('cityLat', cityLat);
  let cityLon= data.find(cityLon=>cityLon.lon===lon);
    console.log('cityLon', cityLon);
  let citySearchQue= data.find(citySearchQue=>citySearchQue.city_name = searchQuery);
    console.log('citySearchQue', citySearchQue);let weatherReturn=weatherData.data.map((dailyWeather) => new Forecast(dailyWeather));
    response.send(weatherReturn);


  //now create a class below
  } catch (error) {
    //create a new instance of error
    next(error);
    //this will instantiate any new error
  }
});

app.get('*', (request, response) => {
  response.send('The location was not found. Error 404');
});

//================================================//

//CLASSES
//We can send over an object and it construct it as an instance 

class Forecast{
  constructor(forecastObject) {
    this.dataTime = data.dataTime;
    this.description = 'Today will have a low of('
  }
}

//================================================//

//ERRORS

app.use((error, request, response, next) =>{
  response.status(500).send(error.message);
});

//================================================//

//LISTEN

app.listen(PORT, () => console.log('Listening on PORT: ${PORT}'));
//.listen() is an express method that takes in a PORT value and a callback function
