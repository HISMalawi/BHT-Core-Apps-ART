
var cssSpan = document.createElement('span');
cssSpan.innerHTML ="<style>\
.calendar-table {\
  display: table;\
  width: 100%;\
}\
.calendar-table-row {\
  display: table-row;\
}\
.calendar-table-cell {\
  display: table-cell;\
}\
#calendar-table-cell-right {\
  width: 26.5%;\
  background-color: darkblue;\
  height: 500px;\
  float: right;\
  vertical-align: top;\
  position: absolute;\
  right: 12px;\
}\
#calendar-table-cell-left {\
  width: 72%;\
  vertical-align: top;\
  padding-right: 10px;\
  /*float: left;*/\
}\
.calendar {\
  display: table;\
  width: 100%;\
  border-collapse: collapse;\
  line-height: 60px;\
  margin: 5px;\
}\
.calendar-row {\
  display: table-row;\
  vertical-align: top;\
}\
.calendar-cell {\
  display: table-cell;\
  vertical-align: top;\
  border-style: solid;\
  border-width: 1px;\
  text-align: center;\
  height: 50px;\
  width: 50px;\
}\
.weekdays {\
  color; white;\
  background-color: lightgray;\
}\
#display-table {\
  width: 100%;\
  color: white;\
  padding-top: 5%;\
}\
.separator {\
  background-color: lightgray;\
}\
#display-table td {\
  text-align: center;\
}\
#display-table label {\
  text-align: middle;\
}\
#currentDate {\
  text-align: center;\
  width: 70%;\
  margin-left: 5px;\
  font-weight: bold;\
}\
.controller {\
  display: table;\
  width: 99%;\
  border-style: solid;\
  border-width: 1px;\
  margin: 5px;\
}\
.controller-row {\
  display: table-row;\
}\
.controller-cell {\
  display: table-cell;\
}\
</style>";

function changeMonth(e) {
  if(e.id == "forward"){
     currentSetDate = new Date(currentSetDate.setTime(currentSetDate.getTime() + 35 * 86400000 ));
     var month = (currentSetDate.getMonth() + 1);
  }else{
     currentSetDate = new Date(currentSetDate.setTime(currentSetDate.getTime() - 1 * 86400000 ));
     var month = (currentSetDate.getMonth() + 1);
  }

  if(month.length < 2)
    month = "0" + month;

  var set_date = currentSetDate.getFullYear()  + "-" + month + "-01";
  currentSetDate = new Date(set_date);

  var cell = document.getElementById("calendar-table-cell-left");
  cell.innerHTML = null;
  buildCalendarCells(currentSetDate);
  
  var currentDate = document.getElementById("currentDate");
  currentDate.innerHTML = getFullMonthName(currentSetDate.getMonth());
  var currentYear = document.getElementById("currentYear");
  currentYear.innerHTML = currentSetDate.getFullYear();
}

function changeYear(e) {
  if(e.id == "forward-year"){
     currentSetDate = new Date(currentSetDate.setFullYear(currentSetDate.getFullYear() + 1));
  }else{
     currentSetDate = new Date(currentSetDate.setFullYear(currentSetDate.getFullYear() - 1));
  }

  var cell = document.getElementById("calendar-table-cell-left");
  cell.innerHTML = null;
  buildCalendarCells(currentSetDate);
  
  var currentYear = document.getElementById("currentYear");
  currentYear.innerHTML = currentSetDate.getFullYear();
}

function buildControls() {
  var frame = document.getElementById("inputFrame" + tstCurrentPage);
  var controller = document.createElement("div");
  controller.setAttribute("class","controller")
  frame.appendChild(controller);

  var controllerRow = document.createElement("div");
  controllerRow.setAttribute("class","controller-row")
  controller.appendChild(controllerRow);

  var cells = ["left","right"];

  for(var i = 0 ; i < cells.length ; i++){
    var controllerCell = document.createElement("div");
    controllerCell.setAttribute("class","controller-cell");
    controllerCell.setAttribute("id","controller-cell-" + cells[i]);
    controllerRow.appendChild(controllerCell);
  }

  monthController();
  yearController();
}

function yearController() {
  var table = document.createElement("table");
  table.style = "float: right;";
  tr = document.createElement("tr");
  table.appendChild(tr);

  var td = document.createElement("td");
  var btn = document.createElement("button");
  btn.setAttribute("class","btn btn-primary");
  btn.innerHTML = "-";
  btn.setAttribute("id","previous-year");
  btn.setAttribute("onmousedown", "changeYear(this);");
  td.appendChild(btn);
  tr.appendChild(td);

  var td    = document.createElement("td");
  td.style = "width: 130px; text-align: center; font-weight: bold;";
  var label = document.createElement("label");
  label.setAttribute("id","currentYear");
  label.innerHTML = currentSetDate.getFullYear();
  td.appendChild(label);
  tr.appendChild(td);

  var td = document.createElement("td");
  var btn = document.createElement("button");
  btn.setAttribute("class","btn btn-primary");
  btn.setAttribute("id","forward-year");
  btn.innerHTML = "+";
  btn.setAttribute("onmousedown", "changeYear(this);");
  td.appendChild(btn);
  tr.appendChild(td);

  var container = document.getElementById("controller-cell-right");
  container.appendChild(table);
}

function monthController() {
  var table = document.createElement("table");
  table.style = "float: left;";
  tr = document.createElement("tr");
  table.appendChild(tr);

  var td = document.createElement("td");
  var btn = document.createElement("button");
  btn.setAttribute("class","btn btn-primary");
  btn.innerHTML = "-";
  btn.setAttribute("id","previous");
  btn.setAttribute("onmousedown", "changeMonth(this);");
  td.appendChild(btn);
  tr.appendChild(td);

  var td    = document.createElement("td");
  td.style = "width: 130px; text-align: center; font-weight: bold;";
  var label = document.createElement("label");
  label.setAttribute("id","currentDate");
  label.innerHTML = getFullMonthName(currentSetDate.getMonth());
  td.appendChild(label);
  tr.appendChild(td);

  var td = document.createElement("td");
  var btn = document.createElement("button");
  btn.setAttribute("class","btn btn-primary");
  btn.setAttribute("id","forward");
  btn.innerHTML = "+";
  btn.setAttribute("onmousedown", "changeMonth(this);");
  td.appendChild(btn);
  tr.appendChild(td);

  var container = document.getElementById("controller-cell-left");
  container.appendChild(table);
}

var currentSetDate;

function buildCalendar() {
  var frame = document.getElementById("inputFrame" + tstCurrentPage);
  frame.setAttribute("style","height: 90%; width: 96%;");
  document.getElementById("clearButton").style = "display: none;";

  var calendar = document.createElement("div");
  calendar.setAttribute("class","calendar-table");
  frame.appendChild(calendar);

  var calendarRow = document.createElement("div");
  calendarRow.setAttribute("class","calendar-table-row");
  calendar.appendChild(calendarRow);

  var cells = ["left","right"];
  for(var i = 0 ; i < cells.length ; i++){
    var calendarCell = document.createElement("div");
    calendarCell.setAttribute("class","calendar-table-cell");
    calendarCell.setAttribute("id","calendar-table-cell-" + cells[i]);
    calendarRow.appendChild(calendarCell);
  }

  buildDisplayArea();
  buildCalendarCells(currentSetDate);

  buildControls();


  var current_date = moment().format('YYYY-MM-DD');
  var cells = document.getElementsByClassName('calendar-cell');
  
  for(var i = 0 ; i < cells.length ; i++){
    var boxDate = cells[i].getAttribute('date');
    if(boxDate == current_date) {
      getAppointMents(cells[i]);
    }
  }

  //getHolidays();
}

function buildDisplayArea() {
  var container = document.getElementById("calendar-table-cell-right");
  var table = document.createElement("table");

  table.setAttribute("id","display-table");
  container.appendChild(table);

  var tds = [
  ["Selected date","selected-date"],
  ["Booked appointments","appointments"]
];

  for(var i = 0 ; i < tds.length ; i++){
    var tr = document.createElement("tr");
    table.appendChild(tr);

    var th = document.createElement("th")
    th.innerHTML = tds[i][0];
    tr.appendChild(th);

    var tr = document.createElement("tr");
    tr.id = tds[i][1];
    tr.style.textAlign = "center";
    tr.style.fontWeight= "bold";
    table.appendChild(tr);

    var td = document.createElement("td")
    var label = document.createElement("label");
    label.setAttribute("id", tds[i][1]);
    td.appendChild(label);
    tr.appendChild(td);

    var tr = document.createElement("tr");
    table.appendChild(tr);

    var td = document.createElement("td")
    td.innerHTML = "&nbsp;";
    td.setAttribute("class","separator");
    tr.appendChild(td);

  } 

  //getLimit();
  getNextAppointment();
}

function getNextAppointment(){

  var selected_date = document.getElementById("selected-date");
  var day = parseInt(suggestedDay);
  if(day < 10)
    day = ("0" + day);

  var month = getFullMonthName((suggestedMonth));  
  selected_date.innerHTML = day + "/" + month + "/" + suggestedYear;
}

function buildCalendarCells(current_date) {
  var container = document.getElementById("calendar-table-cell-left");

  var calendar = document.createElement("div");
  calendar.setAttribute("class","calendar");
  container.appendChild(calendar);

  var calendarRow = document.createElement("div");
  calendarRow.setAttribute("class","calendar-row");
  calendar.appendChild(calendarRow);


  var weekDays = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  for(var i = 0 ; i < weekDays.length ; i++){
    var calendarCell = document.createElement("div");
    calendarCell.setAttribute("class","calendar-cell weekdays");
    calendarCell.innerHTML = weekDays[i];
    calendarRow.appendChild(calendarCell);
  }

  count = 1;

  for(var i = 0 ; i < weekDays.length ; i++){
    var j = 0;
    var calendarRow = document.createElement("div");
    calendarRow.setAttribute("class","calendar-row");
    calendar.appendChild(calendarRow);

    while(j < 7){
      var calendarCell = document.createElement("div");
      calendarCell.setAttribute("class","calendar-cell calendar-boxes");
      calendarCell.setAttribute("id","calendar-cell-box-" + count++);
      calendarCell.setAttribute("weekDay", weekDays[j]);
      calendarCell.setAttribute("weekDayNum", j);
      calendarCell.innerHTML = "&nbsp;";
      calendarRow.appendChild(calendarCell);

      j++;
    }
  }
 
  //var current_date = new Date(current_date); 
  var dates = getMonthDates(current_date);

  setDates(dates);
  
  var sdate = moment(document.getElementById('selected-date').innerHTML).format('YYYY-MM-DD');
  var cells = document.getElementsByClassName('calendar-cell');

  for(var i = 0 ; i < cells.length ; i++){
    if(cells[i].getAttribute('date') == sdate) {
      highlighDates(cells[i]);
    }
  }
}

function setDates(dates) {
  var calendarBoxes = document.getElementsByClassName("calendar-boxes");
  var count = 0;

  for(var i = 0 ; i < calendarBoxes.length ; i++){
    var date;
    try{
      date = dates[count];
    }catch(e){
      break;
    }

    if(!date)
      break;

    if(parseInt(calendarBoxes[i].getAttribute("weekDayNum")) == date.getDay() && calendarBoxes[i].innerHTML == "&nbsp;"){
      calendarBoxes[i].innerHTML = date.getDate();
      calendarBoxes[i].setAttribute("onmousedown","getAppointMents(this);")
      calendarBoxes[i].setAttribute("date", moment(date).format('YYYY-MM-DD'));
      count++;
    }
  }

}

function getMonthDates(current_date){
  original_month = current_date.getMonth();
  var date = new Date(current_date.getFullYear(), original_month, 1);
  
  var duration = 1;
  var dates = [];

  setDate = date;

  while(original_month == setDate.getMonth()) {
    setDate = new Date(date.setTime(date.getTime() + duration * 86400000 ));
    if(original_month != setDate.getMonth()) 
      break;

    dates.push(setDate);
  }


  dates.unshift(current_date);
  return dates.sort(function(a,b){return a.getTime() - b.getTime()});
}

function getFullMonthName(index) {  
  var months = new Array();
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";

  return months[index].substring(0,3);
}

function getMonthInNum(str) {  
  var months = new Array();
  months["Jan"] = 1;
  months["Feb"] = 2;
  months["Mar"] = 3;
  months["Apr"] = 4;
  months["May"] = 5;
  months["Jun"] = 6;
  months["Jul"] = 7;
  months["Aug"] = 8;
  months["Sep"] = 9;
  months["Oct"] = 10;
  months["Nov"] = 11;
  months["Dec"] = 12;

  return months[str];
}

function nextPage(obs){
  nextEncounter(sessionStorage.patientID, 1);
}


var suggestedYear;
var suggestedMonth;
var suggestedDay;

function getSuggestedAppointmentDate() {
  currentSetDate = new Date();
  currentSetDate = new Date(currentSetDate.getFullYear(), (currentSetDate.getMonth()), 1);

  suggestedYear  = currentSetDate.getFullYear();
  suggestedMonth = (currentSetDate.getMonth());
  suggestedDay   = 1;

  buildCalendar();

  var pageBody = document.getElementsByTagName('body')[0];
  pageBody.appendChild(cssSpan);
}
function getLimit() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/global_properties?property=clinic.appointment.limit";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
     document.getElementById("appointment-limit").innerHTML = obj["clinic.appointment.limit"]; 
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function getAppointMents(date) {
  var sdate = date.getAttribute('date');
  document.getElementById("selected-date").innerHTML = moment(sdate).format('DD/MMM/YYYY');
  document.getElementById("appointments").innerHTML = null;
  var b = document.getElementById('nextButton');
  b.style = 'display: none;';
  highlighDates(date);
  
  var url = apiProtocol + "://" + apiURL + ":" + apiPort;
  url += "/api/v1/appointments?date="+date.getAttribute("date");
  url += "&paginate=false&program_id=" + sessionStorage.programID;
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      document.getElementById("appointments").innerHTML = obj.length;
      if(obj.length > 0) {
        b.style = 'display: inline;';
      }  
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function highlighDates(sdate) {
  var cells = document.getElementsByClassName("calendar-boxes");
  for(var i = 0 ; i < cells.length ; i++){
    cells[i].setAttribute("style","background-color: '';");
  }
  
  for(var x = 0 ; x < cells.length ; x++){
    if(cells[x].getAttribute('date') == sdate.getAttribute('date')){ 
      cells[x].setAttribute("style","background-color: green; color: white;");
    }
  }
  
}

function viewList() {
  var sdate = document.getElementById('selected-date').innerHTML;
  sdate = moment(sdate).format('YYYY-MM-DD');
  var url = '/apps/ART/views/reports/clinic/appointment_list.html?date=';
  url += sdate;
  document.location = url;
}
