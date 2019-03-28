var callbackFunction = null;
var img_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAFKCAMAAAD2TtHjAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADeUExURUdwTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEpG5jIAAABJdFJOUwCoIOCw2LjAMFiA+Oh4OPAYcJDI0CgIEKBoQFCIYFReNFdbI04VEyZNR0kDSkQODWJsZWQWLWkKYQlRPzoxEQdGKgZBGhw7NyfGlyHFAAAFo0lEQVR42u3TWVcUOQCAUVzQRlCJG2aYoVkEVNyAUUQd91ny//+QnVRqPRxfZp7m3O+lU6l0qrrq9tKSJEn6WQexNFsMX8b4vM4exfhssnA7DtvLU2/jTv541M1u58N33eHBeNPc6+bM74vhPzF+mVxjq5z8UDc9qrPPy+wF9/O937Tcz2ncmix6Ur56moffYtyos383N/B1sOnp8MfttrM78W3+2GumB5uejy+z+JHfJlfeifN2+K7f9FmMX8frNvoHch7jk3Y6xkftsD7lWVk3n1zmcvPqzkcvp3z1Q3dYNt3tz9T2ugXz+pRf9h4O/jWsWSrdzDeZ0qU6+yCla5OFN9KwlTx1Oy3nj+vd7I18eLc7nI03zYXmzK3F8LeU4uQa98rJO3XTB3X2Upm94H5+6Tct97Oa7k0WXS1fXc3Dhyndr7O/NjewMdh0dfjjrrSzy+l2/lhppgebrk9eb0oPJ1deTmvt8G6/6bWUNsbr7vcPZD2lq+10StfbYX3KN8u6tcllNptXtz56OeWrd7rDsumV/kxtpVuwVp/y5d7DDCywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwAILLLDAAgsssMACCyywwALr/wxrP5S2F8MXITyts0chbE4W3grDDvPUmzDPH1vdbH48Szvd4f5409wfzZn8Yr6E8Hpyjd1y8n3d9KjOPi2zF9zPn/2m5X6Ow+5k0ePy1eM8/BzCxzr7V3MDnwabHg9/3Kt2dh7e5I/DZnqw6dn4Mosf+Xly5Xk4aYc7/aabIXwar/vYP5CzEB53f8Cw1Q7rU94u604ml9lrXt3Z6OWUr77vDsumr/oztcNuwUl9yi96D/tLkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0n/RD/3ZSSm34sPOAAAAAElFTkSuQmCC";
var patient_id = sessionStorage.backupPatientID;
patient_index_url ="/views/confirm.html";
guardian_index_url = "/views/patient/relationships/guardian_confirm.html?patient_id=" + patient_id;
function inserBarcodeScan() {
  try{
    var barcodeDiv = document.getElementsByClassName('barcode')[0];
    functionName = barcodeDiv.getAttribute('functionName');
    callbackFunction = functionName;

  }catch(e){
    return;
  }

  var barcodeTable = document.createElement('table');
  barcodeTable.setAttribute('style','width: 100%;');

  var barcodeTR = document.createElement('tr');
  barcodeTable.appendChild(barcodeTR);

  var barcodeTD = document.createElement('td');
  barcodeTD.setAttribute('style',"vertical-align: middle; width: 50px;");
  barcodeTR.appendChild(barcodeTD);

  var img = document.createElement('img');
  img.setAttribute('src', img_base64);
  img.setAttribute('style','height: 97px; vertical-align: middle;');
  barcodeTD.appendChild(img);

  var barcodeTD = document.createElement('td');
  barcodeTD.setAttribute('style',"vertical-align: bottom; width: 80%;");
  barcodeTR.appendChild(barcodeTD);
  var inputText = document.createElement('input');
  inputText.setAttribute('type','text');
  inputText.setAttribute('id','search-string');
  inputText.setAttribute('style',"font-weight:bold;font-size:58px;margin-bottom: 15px;border-style: solid; border-width: 0px 0px 2px 0px; width: 99%; border-color: black;");
  inputText.setAttribute('onkeyup', "javascript:searchID(this);")
  barcodeTD.appendChild(inputText);
  barcodeTR.appendChild(barcodeTD);


  barcodeDiv.appendChild(barcodeTable);
}

function searchID(e) {
  var lastChar = e.value.substr(e.value.length - 1); 
  if(lastChar == '$') {
    returnToFunction(e.value.slice(0, -1));
    e.value = null;
  }
}

function autoFocus() {
  try {
    document.getElementById("search-string").focus();
  }catch(e) {}
}

function returnToFunction(search_string) {
  eval(callbackFunction)(search_string);
}

function postID(identifier) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // document.location = "/confirm/" + this.responseText;
      document.location = patient_index_url + "?patient_id="+identifier;
      // callbackFunction(this.responseText);
    }
  };
  xhttp.open("GET", patient_index_url + "?identifier=" + identifier, true);
  xhttp.send();
}

function postGuardianID(identifier) {
  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //     // alert(iden)
  //     // document.location = "/confirm/" + this.responseText;
  //     document.location = guardian_index_url + "&guardian_identifier="+identifier;
  //     // callbackFunction(this.responseText);
  //   }
  // };
  // xhttp.open("GET", guardian_index_url + "&guardian_identifier=" + identifier, true);
  // xhttp.send();

    var idurl = new URL(location.href);
    var patient_id = idurl.searchParams.get("patient_id");
    guardian_id = (identifier).replace(/-/g, "");
    // getClient(patient_id);
    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/search/patients/by_npid?npid=" + guardian_id;
    guardian_index_url = "/views/patient/relationships/guardian_confirm.html?patient_id=" + patient_id;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
        var obj = JSON.parse(this.responseText)[0];
        if(JSON.parse(this.responseText).length > 1) {
          location.href = "/views/duplicates.html?health_id="+ guardian_id;
        }else if(JSON.parse(this.responseText).length == 1) {
          // populatePatient(obj, obj_2);
          location.href = guardian_index_url+ "&guardian_identifier="+ obj.patient_id;
        } else {
          // location.href = "/";
        }
      }else if(this.status == 204) {
        // window.location.href = "/";
      }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send();
}

inserBarcodeScan();

setInterval(function() {
  autoFocus();
}, 100);
