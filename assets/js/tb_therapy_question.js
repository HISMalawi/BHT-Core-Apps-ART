

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
    var three_hp = (yesNo_Hash["Previous TB treatment history"]["3HP (3 months of RFP + INH)?"] == "Yes");
    var ipt =  (yesNo_Hash["Previous TB treatment history"]["IPT (minimum 6 months of INH)?"] == "Yes");
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

function showTBtherapyLocation(){
  everCompleteTBtherapy();
  return show_completed_tb_therapy_location;
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

            var ob_children = tb_history_obs[i].children;
            for (var c = 0; c < ob_children.length; c++) {
             if(ob_children[c].value_coded == 1065)
               ever_completed_tb_therapy = true;

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