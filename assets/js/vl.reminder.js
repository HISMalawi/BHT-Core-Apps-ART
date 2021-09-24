
var vl_info;

function cancelVLOrder() {
  var div = document.getElementById('vl-popup-div')
  div.innerHTML = null;
  div.style = 'display: none;';
  document.getElementById('vl-cover-div').style = 'display: none;';
}

function getARTstartedDate() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += '/programs/1/patients/' + sessionStorage.patientID;
  url += '/vl_info?date=' + sessionStorage.sessionDate;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      vl_info = JSON.parse(this.responseText);
      if(Object.keys(vl_info).length > 0){
        prepareForVLcheck();
      }else{
        try {
          var cover = document.getElementById('regimen-change-cover');
          var loader = document.getElementsByClassName('loader')[0];
          cover.style = 'display: none';
          loader.style = 'display: none;'
        }catch(e){}
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

var nextButtonVL;
function prepareForVLcheck() {
  if(VLmilestoneCheckDone == true)
    return;

  var nextBtn = document.getElementById('nextButton');
  if(nextButton) {
    if(nextButton.innerHTML.match(/Next/i)) {
      nextButtonVL = nextBtn.getAttribute('onmousedown');
      nextBtn.setAttribute('onmousedown', 'processVLalert();');
    }
  }
 
  try {
    var cover = document.getElementById('regimen-change-cover');
    var loader = document.getElementsByClassName('loader')[0];
    cover.style = 'display: none';
    loader.style = 'display: none;'
  }catch(e){}

}

var VLmilestoneCheckDone = false;

function processVLalert() {
  let nextBtn = document.getElementById('nextButton');
  nextBtn.setAttribute('onmousedown', nextButtonVL);
  VLmilestoneCheckDone = true;

  let eligibile = vl_info.eligibile;
  /*var earliest_start_date = moment(vl_info.earliest_start_date).format('DD/MMM/YYYY');
  var milestone = vl_info.milestone;
  var period_on_art = vl_info.period_on_art;*/
  let skip_milestone = vl_info.skip_milestone;
  let message = vl_info.message;

  if(eligibile == false) {
    if(message) {
      if(message.match(/Viral load due in/i)) {
        let days_left = parseInt(message.replace(/\D+/g, ''));
        if (days_left <= 30){
          let current_regimen = vl_info.current_regimen;
          current_regimen = current_regimen ? `${current_regimen.name} - ${moment(current_regimen.date_started).format("DD/MMM/YYYY")}` : 'N/A';
          let previous_regimen = vl_info.previous_regimen;
          previous_regimen = previous_regimen ? `${previous_regimen.name} - ${moment(previous_regimen.date_completed).format("DD/MMM/YYYY")}` : 'N/A';
          let months_after_swith = '&nbsp;';

          if(vl_info.previous_regimen.name && vl_info.current_regimen.name != vl_info.previous_regimen.name){
            let start_date = moment(vl_info.current_regimen.date_started);
            let end_date = moment(sessionStorage.sessionDate);
            months_after_swith = end_date.diff(start_date, "months");
          }
        
          if(months_after_swith){
            let reason_for_regimen_switch = vl_info.previous_regimen.reason_for_regimen_switch;

            if(reason_for_regimen_switch){
              months_after_swith = `<tr>
                <td>Month(s) after regimen switch:</td>
                <th>${months_after_swith}</th>
              </tr>
              <tr>
                <td>Switch reason:</td>
                <th>${reason_for_regimen_switch ? reason_for_regimen_switch : 'N/A'}</th>
              </tr>`;
            }
          }

          let previous_regimen_info = '&nbsp;';
          if(vl_info.previous_regimen.name){
            previous_regimen_info = `<tr>
              <td>Previous regimen / date completed:</td>
              <th>${previous_regimen}</th>
            </tr>`;
          }

          let popup_message = `Viral load is due in ${days_left} day(s)
          <table class="vl-reminder-table">
            <tr>
              <td>ART start date:</td>
              <th>${moment(vl_info.earliest_start_date).format("DD/MMM/YYYY")}</th>
            </tr>
            <tr>
              <td>Months on ART:</td><th>${vl_info.period_on_art}</th>
            </tr>
            <tr>
              <td>Last VL order date:</td>
              <th>${vl_info.last_order_date ? moment(vl_info.last_order_date).format("DD/MMM/YYYY") : 'N/A'}</th>
            </tr>
            <tr>
              <td>Current regimen / start date:</td>
              <th>${current_regimen}</th>
            </tr>
            ${previous_regimen_info}
            ${months_after_swith}
          </table>`;
          milestoneMessage(popup_message);
          return;
        }
      }

    }

    gotoNextPage();
    return;
  }

  if(!skip_milestone)
    milestoneAlert();

  if(skip_milestone && eligibile && skip_milestone)
    milestoneMessage(message);

}

function milestoneAlert() {
  var popUpBox = document.getElementById('vl-popup-div');
  var coverDIV = document.getElementById('vl-cover-div');

  if(coverDIV == undefined) {
    var coverDIV = document.createElement('div')
    coverDIV.setAttribute('id','vl-cover-div');
    var popUpBox = document.createElement('div')
    popUpBox.setAttribute('id','vl-popup-div');

    var hmtlBody = document.getElementsByTagName("body")[0];
    hmtlBody.appendChild(popUpBox);
    hmtlBody.appendChild(coverDIV);
  }

  coverDIV.style = 'display: inline;top: 0px;';
  popUpBox.style  = 'display: inline;top: 10px;';
  popUpBox.innerHTML = null;

  let current_regimen = vl_info.current_regimen;
  current_regimen = current_regimen ? `${current_regimen.name} - ${moment(current_regimen.date_started).format("DD/MMM/YYYY")}` : 'N/A';
  let previous_regimen = vl_info.previous_regimen;
  previous_regimen = previous_regimen ? `${previous_regimen.name} - ${moment(previous_regimen.date_completed).format("DD/MMM/YYYY")}` : 'N/A';
  let months_after_swith;

  if(vl_info.current_regimen.name != vl_info.previous_regimen.name){
    let start_date = moment(vl_info.current_regimen.date_started);
    let end_date = moment(sessionStorage.sessionDate);
    months_after_swith = end_date.diff(start_date, "months");
  }

  if(months_after_swith){
    let reason_for_regimen_switch = vl_info.previous_regimen.reason_for_regimen_switch;

    if(reason_for_regimen_switch) {
      months_after_swith = `<tr>
        <td>Month(s) after regimen switch:</td>
        <th>${months_after_swith}</th>
      </tr>
      <tr>
        <td>Switch reason:</td>
        <th>${reason_for_regimen_switch ? reason_for_regimen_switch : 'N/A'}</th>
      </tr>`;
    }else{
      months_after_swith = "&nbsp;"
    }
  }

  let previous_regimen_info = '&nbsp;';
  if(vl_info.previous_regimen.name){
    previous_regimen_info = `<tr>
      <td>Previous regimen / date completed:</td>
      <th>${previous_regimen}</th>
    </tr>`;
  }

  let popup_message = `<table class="vl-reminder-table">
      <caption style="text-align: center;color: green; font-weight: bold; font-size: 30px;padding: 30px 0px 30px 0px;">
        VL milestone has been reached
      </caption>
    <tr>
      <td>ART start date:</td>
      <th>${moment(vl_info.earliest_start_date).format("DD/MMM/YYYY")}</th>
    </tr>
    <tr>
      <td>Months on ART:</td><th>${vl_info.period_on_art}</th>
    </tr>
    <tr>
      <td>Last VL order date:</td>
      <th>${vl_info.last_order_date ? moment(vl_info.last_order_date).format("DD/MMM/YYYY") : 'N/A'}</th>
    </tr>
    <tr>
      <td>Current regimen / start date:</td>
      <th>${current_regimen}</th>
    </tr>
   ${previous_regimen_info} 
    ${months_after_swith}
  </table>`;













  //popUpBox.appendChild(p);
  popUpBox.innerHTML = popup_message;

  /* ............... buttons ............................... */
  var buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class','buttonContainer');
  popUpBox.appendChild(buttonContainer);

  var buttonContainerRow = document.createElement('div');
  buttonContainerRow.setAttribute('class','buttonContainerRow');
  buttonContainer.appendChild(buttonContainerRow);

  var cells = ['Remind later','Wait till<br />next milestone','Order VL'];

  for(var i = 0 ; i < cells.length ; i++){
    var buttonContainerCell = document.createElement('div');
    buttonContainerCell.setAttribute('class','buttonContainerCell');
    buttonContainerCell.setAttribute('style','width: 100px;');
    buttonContainerCell.innerHTML = cells[i];

    if(i == 0) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-red');
      buttonContainerCell.setAttribute('onmousedown','cancelVLOrder();' + nextButtonVL);
    }else if(i == 1) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-blue');
      buttonContainerCell.setAttribute('onmousedown','cancelVLOrder();waitTillNextMilestone();' + nextButtonVL);
    }else if(i == 2) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-green');
      buttonContainerCell.setAttribute('onmousedown','cancelVLOrder();pressOrder();');
    }

    buttonContainerRow.appendChild(buttonContainerCell);
  }

}

function vlOrdered() {
  encounter = encounterCreation();
  var passedObs = {
    encounter_id: null,
    observations: [{concept_id: 856, value_coded: 1271,
    value_datetime: sessionStorage.sessionDate, value_numeric: vl_info.milestone}]
  };

  postEncounter(encounter, passedObs, 'createEncounter');
}

function waitTillNextMilestone() {
  encounter = encounterCreation();
  var passedObs = {
    encounter_id: null,
    observations: [{concept_id: 856, value_text: 'Wait till next milestone',
    value_coded: 6022, value_numeric: vl_info.milestone}]
  };

  postEncounter(encounter, passedObs, '');
}

function encounterCreation() {
  var currentTime = moment().format(' HH:mm:ss');
  var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
  encounter_datetime += currentTime;

  var encounter = {
    encounter_type_name: 'LAB',
    encounter_type_id: 13,
    patient_id: sessionStorage.patientID,
    encounter_datetime: encounter_datetime,
    program_id: sessionStorage.programID
  }

  return encounter;
}


function postEncounter(encounter, passedObs, nextEncName) {  
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += '/encounters';
  var parameters = JSON.stringify(encounter);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      res = JSON.parse(this.responseText);
      passedObs.encounter_id = res['encounter_id'];
      postVLalertResponses(passedObs, nextEncName);
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parameters);

}

function postVLalertResponses(responses, nextEncName) {  
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += '/observations';
  var parameters = JSON.stringify(responses);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      res = JSON.parse(this.responseText);
      if(nextEncName.length > 0)
        createOrderEncounter();

    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parameters);

}

var vlAlertReminderDone = false;
function milestoneMessage(message) {
  if(vlAlertReminderDone)
    return;

  vlAlertReminderDone = true;
  var popUpBox = document.getElementById('vl-popup-div');
  var coverDIV = document.getElementById('vl-cover-div');

  if(coverDIV == undefined) {
    var coverDIV = document.createElement('div')
    coverDIV.setAttribute('id','vl-cover-div');
    var popUpBox = document.createElement('div')
    popUpBox.setAttribute('id','vl-popup-div');

    var hmtlBody = document.getElementsByTagName("body")[0];
    hmtlBody.appendChild(popUpBox);
    hmtlBody.appendChild(coverDIV);
  }

  coverDIV.style = 'display: inline;top: 0px;';
  popUpBox.style  = 'background-color: lightyellow;display: inline;top: 10px;';
  popUpBox.innerHTML = null;

  var p = document.createElement('p');
  
  if(message.match(/ by /i)) {
    var pmessage = message.split('by')
    message = pmessage[0] + '<br />';
    message += 'by ' + pmessage[1];
  }
  p.innerHTML = message;
  
  cssText = 'text-align: center;color: green; font-weight: bold; font-size: 2.3em;';
  cssText += 'margin-top: 10%;';
  p.style = cssText;
  popUpBox.appendChild(p);

  /* ............... buttons ............................... */
  var buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class','buttonContainer');
  popUpBox.appendChild(buttonContainer);

  var buttonContainerRow = document.createElement('div');
  buttonContainerRow.setAttribute('class','buttonContainerRow');
  buttonContainer.appendChild(buttonContainerRow);

  var cells = ['OK'];

  for(var i = 0 ; i < cells.length ; i++){
    var buttonContainerCell = document.createElement('div');
    buttonContainerCell.setAttribute('class','buttonContainerCell');
    buttonContainerCell.setAttribute('style','width: 100px;');
    buttonContainerCell.innerHTML = cells[i];

    buttonContainerCell.setAttribute('id','buttonContainerCell-blue');
    buttonContainerCell.setAttribute('onmousedown','cancelVLOrder();' + nextButtonVL);
    buttonContainerRow.appendChild(buttonContainerCell);
  }

}
