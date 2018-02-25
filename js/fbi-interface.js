import { Fbi } from './../js/fbi.js';
var apiKey = require('./../.env').apiKey;
 google.charts.load('current', {'packages':['corechart']});
$(document).ready(function() {

  $('#fbi-oregon').submit(function(event) {
    event.preventDefault();
    let fbi = new Fbi();
    let year = parseInt($('#year').val());
    let crime = $('#crimeType').val();
    debugger;
    let promise = fbi.makePromise(`https://api.usa.gov/crime/fbi/ucr/estimates/states/OR?page=1&per_page=23&output=json&api_key=${apiKey}`);

    fbi.arrayOfCrime(promise,year,crime);

    fbi.callApi(promise,year,crime);
  });
});
