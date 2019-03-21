import $ from 'jquery';








export class Weather {
  constructor() {
    this.minutely = [];
    this.hourly = [];
    this.daily = [];
    this.currently = [];
  }

  url(lat, lng) {
    let coords = lat + "," + lng;
    let url = 'https://corsanywhere.herokuapp.com/https://api.darksky.net/forecast/' + process.env.dark_sky_api + "/" + lat + "," + lng;
    return url;
  }

  getWeather(info) {
    console.log(info);
    console.log(info.currently);
    console.log(info.daily);
    console.log(info.flags);
    console.log(info.hourly);
    console.log(info.minutely);
    console.log(info.offset);
    console.log(info.timezone);
  }



  main(coords) {
    console.log(coords);
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
