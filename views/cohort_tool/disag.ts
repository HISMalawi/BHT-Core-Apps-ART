import moment from '../../../../assets/js/moment';
let data_table;
// let url = window.location.href;
const url = new URL(window.location.href);
const quarter = url.searchParams.get("quarter");
const on_art =  url.searchParams.get('total_alive_and_on_art');

var dataSet = [];
if(quarter == 'Custom'){
  var start_date  = url.searchParams.get("start_date");
  var end_date  = url.searchParams.get("end_date");
}

function initializeTable() {
  document.getElementById("footer-content").innerHTML = `Date Created:  ${moment().format('YYYY-MM-DD:h:m:s')} 
                  BHT-Core Version : ${sessionStorage.coreVersion} 
                  ART Version : ${sessionStorage.ARTVersion} 
                  API Version ${sessionStorage.apiVersion}`;
  data_table = $('#example').DataTable({
    fixedHeader: true,
    searching: false,
    paging: false,
    scrollY: "50vh",
    scrollX: true,
    Processing: true,
    ServerSide: true,
    scroller: {
      loadingIndicator: true
    },
    scrollCollapse: true,
    fixedColumns:   {
      leftColumns: 2,
      rightColumns: 1
    },
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'csv',
        title: 'MoH ' + sessionStorage.currentLocation + ': cohort disaggregated report ' + quarter,
        footer: true 
      },
      {
        extend: 'pdf',
        title: 'MoH' + sessionStorage.currentLocation + ': cohort disaggregated report ' + quarter 
      }
    ],
    columnDefs: [
      {"className": "dt-age-groups", "targets": 1},
      {"className": "dt-tx-new", "targets": 3},
      {"className": "dt-tx-curr", "targets": 4},
      {"className": "dt-ipt", "targets": 5},
      {"className": "dt-tb", "targets": 6}
    ]
  });

}


function initializeReport() {

  var url = sessionStorage.apiProtocol + "://" + sessionStorage.apiURL + ":" + sessionStorage.apiPort + "/api/v1";
  url += '/cohort_disaggregated';
  url += "?date=" + sessionStorage.sessionDate;
  url += "&quarter=" + quarter;
  url += "&age_group=" + age_groups[0];
  url += "&rebuild_outcome=false";
  url += "&initialize=true";
  url += '&program_id=' + sessionStorage.programID;
  document.getElementById("footer-content").innerHTML = `Date Created:  ${moment().format('YYYY-MM-DD:h:m:s')} 
                  BHT-Core Version : ${sessionStorage.coreVersion} 
                  ART Version : ${sessionStorage.ARTVersion} 
                  API Version ${sessionStorage.apiVersion}`;
  if(quarter == 'Custom'){
    url += "&start_date=" + start_date;
    url += "&end_date=" + end_date;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      getData(age_groups[0]);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function getData(age_group) {

  var url = sessionStorage.apiProtocol + "://" + sessionStorage.apiURL + ":" + sessionStorage.apiPort + "/api/v1";
  url += '/cohort_disaggregated';
  url += "?date=" + sessionStorage.sessionDate;
  url += "&quarter=" + quarter;
  url += "&age_group=" + age_group;
  url += "&rebuild_outcome=false";
  url += "&initialize=false";
  url += '&program_id=' + sessionStorage.programID;

  if(quarter == 'Custom'){
    url += "&start_date=" + start_date; 
    url += "&end_date=" + end_date;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      age_groups.shift();
      loadData(obj, age_group);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function loadData(data, age_group) {
  for(let age in data) {
    var gender = data[age];
    for(let sex in gender) {
      assignNum(age, sex, data[age][sex]);
    }
  }

  if(age_groups.length > 0) {
    getData(age_groups[0]);
  }else{
    getScreenedForTB();
  }
}

function addMales() {
  var cells = document.getElementsByClassName('Male_row');
  var tx_new = 0, tx_curr = 0, tx_screened_for_tb = 0, tx_given_ipt = 0;

  for(var i = 0 ; i < cells.length; i++){
    var tds = cells[i].getElementsByTagName('td');
    tx_new += parseInt(tds[3].innerHTML);
    tx_curr += parseInt(tds[4].innerHTML);
    tx_given_ipt += parseInt(tds[5].innerHTML);
    tx_screened_for_tb += parseInt(tds[6].innerHTML);
  }

  data_table.row.add([31,'All', 'Male', tx_new, tx_curr, 
    tx_given_ipt, tx_screened_for_tb,
    0,0,0,0,0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0]).node().id = 'all-males'; 
  data_table.draw();
  document.getElementsByTagName("tr")[37].getElementsByTagName("td")[3].onclick= function() {
    drillDown(clients.tx_new);
  }
  document.getElementsByTagName("tr")[37].getElementsByTagName("td")[4].onclick= function() {
    drillDown(clients.tx_curr);
  }
  document.getElementsByTagName("tr")[37].getElementsByTagName("td")[5].onclick= function() {
    drillDown(clients.tx_given_ipt);
  }
  document.getElementsByTagName("tr")[37].getElementsByTagName("td")[6].onclick= function() {
    drillDown(clients.tx_screened_for_tb);
  }
  addClass('all-males');
  
  getAllFemale('Pregnant');
}

var tb_tds = [];
var ipt_tds = [];

function getScreenedForTB() {
  
  var tds = document.getElementsByTagName('td');
  
  for(var i = 0; i < tds.length; i++){
    var colname = tds[i].getAttribute('column-name');
    if(colname){
      if(colname.match(/tb-/i)){
        tb_tds.push(tds[i]);
      }else if(colname.match(/ipt-/i)){
        ipt_tds.push(tds[i]);
      }
    }
  }

  fetchTBscreenedClients(tb_tds[0]);
}

function renderDrillDownData(data){
  const table: HTMLTableElement= document.getElementById("popupBox") as HTMLTableElement;
  table.style.display = "inline";
  var tbody = document.getElementById("popupDataBody");
  // tbody.innerHTML = null;
  var tr =  document.createElement("tr");
  var td =  document.createElement("td");
  td.setAttribute("class","main-table-td");
  td.innerHTML = data.arv_number;
  tr.appendChild(td);
  td =  document.createElement("td");
  td.setAttribute("class","main-table-td");
  td.innerHTML = data.dob;
  tr.appendChild(td);
  td =  document.createElement("td");
  td.setAttribute("class","main-table-td");
  td.innerHTML = data.gender;
  tr.appendChild(td);
  td =  document.createElement("td");
  td.setAttribute("class","main-table-td");
  td.innerHTML = data.current_village;
  tr.appendChild(td);
  tbody.appendChild(tr);
}
var popupTable;

function initializePopUpTable() {

  popupTable = $('#popupData').DataTable({
    fixedHeader: true,
    searching: false,
    paging: true,
    scrollY: 380,
    Processing: false,
    ServerSide: false,
    scroller: {
      loadingIndicator: true
    },
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'csv',
        title: 'MoH ' + sessionStorage.currentLocation + ': cohort disaggregated report drill down' + quarter,
        footer: true 
      }
    ],
    columnDefs: [
      {"className": "dt-arv-numbers", "targets": 0},
      {"className": "dt-date", "targets": 1},
    ]
  });

}

function closeBox(){
  try  {
    popupTable.destroy();
  }catch(e){}
  
  document.getElementById("popupBox").style.display = "none";
}
function quarterEndDate(quarter) {
  if(quarter == "Custom"){
    return [start_date, end_date];
  }

  var q = quarter.split(' ')[0];
  var year = quarter.split(' ')[1];

  if(q == 'Q1'){
    return [year + "-01-01", year + "-03-31"];
  }else if(q == 'Q2'){
    return [year + "-04-01", year + "-06-30"];
  }else if(q == 'Q3'){
    return [year + "-07-01", year + "-09-30"];
  }else if(q == 'Q4'){
    return [year + "-10-01", year + "-12-31"];
  }
}

function fetchTBscreenedClients(td) {
  if(td == undefined)
    return 

  var gender = td.getAttribute("column-name").replace("tb-","");
  var age_group = td.getAttribute("column-age").replace("tb-","");

  var url = sessionStorage.apiProtocol + "://" + sessionStorage.apiURL + ":" + sessionStorage.apiPort + "/api/v1";
  url += '/screened_for_tb';

  if(quarter == 'Custom'){
    url += "?start_date=" + start_date;
    url += "&end_date=" + end_date;
  }else{
    url += "?start_date=" + quarterEndDate(quarter)[0];
    url += "&end_date=" + quarterEndDate(quarter)[1];
  }

  url += "&gender=" + gender;
  url += "&date=" + sessionStorage.sessionDate;
  url += "&age_group=" + age_group;
  url += "&outcome_table=temp_patient_outcomes";
  url += '&program_id=' + sessionStorage.programID;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      if(obj) {
        td.innerHTML = obj.length;
        td.onclick= function() {
          drillDown(obj);
          if(gender.toLocaleLowerCase() === "male") {
           obj.forEach(element => {
              clients.tx_screened_for_tb.push( element);
            });
          }
        }
      }
  
     tb_tds.shift();
     if(tb_tds.length > 0) {
       fetchTBscreenedClients(tb_tds[0]); 
     }else{
       fetchIPTclients(ipt_tds[0]); 
     }

    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function fetchIPTclients(td) {
  if(td == undefined)
    return 

  var gender = td.getAttribute("column-name").replace("ipt-","");
  var age_group = td.getAttribute("column-age").replace("ipt-","");

  var url = sessionStorage.apiProtocol + "://" + sessionStorage.apiURL + ":" + sessionStorage.apiPort + "/api/v1";
  url += '/clients_given_ipt';

  if(quarter == 'Custom'){
    url += "?start_date=" + start_date;
    url += "&end_date=" + end_date;
  }else{
    url += "?start_date=" + quarterEndDate(quarter)[0];
    url += "&end_date=" + quarterEndDate(quarter)[1];
  }

  url += "&gender=" + gender;
  url += "&date=" + sessionStorage.sessionDate;
  url += "&age_group=" + age_group;
  url += "&outcome_table=temp_patient_outcomes";
  url += '&program_id=' + sessionStorage.programID;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      if(obj) {
        td.innerHTML = obj.length;
          td.onclick= function() {
              drillDown(obj);
              if(gender.toLocaleLowerCase() === "male") {
  console.log(gender.toLocaleLowerCase() === "male");
                obj.forEach(element => {
                  clients.tx_given_ipt.push( element);
                });
              }
          }
      }
  
     ipt_tds.shift();
     
     if(ipt_tds.length > 0) {
       fetchIPTclients(ipt_tds[0]); 
     }else{
      addMales();
     }

    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}



function addClass(id) {
  var tr = document.getElementById(id);
  tr.style.backgroundColor = 'lightyellow';
  var cells = tr.getElementsByTagName('td');

  for(var i = 0 ; i < cells.length; i++){
    if(i >= 3 )
      cells[i].setAttribute('class','disaggregated-numbers');
  
  }
}

function assignNum(age, gender, num) {
  gender = (gender == 'F' ? 'Female' : 'Male');
  let cells = document.getElementsByClassName(gender + '_row');
  for(var i = 0 ; i < cells.length; i++){
    var tds = cells[i].getElementsByTagName('td');
    if(tds[1].innerHTML == age){
      assignTD(tds, num, gender, age);
    }
  }
}
var clients = {
  tx_new: [],
  tx_curr: [],
  tx_screened_for_tb: [],
  tx_given_ipt: [],
};
function assignTD(tds, num, gender, age) {
  tds[3].innerHTML = num.tx_new.length;
  // console.log(gender);
 if(gender === "Male") {

  num.tx_new.forEach(element => {
    clients.tx_new.push( element);
  });
  num.tx_curr.forEach(element => {
    clients.tx_curr.push( element);
  });
 } 
  tds[4].innerHTML = num.tx_curr.length;
  // clients.tx_curr = [...num.tx_curr];
  // tds[5].innerHTML = num.tx_given_ipt.length;
  // tds[6].innerHTML = num.tx_screened_for_tb.length;
  tds[3].onclick= function() {
    drillDown(num.tx_new);
  }
  tds[4].onclick= function() {
    drillDown(num.tx_curr);
  }
  
  tds[5].setAttribute("column-name", "ipt-" + gender.toLocaleLowerCase());
  tds[5].setAttribute("column-age", "ipt-" + age);

  tds[6].setAttribute("column-name", "tb-" + gender.toLocaleLowerCase());
  tds[6].setAttribute("column-age", "tb-" + age);
}
function drillDown(ids) {
  var tbody = document.getElementById("popupDataBody");
  tbody.innerHTML = null;
  var counter = 0;
  ids.forEach((element, index) => {
    var url = sessionStorage.apiProtocol + "://" + sessionStorage.apiURL + ":" + sessionStorage.apiPort + "/api/v1";
    url += '/patients/'+element;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
        var obj = JSON.parse(this.responseText);
        parsePatient(obj);
        counter ++;
        // loadAllFemale(obj, age_group);
          if(counter === ids.length) {

              initializePopUpTable();
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send();
  }); 
  
}

function parsePatient(results) {
    // var results = JSON.parse(this.responseText);
    var age = results.person.birthdate;
    var gender = results.person.gender;
    var identifier = "";
    let current_village : String ; 
    var patient_name = results.person.names[0].given_name + " " + results.person.names[0].family_name;

    var arv_number = results.patient_identifiers.filter((el) => {
      return el.identifier_type === 4 ? el.identifier : '';
    });

    results.person.addresses.filter(el => {
        return
    })
    try {
        current_village = results.person.addresses[0].city_village;
        var addressl2 = results.person.addresses[0].address2;
        var phone_number = results.person.person_attributes[1].value;
    }
    catch (e) {
        var addressl1 = "";
        // var addressl2 = "";
        // var phone_number = "";
    }
    try {
        for (var index = 0; index < results.patient_identifiers.length; index++) {
            if(results.patient_identifiers[index]["identifier_type"] == 4) {
            identifier =  results.patient_identifiers[index]["identifier"];
            }
        }
    } catch (e) {
        console.log(e); 
    }
    let toPush ={
      dob: age,
      arv_number: identifier,
      gender: gender,
      current_village: addressl1,
    };


    // toPush.dob = age;
    // toPush.arv_number = identifier;
    // toPush.gender = gender;
    // toPush.current_village = addressl1;
    // toPush.arv_number = identifier;
    renderDrillDownData(toPush);

    // console.log(patient_name, gender, age, addressl1, addressl2, phone_number, identifier, arv_number);
}

class Patient {
    patient: object;
    constructor(patient: object){
        this.patient = patient;
    }


}
declare module namespace {

    export interface Name {
        person_name_id: number;
        preferred: number;
        person_id: number;
        prefix?: any;
        given_name: string;
        middle_name: string;
        family_name_prefix?: any;
        family_name: string;
        family_name2?: any;
        family_name_suffix?: any;
        degree?: any;
        creator: number;
        date_created: Date;
        voided: number;
        voided_by?: any;
        date_voided?: any;
        void_reason?: any;
        changed_by?: any;
        date_changed?: any;
        uuid: string;
    }

    export interface Address {
        person_address_id: number;
        person_id: number;
        preferred: number;
        address1?: any;
        address2: string;
        city_village: string;
        state_province: string;
        postal_code?: any;
        country?: any;
        latitude?: any;
        longitude?: any;
        creator: number;
        date_created: Date;
        voided: number;
        voided_by?: any;
        date_voided?: any;
        void_reason?: any;
        county_district: string;
        neighborhood_cell: string;
        region?: any;
        subregion?: any;
        township_division: string;
        uuid: string;
    }

    export interface Type {
        person_attribute_type_id: number;
        name: string;
        description: string;
        format: string;
        foreign_key?: any;
        searchable: number;
        creator: number;
        date_created: Date;
        changed_by?: number;
        date_changed?: Date;
        retired: number;
        retired_by?: any;
        date_retired?: any;
        retire_reason?: any;
        edit_privilege?: any;
        uuid: string;
        sort_weight: number;
    }

    export interface PersonAttribute {
        person_attribute_id: number;
        person_id: number;
        value: string;
        person_attribute_type_id: number;
        creator: number;
        date_created: Date;
        changed_by: number;
        date_changed: Date;
        voided: number;
        voided_by?: any;
        date_voided?: any;
        void_reason?: any;
        uuid: string;
        type: Type;
    }

    export interface Person {
        person_id: number;
        gender: string;
        birthdate: string;
        birthdate_estimated: number;
        dead: number;
        death_date?: any;
        cause_of_death?: any;
        creator: number;
        date_created: Date;
        changed_by: number;
        date_changed: Date;
        voided: number;
        voided_by?: any;
        date_voided?: any;
        void_reason?: any;
        uuid: string;
        names: Name[];
        addresses: Address[];
        person_attributes: PersonAttribute[];
    }

    export interface Type2 {
        patient_identifier_type_id: number;
        name: string;
        description: string;
        format: string;
        check_digit: number;
        creator: number;
        date_created: Date;
        required: number;
        format_description: string;
        validator?: any;
        retired: number;
        retired_by?: any;
        date_retired?: any;
        retire_reason?: any;
        uuid: string;
    }

    export interface PatientIdentifier {
        patient_identifier_id: number;
        patient_id: number;
        identifier: string;
        identifier_type: number;
        preferred: number;
        location_id: number;
        creator: number;
        date_created: Date;
        voided: number;
        voided_by?: any;
        date_voided?: any;
        void_reason?: any;
        uuid: string;
        type: Type2;
    }

    export interface RootObject {
        patient_id: number;
        tribe?: any;
        creator: number;
        date_created: Date;
        changed_by: number;
        date_changed: Date;
        voided: number;
        voided_by?: any;
        date_voided?: any;
        void_reason?: any;
        person: Person;
        patient_identifiers: PatientIdentifier[];
    }

}


function addTableBody() {
  var columns = [
    '0-5 months', '6-11 months','12-23 months',
    '2-4 years', '5-9 years',
    '10-14 years', '15-17 years',
    '18-19 years', '20-24 years',
    '25-29 years', '30-34 years',
    '35-39 years', '40-44 years',
    '45-49 years', '50 plus years'
  ];

  var table_body = document.getElementById('table-body');
  var row_count = 1;
  var gender = ['Female', 'Male'];

  for(var s = 0 ; s < gender.length; s++){
    for(var i = 0 ; i < columns.length; i++){
      var tr = document.createElement('tr');
      tr.setAttribute('class', gender[s] + '_row');
      table_body.appendChild(tr);
      var td_count = 0;

      while (td_count < 34) {
        var td = document.createElement('td');
        tr.appendChild(td);
        if(td_count == 0)
          td.innerHTML = `${row_count++}`;
        
        if(td_count == 1)
          td.innerHTML = columns[i];
           
        if(td_count == 2)
          td.innerHTML = gender[s];
           
        if(td_count > 2){
          td.innerHTML = `0`;
          td.setAttribute('class','disaggregated-numbers');
        }   
        tr.appendChild(td);
        td_count++;
      }

    }
  }
}

function getAllFemale(age_group) {

  var url = sessionStorage.apiProtocol + "://" + sessionStorage.apiURL + ":" + sessionStorage.apiPort + "/api/v1";
  url += '/cohort_disaggregated';
  url += "?date=" + sessionStorage.sessionDate;
  url += "&quarter=" + quarter;
  url += "&age_group=" + age_group;
  url += "&rebuild_outcome=false";
  url += "&initialize=false";
  url += '&program_id=' + sessionStorage.programID;

  if(quarter == 'Custom'){
    url += "&start_date=" + start_date;
    url += "&end_date=" + end_date;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      loadAllFemale(obj, age_group);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function loadAllFemale(data, age_group) {
  for(let age in data) {
    var gender = data[age];
    for(let sex in gender) {
      var tx_new = data[age][sex].tx_new.length;
      var tx_curr = data[age][sex].tx_curr.length;
      var tx_screened_for_tb = data[age][sex].tx_screened_for_tb.length;
      var tx_given_ipt = data[age][sex].tx_given_ipt.length;
      
      if(age_group == 'Pregnant'){
        var count = 32 ; var g = 'FP'; 
      }else if(age_group == 'Breastfeeding'){
        var count = 34 ; var g = 'FBf'; 
      }

      data_table.row.add([count,'All', g, tx_new, tx_curr, 
        tx_given_ipt, tx_screened_for_tb,
        0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0]).node().id = age_group.toLowerCase();
      data_table.draw();
      // if(g === "Male" && )
      
      addClass(age_group.toLowerCase()); 

      if(age_group.toLowerCase() != 'all-males') {
        var tr = document.getElementById(age_group.toLowerCase());
        let tds = tr.getElementsByTagName('td');
        tds[5].setAttribute("column-name", "ipt-" + age_group.toLowerCase());
        tds[5].setAttribute("column-age", "ipt-" + "all");
        tds[6].setAttribute("column-name", "tb-" + age_group.toLowerCase());
        tds[6].setAttribute("column-age", "ipt-" + "all");
      }

    }
  }

  if(age_group == 'Pregnant') {
    data_table.row.add([33,'All', 'FNP', 0,0,0,0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0]).node().id = 'fnp';
    data_table.draw();

    var tr = document.getElementById("fnp");;
    let tds = tr.getElementsByTagName('td');
    tds[5].setAttribute("column-name", "ipt-" + "fnp");
    tds[5].setAttribute("column-age", "ipt-" + "all");
    tds[6].setAttribute("column-name", "tb-" + "fnp");
    tds[6].setAttribute("column-age", "tb-" + "all");
    
    addClass('fnp'); 
    getAllFemale('Breastfeeding');
  }else if(age_group == 'Breastfeeding') {
    updateFNProw();
  }
}

function updateFNProw() {
  var fp_row = document.getElementById('pregnant');
  var fnp_row = document.getElementById('fnp');
  var bf_row = document.getElementById('breastfeeding');

  var fp_bf_tx_new = 0;
  var fp_bf_tx_curr = 0;
  var fp_bf_tx_given_ipt = 0;
  var fp_bf_tx_screened_for_tb = 0;

  var rows = [fp_row, bf_row];
  
  for(var r = 0 ; r < rows.length; r++){
    var tds = rows[r].getElementsByTagName('td');
    fp_bf_tx_new += parseInt(tds[3].innerHTML);
    fp_bf_tx_curr += parseInt(tds[4].innerHTML);
    fp_bf_tx_given_ipt += parseInt(tds[5].innerHTML);
    fp_bf_tx_screened_for_tb += parseInt(tds[6].innerHTML);
  }

  var all_female_tx_new = 0;
  var all_female_tx_curr = 0;
  var all_female_tx_given_ipt = 0;
  var all_female_tx_screened_for_tb = 0;
  var female_rows = document.getElementsByClassName('Female_row');
  
  for(var i = 0 ; i < female_rows.length; i++){
    var tds = female_rows[i].getElementsByTagName('td');
    
    if(tds[1].innerHTML.match(/months/i) || tds[1].innerHTML.match(/years/)) {
      all_female_tx_new += parseInt(tds[3].innerHTML);
      all_female_tx_curr += parseInt(tds[4].innerHTML);
      all_female_tx_given_ipt += parseInt(tds[5].innerHTML);
      all_female_tx_screened_for_tb += parseInt(tds[6].innerHTML);
    }
  }
  
  var tds = fnp_row.getElementsByTagName('td');
  tds[3].innerHTML = `${(all_female_tx_new - fp_bf_tx_new)}`;  
  tds[4].innerHTML = `${(all_female_tx_curr - fp_bf_tx_curr)}`;  
  tds[5].innerHTML = `${(all_female_tx_given_ipt - fp_bf_tx_given_ipt)}`;  
  tds[6].innerHTML = `${(all_female_tx_screened_for_tb - fp_bf_tx_screened_for_tb)}`;  

  updateRemainingCells();
}

var female_ipt_tds = [];
var female_tb_tds  = [];

function updateRemainingCells() {
  var tr = document.getElementById("pregnant"); 
  female_tb_tds.push(tr.getElementsByTagName("td")[6]);
  tr = document.getElementById("fnp"); 
  female_tb_tds.push(tr.getElementsByTagName("td")[6]);
  tr = document.getElementById("breastfeeding"); 
  female_tb_tds.push(tr.getElementsByTagName("td")[6]);
 
  tr = document.getElementById("pregnant"); 
  female_ipt_tds.push(tr.getElementsByTagName("td")[5]);
  tr = document.getElementById("fnp"); 
  female_ipt_tds.push(tr.getElementsByTagName("td")[5]);
  tr = document.getElementById("breastfeeding"); 
  female_ipt_tds.push(tr.getElementsByTagName("td")[5]);

  fetchTBscreenedFemaleClients(female_tb_tds[0]);
  /*
  We are here
  data_table.destroy();
  initializeTable();
  validateReport();*/
}

var age_groups = [
  '0-5 months', '6-11 months','12-23 months',
  '2-4 years', '5-9 years',
  '10-14 years', '15-17 years',
  '18-19 years', '20-24 years',
  '25-29 years', '30-34 years',
  '35-39 years', '40-44 years',
  '45-49 years', '50 plus years'
].reverse();

function initializeGet() {
  initializeReport();
}

document.getElementById('quarter-title').innerHTML = quarter;
document.getElementById('on-art').innerHTML = on_art;

addTableBody();
initializeTable();
initializeGet();

function validateReport() {
  var report_total = 0;
  var rows = [];
  rows.push(document.getElementById('pregnant'));
  rows.push(document.getElementById('fnp'));
  rows.push(document.getElementById('breastfeeding'));
  rows.push(document.getElementById('all-males'));

  for(var i = 0 ; i < rows.length; i++){
    var tds = rows[i].getElementsByTagName('td');
    report_total += parseInt(tds[4].innerHTML);
  }

  var valid_report = document.getElementById('valid-report');
  addDriller(); 
  if(parseInt(on_art) == report_total) {
    valid_report.innerHTML = "<span style='color: green;'>Report is consistent</span>";
  }else{
    valid_report.innerHTML = "<span style='color: red;'>Report is <b>Not</b> consistent</span>";
  }
  document.getElementById('spinner').style.display = 'none;';
  document.getElementById('report-cover').style.display = 'none';
}

function fetchTBscreenedFemaleClients(td) {
  if(td == undefined)
    return

  var gender = td.getAttribute("column-name").replace("tb-","");
  var age_group = td.getAttribute("column-age").replace("tb-","");

  var url = sessionStorage.apiProtocol + "://" + sessionStorage.apiURL + ":" + sessionStorage.apiPort + "/api/v1";
  url += '/screened_for_tb';

  if(quarter == 'Custom'){
    url += "?start_date=" + start_date;
    url += "&end_date=" + end_date;
  }else{
    url += "?start_date=" + quarterEndDate(quarter)[0];
    url += "&end_date=" + quarterEndDate(quarter)[1];
  }

  url += "&gender=" + gender;
  url += "&date=" + sessionStorage.sessionDate;
  url += "&age_group=" + age_group;
  url += "&outcome_table=temp_patient_outcomes";
  url += '&program_id=' + sessionStorage.programID;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      if(obj) {
        td.innerHTML = obj.length;
      }

      female_tb_tds.shift();
      if(female_tb_tds.length > 0) {
        fetchTBscreenedFemaleClients(female_tb_tds[0]);
      }else{
        fetchIPTfemaleClients(female_ipt_tds[0]);
      }
      /* .......................  */


    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function fetchIPTfemaleClients(td) {
  if(td == undefined)
    return 

  var gender = td.getAttribute("column-name").replace("ipt-","");
  var age_group = td.getAttribute("column-age").replace("ipt-","");

  var url = sessionStorage.apiProtocol + "://" + sessionStorage.apiURL + ":" + sessionStorage.apiPort + "/api/v1";
  url += '/clients_given_ipt';

  if(quarter == 'Custom'){
    url += "?start_date=" + start_date;
    url += "&end_date=" + end_date;
  }else{
    url += "?start_date=" + quarterEndDate(quarter)[0];
    url += "&end_date=" + quarterEndDate(quarter)[1];
  }

  url += "&gender=" + gender;
  url += "&date=" + sessionStorage.sessionDate;
  url += "&age_group=" + age_group;
  url += "&outcome_table=temp_patient_outcomes";
  url += '&program_id=' + sessionStorage.programID;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      if(obj) {
        td.innerHTML = obj.length;
      }
  
     female_ipt_tds.shift();
     
     if(female_ipt_tds.length > 0) {
       fetchIPTfemaleClients(female_ipt_tds[0]); 
     }else{
      data_table.destroy();
      initializeTable();
      //validateReport();
      /* here ..........................*/
      var rows = document.getElementById('table-body').children;
      for(var i =  0; i < rows.length; i++){
        let tds = rows[i].children; 
        let innerHTML  = tds[2].innerHTML;
        if(innerHTML == 'Female' || innerHTML == 'Male' || innerHTML == 'FP' || innerHTML == 'FNP' || innerHTML == 'FBf') 
          allRows.push(rows[i]);
      
      }

      fetchRegimens(allRows[0]);
      /* here ..........................*/
     }

    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function fetchRegimens(row){
  var tds = row.children;
  var  age_group = tds[1].innerHTML;

  var gender  = tds[2].innerHTML;
  gender = (gender == 'FBf' ? 'Fbf' : gender);
  let  dates = quarterEndDate(quarter);

  var url = sessionStorage.apiProtocol + "://" + sessionStorage.apiURL + ":" + sessionStorage.apiPort + "/api/v1";
  url += "/disaggregated_regimen_distribution";
  url += "?date=" + moment().format('YYYY-MM-DD');
  url += "&start_date=" + dates[0];
  url += "&end_date=" + dates[1];
  url += "&gender=" + gender;
  url += "&age_group=" + age_group;
  url += "&outcome_table=temp_patient_outcomes";
  url += '&program_id=1';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      addRegimen(obj, tds);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}
function addDriller() {
  var rows = document.getElementsByClassName("disaggregated-numbers");
  for (let index = 0; index < rows.length; index++) {
    var element = rows[index];
    !isNaN(Number(element.innerHTML)) && parseInt(element.innerHTML) > 0 ? element.classList.add('drillable') : null;
  }
}

function addRegimen(data, tds){
  allRows.shift();
  var total = 0;
  var totalIDs = [];
  for(var regimen in  data){
    console.log(data[regimen]);
    if(regimen == '0A')
      tds[7].innerHTML = data[regimen].length;
      tds[7].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '2A')
      tds[8].innerHTML = data[regimen].length;
      tds[8].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '4A')
      tds[9].innerHTML = data[regimen].length;
      tds[9].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '5A')
      tds[10].innerHTML = data[regimen].length;
      tds[10].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '6A')
      tds[11].innerHTML = data[regimen].length;
      tds[11].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '7A')
      tds[12].innerHTML = data[regimen].length;
      tds[12].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '8A')
      tds[13].innerHTML = data[regimen].length;
      tds[13].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '9A')
      tds[14].innerHTML = data[regimen].length;
      tds[14].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '10A')
      tds[15].innerHTML = data[regimen].length;
      tds[15].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '11A')
      tds[16].innerHTML = data[regimen].length;
      tds[16].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '12A')
      tds[17].innerHTML = data[regimen].length;
      tds[17].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '13A')
      tds[18].innerHTML = data[regimen].length;
      tds[18].onclick= function() {
          console.log(data[regimen]);
          drillDown(data[regimen]);
      }
    if(regimen == '14A')
      tds[19].innerHTML = data[regimen].length;
      tds[19].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '15A')
      tds[20].innerHTML = data[regimen].length;
      tds[20].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '16A')
      tds[21].innerHTML = data[regimen].length;
      tds[21].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '17A')
      tds[22].innerHTML = data[regimen].length;
      tds[22].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '0P')
      tds[23].innerHTML = data[regimen].length;
      tds[23].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '2P')
      tds[24].innerHTML = data[regimen].length;
      tds[24].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '4P')
      tds[25].innerHTML = data[regimen].length;
      tds[25].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '9P')
      tds[26].innerHTML = data[regimen].length;
      tds[26].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '11P')
      tds[27].innerHTML = data[regimen].length;
      tds[27].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '14P')
      tds[28].innerHTML = data[regimen].length;
      tds[28].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '15P')
      tds[29].innerHTML = data[regimen].length;
      tds[29].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '16P')
      tds[30].innerHTML = data[regimen].length;
      tds[30].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == '17P')
      tds[31].innerHTML = data[regimen].length;
      tds[31].onclick= function() {
          drillDown(data[regimen]);
      }
    if(regimen == 'N/A')
      tds[32].innerHTML = data[regimen].length;
      tds[32].onclick= function() {
          drillDown(data[regimen]);
      }
    
    total += data[regimen].length;
    totalIDs = [...data[regimen]];
  }
  tds[33].innerHTML = total;
  tds[33].onclick= function() {
    drillDown(totalIDs);
  }
  if(allRows.length > 0){
    fetchRegimens(allRows[0]);
  }else{
    data_table.destroy();
    initializeTable();
    validateReport();
  }

}
  
var allRows = [];

