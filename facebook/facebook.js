const element = document.createElement("div");
element.innerHTML = `
<div class="adminActions">
<input type="checkbox" name="adminToggle" class="adminToggle" />
<a class="adminButton" href="#!"></a>
<div class="adminButtons">
  <div class="adminButtonWrapper">
    <div class="title-extensoin">Facebook Markletplace Automation</div>
    <div class="title-upload-extensoin">Upload CSV file</div>
    <input id="inputId-extensoin" type="file">
    </inpu>
    <h3 id="output-extensoin"></h3>
    <button id="start-button">Start Posting Ads</button>
    <div id="error-extensoin"></div>
  </div>
</div>
</div>
  `;
document.body.insertAdjacentElement("afterbegin", element);



function fillValue(element, value) {
    (element = getElementByXpath(element)) &&
      (dispatchev(element, "focus", false, false),
      (element.value = value),
      dispatchev(element, "change", true, false),
      dispatchev(element, "blur", false, false));
  }
  function dispatchev(element, event, state1, state2) {
    var ev = element.ownerDocument.createEvent("Event");
    ev.initEvent(event, state1, state2), element.dispatchEvent(ev);
  }
  
  function getElementByXpath(path) {
    return document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }
  












window.addEventListener("load", function () {
  /////////////////////////////////////////// loaded start

  var input = document.getElementById("inputId-extensoin");
  var output = document.getElementById("output-extensoin");
  input.addEventListener("input", function () {
    var csvFile = this.files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      const Array = csvToArray(text);
      output.innerHTML = "Total " + Array.length + " product";
      chrome.storage.local.set({ csv: Array });
    };
    reader.readAsText(csvFile);
  });

  var startButton = document.getElementById("start-button");
  startButton.addEventListener("click", async function (e) {
    console.log("click");

    var error = document.getElementById("error-extensoin");

    if (!input.value) {
      error.innerHTML = "Add CSV file";
      return;
    } else {
      error.innerHTML = "starting...... ";
    }
  });

  function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array

    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  }

  ////////////////////////////////////////// loaded end
});
