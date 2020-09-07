

function buildKeyBoardForOtherSideEffects() {

  var  mainFrame = document.getElementById("inputFrame" + tstCurrentPage);
  mainFrame.style = "width: 95.5%;  height: 90%;";


  var textarea = document.createElement("textarea");
  textarea.setAttribute("id", "specify-other-side-effect");
  mainFrame.appendChild(textarea);

  var textareaStyle = "width: 97.5%; height: 250px;";
  textareaStyle += "border-width: 1px; border-style: solid;";
  textareaStyle += "background-color: white; border-color: black;";
  textareaStyle += "border-radius: 9px;";
  textarea.setAttribute("style", textareaStyle);

  var keyboardContainer = document.createElement("div");
  textareaStyle += "width: 99.5%; height: 310px;";
  keyboardContainer.setAttribute("style", textareaStyle);
  keyboardContainer.innerHTML = "aaaaaaaa"
  mainFrame.appendChild(keyboardContainer);
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

