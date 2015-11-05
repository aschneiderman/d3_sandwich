// abstract_state.js: globals and functions for creating the abstract state map,
// so we don't have to repeat the code & clutter up each recipe step

// Globals
var Width = 40, Height = 40, CellSize = 39;
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


function makeMap(toyID, mapItems, selectedItems, xOffset, yOffset)  {
  // makeMap: create a map
  var textXOffset = 10;
  makeRectangles(toyID, mapItems, xOffset, yOffset);
  makeText(toyID,  mapItems, xOffset, yOffset, textXOffset);

  // Change the background color of each of those states to orange
  getSVG(toyID).selectAll("rect")
      .data( selectedItems, function(d) { return d.state; })
      .style("fill", "orange");
};


function makeRectangles(toyID, mapItems, xOffset, yOffset)  {
    // Insert a rectangle for each state
    getSVG(toyID).selectAll("rect")
      .data(mapItems)
      .enter()
      .append("rect")
        .attr("x", function(d,i)  { return d.col * Width +  xOffset;})
        .attr("y", function(d,i) {return d.row * Height + yOffset;})
        .attr("width", CellSize)
        .attr("height", CellSize)
        .style("fill", "DarkRed");
};


function makeText(toyID, mapItems, xOffset, yOffset, textXOffset)  {
  // Put the name of each state on its rectangle
  getSVG(toyID).selectAll("text")
    .data(mapItems)
    .enter()
    .append("text")
      .attr("x", function(d,i)  { return d.col * Width + textXOffset + xOffset;})
      .attr("y", function(d,i) {return d.row *  Height +  26 + yOffset})
      .text(function (d) { return d.state; })
      .style("font",   "16px sans-serif")
      .style("fill", "White")
      .style("pointer-events", "none");    // If you put the mouse over one of the states, this prevents it from treating it like text (reword)
};



function getSelectedStates() {
  return  [ {"state": "OR"},  {"state": "MA"} ];
};

function getStates() {
  return [
    { "state": "ME", "row": 0, "col": 10 },
    { "state": "WI", "row": 1, "col": 5 },
    { "state": "VT", "row": 1, "col": 9 },
    { "state": "NH", "row": 1, "col": 10 },
    { "state": "WA", "row": 2, "col": 0 },
    { "state": "ID", "row": 2, "col": 1 },
    { "state": "MT", "row": 2, "col": 2 },
    { "state": "ND", "row": 2, "col": 3 },
    { "state": "MN", "row": 2, "col": 4 },
    { "state": "IL", "row": 2, "col": 5 },
    { "state": "MI", "row": 2, "col": 6 },
    { "state": "NY", "row": 2, "col": 8 },
    { "state": "MA", "row": 2, "col": 9 },
    { "state": "OR", "row": 3, "col": 0 },
    { "state": "NV", "row": 3, "col": 1 },
    { "state": "WY", "row": 3, "col": 2 },
    { "state": "SD", "row": 3, "col": 3 },
    { "state": "IA", "row": 3, "col": 4 },
    { "state": "IN", "row": 3, "col": 5 },
    { "state": "OH", "row": 3, "col": 6 },
    { "state": "PA", "row": 3, "col": 7 },
    { "state": "NJ", "row": 3, "col": 8 },
    { "state": "CT", "row": 3, "col": 9 },
    { "state": "RI", "row": 3, "col": 10 },
    { "state": "CA", "row": 4, "col": 0 },
    { "state": "UT", "row": 4, "col": 1 },
    { "state": "CO", "row": 4, "col": 2 },
    { "state": "NE", "row": 4, "col": 3 },
    { "state": "MO", "row": 4, "col": 4 },
    { "state": "KY", "row": 4, "col": 5 },
    { "state": "WV", "row": 4, "col": 6 },
    { "state": "VA", "row": 4, "col": 7 },
    { "state": "MD", "row": 4, "col": 8 },
    { "state": "DE", "row": 4, "col": 9 },
    { "state": "AZ", "row": 5, "col": 1 },
    { "state": "NM", "row": 5, "col": 2 },
    { "state": "KS", "row": 5, "col": 3 },
    { "state": "AR", "row": 5, "col": 4 },
    { "state": "TN", "row": 5, "col": 5 },
    { "state": "NC", "row": 5, "col": 6 },
    { "state": "SC", "row": 5, "col": 7 },
    { "state": "OK", "row": 6, "col": 3 },
    { "state": "LA", "row": 6, "col": 4 },
    { "state": "MS", "row": 6, "col": 5 },
    { "state": "AL", "row": 6, "col": 6 },
    { "state": "GA", "row": 6, "col": 7 },
    { "state": "HI", "row": 7, "col": 0 },
    { "state": "AK", "row": 7, "col": 1 },
    { "state": "TX", "row": 7, "col": 3 },
    { "state": "FL", "row": 7, "col": 8 }
  ];
};
