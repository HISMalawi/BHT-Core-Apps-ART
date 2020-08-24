

function checkIfEverCompletedTBtherapyAsked(){
  return ever_completed_tb_therapy;
}


YesNoConceptsTBtherapy = {};
YesNoConceptsTBtherapy["Yes"] = 1065;
YesNoConceptsTBtherapy["No"] = 1066;

function addTBtherapyYesNo(){
  var tar = document.getElementById("inputFrame" + tstCurrentPage);
  var attr = '3HP (RFP + INH)?, 9974#IPT?, 656';
  buildYesNoUI('Previous TB treatment history', attr, tar);
}


function everCompleteTBtherapy(){
  try {
    var three_hp = (yesNo_Hash["Previous TB treatment history"]["3HP (RFP + INH)?"] == "Yes");
    var ipt =  (yesNo_Hash["Previous TB treatment history"]["IPT?"] == "Yes");
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


function getTBtheraptObs() {
  var previous_tb_treatment_history = 1588;
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/observations?person_id=";
  url += sessionStorage.patientID + "&concept_id=" + previous_tb_treatment_history + "&page_size=10";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
          var tb_history_obs = JSON.parse(this.responseText);
          for (var i = 0; i < tb_history_obs.length; i++) {
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