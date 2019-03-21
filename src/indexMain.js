import { Location } from './getLocation.js';
import $ from 'jquery';
import './example/leaflet/leaflet.scss';
import './leaflet-openweathermap.scss';
import './example/files/map.scss';
import './example/leaflet/leaflet-languageselector.scss';
import './sass/styles.scss';


$(document).ready(function() {
  let location = new Location();
  $(".addressForm").submit(function(event) {
    event.preventDefault();
    const street = $("#streetAddress").val();
    const city = $("#city").val();
    const state = $("#state").val();
    $(".addressForm").hide();
    console.log(location.currentCoords);


    const myPromise = location.main(street, city, state);
    myPromise.then(function(response) {
      let body = JSON.parse(response);
      const results = location.getLocation(body);
      console.log(results);
      // that.printResults(results)
      }, function(error) {
      console.log("Error");
    });
  });
  // location.main("2678 NW Stringtown Rd", "Forest Grove", "OR");



});










import './example/index.js';
