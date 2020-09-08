var str_location_focus;

function specifySideEffects() {
  try {
    var specify_se = yesNo_Hash["OTHER MALAWI ART SIDE EFFECTS"]["Other (specify)"];
    var show_se = (specify_se == "Yes"  ? true : false)
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
  keyboardKeys(keyboardContainer);
  mainFrame.appendChild(keyboardContainer);
  textarea.focus(); 
}

function keyboardKeys(el){
    var rowStyle = "display: table-row; width: 100%;";

    var numbers = ["1","2","3","4","5","6","7","8","9","0","Delete"];
    var qwerty1 = ["Q","W","E","R","T","Y","U","I","O","P","Enter"];
    var qwerty2 = ["Cap","A","S","D","F","G","H","J","K","L","Clear"];
    var qwerty3 = ["Z","X","C","V","B","N","M","<",">","/","."];
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

function execUserInput(el){
    var textarea = document.getElementById("specify-other-side-effect");

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
        text_to_start_from.push(el.id);
    }else{
        new_char_inserted = false;
        for(var i = 0; i < user_inputs.length; i++){
            
            if(i <= textIndex){
                if(str_location_focus.start == 0){
                    text_to_start_from.push(el.id);
                    text_to_start_from.push(user_inputs[i])
                    str_location_focus.start += 1;
                    new_char_inserted = true;
                    continue;
                }
                
                text_to_start_from.push(user_inputs[i])

                if(user_inputs.length  == (i + 1)){
                    if(!new_char_inserted){
                        text_to_start_from.push(el.id);
                        new_char_inserted = true;
                    }
                }

                console.log(new_char_inserted == false);
                console.log(user_inputs[i] + "  ----------------- " +  text_to_start_from.join(""))
            }else if((i - 1) == textIndex){
                if(!new_char_inserted)
                    text_to_start_from.push(el.id);

                text_to_start_from.push(user_inputs[i]);
                new_char_inserted = true;
            }else{
                if(!new_char_inserted)
                    text_to_start_from.push(el.id);
                    
                text_to_start_from.push(user_inputs[i]);
                new_char_inserted = true;
            }
        }
    }

    str_location_focus.start += 1;
    //new_char_inserted = false;
    //str_location_focus.end = text_to_start_from.length;
    console.log(text_to_start_from.join(""));
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