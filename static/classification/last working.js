// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_temp = d3.select("#data_graphs")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//SVG for humidity graph
var svg_humid = d3.select("#data_graphs")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//SVG for humidity graph
var svg_rainfall = d3.select("#data_graphs")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var color = d3.scaleLinear()
            .domain(["No", "Yes"])
            .range(["red", "green"]);


var svg_outcome = d3.select("#data_graphs")
                      .append("svg")
                      .attr("id", "outcomes")
                      .attr("width",width + margin.left + margin.right)
                      .attr("height",height + margin.top + margin.bottom);
                      
svg_outcome.append("text")
                      .text("Rain Today")
                      .attr("transform",
                              "translate(" + margin.left + "," + (margin.top+100) + ")");
var rects = svg_outcome.append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + (margin.top+110) + ")")
rects.append("rect")
            .attr("id", "rain_today")
            .attr("width", 50 )
            .attr("height", 25)
            .attr("fill", "lightgrey");
svg_outcome.append("text")
                      .text("Rain Tomorrow")
                      .attr("transform",
                              "translate(" + margin.left + "," + (margin.top+155) + ")");
rects.append("rect")
            .attr("id", "rain_tom")
            .attr("width", 50 )
            .attr("height", 25)
            .attr("fill", "lightgrey")
            .attr("transform", "translate(0, 50)");                      



// Tooltip Divs
var ttip = d3.select("div#data_graphs")
                .append("div")
                .attr("class", "tooltip2")
                .style("opacity", 0);
//Read the data
d3.csv("/classification/rain_no_rain/viz_data",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rainfall : d.Rainfall, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow}
  },

  // Now I can use this dataset:
  function(data) {
    // Temp graph
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    xAxis = svg_temp.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([-6,d3.max(data, function(d) { return +d.MaxTemp; })])
      .range([ height, 0 ]);
    yAxis = svg_temp.append("g")
      .call(d3.axisLeft(y));

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg_temp.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);
    

    // Humid Graph
    // Add X axis --> it is a date format
    var x_humid = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    xAxis_humid = svg_humid.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x_humid));
         // Add Y axis
    var y_humid = d3.scaleLinear()
      .domain([0,100])
      .range([ height, 0 ]);
    yAxis_humid = svg_humid.append("g")
      .call(d3.axisLeft(y_humid));
        // Add a clipPath: everything out of this area won't be drawn.
    var clip_humid = svg_humid.append("defs").append("svg:clipPath")
        .attr("id", "clip_humid")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    // Rainfall Graph
    // Add X axis --> it is a date format
    var x_rainfall = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    xAxis_rainfall = svg_rainfall.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x_rainfall));
         // Add Y axis
    var y_rainfall = d3.scaleLinear()
      .domain([0,50])
      .range([ height, 0 ]);
    yAxis_rainfall = svg_rainfall.append("g")
      .call(d3.axisLeft(y_rainfall));
        // Add a clipPath: everything out of this area won't be drawn.
    var clip_rainfall = svg_rainfall.append("defs").append("svg:clipPath")
        .attr("id", "clip_rainfall")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    // Temp Graph
    // Add brushing
    var brush = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart_temp)         // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the line variable: where both the line and the brush take place
    var line = svg_temp.append('g')
      .attr("clip-path", "url(#clip)")


    // Add the line
    line.append("path")
      .datum(data)
      .attr("class", "line")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1)
      .transition()
      .duration(3000)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.MinTemp) })
        )

    line.append("path")
      .datum(data)
      .attr("class", "line1")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.MaxTemp) })
        )

    // Add the brushing
    line
      .append("g")
        .attr("class", "brush")
        .call(brush);
    // Temp Graph X Axis label
    svg_temp.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Date");

    // Temp Graph Y Axis label
  svg_temp.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Temperature"); 
    // Humidity Graph

     // Add brushing
    var brush_humid = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart_humid)           // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the line variable: where both the line and the brush take place
    var line_humid = svg_humid.append('g')
      .attr("clip-path", "url(#clip_humid)")

         // Add the line
    line_humid.append("path")
      .datum(data)
      .attr("class", "line2")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) { return x_humid(d.date) })
        .y(function(d) { return y_humid(d.Humidity9am) })
        )
    line_humid.append("path")
      .datum(data)
      .attr("class", "line3")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) { return x_humid(d.date) })
        .y(function(d) { return y_humid(d.Humidity3pm) })
        )
    // Add the brushing
    line_humid
      .append("g")
        .attr("class", "brush")
        .call(brush_humid);

    // Humidity Graph X Axis label
    svg_humid.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Date");

    // Humidity Graph Y Axis label
  svg_humid.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Humidity"); 

    // Rainfall Graph

    var area = d3.area()
    //.curve(d3.curveMonotoneX)
    .x(function(d) { return x_rainfall(d.date); })
    .y0(height)
    .y1(function(d) { return y_rainfall(d.Rainfall); });

     // Add brushing
    var brush_rainfall = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart_rainfall)           // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the line variable: where both the line and the brush take place
    var line_rainfall = svg_rainfall.append('g')
      .attr("clip-path", "url(#clip_rainfall)")

         // Add the line
    line_rainfall.append("path")
      .datum(data)
      .attr("class", "line4")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) { return x_humid(d.date) })
        .y(function(d) { return y_rainfall(d.Rainfall) })
        )
        //Add area
    line_rainfall.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area)
      .attr("fill", "steelblue");

    // Add the brushing
    line_rainfall
      .append("g")
        .attr("class", "brush")
        .call(brush_rainfall);

    // Rainfall Graph X Axis label
    svg_rainfall.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Date");

    // Rainfall Graph Y Axis label
  svg_rainfall.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Rainfall(mm)"); 
    // A function that set idleTimeOut to null
    var idleTimeout
    function idled() { idleTimeout = null; }

    // If user double click, reinitialize the chart
        function updateChart_temp() {

      // What are the selected boundaries?
      extent = d3.event.selection
      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x.domain([ 4,8])
        x_humid.domain([ 4,8])
        x_rainfall.domain([4,8])
      }else{
        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
        x_humid.domain([ x_humid.invert(extent[0]), x_humid.invert(extent[1]) ])
        x_rainfall.domain([ x_rainfall.invert(extent[0]), x_rainfall.invert(extent[1]) ])
        line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }  

        xAxis.transition().duration(1000).call(d3.axisBottom(x))
      line
          .select('.line')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MinTemp) })
          )
      line
          .select('.line1')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MaxTemp) })
          ) 
          xAxis_humid.transition().duration(1000).call(d3.axisBottom(x_humid))
      line_humid
          .select('.line2')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity9am) })
          )
      line_humid
          .select('.line3')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity3pm) })
          )
                xAxis_rainfall.transition().duration(1000).call(d3.axisBottom(x_rainfall))
        line_rainfall
          .select('.line4')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_rainfall(d.date) })
            .y(function(d) { return y_rainfall(d.Rainfall) })
          )
          line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area)

    }

    function updateChart_humid() {

      // What are the selected boundaries?
      extent = d3.event.selection
      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x_humid.domain([ 4,8])
        x.domain([ 4,8])
        x_rainfall.domain([4,8])
      }else{
        x_humid.domain([ x_humid.invert(extent[0]), x_humid.invert(extent[1]) ])
         x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
         x_rainfall.domain([ x_rainfall.invert(extent[0]), x_rainfall.invert(extent[1]) ])
        line_humid.select(".brush").call(brush_humid.move, null)
        // This remove the grey brush area as soon as the selection has been done
      }  

     xAxis.transition().duration(1000).call(d3.axisBottom(x))
      line
          .select('.line')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MinTemp) })
          )
      line
          .select('.line1')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MaxTemp) })
          )
        xAxis_humid.transition().duration(1000).call(d3.axisBottom(x_humid))
      line_humid
          .select('.line2')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity9am) })
          )
      line_humid
          .select('.line3')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity3pm) })
          ) 
            xAxis_rainfall.transition().duration(1000).call(d3.axisBottom(x_rainfall))
        line_rainfall
          .select('.line4')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_rainfall(d.date) })
            .y(function(d) { return y_rainfall(d.Rainfall) })
          )
          line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area) 
    }
    function updateChart_rainfall() {

      // What are the selected boundaries?
      extent = d3.event.selection
      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x_humid.domain([ 4,8])
        x.domain([ 4,8])
        x_rainfall.domain([4,8])
      }else{
        x_humid.domain([ x_humid.invert(extent[0]), x_humid.invert(extent[1]) ])
        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
        x_rainfall.domain([ x_rainfall.invert(extent[0]), x_rainfall.invert(extent[1]) ])
        line_rainfall.select(".brush").call(brush_rainfall.move, null)
        // This remove the grey brush area as soon as the selection has been done
      }  

     xAxis.transition().duration(1000).call(d3.axisBottom(x))
      line
          .select('.line')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MinTemp) })
          )
      line
          .select('.line1')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MaxTemp) })
          )
        xAxis_humid.transition().duration(1000).call(d3.axisBottom(x_humid))
      line_humid
          .select('.line2')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity9am) })
          )
      line_humid
          .select('.line3')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity3pm) })
          ) 

        xAxis_rainfall.transition().duration(1000).call(d3.axisBottom(x_rainfall))
        line_rainfall
          .select('.line4')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_rainfall(d.date) })
            .y(function(d) { return y_rainfall(d.Rainfall) })
          ) 
          line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area)
    }

// If user double click, reinitialize the chart
svg_temp.on("dblclick",function(){
    x.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis.transition().call(d3.axisBottom(x))
    x_humid.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis_humid.transition().call(d3.axisBottom(x_humid))
    x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))
    line
        .select('.line')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MinTemp) })
      )
    line
        .select('.line1')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MaxTemp) })
      )
    line_humid
        .select('.line2')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity9am) })
      )
    line_humid
        .select('.line3')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity3pm) })
      )
    line_rainfall
        .select('.line4')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_rainfall(d.date) })
          .y(function(d) { return y_rainfall(d.Rainfall) })
      )
        line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area)
    });

svg_humid.on("dblclick",function(){
    x.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis.transition().call(d3.axisBottom(x))
    x_humid.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis_humid.transition().call(d3.axisBottom(x_humid))
    x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))
    line
        .select('.line')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MinTemp) })
      )
    line
        .select('.line1')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MaxTemp) })
      )
    line_humid
        .select('.line2')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity9am) })
      )
    line_humid
        .select('.line3')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity3pm) })
      )
    line_rainfall
        .select('.line4')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_rainfall(d.date) })
          .y(function(d) { return y_rainfall(d.Rainfall) })
      )
        line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area)
    });


    svg_rainfall.on("dblclick",function(){
      x.domain(d3.extent(data, function(d) { return d.date; }))
      xAxis.transition().call(d3.axisBottom(x))
      x_humid.domain(d3.extent(data, function(d) { return d.date; }))
      xAxis_humid.transition().call(d3.axisBottom(x_humid))
      x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
      xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))
      line
        .select('.line')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MinTemp) })
      )
    line
        .select('.line1')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MaxTemp) })
      )
    line_humid
        .select('.line2')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity9am) })
      )
    line_humid
        .select('.line3')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity3pm) })
      )
    line_rainfall
        .select('.line4')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_rainfall(d.date) })
          .y(function(d) { return y_rainfall(d.Rainfall) })
      )
        line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area)
    });

})

///////////////////////////////////////////////////////////////////////////

// append the svg object to the body of the page
var svg_temp_pred = d3.select("#prediction_graphs")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//SVG for humidity graph
var svg_humid_pred = d3.select("#prediction_graphs")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//SVG for humidity graph
var svg_rainfall_pred = d3.select("#prediction_graphs")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Tooltip Divs
var ttip = d3.select("div#data_graphs")
                .append("div")
                .attr("class", "tooltip2")
                .style("opacity", 0);
//Read the data
d3.csv("/classification/rain_no_rain/viz_data",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rainfall : d.Rainfall, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow}
  },

  // Now I can use this dataset:
  function(data) {
    // Temp graph
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    xAxis_pred = svg_temp_pred.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([-6,d3.max(data, function(d) { return +d.MaxTemp; })])
      .range([ height, 0 ]);
    yAxis = svg_temp_pred.append("g")
      .call(d3.axisLeft(y));

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg_temp_pred.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);
    

    // Humid Graph
    // Add X axis --> it is a date format
    var x_humid = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    xAxis_humid_pred = svg_humid_pred.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x_humid));
         // Add Y axis
    var y_humid = d3.scaleLinear()
      .domain([0,100])
      .range([ height, 0 ]);
    yAxis_humid = svg_humid_pred.append("g")
      .call(d3.axisLeft(y_humid));
        // Add a clipPath: everything out of this area won't be drawn.
    var clip_humid = svg_humid_pred.append("defs").append("svg:clipPath")
        .attr("id", "clip_humid")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    // Rainfall Graph
    // Add X axis --> it is a date format
    var x_rainfall = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    xAxis_rainfall_pred = svg_rainfall_pred.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x_rainfall));
         // Add Y axis
    var y_rainfall = d3.scaleLinear()
      .domain([0,50])
      .range([ height, 0 ]);
    yAxis_rainfall = svg_rainfall_pred.append("g")
      .call(d3.axisLeft(y_rainfall));
        // Add a clipPath: everything out of this area won't be drawn.
    var clip_rainfall = svg_rainfall_pred.append("defs").append("svg:clipPath")
        .attr("id", "clip_rainfall")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    // Temp Graph
    // Add brushing
    var brush = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart_temp)         // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the line variable: where both the line and the brush take place
    var line = svg_temp_pred.append('g')
      .attr("clip-path", "url(#clip)")


    // Add the line
    line.append("path")
      .datum(data)
      .attr("class", "line")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.MinTemp) })
        )
    line.append("path")
      .datum(data)
      .attr("class", "line1")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.MaxTemp) })
        )

    // Add the brushing
    line
      .append("g")
        .attr("class", "brush")
        .call(brush);
    // Temp Graph X Axis label
    svg_temp_pred.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Date");

    // Temp Graph Y Axis label
  svg_temp_pred.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Temperature"); 
    // Humidity Graph

     // Add brushing
    var brush_humid = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart_humid)           // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the line variable: where both the line and the brush take place
    var line_humid = svg_humid_pred.append('g')
      .attr("clip-path", "url(#clip_humid)")

         // Add the line
    line_humid.append("path")
      .datum(data)
      .attr("class", "line2")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) { return x_humid(d.date) })
        .y(function(d) { return y_humid(d.Humidity9am) })
        )
    line_humid.append("path")
      .datum(data)
      .attr("class", "line3")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) { return x_humid(d.date) })
        .y(function(d) { return y_humid(d.Humidity3pm) })
        )
    // Add the brushing
    line_humid
      .append("g")
        .attr("class", "brush")
        .call(brush_humid);

    // Humidity Graph X Axis label
    svg_humid_pred.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Date");

    // Humidity Graph Y Axis label
  svg_humid_pred.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Humidity"); 

    // Rainfall Graph

    var area = d3.area()
    //.curve(d3.curveMonotoneX)
    .x(function(d) { return x_rainfall(d.date); })
    .y0(height)
    .y1(function(d) { return y_rainfall(d.Rainfall); });

     // Add brushing
    var brush_rainfall = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart_rainfall)           // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the line variable: where both the line and the brush take place
    var line_rainfall = svg_rainfall_pred.append('g')
      .attr("clip-path", "url(#clip_rainfall)")

         // Add the line
    line_rainfall.append("path")
      .datum(data)
      .attr("class", "line4")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) { return x_humid(d.date) })
        .y(function(d) { return y_rainfall(d.Rainfall) })
        )
        //Add area
    line_rainfall.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area)
      .attr("fill", "steelblue");

    // Add the brushing
    line_rainfall
      .append("g")
        .attr("class", "brush")
        .call(brush_rainfall);

    // Rainfall Graph X Axis label
    svg_rainfall_pred.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Date");

    // Rainfall Graph Y Axis label
  svg_rainfall_pred.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Rainfall(mm)"); 
    // A function that set idleTimeOut to null
    var idleTimeout
    function idled() { idleTimeout = null; }

    // If user double click, reinitialize the chart
        function updateChart_temp() {

      // What are the selected boundaries?
      extent = d3.event.selection
      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x.domain([ 4,8])
        x_humid.domain([ 4,8])
        x_rainfall.domain([4,8])
      }else{
        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
        x_humid.domain([ x_humid.invert(extent[0]), x_humid.invert(extent[1]) ])
        x_rainfall.domain([ x_rainfall.invert(extent[0]), x_rainfall.invert(extent[1]) ])
        line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }  

        xAxis_pred.transition().duration(1000).call(d3.axisBottom(x))
      line
          .select('.line')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MinTemp) })
          )
      line
          .select('.line1')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MaxTemp) })
          ) 
          xAxis_humid_pred.transition().duration(1000).call(d3.axisBottom(x_humid))
      line_humid
          .select('.line2')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity9am) })
          )
      line_humid
          .select('.line3')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity3pm) })
          )
                xAxis_rainfall_pred.transition().duration(1000).call(d3.axisBottom(x_rainfall))
        line_rainfall
          .select('.line4')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_rainfall(d.date) })
            .y(function(d) { return y_rainfall(d.Rainfall) })
          )
          line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area)

    }

    function updateChart_humid() {

      // What are the selected boundaries?
      extent = d3.event.selection
      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x_humid.domain([ 4,8])
        x.domain([ 4,8])
        x_rainfall.domain([4,8])
      }else{
        x_humid.domain([ x_humid.invert(extent[0]), x_humid.invert(extent[1]) ])
         x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
         x_rainfall.domain([ x_rainfall.invert(extent[0]), x_rainfall.invert(extent[1]) ])
        line_humid.select(".brush").call(brush_humid.move, null)
        // This remove the grey brush area as soon as the selection has been done
      }  

     xAxis_pred.transition().duration(1000).call(d3.axisBottom(x))
      line
          .select('.line')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MinTemp) })
          )
      line
          .select('.line1')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MaxTemp) })
          )
        xAxis_humid_pred.transition().duration(1000).call(d3.axisBottom(x_humid))
      line_humid
          .select('.line2')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity9am) })
          )
      line_humid
          .select('.line3')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity3pm) })
          ) 
            xAxis_rainfall_pred.transition().duration(1000).call(d3.axisBottom(x_rainfall))
        line_rainfall
          .select('.line4')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_rainfall(d.date) })
            .y(function(d) { return y_rainfall(d.Rainfall) })
          )
          line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area) 
    }
    function updateChart_rainfall() {

      // What are the selected boundaries?
      extent = d3.event.selection
      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x_humid.domain([ 4,8])
        x.domain([ 4,8])
        x_rainfall.domain([4,8])
      }else{
        x_humid.domain([ x_humid.invert(extent[0]), x_humid.invert(extent[1]) ])
        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
        x_rainfall.domain([ x_rainfall.invert(extent[0]), x_rainfall.invert(extent[1]) ])
        line_rainfall.select(".brush").call(brush_rainfall.move, null)
        // This remove the grey brush area as soon as the selection has been done
      }  

     xAxis_pred.transition().duration(1000).call(d3.axisBottom(x))
      line
          .select('.line')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MinTemp) })
          )
      line
          .select('.line1')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.MaxTemp) })
          )
        xAxis_humid_pred.transition().duration(1000).call(d3.axisBottom(x_humid))
      line_humid
          .select('.line2')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity9am) })
          )
      line_humid
          .select('.line3')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_humid(d.date) })
            .y(function(d) { return y_humid(d.Humidity3pm) })
          ) 

        xAxis_rainfall_pred.transition().duration(1000).call(d3.axisBottom(x_rainfall))
        line_rainfall
          .select('.line4')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x_rainfall(d.date) })
            .y(function(d) { return y_rainfall(d.Rainfall) })
          ) 
          line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area)
    }

// If user double click, reinitialize the chart
svg_temp_pred.on("dblclick",function(){
    x.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis_pred.transition().call(d3.axisBottom(x))
    x_humid.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis_humid_pred.transition().call(d3.axisBottom(x_humid))
    x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis_rainfall_pred.transition().call(d3.axisBottom(x_rainfall))
    line
        .select('.line')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MinTemp) })
      )
    line
        .select('.line1')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MaxTemp) })
      )
    line_humid
        .select('.line2')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity9am) })
      )
    line_humid
        .select('.line3')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity3pm) })
      )
    line_rainfall
        .select('.line4')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_rainfall(d.date) })
          .y(function(d) { return y_rainfall(d.Rainfall) })
      )
        line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area)
    });

svg_humid_pred.on("dblclick",function(){
    x.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis_pred.transition().call(d3.axisBottom(x))
    x_humid.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis_humid_pred.transition().call(d3.axisBottom(x_humid))
    x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
    xAxis_rainfall_pred.transition().call(d3.axisBottom(x_rainfall))
    line
        .select('.line')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MinTemp) })
      )
    line
        .select('.line1')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MaxTemp) })
      )
    line_humid
        .select('.line2')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity9am) })
      )
    line_humid
        .select('.line3')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity3pm) })
      )
    line_rainfall
        .select('.line4')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_rainfall(d.date) })
          .y(function(d) { return y_rainfall(d.Rainfall) })
      )
        line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area)
    });


    svg_rainfall_pred.on("dblclick",function(){
      x.domain(d3.extent(data, function(d) { return d.date; }))
      xAxis_pred.transition().call(d3.axisBottom(x))
      x_humid.domain(d3.extent(data, function(d) { return d.date; }))
      xAxis_humid_pred.transition().call(d3.axisBottom(x_humid))
      x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
      xAxis_rainfall_pred.transition().call(d3.axisBottom(x_rainfall))
      line
        .select('.line')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MinTemp) })
      )
    line
        .select('.line1')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.MaxTemp) })
      )
    line_humid
        .select('.line2')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity9am) })
      )
    line_humid
        .select('.line3')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_humid(d.date) })
          .y(function(d) { return y_humid(d.Humidity3pm) })
      )
    line_rainfall
        .select('.line4')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x_rainfall(d.date) })
          .y(function(d) { return y_rainfall(d.Rainfall) })
      )
        line_rainfall
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", area)
    });

})
