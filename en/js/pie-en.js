var choosePie;
d3.csv("/data/pie-en.csv").then(function(data){

  var pieData = {};

  data.forEach(function(d){
    var vote = "vote"+d.case;
    pieData[vote] = [];
    var n = 0;
    for (var property in d) {
      if (property !== "case" && n < 4) {
        var tmp={
          label: property,
          count: parseInt(d[property].replace(/,/g, ""))
        };
        pieData[vote].push(tmp);
        n++;
      } 
    }
  });

// define data
var dataset = pieData.vote7

// chart dimensions
var width = parseInt($('#chart').width());
var height = 300;

// chart colors
var colors = ["#fc00f6", "#e7f94d", "#f2f5f4", "#423c3e", "#e7f94d", "#fb5ed3","#f51fb3","#cc0699","#960677","#630551"];

// a circle chart needs a radius
var radius = Math.min(width, height) / 2;

// pie_legend dimensions
var pie_legendRectSize = 25; // defines the size of the colored squares in pie_legend
var pie_legendSpacing = 6; // defines spacing between squares

// define color scale
var color = d3.scaleOrdinal().range(colors);;
// more color scales: https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9

var svg = d3.select('#chart') // select element in the DOM with id 'chart'
  .append('svg') // append an svg element to the element we've selected
  .attr('width', width) // set the width of the svg element we just added
  .attr('height', height) // set the height of the svg element we just added
  .append('g') // append 'g' element to the svg element
  .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')'); // our reference is now to the 'g' element. centerting the 'g' element to the svg element

  var arc = d3.arc()
  .innerRadius(40) // none for pie chart
  .outerRadius(radius); // size of overall chart

var pie = d3.pie() // start and end angles of the segments
  .value(function(d) { return d.count; }) // how to extract the numerical data from each entry in our dataset
  .sort(null); // by default, data sorts in oescending value. this will mess with our animation so we set it to null

var formatComma = d3.format(",");
// define pie_tooltip
var pie_tooltip = d3.select('#chart') // select element in the DOM with id 'chart'
  .append('div') // append a div element to the element we've selected                                    
  .attr('class', 'pie_tooltip'); // add class 'pie_tooltip' on the divs we just selected

pie_tooltip.append('div') // add divs to the pie_tooltip defined above                            
  .attr('class', 'label'); // add class 'label' on the selection                         

pie_tooltip.append('div') // add divs to the pie_tooltip defined above                     
  .attr('class', 'count'); // add class 'count' on the selection                  

pie_tooltip.append('div') // add divs to the pie_tooltip defined above  
  .attr('class', 'percent'); // add class 'percent' on the selection

// Confused? see below:

// <div id="chart">
//   <div class="pie_tooltip">
//     <div class="label">
//     </div>
//     <div class="count">
//     </div>
//     <div class="percent">
//     </div>
//   </div>
// </div>

dataset.forEach(function(d) {
  d.count = +d.count; // calculate count as we iterate through the data
  d.enabled = true; // add enabled property to track which entries are checked
});

// creating the chart
var path = svg.selectAll('path') // select all path elements inside the svg. specifically the 'g' element. they don't exist yet but they will be created below
  .data(pie(dataset)) //associate dataset wit he path elements we're about to create. must pass through the pie function. it magically knows how to extract values and bakes it into the pie
  .enter() //creates placeholder nodes for each of the values
  .append('path') // replace placeholders with path elements
  .attr('d', arc) // define d attribute with arc function above
  .attr('fill', function(d) { return color(d.data.label); }) // use color scale to define fill of each label in dataset
  .each(function(d) { this._current - d; }); // creates a smooth animation for each track

// mouse event handlers are attached to path so they need to come after its definition
path.on('mouseover', function(d) {  // when mouse enters div      
 var total = d3.sum(dataset.map(function(d) { // calculate the total number of tickets in the dataset         
  return (d.enabled) ? d.count : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase                                      
}));                                     

 var percent = Math.round(1000 * d.data.count / total) / 10; // calculate percent
 pie_tooltip.select('.label').html(d.data.label); // set current label           
 pie_tooltip.select('.count').html(formatComma(d.data.count)+'votes'); // set current count            
 pie_tooltip.select('.percent').html(percent + '%'); // set percent calculated above          
 pie_tooltip.style('display', 'block'); // set display                     
});                                                           

path.on('mouseout', function() { // when mouse leaves div                        
  pie_tooltip.style('display', 'none'); // hide pie_tooltip for that element
});

path.on('mousemove', function(d) { // when mouse moves                  
  pie_tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
    .style('left', (d3.event.layerX) + 'px'); // always 10px to the right of the mouse
  });

choosePie = function choosePie(vote_num) {
  dataset = pieData["vote"+vote_num];
  dataset.forEach(function(d) {
  d.count = +d.count; // calculate count as we iterate through the data
  d.enabled = true; // add enabled property to track which entries are checked
});
  path = path.data(pie(dataset)); // compute the new angles
  path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}


}) // end of d3.csv