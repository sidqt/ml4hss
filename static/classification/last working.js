
(function(){
  // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        margin2 = {top: 5, right: 30, bottom: 30, left: 60},
        width = 520 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        height2 = 75 - margin2.top - margin.bottom;


    var parseTime = d3.timeParse("%d/%m/%Y");
    var formatTime = d3.timeFormat("%d/%m/%Y");
    var bisectDate = d3.bisector(function(d) { return d.date; }).left;

  //SVG for Temperature graph
    d3.select("#class_rain_temp")
      .append("text")
      .text("Minimum and Maximum Temperature - 2018")

    var svg_temp = d3.select("#class_rain_temp")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
             "translate(" + margin.left + "," + margin.top + ")");

  //SVG for humidity graph

    d3.select("#class_rain_humidity")
      .append("text")
      .text("Humidity at 9AM and 3PM each day")

    var svg_humid = d3.select("#class_rain_humidity")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

  //SVG for rainfall graph

    d3.select("#class_rain_rainfall")
      .append("text")
      .text("Rainfall Measure when it Rained")

    var svg_rainfall = d3.select("#class_rain_rainfall")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

  //SVG for mini Temperature graph
  
    var svg_temp_mini = d3.select("#class_rain_temp_mini")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
        .attr("transform",
             "translate(" + margin.left + "," + margin2.top + ")");

  //SVG for mini humidity graph
  
    var svg_humid_mini = d3.select("#class_rain_humidity_mini")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin2.top + ")");

  //SVG for mini rainfall graph
  
    var svg_rainfall_mini = d3.select("#class_rain_rainfall_mini")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin2.top + ")");

  // Color Scale
  
    var color = d3.scaleLinear()
                .domain(["No", "Yes"])
                .range(["red", "green"]);

  //////////////// Temp legend//////////////
  
    var svg_temp_legend = d3.select("#class_rain_temp_legend")
                          .append("svg")
                          .attr("id", "temp_legend")
                          .attr("width",300 )
                          .attr("height",100 );
    svg_temp_legend.append("text")
                          .text("Temperature")
                          .attr("transform",
                                  "translate(0,15)");                      
    svg_temp_legend.append("text")
                          .text("Minimum Temperature")
                          .attr("transform",
                                  "translate(70,50)");

    var rects_temp_legend = svg_temp_legend.append("g")
                .attr("transform",
                      "translate(0,0)")
    var rect_temp_legend = rects_temp_legend.append("rect")
                .attr("width", 50 )
                .attr("height", 20)
                .attr("fill", "green")
                .attr("transform","translate(0,35)");
    svg_temp_legend.append("text")
                          .text("Maximum Temperature")
                          .attr("transform",
                                  "translate(70,90)");
    var rect_2_temp_legend = rects_temp_legend.append("rect")
                .attr("width", 50 )
                .attr("height", 20)
                .attr("fill", "red")
                .attr("transform", "translate(0,75)"); 
  
  //////////////Humidity Legend     //////////  
  
    var svg_humid_legend = d3.select("#class_rain_humidity_legend")
                          .append("svg")
                          .attr("id", "humid_legend")
                          .attr("width",300 )
                          .attr("height",100 );
    svg_humid_legend.append("text")
                          .text("Humidity")
                          .attr("transform",
                                  "translate(0,15)");                      
    svg_humid_legend.append("text")
                          .text("Humidity at 9 am")
                          .attr("transform",
                                  "translate(70,50)");

    var rects_humid_legend = svg_humid_legend.append("g")
                .attr("transform",
                      "translate(0,0)")
    var rect_humid_legend = rects_humid_legend.append("rect")
                .attr("width", 50 )
                .attr("height", 20)
                .attr("fill", "steelblue")
                .attr("transform","translate(0,35)");
    svg_humid_legend.append("text")
                          .text("Humidity at 3 pm")
                          .attr("transform",
                                  "translate(70,90)");
    var rect_2_humid_legend = rects_humid_legend.append("rect")
                .attr("width", 50 )
                .attr("height", 20)
                .attr("fill", "blue")
                .attr("transform", "translate(0,75)"); 
  
  ///////////////// Outcomes Legend//////////////////////

    var svg_outcomes_legend = d3.select("#class_rain_outcomes_legend")
                          .append("svg")
                          .attr("id", "outcomes_legend")
                          .attr("width",300 )
                          .attr("height",100 );
    svg_outcomes_legend.append("text")
                          .text("Outcomes")
                          .attr("transform",
                                  "translate(0,15)");                      
    svg_outcomes_legend.append("text")
                          .text("Yes")
                          .attr("transform",
                                  "translate(70,50)");

    var rects_outcomes_legend = svg_outcomes_legend.append("g")
                .attr("transform",
                      "translate(0,0)")
    var rect_outcomes_legend = rects_outcomes_legend.append("rect")
                .attr("width", 50 )
                .attr("height", 20)
                .attr("fill", "green")
                .attr("transform","translate(0,35)");
    svg_outcomes_legend.append("text")
                          .text("No")
                          .attr("transform",
                                  "translate(70,90)");
    var rect_2_outcomes_legend = rects_outcomes_legend.append("rect")
                .attr("width", 50 )
                .attr("height", 20)
                .attr("fill", "red")
                .attr("transform", "translate(0,75)"); 

  ////////////// Outcomes///////////////////////

    var svg_outcome = d3.select("#class_rain_outcomes")
                          .append("svg")
                          .attr("id", "outcomes")
                          .attr("width",550 )
                          .attr("height",20 );
                          
    svg_outcome.append("text")
                          .text("Rain Today")
                          .attr("transform",
                                  "translate(0,15)");
    var rects = svg_outcome.append("g")
                .attr("transform",
                      "translate(0,0)")
    var rain_today = rects.append("rect")
                .attr("id", "rain_today")
                .attr("width", 50 )
                .attr("height", 20)
                .attr("fill", "lightgrey")
                .attr("transform",
                                  "translate(100,0)");
    svg_outcome.append("text")
                          .text("Rain Tomorrow")
                          .attr("transform",
                                  "translate(170,15)");
    var rain_tom = rects.append("rect")
                .attr("id", "rain_tom")
                .attr("width", 50 )
                .attr("height", 20)
                .attr("fill", "lightgrey")
                .attr("transform", "translate(300, 0)");
    
    svg_outcome.append("text")
                          .text("Rain Prediction")
                          .attr("transform",
                                  "translate(370,15)");

    var pred_rain_tom = rects.append("rect")
                .attr("id", "rain_tom_pred")
                .attr("width", 50 )
                .attr("height", 20)
                .attr("fill", "lightgrey")
                .attr("transform", "translate(500, 0)");                        

  //Read the data
    d3.csv("/classification/rain_no_rain/rain_data/original",

    // When reading the csv, I must format variables:
    function(d){
      return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rainfall : d.Rainfall, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow, Prediction : d.Prediction}
    },

    // Now I can use this dataset:
    function(data) {
          console.log(data)
        // Temp graph Axis
          // Add X axis --> it is a date format
          var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
          var xAxis = svg_temp.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

          // Add Y axis
          var y = d3.scaleLinear()
            .domain([-6,d3.max(data, function(d) { return +d.MaxTemp; })])
            //.domain([0,1])
            .range([ height, 0 ]);
          var yAxis_class = svg_temp.append("g")
            .call(d3.axisLeft(y));

          // Add a clipPath: everything out of this area won't be drawn.
          var clip = svg_temp.append("defs").append("svg:clipPath")
              .attr("id", "clip")
              .append("svg:rect")
              .attr("width", width )
              .attr("height", height )
              .attr("x", 0)
              .attr("y", 0);

            // Temp mini graph
          // Add X axis --> it is a date format
          var x_mini = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
          var xAxis_mini = svg_temp_mini.append("g")
            .attr("transform", "translate(0," + height2 + ")")
            .call(d3.axisBottom(x_mini));

          // Add Y axis
          var y_mini = d3.scaleLinear()
            .domain([-6,d3.max(data, function(d) { return +d.MaxTemp; })])
            .range([ height2, 0 ]);
          //yAxis_mini = svg_temp_mini.append("g")
           // .call(d3.axisLeft(y_mini));

          // Add a clipPath: everything out of this area won't be drawn.
          var clip_mini = svg_temp_mini.append("defs").append("svg:clipPath")
              .attr("id", "clip_mini")
              .append("svg:rect")
              .attr("width", width )
              .attr("height", height2 )
              .attr("x", 0)
              .attr("y", 0);
       
        // Humid Graph Axis
          // Add X axis --> it is a date format
          var x_humid = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
          var xAxis_humid = svg_humid.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x_humid));
               // Add Y axis
          
          var y_humid = d3.scaleLinear()
            .domain([0,100])
            .range([ height, 0 ]);
          var yAxis_class_humid = svg_humid.append("g")
            .call(d3.axisLeft(y_humid));


              // Add a clipPath: everything out of this area won't be drawn.
          
          var clip_humid = svg_humid.append("defs").append("svg:clipPath")
              .attr("id", "clip_humid")
              .append("svg:rect")
              .attr("width", width )
              .attr("height", height )
              .attr("x", 0)
              .attr("y", 0);

          // Humid mini Graph
          // Add X axis --> it is a date format
          var x_humid_mini = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
          var xAxis_humid_mini = svg_humid_mini.append("g")
            .attr("transform", "translate(0," + height2 + ")")
            .call(d3.axisBottom(x_humid_mini));
               // Add Y axis
          
          var y_humid_mini = d3.scaleLinear()
            .domain([0,100])
            .range([ height2, 0 ]);
          //yAxis_class_humid_mini = svg_humid_mini.append("g")
            //.call(d3.axisLeft(y_humid_mini));


              // Add a clipPath: everything out of this area won't be drawn.
          var clip_humid_mini = svg_humid_mini.append("defs").append("svg:clipPath")
              .attr("id", "clip_humid_mini")
              .append("svg:rect")
              .attr("width", width )
              .attr("height", height2 )
              .attr("x", 0)
              .attr("y", 0);

        // Rainfall Graph Axis

          // Add X axis --> it is a date format
          var x_rainfall = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
          var xAxis_rainfall = svg_rainfall.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x_rainfall));
               // Add Y axis
          var y_rainfall = d3.scaleLinear()
            .domain([0,50])
            .range([ height, 0 ]);
          var yAxis_class_rainfall = svg_rainfall.append("g")
            .call(d3.axisLeft(y_rainfall));
        
              // Add a clipPath: everything out of this area won't be drawn.
          var clip_rainfall = svg_rainfall.append("defs").append("svg:clipPath")
              .attr("id", "clip_rainfall")
              .append("svg:rect")
              .attr("width", width )
              .attr("height", height )
              .attr("x", 0)
              .attr("y", 0);

          // Rainfall mini Graph
          // Add X axis --> it is a date format
          var x_rainfall_mini = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
          var xAxis_rainfall_mini = svg_rainfall_mini.append("g")
            .attr("transform", "translate(0," + height2 + ")")
            .call(d3.axisBottom(x_rainfall_mini));
               // Add Y axis
          var y_rainfall_mini = d3.scaleLinear()
            .domain([0,50])
            .range([ height2, 0 ]);
          //yAxis_class_rainfall_mini = svg_rainfall_mini.append("g")
           // .call(d3.axisLeft(y_rainfall_mini));
        
              // Add a clipPath: everything out of this area won't be drawn.
          var clip_rainfall_mini = svg_rainfall_mini.append("defs").append("svg:clipPath")
              .attr("id", "clip_rainfall_mini")
              .append("svg:rect")
              .attr("width", width )
              .attr("height", height2 )
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
            .attr("d", d3.line()
              .x(function(d) { return x(d.date) })
              .y(function(d) { return y(d.MinTemp) })
              );
          line.append("path")
            .datum(data)
            .attr("class", "line1")  // I add the class line to be able to modify this line later on.
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1)
            .attr("d", d3.line()
              .x(function(d) { return x(d.date) })
              .y(function(d) { return y(d.MaxTemp) })
              );

          var temp_mini_area_min = d3.area()
            .x(function(d) { return x_mini(d.date); })
            .y0(height2)
            .y1(function(d) { return y_mini(d.MinTemp); });

          var temp_mini_area_max = d3.area()
            .x(function(d) { return x_mini(d.date); })
            .y0(height2)
            .y1(function(d) { return y_mini(d.MaxTemp); });
             // Add the brushing
        var temp_mini = svg_temp_mini.append('g')
            .attr("clip-path", "url(#clip_mini)");
            
          temp_mini.append("path")
            .datum(data)
            .attr("class", "area1")
            .attr("d", temp_mini_area_max)
            .attr("fill", "red")
            .attr("opacity", 0.6);
          temp_mini.append("path")
            .datum(data)
            .attr("class", "area2")
            .attr("d", temp_mini_area_min)
            .attr("fill", "green")
            .attr("opacity", 0.6);

        temp_mini
            .append("g")
              .attr("class", "brush")
              .call(brush);
          // Tooltip code
          var focus_temp_min = svg_temp.append("g")
              .attr("class", "focus")
              .style("display", "none");
          focus_temp_min.append("line")
              .attr("class", "x-hover-line hover-line")
              .attr("y1", 0)
              .attr("y2", height);
          focus_temp_min.append("line")
              .attr("class", "y-hover-line hover-line")
              .attr("x1", 0)
              .attr("x2", width);
          focus_temp_min.append("circle")
              .attr("r", 2);
          focus_temp_min.append("text")
              .attr("x", 15)
              .attr("dy", ".31em");

          var focus_temp_max = svg_temp.append("g")
              .attr("class", "focus")
              .style("display", "none");
          focus_temp_max.append("line")
              .attr("class", "x-hover-line hover-line")
              .attr("y1", 0)
              .attr("y2", height);
          focus_temp_max.append("line")
              .attr("class", "y-hover-line hover-line")
              .attr("x1", 0)
              .attr("x2", width);
          focus_temp_max.append("circle")
              .attr("r", 2);
          focus_temp_max.append("text")
              .attr("x", 15)
              .attr("dy", ".31em");
          var tooltip_temp = svg_temp.append("rect")
              //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .attr("class", "overlay")
              .attr("width", width)
              .attr("height", height)
              .on("mouseover", function() { 
                focus_humid_3pm.style("display", null);
                focus_humid_9am.style("display", null); 
                focus_temp_min.style("display", null);
                focus_temp_max.style("display", null);
                focus_rainfall.style("display", null); 
              })
              .on("mouseout", function() { 
                focus_humid_3pm.style("display", "none");
                focus_humid_9am.style("display", "none"); 
                focus_temp_min.style("display", "none");
                focus_temp_max.style("display", "none"); 
                focus_rainfall.style("display", "none");
                rects.select("#rain_today").attr("fill", "lightgrey")
                rects.select("#rain_tom").attr("fill","lightgrey")
                rects.select("#rain_tom_pred").attr("fill","lightgrey")
              })
              .on("mousemove", mousemove);
           
         

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
          var line_humid = svg_humid.append('g').attr("clip-path", "url(#clip_humid)")


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


          var humid_mini_area_9am = d3.area()
            .x(function(d) { return x_humid_mini(d.date); })
            .y0(height2)
            .y1(function(d) { return y_humid_mini(d.Humidity9am); });

          var humid_mini_area_3pm = d3.area()
            .x(function(d) { return x_humid_mini(d.date); })
            .y0(height2)
            .y1(function(d) { return y_humid_mini(d.Humidity3pm); });
             // Add the brushing
        var humid_mini = svg_humid_mini.append('g')
              .attr("clip-path", "url(#clip_humid_mini)");
            
          humid_mini.append("path")
            .datum(data)
            .attr("class", "area3")
            .attr("d", humid_mini_area_9am)
            .attr("fill", "steelblue")
            .attr("opacity", 0.6);
          humid_mini.append("path")
            .datum(data)
            .attr("class", "area4")
            .attr("d", humid_mini_area_3pm)
            .attr("fill", "blue")
            .attr("opacity", 0.6);
          // Add the brushing
          humid_mini
            .append("g")
              .attr("class", "brush")
              .call(brush_humid);

          // Tooltip code
          var focus_humid_3pm = svg_humid.append("g")
              .attr("class", "focus")
              .style("display", "none");
          focus_humid_3pm.append("line")
              .attr("class", "x-hover-line hover-line")
              .attr("y1", 0)
              .attr("y2", height);
          focus_humid_3pm.append("line")
              .attr("class", "y-hover-line hover-line")
              .attr("x1", 0)
              .attr("x2", width);
          focus_humid_3pm.append("circle").attr("r", 2);
          focus_humid_3pm.append("text")
              .attr("x", 15)
              .attr("dy", ".31em");

          var focus_humid_9am = svg_humid.append("g")
              .attr("class", "focus")
              .style("display", "none");
          focus_humid_9am.append("line")
              .attr("class", "x-hover-line hover-line")
              .attr("y1", 0)
              .attr("y2", height);
          focus_humid_9am.append("line")
              .attr("class", "y-hover-line hover-line")
              .attr("x1", 0)
              .attr("x2", width);
          focus_humid_9am.append("circle")
              .attr("r", 2);
          focus_humid_9am.append("text")
              .attr("x", 15)
              .attr("dy", ".31em");
          var tooltip_humid = svg_humid.append("rect")
              //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .attr("class", "overlay")
              .attr("width", width)
              .attr("height", height)
              .on("mouseover", function() { 
                focus_humid_3pm.style("display", null);
                focus_humid_9am.style("display", null); 
                focus_temp_min.style("display", null);
                focus_temp_max.style("display", null);
                focus_rainfall.style("display", null); 
              })
              .on("mouseout", function() { 
                focus_humid_3pm.style("display", "none");
                focus_humid_9am.style("display", "none"); 
                focus_temp_min.style("display", "none");
                focus_temp_max.style("display", "none"); 
                focus_rainfall.style("display", "none");
                rects.select("#rain_today").attr("fill", "lightgrey")
                rects.select("#rain_tom").attr("fill","lightgrey")
                rects.select("#rain_tom_pred").attr("fill","lightgrey")
              })
              .on("mousemove", mousemove);


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

          var rainfall_area = d3.area()
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
              .x(function(d) { return x_rainfall(d.date) })
              .y(function(d) { return y_rainfall(d.Rainfall) })
              )
              //Add area
          line_rainfall.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", rainfall_area)
            .attr("fill", "steelblue");


          var rainfall_area_mini = d3.area()
            //.curve(d3.curveMonotoneX)
            .x(function(d) { return x_rainfall_mini(d.date); })
            .y0(height2)
            .y1(function(d) { return y_rainfall_mini(d.Rainfall); });

             // Add the brushing
        var rainfall_mini = svg_rainfall_mini.append('g')
            .attr("clip-path", "url(#clip_rainfall_mini)");
            
          rainfall_mini.append("path")
            .datum(data)
            .attr("class", "area5")
            .attr("d", rainfall_area_mini)
            .attr("fill", "steelblue")
            .attr("opacity", 0.6);


          // Add the brushing
          rainfall_mini
            .append("g")
              .attr("class", "brush")
              .call(brush_rainfall);


        var focus_rainfall = svg_rainfall.append("g")
                .attr("class", "focus")
                .style("display", "none");
            focus_rainfall.append("line")
                .attr("class", "x-hover-line hover-line")
                .attr("y1", 0)
                .attr("y2", height);
            focus_rainfall.append("line")
                .attr("class", "y-hover-line hover-line")
                .attr("x1", 0)
                .attr("x2", width);
            focus_rainfall.append("circle").attr("r", 2);
            focus_rainfall.append("text")
                .attr("x", 15)
                .attr("dy", ".31em");
            var tooltip_rainfall =svg_rainfall.append("rect")
                //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr("class", "overlay")
                .attr("width", width)
                .attr("height", height)
                .on("mouseover", function() { 
                  focus_humid_3pm.style("display", null);
                  focus_humid_9am.style("display", null); 
                  focus_temp_min.style("display", null);
                  focus_temp_max.style("display", null);
                  focus_rainfall.style("display", null); 
                })
                .on("mouseout", function() { 
                  focus_humid_3pm.style("display", "none");
                  focus_humid_9am.style("display", "none"); 
                  focus_temp_min.style("display", "none");
                  focus_temp_max.style("display", "none"); 
                  focus_rainfall.style("display", "none");
                  rects.select("#rain_today").attr("fill", "lightgrey")
                  rects.select("#rain_tom").attr("fill","lightgrey")
                  rects.select("#rain_tom_pred").attr("fill","lightgrey")
                })
                .on("mousemove", mousemove);



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

      // Update Functions

          function updateChart_temp() {

            // What are the selected boundaries?
            extent = d3.event.selection
            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if(!extent){
              if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
              x.domain([ 4,8])
              x_humid.domain([ 4,8])
              x_rainfall.domain([4,8])
              x_mini.domain([ 4,8])
              x_humid_mini.domain([ 4,8])
              x_rainfall_mini.domain([4,8])
            }else{
              x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
              x_humid.domain([ x_humid.invert(extent[0]), x_humid.invert(extent[1]) ])
              x_rainfall.domain([ x_rainfall.invert(extent[0]), x_rainfall.invert(extent[1]) ])
              x_mini.domain([ x_mini.invert(extent[0]), x_mini.invert(extent[1]) ])
              x_humid_mini.domain([ x_humid_mini.invert(extent[0]), x_humid_mini.invert(extent[1]) ])
              x_rainfall_mini.domain([ x_rainfall_mini.invert(extent[0]), x_rainfall_mini.invert(extent[1]) ])
              temp_mini.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
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
                .attr("d", rainfall_area)

                xAxis_mini.transition().duration(1000).call(d3.axisBottom(x_mini))

                temp_mini
                .select('.area1')
                .transition()
                .duration(1000)
                .attr("d", temp_mini_area_max)

                temp_mini
                .select('.area2')
                .transition()
                .duration(1000)
                .attr("d", temp_mini_area_min)

                xAxis_humid_mini.transition().duration(1000).call(d3.axisBottom(x_humid_mini))

                humid_mini
                .select('.area3')
                .transition()
                .duration(1000)
                .attr("d", humid_mini_area_9am)

                humid_mini
                .select('.area4')
                .transition()
                .duration(1000)
                .attr("d", humid_mini_area_3pm)
                
                xAxis_rainfall_mini.transition().duration(1000).call(d3.axisBottom(x_rainfall_mini))

                rainfall_mini
                .select('.area5')
                .transition()
                .duration(1000)
                .attr("d", rainfall_area_mini)
            }

          function updateChart_humid() {

            // What are the selected boundaries?
            extent = d3.event.selection
            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if(!extent){
              if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
              x.domain([ 4,8])
              x_humid.domain([ 4,8])
              x_rainfall.domain([4,8])
              x_mini.domain([ 4,8])
              x_humid_mini.domain([ 4,8])
              x_rainfall_mini.domain([4,8])
            }else{
              x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
              x_humid.domain([ x_humid.invert(extent[0]), x_humid.invert(extent[1]) ])
              x_rainfall.domain([ x_rainfall.invert(extent[0]), x_rainfall.invert(extent[1]) ])
              x_mini.domain([ x_mini.invert(extent[0]), x_mini.invert(extent[1]) ])
              x_humid_mini.domain([ x_humid_mini.invert(extent[0]), x_humid_mini.invert(extent[1]) ])
              x_rainfall_mini.domain([ x_rainfall_mini.invert(extent[0]), x_rainfall_mini.invert(extent[1]) ])
              humid_mini.select(".brush").call(brush_humid.move, null) // This remove the grey brush area as soon as the selection has been done
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
                .attr("d", rainfall_area)

                xAxis_mini.transition().duration(1000).call(d3.axisBottom(x_mini))

                temp_mini
                .select('.area1')
                .transition()
                .duration(1000)
                .attr("d", temp_mini_area_max)

                temp_mini
                .select('.area2')
                .transition()
                .duration(1000)
                .attr("d", temp_mini_area_min)

                xAxis_humid_mini.transition().duration(1000).call(d3.axisBottom(x_humid_mini))

                humid_mini
                .select('.area3')
                .transition()
                .duration(1000)
                .attr("d", humid_mini_area_9am)

                humid_mini
                .select('.area4')
                .transition()
                .duration(1000)
                .attr("d", humid_mini_area_3pm)
                
                xAxis_rainfall_mini.transition().duration(1000).call(d3.axisBottom(x_rainfall_mini))

                rainfall_mini
                .select('.area5')
                .transition()
                .duration(1000)
                .attr("d", rainfall_area_mini)
            }

          function updateChart_rainfall() {
          // What are the selected boundaries?
            extent = d3.event.selection
            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if(!extent){
              if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
              x.domain([ 4,8])
              x_humid.domain([ 4,8])
              x_rainfall.domain([4,8])
              x_mini.domain([ 4,8])
              x_humid_mini.domain([ 4,8])
              x_rainfall_mini.domain([4,8])
            }else{
              x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
              x_humid.domain([ x_humid.invert(extent[0]), x_humid.invert(extent[1]) ])
              x_rainfall.domain([ x_rainfall.invert(extent[0]), x_rainfall.invert(extent[1]) ])
              x_mini.domain([ x_mini.invert(extent[0]), x_mini.invert(extent[1]) ])
              x_humid_mini.domain([ x_humid_mini.invert(extent[0]), x_humid_mini.invert(extent[1]) ])
              x_rainfall_mini.domain([ x_rainfall_mini.invert(extent[0]), x_rainfall_mini.invert(extent[1]) ])
              rainfall_mini.select(".brush").call(brush_rainfall.move, null) // This remove the grey brush area as soon as the selection has been done
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
                .attr("d", rainfall_area)

                xAxis_mini.transition().duration(1000).call(d3.axisBottom(x_mini))

                temp_mini
                .select('.area1')
                .transition()
                .duration(1000)
                .attr("d", temp_mini_area_max)

                temp_mini
                .select('.area2')
                .transition()
                .duration(1000)
                .attr("d", temp_mini_area_min)

                xAxis_humid_mini.transition().duration(1000).call(d3.axisBottom(x_humid_mini))

                humid_mini
                .select('.area3')
                .transition()
                .duration(1000)
                .attr("d", humid_mini_area_9am)

                humid_mini
                .select('.area4')
                .transition()
                .duration(1000)
                .attr("d", humid_mini_area_3pm)
                
                xAxis_rainfall_mini.transition().duration(1000).call(d3.axisBottom(x_rainfall_mini))

                rainfall_mini
                .select('.area5')
                .transition()
                .duration(1000)
                .attr("d", rainfall_area_mini)
            }


            // Tooltip function
          
          function mousemove() {
              var x0 = x.invert(d3.mouse(this)[0]),
                  i = bisectDate(data, x0, 1),
                  d0 = data[i - 1],
                  d1 = data[i],
                  d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;      
              focus_temp_min.attr("transform", "translate(" + x(d.date) + "," + y(d.MinTemp) + ")");
              focus_temp_min.select("text").text(function() { return d.MinTemp; });
              focus_temp_min.select(".x-hover-line").attr("y2", height - y(d.MinTemp));
              focus_temp_min.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_temp_max.attr("transform", "translate(" + x(d.date) + "," + y(d.MaxTemp) + ")");
              focus_temp_max.select("text").text(function() { return d.MaxTemp; });
              focus_temp_max.select(".x-hover-line").attr("y2", height - y(d.MaxTemp));
              focus_temp_max.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_humid_9am.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity9am) + ")");
              focus_humid_9am.select("text").text(function() { return d.Humidity9am; });
              focus_humid_9am.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity9am));
              focus_humid_9am.select(".y-hover-line").attr("x2", -x_humid(d.date));
              
              focus_humid_3pm.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity3pm) + ")");
              focus_humid_3pm.select("text").text(function() { return d.Humidity3pm; });
              focus_humid_3pm.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity3pm));
              focus_humid_3pm.select(".y-hover-line").attr("x2", -x_humid(d.date));

              focus_rainfall.attr("transform", "translate(" + x_humid(d.date) + "," + y_rainfall(d.Rainfall) + ")");
              focus_rainfall.select("text").text(function() { return d.Rainfall; });
              focus_rainfall.select(".x-hover-line").attr("y2", height - y_rainfall(d.Rainfall));
              focus_rainfall.select(".y-hover-line").attr("x2", -x_rainfall(d.date));
              
              rects.select("#rain_today").attr("fill", function(){if(d.Rain_today == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom").attr("fill", function(){if(d.Rain_tom == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom_pred").attr("fill", function(){if(d.Prediction == "No") {return "red";} else {return"green";}})
            }

      // If user double click, reinitialize the chart
      
        svg_temp.on("dblclick",function(){
            x.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis.transition().call(d3.axisBottom(x))

            x_humid.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid.transition().call(d3.axisBottom(x_humid))

            x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))

            x_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_mini.transition().call(d3.axisBottom(x_mini))

            x_humid_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid_mini.transition().call(d3.axisBottom(x_humid_mini))

            x_rainfall_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall_mini.transition().call(d3.axisBottom(x_rainfall_mini))
          
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
                  .attr("d", rainfall_area)
                
            temp_mini
                  .select('.area1')
                  .transition()
                  .attr("d", temp_mini_area_max)
                
            temp_mini
                  .select('.area2')
                  .transition()
                  .attr("d", temp_mini_area_min)
                      
            humid_mini
                  .select('.area3')
                  .transition()
                  .attr("d", humid_mini_area_9am)
                      
            humid_mini
                  .select('.area4')
                  .transition()
                  .attr("d", humid_mini_area_3pm)

            rainfall_mini
                  .select('.area5')
                  .transition()
                  .attr("d", rainfall_area_mini)

            });

        svg_humid.on("dblclick",function(){
            x.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis.transition().call(d3.axisBottom(x))

            x_humid.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid.transition().call(d3.axisBottom(x_humid))

            x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))

            x_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_mini.transition().call(d3.axisBottom(x_mini))

            x_humid_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid_mini.transition().call(d3.axisBottom(x_humid_mini))

            x_rainfall_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall_mini.transition().call(d3.axisBottom(x_rainfall_mini))
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
                  .attr("d", rainfall_area)
                
            temp_mini
                  .select('.area1')
                  .transition()
                  .attr("d", temp_mini_area_max)
                
            temp_mini
                  .select('.area2')
                  .transition()
                  .attr("d", temp_mini_area_min)
                      
            humid_mini
                  .select('.area3')
                  .transition()
                  .attr("d", humid_mini_area_9am)
                      
            humid_mini
                  .select('.area4')
                  .transition()
                  .attr("d", humid_mini_area_3pm)

            rainfall_mini
                  .select('.area5')
                  .transition()
                  .attr("d", rainfall_area_mini)
            });

        svg_rainfall.on("dblclick",function(){
            x.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis.transition().call(d3.axisBottom(x))

            x_humid.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid.transition().call(d3.axisBottom(x_humid))

            x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))

            x_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_mini.transition().call(d3.axisBottom(x_mini))

            x_humid_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid_mini.transition().call(d3.axisBottom(x_humid_mini))

            x_rainfall_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall_mini.transition().call(d3.axisBottom(x_rainfall_mini))
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
                  .attr("d", rainfall_area)
                
            temp_mini
                  .select('.area1')
                  .transition()
                  .attr("d", temp_mini_area_max)
                
            temp_mini
                  .select('.area2')
                  .transition()
                  .attr("d", temp_mini_area_min)
                      
            humid_mini
                  .select('.area3')
                  .transition()
                  .attr("d", humid_mini_area_9am)
                      
            humid_mini
                  .select('.area4')
                  .transition()
                  .attr("d", humid_mini_area_3pm)

            rainfall_mini
                  .select('.area5')
                  .transition()
                  .attr("d", rainfall_area_mini)
            });

        svg_temp_mini.on("dblclick",function(){
            x.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis.transition().call(d3.axisBottom(x))

            x_humid.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid.transition().call(d3.axisBottom(x_humid))

            x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))

            x_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_mini.transition().call(d3.axisBottom(x_mini))

            x_humid_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid_mini.transition().call(d3.axisBottom(x_humid_mini))

            x_rainfall_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall_mini.transition().call(d3.axisBottom(x_rainfall_mini))
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
                  .attr("d", rainfall_area)
                
            temp_mini
                  .select('.area1')
                  .transition()
                  .attr("d", temp_mini_area_max)
                
            temp_mini
                  .select('.area2')
                  .transition()
                  .attr("d", temp_mini_area_min)
                      
            humid_mini
                  .select('.area3')
                  .transition()
                  .attr("d", humid_mini_area_9am)
                      
            humid_mini
                  .select('.area4')
                  .transition()
                  .attr("d", humid_mini_area_3pm)

            rainfall_mini
                  .select('.area5')
                  .transition()
                  .attr("d", rainfall_area_mini)
            });

        svg_humid_mini.on("dblclick",function(){
            x.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis.transition().call(d3.axisBottom(x))

            x_humid.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid.transition().call(d3.axisBottom(x_humid))

            x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))

            x_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_mini.transition().call(d3.axisBottom(x_mini))

            x_humid_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid_mini.transition().call(d3.axisBottom(x_humid_mini))

            x_rainfall_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall_mini.transition().call(d3.axisBottom(x_rainfall_mini))
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
                  .attr("d", rainfall_area)
                
            temp_mini
                  .select('.area1')
                  .transition()
                  .attr("d", temp_mini_area_max)
                
            temp_mini
                  .select('.area2')
                  .transition()
                  .attr("d", temp_mini_area_min)
                      
            humid_mini
                  .select('.area3')
                  .transition()
                  .attr("d", humid_mini_area_9am)
                      
            humid_mini
                  .select('.area4')
                  .transition()
                  .attr("d", humid_mini_area_3pm)

            rainfall_mini
                  .select('.area5')
                  .transition()
                  .attr("d", rainfall_area_mini)
            });

        svg_rainfall_mini.on("dblclick",function(){
            x.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis.transition().call(d3.axisBottom(x))

            x_humid.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid.transition().call(d3.axisBottom(x_humid))

            x_rainfall.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))

            x_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_mini.transition().call(d3.axisBottom(x_mini))

            x_humid_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_humid_mini.transition().call(d3.axisBottom(x_humid_mini))

            x_rainfall_mini.domain(d3.extent(data, function(d) { return d.date; }))
            xAxis_rainfall_mini.transition().call(d3.axisBottom(x_rainfall_mini))
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
                  .attr("d", rainfall_area)
                
            temp_mini
                  .select('.area1')
                  .transition()
                  .attr("d", temp_mini_area_max)
                
            temp_mini
                  .select('.area2')
                  .transition()
                  .attr("d", temp_mini_area_min)
                      
            humid_mini
                  .select('.area3')
                  .transition()
                  .attr("d", humid_mini_area_9am)
                      
            humid_mini
                  .select('.area4')
                  .transition()
                  .attr("d", humid_mini_area_3pm)

            rainfall_mini
                  .select('.area5')
                  .transition()
                  .attr("d", rainfall_area_mini)
            });

      // Normalization Button

        d3.select("#feature_normalization").on("click", function(){
          d3.csv("/classification/rain_no_rain/rain_data/normalized",

              // When reading the csv, I must format variables:
            function(d){
              return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rainfall : d.Rainfall, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow, Prediction : d.Prediction}
            },

              // Now I can use this dataset:
            function(data_normalized) {
                //console.log(data_normalized.MinTemp)
                x.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                y.domain([0,1])
                xAxis.transition().call(d3.axisBottom(x))
                yAxis_class.transition().call(d3.axisLeft(y))

                x_humid.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                y_humid.domain([0,1])
                xAxis_humid.transition().call(d3.axisBottom(x_humid))
                yAxis_class_humid.transition().call(d3.axisLeft(y_humid))

                x_rainfall.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                y_rainfall.domain([0,1])
                xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))
                yAxis_class_rainfall.transition().call(d3.axisLeft(y_rainfall))

                x_mini.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                y_mini.domain([0,1])
                xAxis_mini.transition().call(d3.axisBottom(x_mini))

                x_humid_mini.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                y_humid_mini.domain([0,1])
                xAxis_humid_mini.transition().call(d3.axisBottom(x_humid_mini))

                x_rainfall_mini.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                y_rainfall_mini.domain([0,1])
                xAxis_rainfall_mini.transition().call(d3.axisBottom(x_rainfall_mini))
              
                line.datum(data_normalized)
                    .select('.line')
                    .transition()
                    .attr("d", d3.line()
                      .x(function(d) { return x(d.date) })
                      .y(function(d) { return y(d.MinTemp) })
                  )
                line.datum(data_normalized)
                    .select('.line1')
                    .transition()
                    .attr("d", d3.line()
                      .x(function(d) { return x(d.date) })
                      .y(function(d) { return y(d.MaxTemp) })
                  )
                line_humid.datum(data_normalized)
                    .select('.line2')
                    .transition()
                    .attr("d", d3.line()
                      .x(function(d) { return x_humid(d.date) })
                      .y(function(d) { return y_humid(d.Humidity9am) })
                  )
                line_humid.datum(data_normalized)
                    .select('.line3')
                    .transition()
                    .attr("d", d3.line()
                      .x(function(d) { return x_humid(d.date) })
                      .y(function(d) { return y_humid(d.Humidity3pm) })
                  )
                line_rainfall.datum(data_normalized)
                    .select('.line4')
                    .transition()
                    .attr("d", d3.line()
                      .x(function(d) { return x_rainfall(d.date) })
                      .y(function(d) { return y_rainfall(d.Rainfall) })
                  )
                line_rainfall.datum(data_normalized)
                      .select('.area')
                      .transition()
                      .attr("d", rainfall_area)
                    
                temp_mini.datum(data_normalized)
                      .select('.area1')
                      .transition()
                      .attr("d", temp_mini_area_max)
                    
                temp_mini.datum(data_normalized)
                      .select('.area2')
                      .transition()
                      .attr("d", temp_mini_area_min)
                          
                humid_mini.datum(data_normalized)
                      .select('.area3')
                      .transition()
                      .attr("d", humid_mini_area_9am)
                          
                humid_mini.datum(data_normalized)
                      .select('.area4')
                      .transition()
                      .attr("d", humid_mini_area_3pm)

                rainfall_mini.datum(data_normalized)
                      .select('.area5')
                      .transition()
                      .attr("d", rainfall_area_mini)

          tooltip_temp.on("mousemove", function(){
                  var x0 = x.invert(d3.mouse(this)[0]),
                  i = bisectDate(data_normalized, x0, 1),
                  d0 = data_normalized[i - 1],
                  d1 = data_normalized[i],
                  d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;      
              focus_temp_min.attr("transform", "translate(" + x(d.date) + "," + y(d.MinTemp) + ")");
              focus_temp_min.select("text").text(function() { return d.MinTemp; });
              focus_temp_min.select(".x-hover-line").attr("y2", height - y(d.MinTemp));
              focus_temp_min.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_temp_max.attr("transform", "translate(" + x(d.date) + "," + y(d.MaxTemp) + ")");
              focus_temp_max.select("text").text(function() { return d.MaxTemp; });
              focus_temp_max.select(".x-hover-line").attr("y2", height - y(d.MaxTemp));
              focus_temp_max.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_humid_9am.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity9am) + ")");
              focus_humid_9am.select("text").text(function() { return d.Humidity9am; });
              focus_humid_9am.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity9am));
              focus_humid_9am.select(".y-hover-line").attr("x2", -x_humid(d.date));
              
              focus_humid_3pm.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity3pm) + ")");
              focus_humid_3pm.select("text").text(function() { return d.Humidity3pm; });
              focus_humid_3pm.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity3pm));
              focus_humid_3pm.select(".y-hover-line").attr("x2", -x_humid(d.date));

              focus_rainfall.attr("transform", "translate(" + x_humid(d.date) + "," + y_rainfall(d.Rainfall) + ")");
              focus_rainfall.select("text").text(function() { return d.Rainfall; });
              focus_rainfall.select(".x-hover-line").attr("y2", height - y_rainfall(d.Rainfall));
              focus_rainfall.select(".y-hover-line").attr("x2", -x_rainfall(d.date));
              
              rects.select("#rain_today").attr("fill", function(){if(d.Rain_today == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom").attr("fill", function(){if(d.Rain_tom == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom_pred").attr("fill", function(){if(d.Prediction == "No") {return "red";} else {return"green";}})
                })

          tooltip_humid.on("mousemove", function(){
                  var x0 = x.invert(d3.mouse(this)[0]),
                  i = bisectDate(data_normalized, x0, 1),
                  d0 = data_normalized[i - 1],
                  d1 = data_normalized[i],
                  d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;      
              focus_temp_min.attr("transform", "translate(" + x(d.date) + "," + y(d.MinTemp) + ")");
              focus_temp_min.select("text").text(function() { return d.MinTemp; });
              focus_temp_min.select(".x-hover-line").attr("y2", height - y(d.MinTemp));
              focus_temp_min.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_temp_max.attr("transform", "translate(" + x(d.date) + "," + y(d.MaxTemp) + ")");
              focus_temp_max.select("text").text(function() { return d.MaxTemp; });
              focus_temp_max.select(".x-hover-line").attr("y2", height - y(d.MaxTemp));
              focus_temp_max.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_humid_9am.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity9am) + ")");
              focus_humid_9am.select("text").text(function() { return d.Humidity9am; });
              focus_humid_9am.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity9am));
              focus_humid_9am.select(".y-hover-line").attr("x2", -x_humid(d.date));
              
              focus_humid_3pm.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity3pm) + ")");
              focus_humid_3pm.select("text").text(function() { return d.Humidity3pm; });
              focus_humid_3pm.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity3pm));
              focus_humid_3pm.select(".y-hover-line").attr("x2", -x_humid(d.date));

              focus_rainfall.attr("transform", "translate(" + x_humid(d.date) + "," + y_rainfall(d.Rainfall) + ")");
              focus_rainfall.select("text").text(function() { return d.Rainfall; });
              focus_rainfall.select(".x-hover-line").attr("y2", height - y_rainfall(d.Rainfall));
              focus_rainfall.select(".y-hover-line").attr("x2", -x_rainfall(d.date));
              
              rects.select("#rain_today").attr("fill", function(){if(d.Rain_today == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom").attr("fill", function(){if(d.Rain_tom == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom_pred").attr("fill", function(){if(d.Prediction == "No") {return "red";} else {return"green";}})
                })

          tooltip_rainfall.on("mousemove", function(){
                  var x0 = x.invert(d3.mouse(this)[0]),
                  i = bisectDate(data_normalized, x0, 1),
                  d0 = data_normalized[i - 1],
                  d1 = data_normalized[i],
                  d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;      
              focus_temp_min.attr("transform", "translate(" + x(d.date) + "," + y(d.MinTemp) + ")");
              focus_temp_min.select("text").text(function() { return d.MinTemp; });
              focus_temp_min.select(".x-hover-line").attr("y2", height - y(d.MinTemp));
              focus_temp_min.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_temp_max.attr("transform", "translate(" + x(d.date) + "," + y(d.MaxTemp) + ")");
              focus_temp_max.select("text").text(function() { return d.MaxTemp; });
              focus_temp_max.select(".x-hover-line").attr("y2", height - y(d.MaxTemp));
              focus_temp_max.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_humid_9am.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity9am) + ")");
              focus_humid_9am.select("text").text(function() { return d.Humidity9am; });
              focus_humid_9am.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity9am));
              focus_humid_9am.select(".y-hover-line").attr("x2", -x_humid(d.date));
              
              focus_humid_3pm.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity3pm) + ")");
              focus_humid_3pm.select("text").text(function() { return d.Humidity3pm; });
              focus_humid_3pm.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity3pm));
              focus_humid_3pm.select(".y-hover-line").attr("x2", -x_humid(d.date));

              focus_rainfall.attr("transform", "translate(" + x_humid(d.date) + "," + y_rainfall(d.Rainfall) + ")");
              focus_rainfall.select("text").text(function() { return d.Rainfall; });
              focus_rainfall.select(".x-hover-line").attr("y2", height - y_rainfall(d.Rainfall));
              focus_rainfall.select(".y-hover-line").attr("x2", -x_rainfall(d.date));
              
              rects.select("#rain_today").attr("fill", function(){if(d.Rain_today == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom").attr("fill", function(){if(d.Rain_tom == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom_pred").attr("fill", function(){if(d.Prediction == "No") {return "red";} else {return"green";}})
                })

              })
          })

      // Original Data

        d3.select("#original").on("click", function(){
          d3.csv("/classification/rain_no_rain/rain_data/original",

            // When reading the csv, I must format variables:
          function(d){
            return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rainfall : d.Rainfall, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow, Prediction : d.Prediction}
          },

            // Now I can use this dataset:
          function(data_original) {
            x.domain(d3.extent(data_original, function(d) { return d.date; }))
            y.domain([-6,d3.max(data_original, function(d) { return +d.MaxTemp; })])
            xAxis.transition().call(d3.axisBottom(x))
            yAxis_class.transition().call(d3.axisLeft(y))

            x_humid.domain(d3.extent(data_original, function(d) { return d.date; }))
            y_humid.domain([0,100])
            xAxis_humid.transition().call(d3.axisBottom(x_humid))
            yAxis_class_humid.transition().call(d3.axisLeft(y_humid))

            x_rainfall.domain(d3.extent(data_original, function(d) { return d.date; }))
            y_rainfall.domain([0,50])
            xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))
            yAxis_class_rainfall.transition().call(d3.axisLeft(y_rainfall))

            x_mini.domain(d3.extent(data_original, function(d) { return d.date; }))
            y_mini.domain([-6,d3.max(data_original, function(d) { return +d.MaxTemp; })])
            xAxis_mini.transition().call(d3.axisBottom(x_mini))

            x_humid_mini.domain(d3.extent(data_original, function(d) { return d.date; }))
            y_humid_mini.domain([0,100])
            xAxis_humid_mini.transition().call(d3.axisBottom(x_humid_mini))

            x_rainfall_mini.domain(d3.extent(data_original, function(d) { return d.date; }))
            y_rainfall_mini.domain([0,50])
            xAxis_rainfall_mini.transition().call(d3.axisBottom(x_rainfall_mini))
          
            line.datum(data_original)
                .select('.line')
                .transition()
                .attr("d", d3.line()
                  .x(function(d) { return x(d.date) })
                  .y(function(d) { return y(d.MinTemp) })
              )
            line.datum(data_original)
                .select('.line1')
                .transition()
                .attr("d", d3.line()
                  .x(function(d) { return x(d.date) })
                  .y(function(d) { return y(d.MaxTemp) })
              )
            line_humid.datum(data_original)
                .select('.line2')
                .transition()
                .attr("d", d3.line()
                  .x(function(d) { return x_humid(d.date) })
                  .y(function(d) { return y_humid(d.Humidity9am) })
              )
            line_humid.datum(data_original)
                .select('.line3')
                .transition()
                .attr("d", d3.line()
                  .x(function(d) { return x_humid(d.date) })
                  .y(function(d) { return y_humid(d.Humidity3pm) })
              )
            line_rainfall.datum(data_original)
                .select('.line4')
                .transition()
                .attr("d", d3.line()
                  .x(function(d) { return x_rainfall(d.date) })
                  .y(function(d) { return y_rainfall(d.Rainfall) })
              )
            line_rainfall.datum(data_original)
                  .select('.area')
                  .transition()
                  .attr("d", rainfall_area)
                
            temp_mini.datum(data_original)
                  .select('.area1')
                  .transition()
                  .attr("d", temp_mini_area_max)
                
            temp_mini.datum(data_original)
                  .select('.area2')
                  .transition()
                  .attr("d", temp_mini_area_min)
                      
            humid_mini.datum(data_original)
                  .select('.area3')
                  .transition()
                  .attr("d", humid_mini_area_9am)
                      
            humid_mini.datum(data_original)
                  .select('.area4')
                  .transition()
                  .attr("d", humid_mini_area_3pm)

            rainfall_mini.datum(data_original)
                  .select('.area5')
                  .transition()
                  .attr("d", rainfall_area_mini)

            tooltip_temp.on("mousemove", mousemove)
            tooltip_humid.on("mousemove", mousemove)
            tooltip_rainfall.on("mousemove", mousemove)
          })
          })

      // Prediction Button

        d3.select("#predict").on("click", function(){
          d3.csv("/classification/rain_no_rain/rain_data/prediction",

            // When reading the csv, I must format variables:
          function(d){
            return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rainfall : d.Rainfall, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow, Prediction : d.Prediction}
          },

            // Now I can use this dataset:
          function(data_prediction) {
            //console.log(data_prediction)
            x.domain(d3.extent(data_prediction, function(d) { return d.date; }))
            y.domain([-6,d3.max(data_prediction, function(d) { return +d.MaxTemp; })])
            xAxis.transition().call(d3.axisBottom(x))
            yAxis_class.transition().call(d3.axisLeft(y))

            x_humid.domain(d3.extent(data_prediction, function(d) { return d.date; }))
            y_humid.domain([0,100])
            xAxis_humid.transition().call(d3.axisBottom(x_humid))
            yAxis_class_humid.transition().call(d3.axisLeft(y_humid))

            x_rainfall.domain(d3.extent(data_prediction, function(d) { return d.date; }))
            y_rainfall.domain([0,50])
            xAxis_rainfall.transition().call(d3.axisBottom(x_rainfall))
            yAxis_class_rainfall.transition().call(d3.axisLeft(y_rainfall))

            x_mini.domain(d3.extent(data_prediction, function(d) { return d.date; }))
            y_mini.domain([-6,d3.max(data_prediction, function(d) { return +d.MaxTemp; })])
            xAxis_mini.transition().call(d3.axisBottom(x_mini))

            x_humid_mini.domain(d3.extent(data_prediction, function(d) { return d.date; }))
            y_humid_mini.domain([0,100])
            xAxis_humid_mini.transition().call(d3.axisBottom(x_humid_mini))

            x_rainfall_mini.domain(d3.extent(data_prediction, function(d) { return d.date; }))
            y_rainfall_mini.domain([0,50])
            xAxis_rainfall_mini.transition().call(d3.axisBottom(x_rainfall_mini))
          
            line.datum(data_prediction)
                .select('.line')
                .transition()
                .attr("d", d3.line()
                  .x(function(d) { return x(d.date) })
                  .y(function(d) { return y(d.MinTemp) })
              )
            line.datum(data_prediction)
                .select('.line1')
                .transition()
                .attr("d", d3.line()
                  .x(function(d) { return x(d.date) })
                  .y(function(d) { return y(d.MaxTemp) })
              )
            line_humid.datum(data_prediction)
                .select('.line2')
                .transition()
                .attr("d", d3.line()
                  .x(function(d) { return x_humid(d.date) })
                  .y(function(d) { return y_humid(d.Humidity9am) })
              )
            line_humid.datum(data_prediction)
                .select('.line3')
                .transition()
                .attr("d", d3.line()
                  .x(function(d) { return x_humid(d.date) })
                  .y(function(d) { return y_humid(d.Humidity3pm) })
              )
            line_rainfall.datum(data_prediction)
                .select('.line4')
                .transition()
                .attr("d", d3.line()
                  .x(function(d) { return x_rainfall(d.date) })
                  .y(function(d) { return y_rainfall(d.Rainfall) })
              )
            line_rainfall.datum(data_prediction)
                  .select('.area')
                  .transition()
                  .attr("d", rainfall_area)
                
            temp_mini.datum(data_prediction)
                  .select('.area1')
                  .transition()
                  .attr("d", temp_mini_area_max)
                
            temp_mini.datum(data_prediction)
                  .select('.area2')
                  .transition()
                  .attr("d", temp_mini_area_min)
                      
            humid_mini.datum(data_prediction)
                  .select('.area3')
                  .transition()
                  .attr("d", humid_mini_area_9am)
                      
            humid_mini.datum(data_prediction)
                  .select('.area4')
                  .transition()
                  .attr("d", humid_mini_area_3pm)

            rainfall_mini.datum(data_prediction)
                  .select('.area5')
                  .transition()
                  .attr("d", rainfall_area_mini)

          tooltip_temp.on("mousemove", function(){
                  var x0 = x.invert(d3.mouse(this)[0]),
                  i = bisectDate(data_prediction, x0, 1),
                  d0 = data_prediction[i - 1],
                  d1 = data_prediction[i],
                  d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;      
              focus_temp_min.attr("transform", "translate(" + x(d.date) + "," + y(d.MinTemp) + ")");
              focus_temp_min.select("text").text(function() { return d.MinTemp; });
              focus_temp_min.select(".x-hover-line").attr("y2", height - y(d.MinTemp));
              focus_temp_min.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_temp_max.attr("transform", "translate(" + x(d.date) + "," + y(d.MaxTemp) + ")");
              focus_temp_max.select("text").text(function() { return d.MaxTemp; });
              focus_temp_max.select(".x-hover-line").attr("y2", height - y(d.MaxTemp));
              focus_temp_max.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_humid_9am.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity9am) + ")");
              focus_humid_9am.select("text").text(function() { return d.Humidity9am; });
              focus_humid_9am.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity9am));
              focus_humid_9am.select(".y-hover-line").attr("x2", -x_humid(d.date));
              
              focus_humid_3pm.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity3pm) + ")");
              focus_humid_3pm.select("text").text(function() { return d.Humidity3pm; });
              focus_humid_3pm.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity3pm));
              focus_humid_3pm.select(".y-hover-line").attr("x2", -x_humid(d.date));

              focus_rainfall.attr("transform", "translate(" + x_humid(d.date) + "," + y_rainfall(d.Rainfall) + ")");
              focus_rainfall.select("text").text(function() { return d.Rainfall; });
              focus_rainfall.select(".x-hover-line").attr("y2", height - y_rainfall(d.Rainfall));
              focus_rainfall.select(".y-hover-line").attr("x2", -x_rainfall(d.date));
              
              rects.select("#rain_today").attr("fill", function(){if(d.Rain_today == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom").attr("fill", function(){if(d.Rain_tom == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom_pred").attr("fill", function(){if(d.Prediction == "No") {return "red";} else {return"green";}})
                })

          tooltip_humid.on("mousemove", function(){
                  var x0 = x.invert(d3.mouse(this)[0]),
                  i = bisectDate(data_prediction, x0, 1),
                  d0 = data_prediction[i - 1],
                  d1 = data_prediction[i],
                  d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;      
              focus_temp_min.attr("transform", "translate(" + x(d.date) + "," + y(d.MinTemp) + ")");
              focus_temp_min.select("text").text(function() { return d.MinTemp; });
              focus_temp_min.select(".x-hover-line").attr("y2", height - y(d.MinTemp));
              focus_temp_min.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_temp_max.attr("transform", "translate(" + x(d.date) + "," + y(d.MaxTemp) + ")");
              focus_temp_max.select("text").text(function() { return d.MaxTemp; });
              focus_temp_max.select(".x-hover-line").attr("y2", height - y(d.MaxTemp));
              focus_temp_max.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_humid_9am.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity9am) + ")");
              focus_humid_9am.select("text").text(function() { return d.Humidity9am; });
              focus_humid_9am.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity9am));
              focus_humid_9am.select(".y-hover-line").attr("x2", -x_humid(d.date));
              
              focus_humid_3pm.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity3pm) + ")");
              focus_humid_3pm.select("text").text(function() { return d.Humidity3pm; });
              focus_humid_3pm.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity3pm));
              focus_humid_3pm.select(".y-hover-line").attr("x2", -x_humid(d.date));

              focus_rainfall.attr("transform", "translate(" + x_humid(d.date) + "," + y_rainfall(d.Rainfall) + ")");
              focus_rainfall.select("text").text(function() { return d.Rainfall; });
              focus_rainfall.select(".x-hover-line").attr("y2", height - y_rainfall(d.Rainfall));
              focus_rainfall.select(".y-hover-line").attr("x2", -x_rainfall(d.date));
              
              rects.select("#rain_today").attr("fill", function(){if(d.Rain_today == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom").attr("fill", function(){if(d.Rain_tom == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom_pred").attr("fill", function(){if(d.Prediction == "No") {return "red";} else {return"green";}})
                })

          tooltip_rainfall.on("mousemove", function(){
                  var x0 = x.invert(d3.mouse(this)[0]),
                  i = bisectDate(data_prediction, x0, 1),
                  d0 = data_prediction[i - 1],
                  d1 = data_prediction[i],
                  d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;      
              focus_temp_min.attr("transform", "translate(" + x(d.date) + "," + y(d.MinTemp) + ")");
              focus_temp_min.select("text").text(function() { return d.MinTemp; });
              focus_temp_min.select(".x-hover-line").attr("y2", height - y(d.MinTemp));
              focus_temp_min.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_temp_max.attr("transform", "translate(" + x(d.date) + "," + y(d.MaxTemp) + ")");
              focus_temp_max.select("text").text(function() { return d.MaxTemp; });
              focus_temp_max.select(".x-hover-line").attr("y2", height - y(d.MaxTemp));
              focus_temp_max.select(".y-hover-line").attr("x2", -x(d.date));
              
              focus_humid_9am.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity9am) + ")");
              focus_humid_9am.select("text").text(function() { return d.Humidity9am; });
              focus_humid_9am.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity9am));
              focus_humid_9am.select(".y-hover-line").attr("x2", -x_humid(d.date));
              
              focus_humid_3pm.attr("transform", "translate(" + x_humid(d.date) + "," + y_humid(d.Humidity3pm) + ")");
              focus_humid_3pm.select("text").text(function() { return d.Humidity3pm; });
              focus_humid_3pm.select(".x-hover-line").attr("y2", height - y_humid(d.Humidity3pm));
              focus_humid_3pm.select(".y-hover-line").attr("x2", -x_humid(d.date));

              focus_rainfall.attr("transform", "translate(" + x_humid(d.date) + "," + y_rainfall(d.Rainfall) + ")");
              focus_rainfall.select("text").text(function() { return d.Rainfall; });
              focus_rainfall.select(".x-hover-line").attr("y2", height - y_rainfall(d.Rainfall));
              focus_rainfall.select(".y-hover-line").attr("x2", -x_rainfall(d.date));
              
              rects.select("#rain_today").attr("fill", function(){if(d.Rain_today == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom").attr("fill", function(){if(d.Rain_tom == "No") {return "red";} else {return"green";}})
              rects.select("#rain_tom_pred").attr("fill", function(){if(d.Prediction == "No") {return "red";} else {return"green";}})
                })
          })
        })
    })

})();