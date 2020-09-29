var str_location_focus;
var cap_lock = true;

function specifySideEffects() {
  try {
    var specify_se = yesNo_Hash["OTHER MALAWI ART SIDE EFFECTS"]["Other (specify)"];
    var main_specify_se = yesNo_Hash["MALAWI ART SIDE EFFECTS"]["Other"];
    var main_show_se = (main_specify_se == "Yes"  ? true : false)
    var show_se = (specify_se == "Yes"  ? true : false)
    if(!main_show_se)
        return false;

    return show_se;  
  }catch(e){
    return false;
  }
}

function buildKeyBoardForOtherSideEffects() {

  var  mainFrame = document.getElementById("inputFrame" + tstCurrentPage);
  mainFrame.style = "width: 95.5%;  height: 90%;";


  var textarea = document.createElement("textarea");
  textarea.setAttribute("id", "specify-other-side-effect");
  textarea.setAttribute("onfocus", "setStringFocus(this);");
  if(other_specific_side_effects != "")
    textarea.value = other_specific_side_effects;

  mainFrame.appendChild(textarea);

  var textareaStyle = "width: 97.5%; height: 150px;";
  textareaStyle += "border-width: 1px; border-style: solid;";
  textareaStyle += "background-color: white; border-color: black;";
  textareaStyle += "border-radius: 9px;";
  textarea.setAttribute("style", textareaStyle);

  var keyboardContainer = document.createElement("div");
  textareaStyle += "width: 95.2%; height: 310px;";
  textareaStyle += "margin-top: 10px;display: table;";
  textareaStyle += "position: absolute; top: 220px";
  keyboardContainer.setAttribute("style", textareaStyle);
  keyboardContainer.setAttribute("id","keyboard-keys");
  keyboardKeys(keyboardContainer);
  mainFrame.appendChild(keyboardContainer);
  textarea.focus(); 
}

function keyboardKeys(el){
    var rowStyle = "display: table-row; width: 100%;";

    var numbers = ["1","2","3","4","5","6","7","8","9","0","Delete"];
    if(cap_lock){
        var qwerty1 = ["Q","W","E","R","T","Y","U","I","O","P","Enter"];
        var qwerty2 = ["Cap","A","S","D","F","G","H","J","K","L","Clear"];
        var qwerty3 = ["Z","X","C","V","B","N","M","<",">","/","."];
    }else{
        var qwerty1 = ["q","w","e","r","t","y","u","i","o","p","Enter"];
        var qwerty2 = ["Cap","a","s","d","f","g","h","j","k","l","Clear"];
        var qwerty3 = ["z","x","c","v","b","n","m","<",">","/","."];
    }
    var qwerty4 = ["Space"];

    var keys = [numbers, qwerty1, qwerty2, qwerty3];

    for(var i = 0; i < keys.length; i++){
        var  qwertyDIV = document.createElement("div");
        el.appendChild(qwertyDIV);
        qwertyDIV.setAttribute("style", rowStyle);
        insertKeys(qwertyDIV, keys[i]);
    }

    var  mainFrame = document.getElementById("inputFrame" + tstCurrentPage);
    textareaStyle = "width: 99.5%; height: 75px; text-align: center;";
    textareaStyle += "margin-top: 5px;display: table;";
    var spaceDiv = document.createElement("div");
    spaceDiv.setAttribute("style", textareaStyle);
    mainFrame.appendChild(spaceDiv);

    var qwertyDIV = document.createElement("div");
    spaceDiv.appendChild(qwertyDIV);
    qwertyDIV.setAttribute("style", rowStyle);
    insertKeys(qwertyDIV, qwerty4);
    
}

function insertKeys(el, keys) {
    var cellStyle = "display: table-cell";

    for(var i = 0; i < keys.length; i++){
        var keycell = document.createElement("div");
        keycell.setAttribute("style",cellStyle);
        el.appendChild(keycell);
        
        var btn = document.createElement("button");
        btn.setAttribute("class","button blue navButton");
        btn.innerHTML = "<span>" +  keys[i] + "</span>";
        if(keys[i].match(/enter/i))
            btn.style  = "width: 100px;";

        if(keys[i].match(/space/i)){
            var btnStyle = "width: 300px;width: 50%;";
            btnStyle += "bottom: 35px;left: 26%;position: absolute;";
            btn.style = btnStyle;
        }

        btn.setAttribute("id", keys[i]);
        btn.setAttribute("onmousedown", "execUserInput(this);");
        keycell.appendChild(btn);
    }

}

var new_char_inserted = false;

function clearTextArea(el){
    el.value = "";
    setStringFocus(el);
}

function deleteText(el){
    var text_char = el.value.split("");
    var valid_text = [];
    var textarea_focus = str_location_focus; //getInputSelection(textarea);
    if(textarea_focus == undefined){
        textarea_focus = getInputSelection(textarea);
        str_location_focus = textarea_focus;
    }

   if(text_char.length > 0 && str_location_focus.start == 0)
      str_location_focus.start = 1; 

    for(var i = 0; i < text_char.length; i++){
        if((i + 1) == textarea_focus.start)
            continue;
            
        valid_text.push(text_char[i]);
    }

    el.value = valid_text.join("");
    if(el.value == ""){
        setStringFocus(el);
    }else{
        if(str_location_focus.start > 0)
            str_location_focus.start -= 1;

    }

}

function execUserInput(el){
    var textarea = document.getElementById("specify-other-side-effect");
    if(el.id == 'Clear'){
        return clearTextArea(textarea);
    }else if(el.id == "Delete"){
        return deleteText(textarea);
    }else if(el.id == "Cap"){
        cap_lock = (cap_lock == true ? false  :  true);
        return capLock();
    }


    var textarea_focus = str_location_focus; //getInputSelection(textarea);
    if(textarea_focus == undefined){
        textarea_focus = getInputSelection(textarea);
        str_location_focus = textarea_focus;
    }

    
    var user_inputs = textarea.value.split("");
    
    var text_to_start_from = [];
    var textIndex = 0
    
    if(textarea_focus.start > 0)
        textIndex = (textarea_focus.start - 1);


    if(user_inputs.length < 1){
        if(el.id == "Space"){
            text_to_start_from.push(" ");
        }else if(el.id  == "Enter"){
            text_to_start_from.push("\n");
        }else{
            text_to_start_from.push(el.id);
        }
    }else{
        new_char_inserted = false;
        for(var i = 0; i < user_inputs.length; i++){
            
            if(i <= textIndex){
                if(str_location_focus.start == 0){
                    if(el.id == "Space"){
                        text_to_start_from.push(" ");
                    }else if(el.id  == "Enter"){
                        text_to_start_from.push("\n");
                    }else{
                        text_to_start_from.push(el.id);
                    }
                    text_to_start_from.push(user_inputs[i])
                    new_char_inserted = true;
                    continue;
                }
                
                text_to_start_from.push(user_inputs[i])

                if(user_inputs.length  == (i + 1)){
                    if(!new_char_inserted){
                        if(el.id == "Space"){
                            text_to_start_from.push(" ");
                        }else if(el.id  == "Enter"){
                            text_to_start_from.push("\n");
                        }else{
                            text_to_start_from.push(el.id);
                        }
                        new_char_inserted = true;
                    }
                }

            }else if((i - 1) == textIndex){
                if(!new_char_inserted){
                    if(el.id == "Space"){
                        text_to_start_from.push(" ");
                    }else if(el.id  == "Enter"){
                        text_to_start_from.push("\n");
                    }else{
                        text_to_start_from.push(el.id);
                    }
                }

                text_to_start_from.push(user_inputs[i]);
                new_char_inserted = true;
            }else{
                if(!new_char_inserted){
                    if(el.id == "Space"){
                        text_to_start_from.push(" ");
                    }else if(el.id  == "Enter"){
                        text_to_start_from.push("\n");
                    }else{
                        text_to_start_from.push(el.id);
                    }
                }
                    
                text_to_start_from.push(user_inputs[i]);
                new_char_inserted = true;
            }
        }
    }

    str_location_focus.start += 1;
    textarea.value = text_to_start_from.join("");
}

/**
 * Return an object with the selection range or cursor position (if both have the same value)
 * @param {DOMElement} el A dom element of a textarea or input text.
 * @return {Object} reference Object with 2 properties (start and end) with the identifier of the location of the cursor and selected text.
 **/
function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}

function setStringFocus(e){
    str_location_focus = getInputSelection(e);
}

function emptyTextArea(el){
    return el.value.replace(/^\s+|\s+$/g,"") == "" ? true : false
}

function disableNextBtn(){
    var  btn = document.getElementById("nextButton");
    btn.setAttribute("onmousedown","validateTextArea()");
}

var other_specific_side_effects = "";

function validateTextArea(){
    var el = document.getElementById("specify-other-side-effect");
    
    if(emptyTextArea(el)){
        showMessage("Please specify side effect(s).")
    }else{
        other_specific_side_effects  = el.value;
        gotoNextPage();
    }
}

function capLock(){
    var keyboard = document.getElementById("keyboard-keys");
    keyboard.innerHTML = "";
    keyboardKeys(keyboard); 
}