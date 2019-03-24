import { Location } from './getLocation.js';
import { Weather } from './getWeather.js';
import $ from 'jquery';
import './example/leaflet/leaflet.scss';
import './leaflet-openweathermap.scss';
import './example/files/map.scss';
import './example/leaflet/leaflet-languageselector.scss';
import './example/index.js';
import './sass/weather-icon-animated.scss';
import './sass/loading.scss';
import './sass/styles.scss';
import Chart from 'chart.js';


$(document).ready(function() {
  let location = new Location();
  let weather = new Weather();
  $(".addressForm").submit(function(event) {
    event.preventDefault();
    const street = $("#streetAddress").val();
    const city = $("#city").val();
    const state = $("#state").val();
    $(".currentLocation").append("<p>" + street + " " + city + " " + state + "</p>");
    $(".addressForm").hide();
    $("#loadingScreen").show();


    const myPromise = location.main(street, city, state);
    setTimeout(function() {
      myPromise.then(function(response) {
        let body = JSON.parse(response);
        const results = location.getLocation(body);
        let myPromise2 = weather.main(location.currentCoords);
        myPromise2.then(function(response) {
          let body = JSON.parse(response);
          weather.getWeather(body);
          weather.getMinutely();
          $(".darkskylogo").hide();
          $("#loadingScreen").hide();
          $(".mapContainer").show();
          $("#map").show();
          setInterval(function() {
            let myPromise2 = weather.main(location.currentCoords);
            myPromise2.then(function(response) {
              let body = JSON.parse(response);
              weather.resetDivs();
              weather.getWeather(body);
              weather.getMinutely();
            });
          }, 300000);
        }, function(error) {
        });
        // that.printResults(results)
      }, function(error) {
      });

    },3000);
  });
  // location.main("2678 NW Stringtown Rd", "Forest Grove", "OR");
});
