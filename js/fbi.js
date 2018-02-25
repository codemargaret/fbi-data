export class Fbi {
  constructor(){

  }

  makePromise(endpoint){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = endpoint;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

  callApi(promise,yearToFind,crimeToFind){
    promise.then(function(response) {
      let body = JSON.parse(response);
      let thisYear;
      for(let i = 0; i < 23; ++i){
        thisYear = body.results[i].year;
        if(thisYear === yearToFind){
          $('.showYear').text(`Year: ${body.results[i].year}`);
          $('.showState').text(`State:   ${body.results[i].state_abbr}.`);
          $('.showPop').text(`Population:  ${body.results[i].population}.`);
          if(crimeToFind === "homicide"){
            $('.crime').text(`Homicides: ${body.results[i].homicide}`);
          }
          if(crimeToFind === "violent_crime"){
            $('.crime').text(`Violent Crimes: ${body.results[i].violent_crime}`);
          }
          if(crimeToFind === "rape_legacy"){
            $('.crime').text(`Rapes: ${body.results[i].rape_legacy}`);
          }
          if(crimeToFind === "robbery"){
            $('.crime').text(`Robberies: ${body.results[i].robbery}`);
          }
          if(crimeToFind === "aggravated_assault"){
            $('.crime').text(`Aggravated Assaults: ${body.results[i].aggravated_assault}`);
          }
          if(crimeToFind === "property_crime"){
            $('.crime').text(`Property Crimes: ${body.results[i].property_crime}`);
          }
          if(crimeToFind === "burglary"){
            $('.crime').text(`Burglaries: ${body.results[i].burglary}`);
          }
          if(crimeToFind === "larceny"){
            $('.crime').text(`Larcenies: ${body.results[i].larceny}`);
          }
          if(crimeToFind === "motor_vehicle_theft"){
            $('.crime').text(`Grand Theft Autos: ${body.results[i].motor_vehicle_theft}`);
          }
          return true;
        }
      }
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  }

  arrayOfCrime(promise,yearToFind,crimeToFind){
    promise.then(function(response) {
      let body = JSON.parse(response);
      let thisYear;
      let crimeArray = [['Year', crimeToFind, 'Population *1000']];
      for(let i = 0; i< 22;++i){
        thisYear = (body.results[i].year).toString();
        crimeArray.push([]);
        crimeArray[i+1].push(thisYear);
        if(crimeToFind === "homicide"){
          crimeArray[i+1].push(body.results[i].homicide);
        }
        else if(crimeToFind === "violent_crime"){
          crimeArray[i+1].push(body.results[i].violent_crime);
        }
        else if(crimeToFind === "rape_legacy"){
          crimeArray[i+1].push(body.results[i].rape_legacy);
        }
        else if(crimeToFind === "robbery"){
          crimeArray[i+1].push(body.results[i].robbery);
        }
        else if(crimeToFind === "aggravated_assault"){
          crimeArray[i+1].push(body.results[i].aggravated_assault);
        }
        else if(crimeToFind === "property_crime"){
          crimeArray[i+1].push(body.results[i].property_crime);
        }
        else if(crimeToFind === "burglary"){
          crimeArray[i+1].push(body.results[i].burglary);
        }
        else if(crimeToFind === "larceny"){
          crimeArray[i+1].push(body.results[i].larceny);
        }
        else if(crimeToFind === "motor_vehicle_theft"){
          crimeArray[i+1].push(body.results[i].motor_vehicle_theft);
        }
        crimeArray[i+1].push((body.results[i].population)/1000);
      }

        let data = google.visualization.arrayToDataTable(crimeArray);

        let options = {
          title: crimeToFind + ' by year',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        let chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);

      return crimeArray;
    },function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  }
}
