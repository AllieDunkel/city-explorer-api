'use strict'
console.log('server is connected!!!')

//================================================//

//REQUIRE
//1. npm i express
const express= require('express');
const axios = require('axios');
//how we bring in the env file
require('dotenv').config();
// let weatherData = require('./data/weather.json');

//now include cors to share resourses over the web
const cors= require('cors');
const{response, request}= require('express');
const { default: axios } = require('axios');

//================================================//

//USE
// this is where we assign the reqired file a variable name

//2. 
const app= express();
app.use(cors()); 

// let cache= {};

// try {
//   let searchQueryFromTheFrontEnd= request.query.searchQuery;

//   let key= searchQueryFromTheFrontEnd
//   let timeToCache= 1000 * 60 * 60 * 24 * 30;
//   console.log(timeToCache);

//   let testToCache= 1000 * 10;
//   //10 seconds
//   console.log(testToCache);
//   console.log('empty', cache);

//   if(cache[key] && Date.now() - cache[key].timeStamp < testToCache) {
//     console.log('it is in the cache');
//     request.status(200).send(cache[key].data);
//   } else {
//     //we need to put it in cache
//     console.log('it is not in the cache')
//     let results= await axios.get(weatherData);let weatherInstance= results.data.results.map
//   }


// }



// npm i dotenv - define our port, validate that my .env file is working.
const PORT = process.env.PORT || 3002;

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
  const URL= `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
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

  app.get('/movies', getMovies);
  async function getMovies(request, response) {
    try {
      let searchQuery= request.query.searchQuery;
      console.log('front end query', searchQuery);
      let URL=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
      let cityMovie= await axios.get(URL);
      response.status(200).send(cityMovie.data);
      cityMovie.data.results.map()
      let moviesArray= cityMovie.data.results.map(movieData => new movie(movieData));
      console.log('movies array', moviesArray);
      response.status(200).send(moviesArray);
    } catch (error){
    console.log(error);
  }
}

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

class Movie{
  constructor(movieObject) {
    this.title= movieObject.title;
    this.src= movieObject.poster_path? movieObject.poster_path : 'myImage.jpg';
    this.overview;
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
