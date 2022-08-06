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
//why does this one have next? But the movie one doesn't?
app.get('/weather', (request, response, next)=> {
  //why do you need to have the query there?
  try{
  let lat= request.query.lat;
  let lon= request.query.lon;
  let searchQuery= request.query.searchquery;
  const URL= `` ;
  let weatherData= await axios.get(URL)
  let weatherForecast= weatherData.data.data.map (weatherData => new Forecast (weatherData));
  //now create a class below
  response.status(200).send(weatherForecast);
  //create a new instance of error
  } catch (error) {
    next(error);
  //this will instantiate any new error
  }
});

  app.get('*' , (request, response ) => {
    response.send('The lcoation was npt found. Error 404');
  })

//================================================//

//CLASSES
//We can send over an object and it construct it as an instance 

class Forecast{
  constructor(forecastObject) {
    this.dateTime= forecastObject.dateTime;
    //why does this one have weather but the other ones don't?
    this.description= forecastObject.weather.description;
    this.temp= forecastObject.temp;
    this.minTemp= forecastObject.minTemp;
    this.maxTemp= forecastObject.maxTemp;
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
