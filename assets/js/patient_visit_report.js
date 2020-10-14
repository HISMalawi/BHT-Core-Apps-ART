

function renderChart() {

/*Highcharts.getJSON(
  'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json',
  function (data) { */

      Highcharts.chart('chart-container', {
          chart: {
              zoomType: 'x'
          },
          series: [{
            name: "Patient present",
            data: sorted_data_patients
          }, {
            name: "Guardian present",
            data: sorted_data_guardians
          }, {
            name: "Both patient and guardian present",
            data: sorted_data_both_patient_guardians
          }] ,
          exporting: { 
            enabled: false 
          },
          credits: {
            enabled: false
          },

          title: {
              text: 'HIV Reception encounters'
          },
          subtitle: {
              text: document.ontouchstart === undefined ?
                  'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
          },
          xAxis: {
              type: 'datetime'
          },
          yAxis: {
              plotAreaHeight: 900,
              title: {
                  text: 'Number of clients'
              }
          },
          legend: {
              enabled: true
          },
          plotOptions: {
              area: {
                  fillColor: {
                      linearGradient: {
                          x1: 0,
                          y1: 0,
                          x2: 0,
                          y2: 1
                      },
                      stops: [
                          [0, Highcharts.getOptions().colors[0]],
                          [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                      ]
                  },
                  marker: {
                      radius: 2
                  },
                  lineWidth: 1,
                  states: {
                      hover: {
                          lineWidth: 1
                      }
                  },
                  threshold: null
              }
          }/*,

          series: [{
              type: 'area',
              name: 'USD to EUR',
              data: data
          }]*/
      });
  /*}
);*/


}


var url = window.location.href;
url = new URL(url);
var start_date = url.searchParams.get("start_date");
var end_date = url.searchParams.get("end_date");
var visit_dates = [];

function fetchData(){
  var url = sessionStorage.apiProtocol + "://" + sessionStorage.apiURL + ":";
  url += sessionStorage.apiPort + "/api/v1/patient_visit_types?program_id=" + sessionStorage.programID;
  url += "&date=" + sessionStorage.sessionDate;
  url += "&start_date=" + start_date + "&end_date=" + end_date;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      visits = JSON.parse(this.responseText);
      for(var visit_date in visits){
        visit_dates.push(visit_date);
      }

      sortData(visits);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

fetchData();


var sorted_data_patients= [];
var sorted_data_guardians= [];
var sorted_data_both_patient_guardians= [];

function sortData(visits){
  var patient_visit_type_hash = {};
  var guardian_visit_type_hash = {};
  var patient_guardian_visit_type_hash = {};

  for(var i = 0; i < visit_dates.length; i++){
    patient_visit_type_hash[visit_dates[i]] = 0;
    guardian_visit_type_hash[visit_dates[i]] = 0;
    patient_guardian_visit_type_hash[visit_dates[i]] = 0;
    
    for(var visit_date in visits){
      if(visit_date != visit_dates[i])
        continue;

      var data = visits[visit_date];

      for(patient_id in data) {
        
        if(visits[visit_date][patient_id].guardian_present == true
          && visits[visit_date][patient_id].patient_present == true) {
            patient_guardian_visit_type_hash[visit_dates[i]] += 1;
            continue;
        }
          
        if(visits[visit_date][patient_id].patient_present == true)
          patient_visit_type_hash[visit_dates[i]] += 1;

        if(visits[visit_date][patient_id].guardian_present == true)
          guardian_visit_type_hash[visit_dates[i]] += 1;

      }

    }
  }

  sortReadyForRendering(patient_visit_type_hash, guardian_visit_type_hash, 
      patient_guardian_visit_type_hash);
}

function sortReadyForRendering(patients, guardians, both_patient_and_guardian){
  for(var i = 0; i < visit_dates.length; i++){
    sorted_data_patients.push([new Date(visit_dates[i]).getTime(), 
      patients[visit_dates[i]]]);

    sorted_data_guardians.push([new Date(visit_dates[i]).getTime(), 
      guardians[visit_dates[i]]]);

    sorted_data_both_patient_guardians.push([new Date(visit_dates[i]).getTime(), 
      both_patient_and_guardian[visit_dates[i]]]);
  }
  document.getElementById('spinner').style = 'display: none;';
  document.getElementById('report-cover').style = 'display: none;' 
  renderChart();
}
