import $ from 'jquery';
import { RadarMap } from './example/main.js';
export class Location {
  constructor() {
    this.data;
    this.currentCoords = [];
  }

  combine(street, city, state) {
    let newStreet = street;
    let newCity = city;
    let newState = state;
    if(newStreet) {
      for(let i = 0; i < 20; i++) {
        newStreet = newStreet.replace(" ", "+");
      }
    }
    for(let i = 0; i < 20; i++) {
      newCity = newCity.replace(" ", "+");
    }
    for(let i = 0; i < 20; i++) {
      newState = newState.replace(" ", "+");
    }
    let string;
    if(newStreet) {
      string = newStreet + ",+" + newCity + ",+" + newState;
    } else {
      string = newCity + ",+" + newState;
    }
    return string;
  }
  location(string) {
    debugger;
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address="+ string + "&key=" + process.env.google_geocode_api;
    return url;
  }

  getLocation(info) {
    let radar = new RadarMap();
    console.log(info);
    let lat = info.results[0].geometry.location.lat;
    let lng = info.results[0].geometry.location.lng;
    let array = [lat, lng];
    radar.main(array);
    this.currentCoords = array;
    return array;
  }

  main(street, city, state) {
    console.log(street, city, state);
    debugger;
    let that = this;
    const string = this.combine(street, city, state);
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = that.location(string);
        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }
        request.open("GET", url, true);
        request.send();
      });
    // promise.then(function(response) {
    //   let body = JSON.parse(response);
    //   console.log(this)
    //   const results = that.getLocation(body);
    //   console.log(results);
    //   that.printResults(results)
    //   }, function(error) {
    //   console.log("Error");
    // });
  }

  getInfo() {
    setTimeout(function() {
      console.log(this.data);
    }, 2000);
  }
}
