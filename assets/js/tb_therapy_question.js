

function checkIfEverCompletedTBtherapyAsked(){
  return ever_completed_tb_therapy;
}


YesNoConceptsTBtherapy = {};
YesNoConceptsTBtherapy["Yes"] = 1065;
YesNoConceptsTBtherapy["No"] = 1066;

function addTBtherapyYesNo(){
  var tar = document.getElementById("inputFrame" + tstCurrentPage);
  var attr = '3HP (3 months of RFP + INH)?, 9974#IPT (minimum 6 months of INH)?, 656';
  buildYesNoUI('Previous TB treatment history', attr, tar);
}


function everCompleteTBtherapy(){
  
  try {
    var three_hp = false; //(yesNo_Hash["Previous TB treatment history"]["3HP (3 months of RFP + INH)?"] == "Yes");
    var ipt =  false; //(yesNo_Hash["Previous TB treatment history"]["IPT (minimum 6 months of INH)?"] == "Yes");

    var routine_tb_therapy = document.getElementById("routine_tb_therapy").value;
    if (routine_tb_therapy == "Complete course of 3HP in the past (3 months RFP+INH)"){
      three_hp = true;
    }else if(routine_tb_therapy == "Complete course of IPT in the past (min. 6 months of INH)"){
      ipt = true;
    }
  }catch(e){
    show_completed_tb_therapy_location = true;
    return ever_completed_tb_therapy;
  }


  if(ipt == true || three_hp == true){
    show_completed_tb_therapy_location = true;
    return true;
  }

  show_completed_tb_therapy_location = false;
  return false;
}

var ever_completed_tb_therapy = false;
var show_completed_tb_therapy_location = false;
var ever_completed_tb_therapy_question_asked = false;


function getTBtheraptObs() {
  var previous_tb_treatment_history = 1588;
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/observations?person_id=";
  url += sessionStorage.patientID + "&concept_id=" + previous_tb_treatment_history + "&page_size=10";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
          var tb_history_obs = JSON.parse(this.responseText);
          for (var i = 0; i < tb_history_obs.length; i++) {
            ever_completed_tb_therapy_question_asked = true;

            try {
              if(tb_history_obs[i].value_text.match(/Complete/i))
                ever_completed_tb_therapy = true;

            }catch(e){
              continue;
            }
        }
      }
  };

  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

getTBtheraptObs();


function three3HPsideEffectsFound(rfp_option_input, ipt_option_input) {
  var main_side_effects = yesNo_Hash["MALAWI ART SIDE EFFECTS"];
  var other_side_effects = yesNo_Hash["OTHER MALAWI ART SIDE EFFECTS"];
  
  side_effects_to_validate = [
    "Jaundice", "Skin rash", "Vomiting",
    "Dizziness","Nausea","Heavy alcohol use"
  ];

  side_effect_found = threeHPsideEffects(side_effects_to_validate, main_side_effects);

  if(!side_effect_found && !(other_side_effects === undefined)){
    side_effect_found = threeHPsideEffects(side_effects_to_validate, other_side_effects);
  }

  return side_effect_found;
}


function threeHPsideEffects(side_effects, main_side_effects){
  for(var i = 0; i < side_effects.length; i++){
    if(main_side_effects[side_effects[i]] === undefined)
      continue;

    if(main_side_effects[side_effects[i]] == "Yes"){
      return true;
    }
  }

  return false;
}

function display3HPsideEffects(){
  var main_side_effects = yesNo_Hash["MALAWI ART SIDE EFFECTS"];
  try {
    var other_side_effects = yesNo_Hash["OTHER MALAWI ART SIDE EFFECTS"];
  }catch(e){
    var other_side_effects = {}
  }
  
  var side_effects = [
    "Jaundice", "Skin rash", "Vomiting",
    "Dizziness","Nausea","Heavy alcohol use"
  ];

  var side_effects_to_diaplay = [];

  for(var i = 0; i < side_effects.length; i++){
    if(main_side_effects[side_effects[i]] == "Yes"){
      side_effects_to_diaplay.push(side_effects[i]);
    }

    if(other_side_effects){
      if(other_side_effects[side_effects[i]] == "Yes"){
        side_effects_to_diaplay.push(side_effects[i]);
      }
    }

  }
  return  side_effects_to_diaplay;

}

function autoSelectMedication(){
  if(!activate_3HP_auto_select || parseFloat(sessionStorage.currentWeight) < 20)
    return;

  var select_options = document.getElementById("tt_currentUnorderedListOptions");
  var options  = select_options.children;
  var auto_select = true;
                
  for(var i = 0; i < options.length; i++){
      if(options[i].innerHTML.match(/TB /i) || options[i].innerHTML.match(/TPT /i) 
        || options[i].innerHTML.match(/Contrain/i) || options[i].innerHTML.match(/Aller/i)){
        auto_select = false;
      }
  } 

  if(auto_select == true){
    for(var i = 0; i < options.length; i++){
      var reason_for_not_using_fpm = "";
      try {
          reason_for_not_using_fpm = $("reason_for_not_using_fpm").value;
          if(reason_for_not_using_fpm == "Patient wants to get pregnant"){
            activate_finish_btn = true;
            return;
          }

      }catch(e){
      }

      if(!options[i].innerHTML.match(/lightblue/i))
        updateTouchscreenInputForSelect(__$('optionValue' + options[i].id), options[i]); 

      if(i == 2)
        break;

    }
  }else{
    for(var i = 0; i < options.length; i++){
      if(options[i].innerHTML.match(/lightblue/i))
        updateTouchscreenInputForSelect(__$('optionValue' + options[i].id), options[i]); 

      if(i == 3){
        clearInput();
        validateMedicationToprescribe();
      }

    } 
  }

  activate_finish_btn  = true;
}

var  activate_3HP_auto_select = true;

function active3HPautoSelect() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += '/global_properties?property=activate.3hp.auto.select';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 ) {
          if(this.status == 201 || this.status == 200) {
            var obj = JSON.parse(this.responseText);
            activate_3HP_auto_select = (obj['activate.3hp.auto.select'] == 'true' ? true : false);
          }else if(this.status == 404) {
            activate_3HP_auto_select = true;
          }
          
      }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function diactivateFinishBTN(){
  activate_finish_btn = false;
}

function set3HPdisplay(){
  var inputFrame = document.getElementById("inputFrame" + tstCurrentPage);
  inputFrame.style = "width: 96%; height: 335px !Important;"
}

function validate3HPdeSelection(){
  
  if(!activate_3HP_auto_select || parseFloat(sessionStorage.currentWeight) < 20)
    return;

  var select_options = document.getElementById("tt_currentUnorderedListOptions");
  var options  = select_options.children;
  var auto_select = true;
  var option3HP;
  var option3HP2;

  for(var i = 0; i < options.length; i++){
    if(options[i].innerHTML.match(/3HP \(RFP \+ INH\)/i)){
      option3HP = options[i];
    }else if(options[i].innerHTML.match(/INH 300/i)){
      option3HP2 = options[i];
    }

    if(options[i].innerHTML.match(/TB /i) || options[i].innerHTML.match(/TPT /i) 
        || options[i].innerHTML.match(/Contrain/i) || options[i].innerHTML.match(/Aller/i)){
        auto_select = false;
      }
  } 

  var reason_for_not_using_fpm = "";
  try {
      reason_for_not_using_fpm = $("reason_for_not_using_fpm").value;
  }catch(e){
      reason_for_not_using_fpm = "";
  }

  if(reason_for_not_using_fpm == "Patient wants to get pregnant")
    return;

  reason_for_no_selecting_3hp = [];

  if(auto_select && (option3HP || option3HP2)){
    if(!option3HP.innerHTML.match(/lightblue/i) && !option3HP2.innerHTML.match(/lightblue/i)){
      alertReasonForNo3HP();
    }
  }

}

function alertReasonForNo3HP(){
  var cover = document.getElementById("regimen-change-cover");
  var threeHP = document.getElementById("three-popup-div");

  var checkboxes = document.getElementsByClassName("reason-checkboxes");
  for(var i = 0; i < checkboxes.length; i++){
    checkboxes[i].setAttribute("src","/public/touchscreentoolkit/lib/images/unticked.jpg");
  }

  cover.style = "display: inline;";
  threeHP.style = "display: inline;";

}

var reason_for_no_selecting_3hp = [];

function setReason(el, num){
  var imgSelect = document.getElementById("img-reason-" + num);
  if(imgSelect.getAttribute("src").match(/unticked/i)){
    imgSelect.setAttribute("src", "/public/touchscreentoolkit/lib/images/ticked.jpg");
    setReasonForNo3HP(num);
  }else{
    imgSelect.setAttribute("src", "/public/touchscreentoolkit/lib/images/unticked.jpg");
    unselectReasonForNo3HP(num);
  }
}

function closeReasons() {
  if(reason_for_no_selecting_3hp.length < 1)
    return;

  var cover = document.getElementById("regimen-change-cover");
  var threeHP = document.getElementById("three-popup-div");

  cover.style = "display: none;";
  threeHP.style = "display: none;";

  
}

function setReasonForNo3HP(num){
  var reasons3hp = {};
  reasons3hp[1] = "Patient declined";
  reasons3hp[2] = "Previous side-effects";
  reasons3hp[3] = "Stock-out";
  reasons3hp[4] = "Starting TB treatment";
  reasons3hp[5] = "Other";
  reason_for_no_selecting_3hp.push(reasons3hp[num])
}

function unselectReasonForNo3HP(num){
  var reasons3hp = {};
  reasons3hp[1] = "Patient declined";
  reasons3hp[2] = "Previous side-effects";
  reasons3hp[3] = "Stock-out";
  reasons3hp[4] = "Starting TB treatment";
  reasons3hp[5] = "Other";

  var selected_reasons = reason_for_no_selecting_3hp;
  reason_for_no_selecting_3hp = [];
  for(var i = 0; i < selected_reasons.length; i++){
    if(selected_reasons[i] ==  reasons3hp[num])
      continue;

      reason_for_no_selecting_3hp.push(selected_reasons[i]);
  }
}

function transferInClient() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += '/observations?page=0&page_size=3&person_id='; 
  url += sessionStorage.patientID + '&concept_id=7937';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 ) {
          if(this.status == 201 || this.status == 200) {
            var obs = JSON.parse(this.responseText);
            for(var i = 0; i < obs.length; i++){
              if(obs[i].value_coded == 1065){
                transfer_in_client = true;
              }
            }
          }
          
      }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function addTPTkeyboard(){

}

function enterPastTPTdispensation(){
  if(!transfer_in_client)
    return false;

  var routine_tb_therapy = document.getElementById("routine_tb_therapy").value; 
  if(routine_tb_therapy.match(/Currently on/i))
    return true;

  return false;
}

active3HPautoSelect();
var activate_finish_btn = false;

var transfer_in_client = false;
transferInClient();




var pastTPTdispensation = {}

function pastDispensationTPT(){
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += "/drug_orders?patient_id=" + sessionStorage.patientID;
  url  += "&program_id=1&page_size=100000";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 ) {
          if(this.status == 201 || this.status == 200) {
            var orders = JSON.parse(this.responseText);
            for(var i = 0; i < orders.length; i++){
              var name = orders[i].drug.name;

              if(name.match(/Isoniazid/i) || name.match(/Rifapentine/i)){
                if(name.match(/Rifapentine/i)){
                  if(pastTPTdispensation["Rifapentine"] == undefined)
                    pastTPTdispensation["Rifapentine"] =  0;

                  pastTPTdispensation["Rifapentine"] += orders[i].quantity;
                }else{
                  if(pastTPTdispensation["Isoniazid"] == undefined)
                    pastTPTdispensation["Isoniazid"] =  0;

                  pastTPTdispensation["Isoniazid"] += orders[i].quantity;
                }
              }
            }
          }
          
      }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

pastDispensationTPT();