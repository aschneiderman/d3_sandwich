// sandwich.js: common functions used in creating the interactive toys for the recipe sandwiches


var UpdateFunction = {};

function getSVG(toyID)  {
  return d3.select('#' + toyID + ' svg');
};

function getForm(toyID)  {
  return d3.select('#' + toyID + ' form');
};

function getPreItem(toyID, itemID)  {
  return d3.select('#' + toyID + ' pre .' + itemID);
}


function updateCode(toyID, codeItem, newCode)  {
  // updateCode: Change the text of the code and change the background color to highlight it
  getPreItem(toyID, codeItem).text(newCode).style("background-color", '#FFFF66');
};

function updateValues(toyID)  {
  // updateValues: read the values the user put in the toy's form
  //  and then use them to update the toy and the toy's pre code
    var values = {};
    getForm(toyID)
      .selectAll("input")[0]    //  comes back as an array within an array, so drop the outer array
      .slice(0,-1)     // drop the button that's at the end of the form;  switch to using a filter?
      .forEach(function(d, i) {
          values[d.name] = d.value;
          updateCode(toyID, d.name, d.value);
      });
      UpdateFunction[toyID](values);
};


// Up next:
// create a function: updateStyles
// What the function does is roll through each non-button value in the input form
// and then does a selectAll using the input form Element and converts them:
//
// get SVG.selectAll (element)
//   .style("name", "value")
