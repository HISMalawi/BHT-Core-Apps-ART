

function checkIfEverCompletedTBtherapyAsked(){
  return false
}


YesNoConceptsTBtherapy = {};
YesNoConceptsTBtherapy["Yes"] = 1065;
YesNoConceptsTBtherapy["No"] = 1066;

function addTBtherapyYesNo(){
  var tar = document.getElementById("inputFrame" + tstCurrentPage);
  var attr = '3HP (RFP + INH)?, 9974#IPT?, 656';
  buildYesNoUI('Previous TB treatment history', attr, tar);
}


function everCompleteTBtherapty(){
  var three_hp = (yesNo_Hash["Previous TB treatment history"]["3HP (RFP + INH)?"] == "Yes");
  var ipt =  (yesNo_Hash["Previous TB treatment history"]["IPT?"] == "Yes");

  if(ipt == true || three_hp == true)
    return true;

  return false;
}