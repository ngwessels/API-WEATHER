import { Location } from './getLocation.js';
import { Weather } from './getWeather.js';
import $ from 'jquery';
import './example/leaflet/leaflet.scss';
import './leaflet-openweathermap.scss';
import './example/files/map.scss';
import './example/leaflet/leaflet-languageselector.scss';
import './sass/styles.scss';
import './example/index.js';


$(document).ready(function() {
  let location = new Location();
  let weather = new Weather();
  $(".addressForm").submit(function(event) {
    event.preventDefault();
    const street = $("#streetAddress").val();
    const city = $("#city").val();
    const state = $("#state").val();
    $(".addressForm").hide();


    const myPromise = location.main(street, city, state);
    myPromise.then(function(response) {
      let body = JSON.parse(response);
      const results = location.getLocation(body);
      let myPromise2 = weather.main(location.currentCoords);
      myPromise2.then(function(response) {
        let body = JSON.parse(response);
        weather.getWeather(body);
        weather.getMinutely();
        console.log(weather.results);
        setInterval(function() {
          let myPromise2 = weather.main(location.currentCoords);
          myPromise2.then(function(response) {
            let body = JSON.parse(response);
            weather.getWeather(body);
            weather.getMinutely();
            console.log(weather.results);
            console.log("Tick");
          });
        }, 300000);
      }, function(error) {
        console.log("Error");
      });
      // that.printResults(results)
      }, function(error) {
      console.log("Error");
    });
  });
  // location.main("2678 NW Stringtown Rd", "Forest Grove", "OR");



});
