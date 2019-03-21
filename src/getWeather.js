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
    let day = [];
    let length = this.daily.data.length;
    console.log(length);
    console.log(this.daily.data[0]);
    for (let i = 0; i < length; i++) {
      let array = [];
      let daily = this.daily.data[i];
      let apparentTempHigh = daily.apparentTemperatureHigh;
      let apparentTempHighTime = daily.apparentTemperatureHighTime;
      let apparentTempLow = daily.apparentTemperatureLow;
      let apparentTempLowTime = daily.apparentTemperatureLowTime;
      let apparentTempMax = daily.apparentTemperatureMax;
      let apparentTempMaxTime = daily.apparentTemperatureMaxTime;
      let apparentTempMin = daily.apparentTemperatureMin;
      let apparentTempMinTime = daily.apparentTemperatureMinTime;
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

  getCurrently() {
    let current = [];
    let length = this.currently.length;
    for(let i = 0; i < 1; i++) {
      let array = [];
      let currently = this.currently;
      let apparentTemperature = currently.apparentTemperature;
      let cloudCover = currently.cloudCover;
      let dewPoint = currently.dewPoint;
      let humidity = currently.humidity;
      let icon = currently.icon;
      let nearestStormBearing = currently.nearestStormBearing;
      let nearestStormDistance = currently.nearestStormDistance;
      let ozone = currently.ozone;
      let precipIntensity = currently.precipIntensity;
      let precipProbability = currently.precipProbability;
      let pressure = currently.pressure;
      let summary = currently.summary;
      let temp = currently.temperature;
      let time = currently.time;
      let uv = currently.uvIndex;
      let visibility = currently.visibility;
      let windBearing = currently.windBearing;
      let windGust = currently.windGust;
      let windSpeed = currently.windSpeed;
      array = [apparentTemperature, cloudCover, dewPoint, humidity, icon, nearestStormBearing, nearestStormDistance, ozone, precipIntensity, precipProbability, pressure, summary, temp, time, uv, visibility, windBearing, windGust, windSpeed];
      current[i] = array;
    }
    console.log(current);
  }

  getHourly() {
    let hour = [];
    let length = this.hourly.data.length;
    for(let i = 0; i < length; i++) {
      let array = [];
      let hourly = this.hourly.data[i];
      let apparentTemp = hourly.apparentTemperature;
      let cloudCover = hourly.cloudCover;
      let dewPoint = hourly.dewPoint;
      let humidity = hourly.humidity;
      let icon = hourly.icon;
      let ozone = hourly.ozone;
      let precipIntensity = hourly.precipIntensity;
      let precipProbability = hourly.precipProbability;
      let pressure = hourly.pressure;
      let summary = hourly.summary;
      let temp = hourly.temperature;
      let time = hourly.time;
      let uv = hourly.uvIndex;
      let visibility = hourly.visibility;
      let windBearing = hourly.windBearing;
      let windGust = hourly.windGust;
      let windSpeed = hourly.windSpeed;
      array = [apparentTemp, cloudCover, dewPoint, humidity, icon, ozone, precipIntensity, precipProbability, pressure, summary, temp, uv ,visibility, windBearing, windGust, windSpeed];
      hour[i] = array;
    }
    console.log(hour);
  }

  getMinutely() {
    let length = this.minutely.data.length;
    let minutely = [];
    for(let i = 0; i < length; i++) {
      let array = [];
      let minute = this.minutely.data[i];
      let precipIntensity = minute.precipIntensity;
      let precipProbability = minute.precipProbability;
      let time = minute.time;
      array = [precipIntensity, precipProbability, time];
      minutely[i] = array;
    }
    console.log(minutely);
    this.getDaily();
    this.getCurrently();
    this.getHourly();
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
