import $ from 'jquery';
import { Location } from './getLocation.js';






export class Weather {
  constructor() {
    this.minutely = [];
    this.hourly = [];
    this.daily = [];
    this.currently = [];
    this.flags = [];
    this.offset;
    this.timezone;
    this.results = [];
    this.lat;
    this.lng;
  }

  refresh() {
    let that = this;

    let array = [this.lat, this.lng];
    console.log("Array is: " + array);
    setInterval(function() {

      that.reset();
      that.main(array);
      console.log("Tick");
    }, 3000);
  }

  url(lat, lng) {
    let coords = lat + "," + lng;
    let url = 'https://corsanywhere.herokuapp.com/https://api.darksky.net/forecast/' + process.env.dark_sky_api + "/" + lat + "," + lng;
    return url;
  }

  getWeather(info) {

    this.minutely = info.minutely;
    this.hourly = info.hourly;
    this.daily = info.daily;
    this.flag = info.flags;
    this.offset = info.offset;
    this.timezone = info.timezone;
    this.results = info;
    this.currently = info.currently;
    this.lat = info.latitude;
    this.lng = info.longitude;
  }

  reset() {
    this.minutely = [];
    this.hourly = [];
    this.daily = [];
    this.currently = [];
    this.flags = [];
    this.offset;
    this.timezone;
    this.results = [];
  }



  main(coords) {
    const lat = coords[0];
    const lng = coords[1];
    const address = this.url(lat, lng);
    let that = this;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", address, true);
      request.send();
    });
  }
}
