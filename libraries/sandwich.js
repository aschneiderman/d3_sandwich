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


function getFormInputValues(toyID)  {
  // getInputValues: read and all of the input values other than the button that's at the end of the form
    return getForm(toyID)
      .selectAll("input")[0]    //  comes back as an array within an array, so drop the outer array
      .slice(0,-1)     // drop the button that's at the end of the form;  switch to using a filter?
};

function updateStyles(toyID)  {
  // updateStyles: read the values the user put in the toy's form
  //  and then use them to update the toy's styles and the toy's pre code
    var toySVG = getSVG(toyID);
    getFormInputValues(toyID)
      .forEach(function(d, i) {                     // Loop through each input field
          updateCode(toyID, d.name, d.value);       // Update the pre code
          styleSelector  = StyleInfo[d.name][0];    // Read from the StyleInfo object
          styleProperty = StyleInfo[d.name][1];         //    the style's sector and its property
          toySVG.selectAll(styleSelector)
            .style(styleProperty, d.value);         // Update the style of every element with that selector
      });
};

function updateValues(toyID)  {
  // updateValues: read the values the user put in the toy's form
  //  and then use them to update the toy and the toy's pre code
    var values = {};
    getFormInputValues(toyID)
      .forEach(function(d, i) {
          values[d.name] = d.value;
          updateCode(toyID, d.name, d.value);
      });
    UpdateFunction[toyID](values);
};



var makeJSONInputFields = function (toyID, nodes, depth)  {
  // console.log(nodes.name, depth * 30);
  quantity = nodes.quantity ? nodes.quantity : 0;
  var div = getForm(toyID).append("div")
      .style("margin-left", depth * 25);
  div.append("input")
      .attr("value", nodes.name)
      .attr("type", "text")
      .attr("name", nodes.name)
      .attr("class", depth);        // Use class to store the node depth, so we can rebuild the hierarchy when we do the update
  if (quantity) {
    div.append("input")
      .attr("value", quantity)
      .attr("type", "text")
      .attr("name", nodes.name + "-quantity");
  };
  if (nodes.children)  {
    nodes.children.forEach( function(child) {
      makeJSONInputFields(toyID, child, depth + 1)
    } );
  };
};

function createJSONInputFields(toyID, nodes, updateFunctionName)  {
  // createJSONInputFields: uses makeJSONInputFields to create input fields
  //  for modifying JSON, then adds an update button
  makeJSONInputFields(toyID, nodes, 1);
  getForm(toyID).append("input")
    .attr("type", "button")
    .attr("value", "Update It")
    .attr("onClick", updateFunctionName + "('" + toyID + "')"  );
};
