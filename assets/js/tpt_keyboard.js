

function addTPTkeyboard(){
  TPT_start_date = vl_info.earliest_start_date;
  var nextBTN = document.getElementById("nextButton");
  nextBTN.setAttribute("onmousedown","validateTPTpills();")


  var inframe = document.getElementById("inputFrame" + tstCurrentPage);
  inframe.style = "width: 96%; height: 90%;";

  var main_table = document.createElement("table");
  main_table.setAttribute("id","tpt-main-table");
  inframe.appendChild(main_table);

  var main_table_row = document.createElement("tr");
  main_table_row.setAttribute("class","tpt-main-table-row");
  main_table.appendChild(main_table_row);

  var main_table_cell = document.createElement("td");
  main_table_cell.setAttribute("class","tpt-numbers");
  main_table_row.appendChild(main_table_cell);
  var inputBox = document.createElement("input");
  inputBox.setAttribute("type","text");
  inputBox.setAttribute("id","tpt-inh");
  inputBox.value = (parseInt(previous_dispensed_Isoniazid) < 1 ? "" : previous_dispensed_Isoniazid);
  main_table_cell.appendChild(inputBox);

  var routine_tb_therapy = document.getElementById("routine_tb_therapy").value;
  main_table_cell = document.createElement("td");
  main_table_cell.setAttribute("class","tpt-numbers");
  main_table_row.appendChild(main_table_cell);
  inputBox = document.createElement("input");
  inputBox.setAttribute("id","tpt-3hp");
  inputBox.setAttribute("type","text");
  inputBox.setAttribute("id","tpt-3hp");
  inputBox.value = (parseInt(previous_dispensed_Rifapentine) < 1 ? "" : previous_dispensed_Rifapentine);
  main_table_cell.appendChild(inputBox);






  main_table_row = document.createElement("tr");
  main_table_row.setAttribute("class","tpt-main-table-row");
  main_table.appendChild(main_table_row);

  main_table_cell = document.createElement("td");
  main_table_cell.setAttribute("class","tpt-keypad");
  main_table_cell.style = "border-width: 0px 3px 0px 0px";
  addKeypad(main_table_cell, "tpt-inh");
  main_table_row.appendChild(main_table_cell);

  main_table_cell = document.createElement("td");
  main_table_cell.setAttribute("class","tpt-keypad");
  main_table_cell.style = "border-width: 0px 0px 0px 3px";
  if(routine_tb_therapy.match(/3hp/i)) {
    addKeypad(main_table_cell, "tpt-3hp");
  }
  main_table_row.appendChild(main_table_cell);

  
}

function addKeypad(el, id){
  var keys = [[1,2,3], [4,5,6],[7,8,9],["Clear",0,"Delete"]];
  var t = document.createElement("table");
  t.setAttribute("class","keypads");
  el.appendChild(t);

  tptDrug = (id == "tpt-3hp" ? "Rifapentine" : "Isoniazid (INH)");
  var r = document.createElement("tr");
  var captionTD = document.createElement("td");
  r.appendChild(captionTD);
  captionTD.innerHTML = "<span style='font-size:14px;'>&#9650;</span>";
  captionTD.innerHTML += "<br />" + tptDrug;
  captionTD.style = "text-align: center;";
  captionTD.setAttribute("colspan","3");
  t.appendChild(r);
  

  for(var j = 0; j < keys.length; j++){
    var nums = keys[j];
    var r = document.createElement("tr");
    t.appendChild(r);

    for(var i = 0; i < nums.length; i++){
      var btn = document.createElement("button");
      btn.setAttribute("id","key-num-" + nums[i]);
      btn.setAttribute("class","button blue navButton");
      btn.innerHTML = "<span>" + nums[i] + "</span>";
      btn.setAttribute("onmousedown","enterPressedKey(this, '" + id + "');");
      btn.setAttribute("key", nums[i]);

      var td = document.createElement("td");
      td.appendChild(btn);
      r.appendChild(td);
    }
  }
}

function enterPressedKey(el, targetID){
  var inputBox = document.getElementById(targetID);
  var press_key  = el.getAttribute("key");

  if(press_key == 'Delete'){
    if(inputBox.value.length > 0)
      inputBox.value = inputBox.value.substring(0, (inputBox.value.length - 1));

  }else if(press_key == 'Clear'){
    inputBox.value = "";
  }else{
    inputBox.value = parseInt(inputBox.value += press_key);
  }
}

function validateTPTpills(){
  var routine_tb_therapy = document.getElementById("routine_tb_therapy").value;
  var inh_input = document.getElementById("tpt-inh");
  var three_hp_input = document.getElementById("tpt-3hp");
  if(isBlank(inh_input.value) || parseInt(inh_input.value) < 1){
    showMessage("Please enter number of INH pill(s) already dispensed.");
    return;
  }else{
    previous_dispensed_Isoniazid = parseInt(inh_input.value);
  }

  if(routine_tb_therapy.match(/3hp/i)){
    if(isBlank(three_hp_input.value) || (parseInt(inh_input.value) < 1)) {
      showMessage("Please enter number of Rifapentine pill(s) already dispensed.");
      return;
    }else if(routine_tb_therapy.match(/3hp/i)){
      previous_dispensed_Rifapentine = parseInt(three_hp_input.value);
    }
  }

  gotoNextPage();
}

function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}


var previous_dispensed_Isoniazid = 0;
var previous_dispensed_Rifapentine = 0;
var TPT_start_date;
