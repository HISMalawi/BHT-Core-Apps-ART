var sideEffectsLeft = [
  ["Peripheral neuropathy", 1],
  ["Jaundice",2],["Lipodystrophy",3],
  ["Kidney Failure",4]
];
var iacLeft = [
  ["Explained Key facts about starting ART?", 1],
  ["Explain how to achieve optimal adherence?", 2],
  ["Talk about ART failure and drug resistance?",3],
  ["Tell the patient that his or viral load will be checked again in 3 months?", 4]

];

var iacRight = [
  ["Identify specific problems that get in the way of good adherence", 5],
  ["Agree on plan?", 6],
  ["Supply medications on a monthly basis?", 7],
  ["If Viral Load undetected- Continue current regimen?", 8]

];
var sideEffectsRight = [
  ["Psychosis",5],["Gynaecomastia",6],
  ["Anemia",7], ["Other", 8, "activateOtherSideEffects"]
];

function addPregBreastFeedingYesNo() {
  var tar = document.getElementById("inputFrame" + tstCurrentPage);
  var attr = 'Pregnant?, 9#Breastfeeding?,10'
  buildYesNoUI('Pregnant-Breastfeeding', attr, tar);
}

function addIACYesNo() {
  var frame   = document.getElementById("inputFrame" + tstCurrentPage);
  var effectsLeft  = iacLeft.join(";").split(";").join("#");
  var effectsRight = iacRight.join(";").split(";").join("#");

  var iac_table = document.createElement("div");
  iac_table.setAttribute("style","display: table;width: 100%;");
  frame.appendChild(iac_table);
  
  var iac_table_row = document.createElement("div");
  iac_table_row.setAttribute("style","display: table-row;");
  iac_table.appendChild(iac_table_row);
   
  var cells = ["left","right"];
  
  for(var i = 0 ; i < cells.length ; i++){
    var iac_table_cell = document.createElement("div");
    var style = "display: table-cell; width: 44%; float:";
    style += (i == 0 ? "left;" : "right;"); 
    iac_table_cell.setAttribute("style",style);
    iac_table_row.appendChild(iac_table_cell);
    
    if(i == 0) {   
      buildYesNoUI('Intensive adherence councelling', effectsLeft, iac_table_cell);
    }else{
      buildYesNoUI('Intensive adherence councelling', effectsRight, iac_table_cell);
    }

  }

}

function addSideEffectsYesNo() {
  var frame   = document.getElementById("inputFrame" + tstCurrentPage);
  var effectsLeft  = sideEffectsLeft.join(";").split(";").join("#");
  var effectsRight = sideEffectsRight.join(";").split(";").join("#");

  var side_effect_table = document.createElement("div");
  side_effect_table.setAttribute("style","display: table;width: 100%;");
  frame.appendChild(side_effect_table);
  
  var side_effect_table_row = document.createElement("div");
  side_effect_table_row.setAttribute("style","display: table-row;");
  side_effect_table.appendChild(side_effect_table_row);
   
  var cells = ["left","right"];
  
  for(var i = 0 ; i < cells.length ; i++){
    var side_effect_table_cell = document.createElement("div");
    var style = "display: table-cell; width: 44%; float:";
    style += (i == 0 ? "left;" : "right;"); 
    side_effect_table_cell.setAttribute("style",style);
    side_effect_table_row.appendChild(side_effect_table_cell);
    
    if(i == 0) {   
      buildYesNoUI('MALAWI ART SIDE EFFECTS', effectsLeft, side_effect_table_cell);
    }else{
      buildYesNoUI('MALAWI ART SIDE EFFECTS', effectsRight, side_effect_table_cell);
    }

  }

}

function checkForWeightLoss(element) {
  if (element.getAttribute("whichone").toLowerCase() === "no" && parseInt(sessionStorage.weightLoss) >= 10) {
    var val = element.getAttribute("value");
    newPopup(val);
  }
}

function addTBassociatedSymptomsYesNo() {
  var concept_name = "ROUTINE TUBERCULOSIS SCREENING";
  var TBsymptoms = [
    ["Cough of any duration", 1],
    ["Fever", 2],
    ["Night sweats",3],
    ["Weight loss / Failure to thrive / malnutrition", 4, "checkForWeightLoss(this)"]
  ];

  var frame   = document.getElementById("inputFrame" + tstCurrentPage);
  var symptoms  = TBsymptoms.join(";").split(";").join("#");

  buildYesNoUI(concept_name, symptoms, frame);
}

function newPopup(val) {
  showSafeFamilyPlanningMethodsPopup();
  var confirm = document.getElementById("confirm-reading");
  confirm.style.visibility = "visible"
  confirm.style.backgroundColor = "green";
  var controlled = document.getElementById("safe-family-planning-yes");
  controlled.innerHTML = "Confirm Controlled";
  confirm.setAttribute("onclick", "selectVal("+val+")");
  document.getElementById("message-header").innerHTML = "patients weight has dropped "+sessionStorage.weightLoss+"% is this controlled weight loss??";
}
function selectVal(val) {
  hideSafeFamillyPlanningPopup();
  document.getElementById(val+"_yes").setAttribute("class","yes_no_btns clicked");
    document.getElementById(val+"_no").setAttribute("class","yes_no_btns not-clicked");
}


var OtherSideEffects = false

function activateOtherSideEffects(btn) {
  if(btn.getAttribute("whichone").toLowerCase() == 'yes'){
    OtherSideEffects = true;
  }else{
    OtherSideEffects = false;
  }
}

function addLabInvestigationsQuestions() {
  var concept_name = "Requested lab test set";
  var labSets = [
    ["CD4 count", 2],
    ["Crag", 34],
    ["Urine LAM", 27]
  ];

  var frame   = document.getElementById("inputFrame" + tstCurrentPage);
  var tests  = labSets.join(";").split(";").join("#");
  
  buildYesNoUI(concept_name, tests, frame);
}
