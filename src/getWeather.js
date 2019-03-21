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

  getDaily() {
    debugger;
    let day = [];
    let length = this.daily.data.length;
    console.log(length);
    console.log(this.daily.data[0]);
    for (let i = 0; i < length; i++) {
      debugger;
      let array = [];
      let daily = this.daily.data[i];
      let apparentTempHigh = daily.apparerentTemperatureHigh;
      let apparentTempHighTime = daily.apparentTemperatureHighTime;
      let apparentTempLow = daily.apparentTemperatureLow;
      let apparentTempLowTime = daily.apparentTemperatureLowTime;
      let apparentTempMax = daily.apparentTemperatureMax;
      let apparentTempMaxTime = daily.apparentTemperatureMaxTime;
      let apparentTempMin = daily.apparentTemperatureMin;
      let apparentTempMinTime = daily.apparentTemperatureMineTime;
      let cloudCover = daily.cloudCover;
      let dewPoint = daily.dewPoint;
      let humidity = daily.humidity;
      let icon = daily.icon;
      let moonPhase = daily.moonPhase;
      let ozone = daily.ozone;
      let precipIntensity = daily.precipIntensity;
      let precipIntensityMax = daily.precipIntensityMax;
      let precipIntensityMaxTime = daily.precipIntensityMaxTime;
      let precipProbability = daily.precipProbability;
      let pressure = daily.pressure;
      let summary = daily.summary;
      let sunrise = daily.sunriseTime;
      let sunset = daily.sunsetTime;
      let tempHigh = daily.temperatureHigh;
      let tempHighTime = daily.temperatureHighTime;
      let tempLow = daily.temperatureLow;
      let tempLowTime = daily.temperatureLowTime;
      let tempMax = daily.temperatureMax;
      let tempMaxTime = daily.temperatureMaxTime;
      let tempMin = daily.temperatureMin;
      let tempMinTime = daily.temperatureMinTime;
      let time = daily.time;
      let uv = daily.uvIndex;
      let uvTime = daily.uvIndexTime;
      let visibility = daily.visibility;
      let windBearing = daily.windBearing;
      let windGust = daily.windGust;
      let windGustTime = daily.windGustTime;
      let windSpeed = daily.windSpeed;
      array = [apparentTempHigh, apparentTempHighTime, apparentTempLow, apparentTempLowTime, apparentTempMax, apparentTempMaxTime, apparentTempMin, apparentTempMinTime, cloudCover, dewPoint, humidity, icon, moonPhase, ozone, precipIntensity, precipIntensityMax, precipIntensityMaxTime, precipProbability, pressure, summary, sunrise, sunset, tempHigh, tempHighTime, tempLow, tempLowTime, tempMax, tempMaxTime, tempMin, tempMinTime, time, uv, uvTime, visibility, windBearing, windGust, windGustTime, windSpeed]
      day[i] = array;
    }
    console.log(day);
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
