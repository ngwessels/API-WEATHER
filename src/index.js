import { Location } from './getLocation.js';
import $ from 'jquery';
import './sass/styles.scss';


$(document).ready(function() {
  let location = new Location();
  $(".addressForm").submit(function(event) {
    event.preventDefault();
    const street = $("#streetAddress").val();
    const city = $("#city").val();
    const state = $("#state").val();
    $("#streetAddress").hide();
    $("#city").hide();
    $("#state").hide();
    $(".addresses").hide();

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
