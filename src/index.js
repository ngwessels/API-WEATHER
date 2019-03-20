import { Location } from './getLocation.js';
import $ from 'jquery';
import './sass/styles.scss';
import { RadarMap } from './example/main.js';


$(document).ready(function() {
  let location = new Location();
  let radar = new RadarMap();
  $(".addressForm").submit(function(event) {
    event.preventDefault();
    const street = $("#streetAddress").val();
    const city = $("#city").val();
    const state = $("#state").val();
    $(".addressForm").hide();
    radar.main();


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
