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

// var makeJSONInputFields = function (toyID, nodes, depth)  {
//   // console.log(nodes.name, depth * 30);
//   quantity = nodes.quantity ? nodes.quantity : 0;
//   var div = getForm(toyID).append("div")
//     .attr("class", depth)        // Use class to store the node depth, so we can rebuild the hierarchy when we do the update
//     .style("margin-left", depth * 25);
//   div.append("input")
//     .attr("class", depth)        // Use class to store the node depth, so we can rebuild the hierarchy when we do the update
//     .attr("value", nodes.name)
//     .attr("type", "text")
//     .attr("name", nodes.name);
//   if (quantity) {
//     div.append("input")
//       .attr("value", quantity)
//       .attr("type", "text")
//       .attr("name", nodes.name + "-quantity");
//   };
//   if (nodes.children)  {
//     nodes.children.forEach( function(child) {
//       makeJSONInputFields(toyID, child, depth + 1)
//     } );
//   };
// };



var makeJSONInputFields = function (myDiv, nodes, depth)  {
  // console.log(nodes.name, depth * 30);
  id = depth;

  if (depth>2) {
    return 1;
  };
  newDiv = myDiv.append("div");
  newDiv
    .style("margin-left", 25)
    .attr("id", nodes.name);
  newDiv.append("input").attr("type", "text")
    .attr("name", nodes.name)
    .attr("value", nodes.name)
    .attr("class", "input_name");
  if (nodes.children) {
    nodes.children.forEach( function(child) {
      newDiv.append("b")
        .attr("id", child.name);
      makeJSONInputFields(newDiv, child, depth + 1)
    } );
  } else {
    newDiv.append("input").attr("type", "text")
      .attr("name", nodes.name + "-quantity")
      .attr("value", nodes.quantity)
      .attr("class", "input_value");
  };
};

function createJSONInputFields(toyID, nodes, updateFunctionName)  {
  // createJSONInputFields: uses makeJSONInputFields to create input fields
  //  for modifying JSON, then adds an update button
  var myForm = getForm(toyID);
  makeJSONInputFields(myForm, nodes, 1);
  myForm.append("input").attr("type", "button")
    .attr("value", "Update It")
    .attr("onClick", updateFunctionName + "('" + toyID + "')"  );
};


function createInputFieldsfromJSON(toyID, nodes, updateFunctionName)  {
  // createInputFieldsfromJSON:
  var myForm = getForm(toyID);

  // Flatten the data into an array, so I know each node's parent, child, etc.
  var tree = d3.layout.tree().size([960, 2000]);    // NOTE: height and width here is arbitrary since I am not creating an SVG graphic
  var nodes = tree.nodes(nodes);

  // Now create the div's for each node
  var inputFields = myForm.selectAll("div")
        .data(nodes)
        .enter().append("div")
          .style("margin-left", function(d,i) { return d.depth * 25})
          .style("margin-top", function(d,i) { return d.children ? 10 : 2})
          .attr("id", function(d,i) { return d.name})
          .append("input").attr("type", "text")
            .attr("name", function(d,i) { return d.name})
            .attr("value", function(d,i) { return d.name})
            .attr("node_parent", function(d,i) { return d.parent ? d.parent.name : "" ; })
            .style("margin-right", 5)
            .attr("class", "input_name");

  myForm.selectAll("div").filter( function(d) {return d.quantity})
    .append("input").attr("type", "text")
      .attr("name", function(d,i) { return d.name + '-quantity'})
      .attr("value", function(d,i) { return d.quantity;})
      .attr("class", "input_quantity");

  myForm.append("input").attr("type", "button")
    .attr("value", "Update It")
    .attr("onClick", updateFunctionName + "('" + toyID + "')"  );
};


function createJSONFromInputFields(toyID, oldJSON)  {
  var toyForm = getForm(toyID);

  var nodeById = {};
  toyForm.selectAll("div")
    .each( function(d,i)  {
      nameField = d3.select(this).select(".input_name")[0][0];
      inputName = nameField.value;
      parentID = nameField.getAttribute("node_parent");
      quantityField = d3.select(this).select(".input_quantity")[0][0];
      if (quantityField)  nodeById[inputName] = {name: inputName, quantity: quantityField.value}
      else                nodeById[inputName] = {name: inputName};
      if (parentID) {
        nodeParent = nodeById[parentID];
        if (nodeParent.children) nodeParent.children.push(nodeById[inputName])
        else nodeParent.children = [nodeById[inputName]];
      };
    });
  return nodeById['produce'];
};

function showJSON(nodes, idToPutAfter)  {
  // showJSON: Dump the JSON out in a nested format, so I can easily read it
  var tree = d3.layout.tree().size([960, 2000]);    // NOTE: height and width here is arbitrary since I am not creating an SVG graphic
  var nodes = tree.nodes(nodes);
  d3.select('#' + idToPutAfter).selectAll("div")
        .data(nodes)
        .enter().append("div")
          .style("margin-left", function(d,i) { return d.depth * 25})
          .text( function(d,i) {
            quantity = d.quantity ? ": " + d.quantity : "";
            return d.name + quantity;
          })
};
