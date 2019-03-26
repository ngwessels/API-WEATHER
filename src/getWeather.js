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
    this.summary = [];
  }

  resetDivs() {
    for(let i = 0; i > 7; i++) {
      $(".Day" + [i]).empty();
    }
    $(".currently").empty();
    $(".dayInfo").empty();
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


  getDirection(input) {
    let string = "";
    if(input >= 345 || input < 15){
      string = "N";
    } else if(input >= 15 && input < 30) {
      string = "NNE";
    } else if(input >= 30 && input < 60) {
      string = "NE";
    } else if(input >= 60 && input < 75) {
      string = "ENE";
    } else if(input >= 75 && input < 105) {
      string = "E";
    } else if(input >= 105 && input < 120) {
      string = "ESE";
    } else if(input >= 120 && input < 150) {
      string = "SE";
    } else if(input >= 150 && input < 165) {
      string = "SSE";
    } else if(input >= 165 && input < 195) {
      string = "S";
    } else if(input >= 195 && input < 210) {
      string = "SSW";
    } else if(input >= 210 && input < 240) {
      string = "SW";
    } else if(input >= 240 && input < 255) {
      string = "WSW";
    } else if(input >= 255 && input < 285) {
      string = "W";
    } else if(input >= 285 && input < 300) {
      string = "WNW";
    } else if(input >= 300 && input < 330) {
      string = "NW";
    } else if(input >= 330 && input < 345) {
      string = "NNW";
    }
    return string;
  }

  displaySpecs() {
    let info = [];
    let d = new Date();
    let dayNumber = d.getDay();
    let dayToday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let daySummary = [];
    for(let i = 0; i < dayNumber; i++) {
      let currentDay = dayToday[0];
      dayToday.shift();
      dayToday.push(currentDay);
    }
    for(let i = 0; i < this.daily.data.length; i++) {
      var string;
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
      let iconInfo;
      if(icon == "clear-day" || icon == "clear-night") {
        iconInfo = "<div class='sunny'><div class='sun'><div class='rays'></div></div></div>";
      } else if (icon == "rain") {
        iconInfo = "<div class='rainy'><div class='cloud'></div><div class='rain'></div></div>";
      } else if (icon == "snow") {
        iconInfo = "<div class='flurries'><div class='cloud'></div><div class='snow'><div class='flake'></div><div class='flake'></div></div></div>";
      } else if (icon == "sleet") {
        iconInfo = "<div class='flurries'><div class='cloud'></div><div class='snow'><div class='flake'></div><div class='rain'></div></div></div>";
      } else if(icon == "wind") {
        iconInfo = "<div class='sun-clouds'><div class='cloud'></div><div class='sun'><div class='rays'></div></div></div>";
      } else if(icon == "fog") {
        iconInfo = "<div class='cloudy'><div class='cloud'></div><div class='cloud'></div></div>";
      } else if(icon == "cloudy") {
        iconInfo = "<div class='cloudy'><div class='cloud'></div><div class='cloud'></div></div>";
      } else if(icon == "partly-cloudy-day" || icon == "partly-cloudy-night") {
        iconInfo = "<div class='sun-clouds'><div class='cloud'></div><div class='sun'><div class='rays'></div></div></div>";
      } else if(icon == "hail" || icon == "thunderstorm" || icon == "tornado"){
      }
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
      cloudCover = cloudCover * 100;
      sunrise = this.timeConverter(sunrise);
      sunset = this.timeConverter(sunset);
      uvTime = this.timeConverter(uvTime);
      windBearing = this.getDirection(windBearing);
      tempHighTime = this.timeConverter(tempHighTime);
      tempLowTime = this.timeConverter(tempLowTime);
      precipIntensityMaxTime = this.timeConverter(precipIntensityMaxTime);
      var checkedPrec = this.checkPrecipitation(precipIntensity, precipIntensityMax, precipIntensityMaxTime, precipProbability);
      apparentTempHighTime = this.timeConverter(apparentTempHighTime);
      apparentTempLowTime = this.timeConverter(apparentTempLowTime);
      moonPhase = this.moonPhase(moonPhase);
      humidity = humidity * 100;
      string = "<div id='Day'><h3>" + dayToday[i] + "</h3></div><div class='moonInfo'<p><h3>Moon Phase</h3><p>" + moonPhase + "</p></div><div class='weatherIconInfo'>" + iconInfo + "</div><div id='summary'><h3>Summary:</h3><p>" + summary + "</p></div><div class='tempInfo'><h3>Temperature Info</h3><p>High Temperature " + tempHigh + "°F at around " + tempHighTime + ".</p><p>Low Temperature " + tempLow + "°F at around " + tempLowTime + ".</p><p>Feels Like High Temperature " + apparentTempHigh + "°F at around " + apparentTempHighTime + ".</p><p>Feels Like Low Temperature " + apparentTempLow + "°F at around " + apparentTempLowTime + ".</p></div><div class='humidity'><h3>Humidity & Visibility</h3><p>Humidity is at " + humidity + "%</p><p>Visibility: " + visibility + " miles.</p></div><div class='pressure'><h3>Pressure</h3><p>Average Pressure " + pressure + " Millibars</p></div><div class='wind'><div class='compass'><div class='direction'><p>" + windBearing + "<span>" + windSpeed + " mph</span></p></div><div class='arrow " + windBearing +"'></div></div></div><div class='cloudInfo'><h3>Cloud Cover</h3><p>Cloud Cover: " + cloudCover + "%</p></div><div class='dewPoint'><h3>Dew Point</h3><p>Dew Point is at " + dewPoint + "°F</p></div><div class='precipitationInfo'><h3>Precipitation Info</h3><p>" + checkedPrec + "</p></div><div class='uv'><h3>UV Light Info</h3><p>UV Index is at " + uv + ". The Worst time to be outside will be around " + uvTime + ".</p></div><div class='ozone'><h3>Ozone Layer</h3><p>On average the Ozone layer will be at " + ozone + " Dobson Units. Visit <a href='https://ozonewatch.gsfc.nasa.gov/facts/dobson_SH.html'>Ozone Watch</a> for more info.</p></div><div class='sunInfo'><h3>SunRise and SunSet</h3><p>The Sun will rise at: " + sunrise + ".</p><p>The Sun will set at " + sunset + "</p></div>";
      info[i] = string;
    }
    this.clickFunction(info);
  }

  clickFunction(summary) {
    for(let i = 0; i < 7; i++) {
      let that = this;
      $(".Day" + [i]).click(function() {
        that.daySummary(i, summary[i]);
        $(".dailySpecsGrid").show();
      });
    }
  }
  checkPrecipitation(intensity, intensityMax, time, probability) {
    let string;
    probability = probability * 100;
    if(probability > 0){
      string = "<p>There is a " + probability + "% chance of Precipitation. You will likely get " + intensity + " inches of Precipitation. At around "  + time + " the precipitation will be coming down the hardest.</p>";
    } else {
      string = "<p>No Rain in Forecast</p>";
    }
    return string;
  }

  moonPhase(input) {
    if(input == 0) {
      return "New Moon";
    } else if(input > 0 && input < 0.25) {
      return "Waxing Crescent Moon";
    } else if(input == 0.25) {
      return "First Quarter Moon";
    } else if(input > 0.25 && input < 0.5) {
      return "Waxing Gibbous Moon";
    } else if(input == 0.5) {
      return "Full Moon";
    } else if(input > 0.5 && input < 0.75) {
      return "Waning Gibbous";
    } else if(input == 0.75) {
      return "Last Quarter Moon";
    } else if(input > 0.75) {
      return "Waning Crescent Moon";
    }
  }


  daySummary(i, summary) {
    $(".summary").empty();
    $(".summary").append(summary);
  }

  getDaily() {
    let day = [];
    let length = this.daily.data.length;
    let d = new Date();
    let dayNumber = d.getDay();
    let dayToday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let daySummary = [];
    for(let i = 0; i < dayNumber; i++) {
      let currentDay = dayToday[0];
      dayToday.shift();
      dayToday.push(currentDay);
    }
    for (let i = 0; i < 7; i++) {
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
      daySummary[i] = summary;
      // array = [apparentTempHigh, apparentTempHighTime, apparentTempLow, apparentTempLowTime, apparentTempMax, apparentTempMaxTime, apparentTempMin, apparentTempMinTime, cloudCover, dewPoint, humidity, icon, moonPhase, ozone, precipIntensity, precipIntensityMax, precipIntensityMaxTime, precipProbability, pressure, summary, sunrise, sunset, tempHigh, tempHighTime, tempLow, tempLowTime, tempMax, tempMaxTime, tempMin, tempMinTime, time, uv, uvTime, visibility, windBearing, windGust, windGustTime, windSpeed]
      // day[i] = array;
      if(i == 0) {
        $(".Day" + [i]).append("<p class='date'>Today</p>");
      } else {
        $(".Day" + [i]).append("<p class='date'>" + dayToday[i] + "</p>");
      }
      if(icon == "clear-day" || icon == "clear-night") {
        $(".Day" + [i]).append("<div class='sunny'><div class='sun'><div class='rays'></div></div></div>");
      } else if (icon == "rain") {
        $(".Day" + [i]).append("<div class='rainy'><div class='cloud'></div><div class='rain'></div></div>");
      } else if (icon == "snow") {
        $(".Day" + [i]).append("<div class='flurries'><div class='cloud'></div><div class='snow'><div class='flake'></div><div class='flake'></div></div></div>");
      } else if (icon == "sleet") {
        $(".Day" + [i]).append("<div class='flurries'><div class='cloud'></div><div class='snow'><div class='flake'></div><div class='rain'></div></div></div>");
      } else if(icon == "wind") {
        $(".Day" + [i]).append("<div class='sun-clouds'><div class='cloud'></div><div class='sun'><div class='rays'></div></div></div>");
      } else if(icon == "fog") {
        $(".Day" + [i]).append("<div class='cloudy'><div class='cloud'></div><div class='cloud'></div></div>");
      } else if(icon == "cloudy") {
        $(".Day" + [i]).append("<div class='cloudy'><div class='cloud'></div><div class='cloud'></div></div>");
      } else if(icon == "partly-cloudy-day" || icon == "partly-cloudy-night") {
        $(".Day" + [i]).append("<div class='sun-clouds'><div class='cloud'></div><div class='sun'><div class='rays'></div></div></div>");
      } else if(icon == "hail" || icon == "thunderstorm" || icon == "tornado"){
      }
      $(".Day" + [i]).append("<div class='weatherInfo'><div class='weathertemp'><p class='tempHigh'>High: " + tempHigh + "°F</p><p class='tempLow'>Low: " + tempLow + "°F</p><p class='wind'>Wind Speed: " + windSpeed + "MPH</p><p class='humidity'>Humidity: " + humidity * 100 + "%</p><p class='cloudCover'>Cloud Cover: " + cloudCover * 100 + "%</p><p class='uv'>UV Index: " + uv + "</p><p class='sunRise'>Sunrise Time: " + this.timeConverter(sunrise) + "</p><p class='sunSet'>SunSet Time: " + this.timeConverter(sunset) + "</p></div></div>");
    }
    $(".localWeather").show();
    for(let i = 0; i < 7; i ++) {
      $(".Day" + [i]).hide();
      $(".Day" + [i]).fadeIn(i * 800);
    }

  }




  timeConverter(input) {
    let a = new Date(input * 1000);
    let hour = a.getHours();
    let minute = a.getMinutes();
    let sec = a.getSeconds();
    var index = "AM"
    if(hour > 12) {
      hour = hour - 12;
      index = "PM";
    }
    if(minute <= 9) {
      minute = "0" + minute;
    }
    if(sec <= 9) {
      sec = "0" + sec;
    }
    let time = hour +":" + minute + ":" + sec + index;
    return time;
  };

  getCurrently() {
    let current = [];
    let length = this.currently.length;
    let array = [];
    let currently = this.currently;
    let apparentTemperature = currently.apparentTemperature;
    let cloudCover = currently.cloudCover;
    let dewPoint = currently.dewPoint;
    let humidity = currently.humidity;
    let icon = currently.icon;
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
    $(".currently").append("<p class='date'>Current Weather</p>");
    if(icon == "clear-day" || icon == "clear-night") {
      $(".currently").append("<div class='sunny'><div class='sun'><div class='rays'></div></div></div>");
    } else if (icon == "rain") {
      $(".currently").append("<div class='rainy'><div class='cloud'></div><div class='rain'></div></div>");
    } else if (icon == "snow") {
      $(".currently").append("<div class='flurries'><div class='cloud'></div><div class='snow'><div class='flake'></div><div class='flake'></div></div></div>");
    } else if (icon == "sleet") {
      $(".currently").append("<div class='flurries'><div class='cloud'></div><div class='snow'><div class='flake'></div><div class='rain'></div></div></div>");
    } else if(icon == "wind") {
      $(".currently").append("<div class='sun-clouds'><div class='cloud'></div><div class='sun'><div class='rays'></div></div></div>");
    } else if(icon == "fog") {
      $(".currently").append("<div class='cloudy'><div class='cloud'></div><div class='cloud'></div></div>");
    } else if(icon == "cloudy") {
      $(".currently").append("<div class='cloudy'><div class='cloud'></div><div class='cloud'></div></div>");
    } else if(icon == "partly-cloudy-day" || icon == "partly-cloudy-night") {
      $(".currently").append("<div class='sun-clouds'><div class='cloud'></div><div class='sun'><div class='rays'></div></div></div>");
    } else if(icon == "hail" || icon == "thunderstorm" || icon == "tornado"){
    }
    $(".currently").append("<div class='weatherInfo'><div class='weathertemp'><p class='temp'>Current Temperature: " + temp + "°F</p><p class='wind'>Wind Speed: " + windSpeed + "MPH</p><p class='windDirection'>Wind Direction: " + this.getDirection(windBearing) + "</p><p class='humidity'>Humidity: " + humidity * 100 + "%</p><p class='cloudCover'>Cloud Cover: " + cloudCover * 100 + "%</p><p class='uv'>UV Index: " + uv + "</p></div></div>");
  }

  getHourly() {
    let hour = [];
    let length = this.hourly.data.length;
    let graph = [];
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
      time = this.timeConverter(time);
      cloudCover = cloudCover * 100;
      humidity = humidity * 100;
      precipProbability = precipProbability * 100;
      visibility = visibility * 10;
      graph[i] = {cloud: cloudCover, dewPoint: dewPoint, humidity: humidity, ozone: ozone, precip: precipProbability, pressure: pressure, temp: temp, uv: uv, visibility: visibility, time: time};
      array = [apparentTemp, cloudCover, dewPoint, humidity, icon, ozone, precipIntensity, precipProbability, pressure, summary, temp, uv ,visibility, windBearing, windGust, windSpeed];
      hour[i] = array;
    }
    this.drawGraph(graph);
    this.pressureGraph(graph);
    this.temperatureGraph(graph);
  }

  temperatureGraph(input) {
    let dataTemp = [];
    let dataTime = [];
    for(let i = 0; i < input.length; i++) {
      let instance = input[i];
      let temp = instance.temp;
      let time = instance.time;
      dataTemp.push(temp);
      dataTime.push(time);
    }
    var c = $("#temp");
    var speedCanvas = document.getElementById("temp");

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;

    var dataFirst = {
        label: "Temperature",
        data: dataTemp,
        lineTension: 0.3,
        fill: false,
        borderColor: 'red',
        backgroundColor: 'red',
        pointBorderColor: 'red',
        pointBackgroundColor: 'transparent',
        pointRadius: 5,
        pointHoverRadius: 15,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'rect',
      };

    var speedData = {
      labels: dataTime,
      datasets: [dataFirst]
    };

    var chartOptions = {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'white'
        }
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      data: speedData,
      options: chartOptions
    });

  }



  pressureGraph(input) {
    let dataPressure = [];
    let dataTime = [];
    for(let i = 0; i < input.length; i++) {
      let instance = input[i];
      let pressure = instance.pressure;
      let time = instance.time;
      dataPressure.push(pressure);
      dataTime.push(time);
    }
    var c = $("#pressure");
    var speedCanvas = document.getElementById("pressure");

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;

    var dataFirst = {
        label: "Pressure Millibars",
        data: dataPressure,
        lineTension: 0.3,
        fill: false,
        borderColor: 'red',
        backgroundColor: 'red',
        pointBorderColor: 'red',
        pointBackgroundColor: 'transparent',
        pointRadius: 5,
        pointHoverRadius: 15,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'rect',
      };

    var speedData = {
      labels: dataTime,
      datasets: [dataFirst]
    };

    var chartOptions = {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'white'
        }
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      data: speedData,
      options: chartOptions
    });

  }



  drawGraph(input) {
    let dataClouds = [];
    let dataDewPoint = [];
    let dataHumidity = [];
    let dataOzone = [];
    let dataPrecip = [];
    let dataUv = [];
    let dataVisibility = [];
    let dataTime = [];
    for(let i = 0; i < input.length; i++) {
      let instance = input[i];
      let clouds = instance.cloud;
      let dewPoint = instance.dewPoint;
      let humidity = instance.humidity;
      let ozone = instance.ozone;
      let precip = instance.precip;
      let uv = instance.uv;
      let visibility = instance.visibility;
      let time = instance.time;
      dataClouds.push(clouds);
      dataDewPoint.push(dewPoint);
      dataHumidity.push(humidity);
      dataPrecip.push(precip);
      dataOzone.push(ozone);
      dataUv.push(uv);
      dataVisibility.push(visibility);
      dataTime.push(time);
    }
    var c = $("#canvas");
    var speedCanvas = document.getElementById("canvas");

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;

    var dataFirst = {
        label: "Cloud%",
        data: dataClouds,
        lineTension: 0.3,
        fill: false,
        borderColor: 'red',
        backgroundColor: 'red',
        pointBorderColor: 'red',
        pointBackgroundColor: 'transparent',
        pointRadius: 5,
        pointHoverRadius: 15,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'rect',
      };

    var dataSecond = {
        label: "Dew Point",
        data: dataDewPoint,
        lineTension: 0.3,
        fill: false,
        borderColor: 'orange',
        backgroundColor: 'orange',
        pointBorderColor: 'orange',
        pointBackgroundColor: 'transparent',
        pointRadius: 5,
        pointHoverRadius: 15,
        pointHitRadius: 15,
        pointBorderWidth: 2
      };
      var dataThird = {
          label: "Humidity%",
          data: dataHumidity,
          lineTension: 0.3,
          fill: false,
          borderColor: 'yellow',
          backgroundColor: 'yellow',
          pointBorderColor: 'yellow',
          pointBackgroundColor: 'transparent',
          pointRadius: 5,
          pointHoverRadius: 15,
          pointHitRadius: 15,
          pointBorderWidth: 2
        };
      var dataFourth = {
          label: "Precipitation%",
          data: dataPrecip,
          lineTension: 0.3,
          fill: false,
          borderColor: 'green',
          backgroundColor: 'green',
          pointBorderColor: 'green',
          pointBackgroundColor: 'transparent',
          pointRadius: 5,
          pointHoverRadius: 15,
          pointHitRadius: 15,
          pointBorderWidth: 2
          };
      var dataFifth = {
          label: "Visibility",
          data: dataVisibility,
          lineTension: 0.3,
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'blue',
          pointBorderColor: 'blue',
          pointBackgroundColor: 'transparent',
          pointRadius: 5,
          pointHoverRadius: 15,
          pointHitRadius: 15,
          pointBorderWidth: 2
          };

    var speedData = {
      labels: dataTime,
      datasets: [dataFirst, dataSecond, dataThird, dataFourth, dataFifth]
    };

    var chartOptions = {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'white'
        }
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      data: speedData,
      options: chartOptions
    });
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
      time = this.timeConverter(time);
      minutely[i] = {precipProbability: precipProbability, precipIntensity: precipIntensity, time: time};
    }
    this.getDaily();
    this.getCurrently();
    this.getHourly();
    this.precipGraph(minutely);
  }






  precipGraph(input) {
    let dataIntensity = [];
    let dataProbability = [];
    let dataTime = [];
    for(let i = 0; i < input.length; i++) {
      let instance = input[i];
      let probability = instance.precipProbability;
      let intensity = instance.precipIntensity;
      let time = instance.time;
      dataProbability.push(probability);
      dataIntensity.push(intensity);
      dataTime.push(time);
    }
    var c = $("#minutes");
    var speedCanvas = document.getElementById("minutes");

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;

    var dataFirst = {
        label: "Precipitation Probability",
        data: dataProbability,
        lineTension: 0.3,
        fill: false,
        borderColor: 'red',
        backgroundColor: 'red',
        pointBorderColor: 'red',
        pointBackgroundColor: 'transparent',
        pointRadius: 5,
        pointHoverRadius: 15,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'rect',
      };
      var dataSecond = {
          label: "Precipitation Intensity(in/h)",
          data: dataIntensity,
          lineTension: 0.3,
          fill: false,
          borderColor: 'green',
          backgroundColor: 'green',
          pointBorderColor: 'green',
          pointBackgroundColor: 'transparent',
          pointRadius: 5,
          pointHoverRadius: 15,
          pointHitRadius: 30,
          pointBorderWidth: 2,
          pointStyle: 'rect',
        };

    var speedData = {
      labels: dataTime,
      datasets: [dataFirst, dataSecond]
    };

    var chartOptions = {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'white'
        }
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      data: speedData,
      options: chartOptions
    });

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
