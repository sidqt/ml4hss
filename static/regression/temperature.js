(function(){
  // Set the dimensions and margins of the graph
      var margin = {top: 10, right: 30, bottom: 30, left: 60},
          margin2 = {top: 5, right: 30, bottom: 30, left: 60},
          width = 700 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom,
          height2 = 75 - margin2.top - margin.bottom;


      var parseTime = d3.timeParse("%d/%m/%Y");
      var formatTime = d3.timeFormat("%d/%m/%Y");
      var bisectDate = d3.bisector(function(d) { return d.date; }).left;

  //SVG for Temperature graph
    var temp_graph_title = d3.select("#reg_temp")
                            .append("text")
                            .attr("id", "temp_title")

    var svg_reg_temp = d3.select("#reg_temp")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
             "translate(" + margin.left + "," + margin.top + ")");

  //SVG for reg_predict graph

    var temp_graph_title_pred = d3.select("#reg_temp_prediction")
                                  .append("text")
                                  .attr("id", "temp_title_pred")

    var svg_reg_predict = d3.select("#reg_temp_prediction")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

  //SVG for mini Temperature graph
  
    var svg_reg_temp_mini = d3.select("#reg_temp_mini")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
        .attr("transform",
             "translate(" + margin.left + "," + margin2.top + ")");

  //SVG for mini reg_predict graph
  
    var svg_reg_predict_mini = d3.select("#reg_pred_temp_mini")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin2.top + ")");

  //////////////// Temp legend//////////////
  
    var svg_reg_temp_legend = d3.select("#reg_temp_legend")
                          .append("svg")
                          .attr("id", "regg_temp_legend")
                          .attr("width",300 )
                          .attr("height",100 ); 
    
  ///////////////// Prediction Legend//////////////////////

    var svg_outcomes_legend = d3.select("#reg_prediction_legend")
                          .append("svg")
                          .attr("id", "regg_prediction_legend")
                          .attr("width",300 )
                          .attr("height",100 );                      

    var regDataLoaded = "No"

  ///////////////// Metrics //////////////////////////////

    var mse_min_field = d3.select("#mse_field_min")
                .append("text")
                .attr("id", "mse_min_data")
                .text("Mean Squared Error : 0")

    var mse_max_field = d3.select("#mse_field_max")
                .append("text")
                .attr("id", "mse_max_data")
                .text("Mean Squared Error : 0")

    var r2_min_field = d3.select("#r2_field_min")
                .append("text")
                .attr("id", "r2_min_data")
                .text("R2 Score : 0%")
    
    var r2_max_field = d3.select("#r2_field_max")
                .append("text")
                .attr("id", "r2_max_data")
                .text("R2 Score : 0%")

  //Read the data
    d3.select("#reg_load_data").on("click", function(){

      if(regDataLoaded == "No"){
        regDataLoaded = "Yes"
      d3.csv("/regression/temperature/temp_data/original",

      // When reading the csv, I must format variables:
      function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow, Prediction_min : d.Prediction_min, Prediction_max : d.Prediction_max}
      },

      // Now I can use this dataset:
      function(data) {

            temp_graph_title.text("Minimum and Maximum Temperature - 2018")

            svg_reg_temp_legend.append("text")
                          .text("Temperature")
                          .attr("transform",
                                  "translate(0,15)");                      
            
            svg_reg_temp_legend.append("text")
                                  .text("Minimum Temperature")
                                  .attr("transform",
                                          "translate(70,50)");

            var rects_temp_legend = svg_reg_temp_legend.append("g")
                        .attr("transform",
                              "translate(0,0)")
            var rect_temp_legend = rects_temp_legend.append("rect")
                        .attr("width", 50 )
                        .attr("height", 20)
                        .attr("fill", "green")
                        .attr("transform","translate(0,35)");
            svg_reg_temp_legend.append("text")
                                  .text("Maximum Temperature")
                                  .attr("transform",
                                          "translate(70,90)");
            var rect_2_temp_legend = rects_temp_legend.append("rect")
                        .attr("width", 50 )
                        .attr("height", 20)
                        .attr("fill", "red")
                        .attr("transform", "translate(0,75)");

            temp_graph_title_pred.text("Temperature Prediction")

            svg_outcomes_legend.append("text")
                        .text("Predictions")
                        .attr("transform",
                                "translate(0,15)");                      
            svg_outcomes_legend.append("text")
                                  .text("Minimum Temperature")
                                  .attr("transform",
                                          "translate(70,50)");

            var rects_outcomes_legend = svg_outcomes_legend.append("g")
                        .attr("transform",
                              "translate(0,0)")
            var rect_outcomes_legend = rects_outcomes_legend.append("rect")
                        .attr("width", 50 )
                        .attr("height", 20)
                        .attr("fill", "lightgreen")
                        .attr("transform","translate(0,35)");
            svg_outcomes_legend.append("text")
                                  .text("Maximum Temperature")
                                  .attr("transform",
                                          "translate(70,90)");
            var rect_2_outcomes_legend = rects_outcomes_legend.append("rect")
                        .attr("width", 50 )
                        .attr("height", 20)
                        .attr("fill", "pink")
                        .attr("transform", "translate(0,75)"); 
        

        // Temp graph Axis
            // Add X axis --> it is a date format
            var x = d3.scaleTime()
              .domain(d3.extent(data, function(d) { return d.date; }))
              .range([ 0, width ]);
            xAxis = svg_reg_temp.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

            // Add Y axis
            var y = d3.scaleLinear()
              .domain([-6,d3.max(data, function(d) { return +d.MaxTemp; })])
              //.domain([0,1])
              .range([ height, 0 ]);
            yAxis = svg_reg_temp.append("g")
              .call(d3.axisLeft(y));

            // Add a clipPath: everything out of this area won't be drawn.
            var clip = svg_reg_temp.append("defs").append("svg:clipPath")
                .attr("id", "reg_clip")
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
            xAxis_mini = svg_reg_temp_mini.append("g")
              .attr("transform", "translate(0," + height2 + ")")
              .call(d3.axisBottom(x_mini));

            // Add Y axis
            var y_mini = d3.scaleLinear()
              .domain([-6,d3.max(data, function(d) { return +d.MaxTemp; })])
              .range([ height2, 0 ]);
            //yAxis_mini = svg_reg_temp_mini.append("g")
             // .call(d3.axisLeft(y_mini));

            // Add a clipPath: everything out of this area won't be drawn.
            var clip_mini = svg_reg_temp_mini.append("defs").append("svg:clipPath")
                .attr("id", "reg_clip_mini")
                .append("svg:rect")
                .attr("width", width )
                .attr("height", height2 )
                .attr("x", 0)
                .attr("y", 0);

        // reg_predict Graph Axis

            // Add X axis --> it is a date format
            var x_reg_predict = d3.scaleTime()
              .domain(d3.extent(data, function(d) { return d.date; }))
              .range([ 0, width ]);
            xAxis_reg_predict = svg_reg_predict.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x_reg_predict));
                 // Add Y axis
            var y_reg_predict = d3.scaleLinear()
              .domain([-6,d3.max(data, function(d) { return +d.Prediction_max; })])
              .range([ height, 0 ]);
            yAxis_reg_predict = svg_reg_predict.append("g")
              .call(d3.axisLeft(y_reg_predict));
          
                // Add a clipPath: everything out of this area won't be drawn.
            var clip_reg_predict = svg_reg_predict.append("defs").append("svg:clipPath")
                .attr("id", "reg_clip_reg_predict")
                .append("svg:rect")
                .attr("width", width )
                .attr("height", height )
                .attr("x", 0)
                .attr("y", 0);

            // reg_predict mini Graph
            // Add X axis --> it is a date format
            var x_reg_predict_mini = d3.scaleTime()
              .domain(d3.extent(data, function(d) { return d.date; }))
              .range([ 0, width ]);
            xAxis_reg_predict_mini = svg_reg_predict_mini.append("g")
              .attr("transform", "translate(0," + height2 + ")")
              .call(d3.axisBottom(x_reg_predict_mini));
                 // Add Y axis
            var y_reg_predict_mini = d3.scaleLinear()
              .domain([-6,d3.max(data, function(d) { return +d.Prediction_max; })])
              .range([ height2, 0 ]);
            //yAxis_reg_predict_mini = svg_reg_predict_mini.append("g")
             // .call(d3.axisLeft(y_reg_predict_mini));
          
                // Add a clipPath: everything out of this area won't be drawn.
            var clip_reg_predict_mini = svg_reg_predict_mini.append("defs").append("svg:clipPath")
                .attr("id", "reg_clip_reg_predict_mini")
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
              var reg_line = svg_reg_temp.append('g')
                .attr("clip-path", "url(#reg_clip)")

                  // Add the line
              reg_line.append("path")
                .datum(data)
                .attr("class", "reg_line")  // I add the class line to be able to modify this line later on.
                .attr("fill", "none")
                .attr("stroke", "green")
                .attr("stroke-width", 1)
                .attr("d", d3.line()
                  .x(function(d) { return x(d.date) })
                  .y(function(d) { return y(d.MinTemp) })
                  );
              reg_line.append("path")
                .datum(data)
                .attr("class", "reg_line1")  // I add the class line to be able to modify this line later on.
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
              var temp_mini = svg_reg_temp_mini.append('g')
                .attr("clip-path", "url(#reg_clip_mini)");
                
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
              var focus_temp_min = svg_reg_temp.append("g")
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

              var focus_temp_max = svg_reg_temp.append("g")
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
              var tooltip_temp = svg_reg_temp.append("rect")
                  //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                  .attr("class", "overlay")
                  .attr("width", width)
                  .attr("height", height)
                  .on("mouseover", function() { 
                      //focus_humid_3pm.style("display", null);
                      //focus_humid_9am.style("display", null); 
                      focus_temp_min.style("display", null);
                      focus_temp_max.style("display", null);
                      focus_pred_max.style("display", null);
                      focus_pred_min.style("display", null);  
                  })
                  .on("mouseout", function() { 
                      //focus_humid_3pm.style("display", "none");
                      //focus_humid_9am.style("display", "none"); 
                      focus_temp_min.style("display", "none");
                      focus_temp_max.style("display", "none"); 
                      focus_pred_max.style("display", "none");
                      focus_pred_min.style("display", "none");
                  })
                  .on("mousemove", mousemove);
               
             

              // Temp Graph X Axis label
              svg_reg_temp.append("text")             
                .attr("transform",
                      "translate(" + (width/2) + " ," + 
                                     (height + margin.top + 20) + ")")
                .style("text-anchor", "middle")
                .text("Date");

              // Temp Graph Y Axis label
              svg_reg_temp.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Temperature ( C )"); 

        // reg_predict Graph

            // Add brushing
            var brush_reg_predict = d3.brushX()                   // Add the brush feature using the d3.brush function
                .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
                .on("end", updateChart_reg_predict)           // Each time the brush selection changes, trigger the 'updateChart' function

            // Create the line variable: where both the line and the brush take place
            var reg_line_reg_predict = svg_reg_predict.append('g')
                .attr("clip-path", "url(#reg_clip_reg_predict)")

               // Add the line
            reg_line_reg_predict.append("path")
              .datum(data)
              .attr("class", "reg_line4")  // I add the class line to be able to modify this line later on.
              .attr("fill", "none")
              .attr("stroke", "pink")
              .attr("stroke-width", 1)
              .attr("d", d3.line()
                .x(function(d) { return x_reg_predict(d.date) })
                .y(function(d) { return y_reg_predict(d.Prediction_max) })
                )
            reg_line_reg_predict.append("path")
              .datum(data)
              .attr("class", "reg_line5")  // I add the class line to be able to modify this line later on.
              .attr("fill", "none")
              .attr("stroke", "lightgreen")
              .attr("stroke-width", 1)
              .attr("d", d3.line()
                .x(function(d) { return x_reg_predict(d.date) })
                .y(function(d) { return y_reg_predict(d.Prediction_min) })
                )

            var pred_max_area_mini = d3.area()
              //.curve(d3.curveMonotoneX)
              .x(function(d) { return x_reg_predict_mini(d.date); })
              .y0(height2)
              .y1(function(d) { return y_reg_predict_mini(d.Prediction_max); });

            var pred_min_area_mini = d3.area()
              //.curve(d3.curveMonotoneX)
              .x(function(d) { return x_reg_predict_mini(d.date); })
              .y0(height2)
              .y1(function(d) { return y_reg_predict_mini(d.Prediction_min); });

               // Add the brushing
            var reg_predict_mini = svg_reg_predict_mini.append('g')
                .attr("clip-path", "url(#reg_clip_reg_predict_mini)");
                
              reg_predict_mini.append("path")
                .datum(data)
                .attr("class", "area5")
                .attr("d", pred_max_area_mini)
                .attr("fill", "pink")
                .attr("opacity", 0.6);
              reg_predict_mini.append("path")
                .datum(data)
                .attr("class", "area6")
                .attr("d", pred_min_area_mini)
                .attr("fill", "lightgreen")
                .attr("opacity", 0.6);


            // Add the brushing
            reg_predict_mini
              .append("g")
                .attr("class", "brush")
                .call(brush_reg_predict);


            var focus_pred_max = svg_reg_predict.append("g")
                    .attr("class", "focus")
                    .style("display", "none");
                focus_pred_max.append("line")
                    .attr("class", "x-hover-line hover-line")
                    .attr("y1", 0)
                    .attr("y2", height);
                focus_pred_max.append("line")
                    .attr("class", "y-hover-line hover-line")
                    .attr("x1", 0)
                    .attr("x2", width);
                focus_pred_max.append("circle").attr("r", 2);
                focus_pred_max.append("text")
                    .attr("x", 15)
                    .attr("dy", ".31em");
            var focus_pred_min = svg_reg_predict.append("g")
                    .attr("class", "focus")
                    .style("display", "none");
                focus_pred_min.append("line")
                    .attr("class", "x-hover-line hover-line")
                    .attr("y1", 0)
                    .attr("y2", height);
                focus_pred_min.append("line")
                    .attr("class", "y-hover-line hover-line")
                    .attr("x1", 0)
                    .attr("x2", width);
                focus_pred_min.append("circle").attr("r", 2);
                focus_pred_min.append("text")
                    .attr("x", 15)
                    .attr("dy", ".31em");
                var tooltip_reg_predict =svg_reg_predict.append("rect")
                    .attr("class", "overlay")
                    .attr("width", width)
                    .attr("height", height)
                    .on("mouseover", function() { 
                      //focus_humid_3pm.style("display", null);
                      //focus_humid_9am.style("display", null); 
                      focus_temp_min.style("display", null);
                      focus_temp_max.style("display", null);
                      focus_pred_max.style("display", null);
                      focus_pred_min.style("display", null); 
                    })
                    .on("mouseout", function() { 
                      //focus_humid_3pm.style("display", "none");
                      //focus_humid_9am.style("display", "none"); 
                      focus_temp_min.style("display", "none");
                      focus_temp_max.style("display", "none"); 
                      focus_pred_max.style("display", "none");
                      focus_pred_min.style("display", "none");
                    })
                    .on("mousemove", mousemove);



                // reg_predict Graph X Axis label
                svg_reg_predict.append("text")             
                  .attr("transform",
                        "translate(" + (width/2) + " ," + 
                                       (height + margin.top + 20) + ")")
                  .style("text-anchor", "middle")
                  .text("Date");

                // reg_predict Graph Y Axis label
                svg_reg_predict.append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 0 - margin.left)
                  .attr("x",0 - (height / 2))
                  .attr("dy", "1em")
                  .style("text-anchor", "middle")
                  .text("Temperature ( C )"); 
          
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
                  x_reg_predict.domain([4,8])
                  x_mini.domain([ 4,8])
                  x_reg_predict_mini.domain([4,8])
            }else{
                x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
                x_reg_predict.domain([ x_reg_predict.invert(extent[0]), x_reg_predict.invert(extent[1]) ])
                x_mini.domain([ x_mini.invert(extent[0]), x_mini.invert(extent[1]) ])
                x_reg_predict_mini.domain([ x_reg_predict_mini.invert(extent[0]), x_reg_predict_mini.invert(extent[1]) ])
                temp_mini.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
            }  

                xAxis.transition().duration(1000).call(d3.axisBottom(x))
                reg_line
                .select('.reg_line')
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                  .x(function(d) { return x(d.date) })
                  .y(function(d) { return y(d.MinTemp) })
                )
                reg_line
                .select('.reg_line1')
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                  .x(function(d) { return x(d.date) })
                  .y(function(d) { return y(d.MaxTemp) })
                ) 

                xAxis_reg_predict.transition().duration(1000).call(d3.axisBottom(x_reg_predict))
                reg_line_reg_predict
                .select('.reg_line4')
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                  .x(function(d) { return x_reg_predict(d.date) })
                  .y(function(d) { return y_reg_predict(d.Prediction_max) })
                )
                reg_line_reg_predict
                .select('.reg_line5')
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                  .x(function(d) { return x_reg_predict(d.date) })
                  .y(function(d) { return y_reg_predict(d.Prediction_min) })
                )

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

                xAxis_reg_predict_mini.transition().duration(1000).call(d3.axisBottom(x_reg_predict_mini))

                reg_predict_mini
                .select('.area5')
                .transition()
                .duration(1000)
                .attr("d", pred_max_area_mini)
                reg_predict_mini
                .select('.area6')
                .transition()
                .duration(1000)
                .attr("d", pred_min_area_mini)
            }

          function updateChart_reg_predict() {
            // What are the selected boundaries?
            extent = d3.event.selection
            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if(!extent){
              if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
              x.domain([ 4,8])
              x_reg_predict.domain([4,8])
              x_mini.domain([ 4,8])
              x_reg_predict_mini.domain([4,8])
            }else{
              x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
              x_reg_predict.domain([ x_reg_predict.invert(extent[0]), x_reg_predict.invert(extent[1]) ])
              x_mini.domain([ x_mini.invert(extent[0]), x_mini.invert(extent[1]) ])
              x_reg_predict_mini.domain([ x_reg_predict_mini.invert(extent[0]), x_reg_predict_mini.invert(extent[1]) ])
              reg_predict_mini.select(".brush").call(brush_reg_predict.move, null) // This remove the grey brush area as soon as the selection has been done
            }  

                xAxis.transition().duration(1000).call(d3.axisBottom(x))
                reg_line
                .select('.reg_line')
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                  .x(function(d) { return x(d.date) })
                  .y(function(d) { return y(d.MinTemp) })
                )
                reg_line
                .select('.reg_line1')
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                  .x(function(d) { return x(d.date) })
                  .y(function(d) { return y(d.MaxTemp) })
                ) 
                

                xAxis_reg_predict.transition().duration(1000).call(d3.axisBottom(x_reg_predict))
                reg_line_reg_predict
                .select('.reg_line4')
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                  .x(function(d) { return x_reg_predict(d.date) })
                  .y(function(d) { return y_reg_predict(d.Prediction_max) })
                )
                reg_line_reg_predict
                .select('.reg_line5')
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                  .x(function(d) { return x_reg_predict(d.date) })
                  .y(function(d) { return y_reg_predict(d.Prediction_min) })
                )

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

                xAxis_reg_predict_mini.transition().duration(1000).call(d3.axisBottom(x_reg_predict_mini))

                reg_predict_mini
                .select('.area5')
                .transition()
                .duration(1000)
                .attr("d", pred_max_area_mini)
                
                reg_predict_mini
                .select('.area6')
                .transition()
                .duration(1000)
                .attr("d", pred_min_area_mini)
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

              focus_pred_max.attr("transform", "translate(" + x_reg_predict(d.date) + "," + y_reg_predict(d.Prediction_max) + ")");
              focus_pred_max.select("text").text(function() { return d.Prediction_max; });
              focus_pred_max.select(".x-hover-line").attr("y2", height - y_reg_predict(d.Prediction_max));
              focus_pred_max.select(".y-hover-line").attr("x2", -x_reg_predict(d.date));

              focus_pred_min.attr("transform", "translate(" + x_reg_predict(d.date) + "," + y_reg_predict(d.Prediction_min) + ")");
              focus_pred_min.select("text").text(function() { return d.Prediction_min; });
              focus_pred_min.select(".x-hover-line").attr("y2", height - y_reg_predict(d.Prediction_min));
              focus_pred_min.select(".y-hover-line").attr("x2", -x_reg_predict(d.date));
              
              }

        // If user double click, reinitialize the chart
        
          svg_reg_temp.on("dblclick",function(){
              x.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis.transition().call(d3.axisBottom(x))

              x_reg_predict.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_reg_predict.transition().call(d3.axisBottom(x_reg_predict))

              x_mini.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_mini.transition().call(d3.axisBottom(x_mini))

              x_reg_predict_mini.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_reg_predict_mini.transition().call(d3.axisBottom(x_reg_predict_mini))
            
              reg_line
                  .select('.reg_line')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.MinTemp) })
                )
              reg_line
                  .select('.reg_line1')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.MaxTemp) })
                )

              reg_line_reg_predict
                  .select('.reg_line4')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x_reg_predict(d.date) })
                    .y(function(d) { return y_reg_predict(d.Prediction_max) })
                )
              reg_line_reg_predict
                  .select('.reg_line5')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x_reg_predict(d.date) })
                    .y(function(d) { return y_reg_predict(d.Prediction_min) })
                )

                  
              temp_mini
                    .select('.area1')
                    .transition()
                    .attr("d", temp_mini_area_max)
                  
              temp_mini
                    .select('.area2')
                    .transition()
                    .attr("d", temp_mini_area_min)

              reg_predict_mini
                    .select('.area5')
                    .transition()
                    .attr("d", pred_max_area_mini)
              reg_predict_mini
                    .select('.area6')
                    .transition()
                    .attr("d", pred_min_area_mini)      

              });

          svg_reg_predict.on("dblclick",function(){
              x.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis.transition().call(d3.axisBottom(x))

              x_reg_predict.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_reg_predict.transition().call(d3.axisBottom(x_reg_predict))

              x_mini.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_mini.transition().call(d3.axisBottom(x_mini))

              x_reg_predict_mini.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_reg_predict_mini.transition().call(d3.axisBottom(x_reg_predict_mini))
            
              reg_line
                  .select('.reg_line')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.MinTemp) })
                )
              reg_line
                  .select('.reg_line1')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.MaxTemp) })
                )

              reg_line_reg_predict
                  .select('.reg_line4')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x_reg_predict(d.date) })
                    .y(function(d) { return y_reg_predict(d.Prediction_max) })
                )
              reg_line_reg_predict
                  .select('.reg_line5')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x_reg_predict(d.date) })
                    .y(function(d) { return y_reg_predict(d.Prediction_min) })
                )

                  
              temp_mini
                    .select('.area1')
                    .transition()
                    .attr("d", temp_mini_area_max)
                  
              temp_mini
                    .select('.area2')
                    .transition()
                    .attr("d", temp_mini_area_min)

              reg_predict_mini
                    .select('.area5')
                    .transition()
                    .attr("d", pred_max_area_mini)
              reg_predict_mini
                    .select('.area6')
                    .transition()
                    .attr("d", pred_min_area_mini)   
              });

          svg_reg_temp_mini.on("dblclick",function(){
              x.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis.transition().call(d3.axisBottom(x))

              x_reg_predict.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_reg_predict.transition().call(d3.axisBottom(x_reg_predict))

              x_mini.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_mini.transition().call(d3.axisBottom(x_mini))

              x_reg_predict_mini.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_reg_predict_mini.transition().call(d3.axisBottom(x_reg_predict_mini))
            
              reg_line
                  .select('.reg_line')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.MinTemp) })
                )
              reg_line
                  .select('.reg_line1')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.MaxTemp) })
                )

              reg_line_reg_predict
                  .select('.reg_line4')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x_reg_predict(d.date) })
                    .y(function(d) { return y_reg_predict(d.Prediction_max) })
                )
              reg_line_reg_predict
                  .select('.reg_line5')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x_reg_predict(d.date) })
                    .y(function(d) { return y_reg_predict(d.Prediction_min) })
                )

                  
              temp_mini
                    .select('.area1')
                    .transition()
                    .attr("d", temp_mini_area_max)
                  
              temp_mini
                    .select('.area2')
                    .transition()
                    .attr("d", temp_mini_area_min)

              reg_predict_mini
                    .select('.area5')
                    .transition()
                    .attr("d", pred_max_area_mini)
              reg_predict_mini
                    .select('.area6')
                    .transition()
                    .attr("d", pred_min_area_mini)   
              });

          svg_reg_predict_mini.on("dblclick",function(){
              x.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis.transition().call(d3.axisBottom(x))

              x_reg_predict.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_reg_predict.transition().call(d3.axisBottom(x_reg_predict))

              x_mini.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_mini.transition().call(d3.axisBottom(x_mini))

              x_reg_predict_mini.domain(d3.extent(data, function(d) { return d.date; }))
              xAxis_reg_predict_mini.transition().call(d3.axisBottom(x_reg_predict_mini))
            
              reg_line
                  .select('.reg_line')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.MinTemp) })
                )
              reg_line
                  .select('.reg_line1')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.MaxTemp) })
                )

              reg_line_reg_predict
                  .select('.reg_line4')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x_reg_predict(d.date) })
                    .y(function(d) { return y_reg_predict(d.Prediction_max) })
                )
              reg_line_reg_predict
                  .select('.reg_line5')
                  .transition()
                  .attr("d", d3.line()
                    .x(function(d) { return x_reg_predict(d.date) })
                    .y(function(d) { return y_reg_predict(d.Prediction_min) })
                )

                  
              temp_mini
                    .select('.area1')
                    .transition()
                    .attr("d", temp_mini_area_max)
                  
              temp_mini
                    .select('.area2')
                    .transition()
                    .attr("d", temp_mini_area_min)

              reg_predict_mini
                    .select('.area5')
                    .transition()
                    .attr("d", pred_max_area_mini)
              reg_predict_mini
                    .select('.area6')
                    .transition()
                    .attr("d", pred_min_area_mini)   
              });
        
        // Normalization Button

          d3.select("#reg_feature_normalization").on("click", function(){
            d3.csv("/regression/temperature/temp_data/normalized",

                // When reading the csv, I must format variables:
              function(d){
                return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow, Prediction_min : d.Prediction_min, Prediction_max : d.Prediction_max}
              },

                // Now I can use this dataset:
              function(data_normalized) {
                  //console.log(data_normalized.MinTemp)
                  x.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                  y.domain([0,1])
                  xAxis.transition().call(d3.axisBottom(x))
                  yAxis.transition().call(d3.axisLeft(y))

                  //x_humid.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                  //y_humid.domain([0,1])
                  //xAxis_humid.transition().call(d3.axisBottom(x_humid))
                  //yAxis_humid.transition().call(d3.axisLeft(y_humid))

                  x_reg_predict.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                  y_reg_predict.domain([0,1])
                  xAxis_reg_predict.transition().call(d3.axisBottom(x_reg_predict))
                  yAxis_reg_predict.transition().call(d3.axisLeft(y_reg_predict))

                  x_mini.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                  y_mini.domain([0,1])
                  xAxis_mini.transition().call(d3.axisBottom(x_mini))

                  //x_humid_mini.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                  //y_humid_mini.domain([0,1])
                  //xAxis_humid_mini.transition().call(d3.axisBottom(x_humid_mini))

                  x_reg_predict_mini.domain(d3.extent(data_normalized, function(d) { return d.date; }))
                  y_reg_predict_mini.domain([0,1])
                  xAxis_reg_predict_mini.transition().call(d3.axisBottom(x_reg_predict_mini))
                
                  reg_line.datum(data_normalized)
                      .select('.reg_line')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x(d.date) })
                        .y(function(d) { return y(d.MinTemp) })
                    )
                  reg_line.datum(data_normalized)
                      .select('.reg_line1')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x(d.date) })
                        .y(function(d) { return y(d.MaxTemp) })
                    )
                  
                  reg_line_reg_predict.datum(data_normalized)
                      .select('.reg_line4')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x_reg_predict(d.date) })
                        .y(function(d) { return y_reg_predict(d.Prediction_max) })
                    )
                  reg_line_reg_predict.datum(data_normalized)
                      .select('.reg_line5')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x_reg_predict(d.date) })
                        .y(function(d) { return y_reg_predict(d.Prediction_min) })
                    )

                      
                  temp_mini.datum(data_normalized)
                        .select('.area2')
                        .transition()
                        .attr("d", temp_mini_area_min)

                  temp_mini.datum(data_normalized)
                        .select('.area1')
                        .transition()
                        .attr("d", temp_mini_area_max)
                      
                  reg_predict_mini.datum(data_normalized)
                        .select('.area6')
                        .transition()
                        .attr("d", pred_min_area_mini)

                  reg_predict_mini.datum(data_normalized)
                        .select('.area5')
                        .transition()
                        .attr("d", pred_max_area_mini)


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

                focus_pred_max.attr("transform", "translate(" + x_reg_predict(d.date) + "," + y_reg_predict(d.Prediction_max) + ")");
                focus_pred_max.select("text").text(function() { return d.Prediction_max; });
                focus_pred_max.select(".x-hover-line").attr("y2", height - y_reg_predict(d.Prediction_max));
                focus_pred_max.select(".y-hover-line").attr("x2", -x_reg_predict(d.date));

                focus_pred_min.attr("transform", "translate(" + x_reg_predict(d.date) + "," + y_reg_predict(d.Prediction_min) + ")");
                focus_pred_min.select("text").text(function() { return d.Prediction_min; });
                focus_pred_min.select(".x-hover-line").attr("y2", height - y_reg_predict(d.Prediction_min));
                focus_pred_min.select(".y-hover-line").attr("x2", -x_reg_predict(d.date));
                
                  })

            tooltip_reg_predict.on("mousemove", function(){
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
                

                focus_pred_max.attr("transform", "translate(" + x_reg_predict(d.date) + "," + y_reg_predict(d.Prediction_max) + ")");
                focus_pred_max.select("text").text(function() { return d.Prediction_max; });
                focus_pred_max.select(".x-hover-line").attr("y2", height - y_reg_predict(d.Prediction_max));
                focus_pred_max.select(".y-hover-line").attr("x2", -x_reg_predict(d.date));

                focus_pred_min.attr("transform", "translate(" + x_reg_predict(d.date) + "," + y_reg_predict(d.Prediction_min) + ")");
                focus_pred_min.select("text").text(function() { return d.Prediction_min; });
                focus_pred_min.select(".x-hover-line").attr("y2", height - y_reg_predict(d.Prediction_min));
                focus_pred_min.select(".y-hover-line").attr("x2", -x_reg_predict(d.date));
                  })

                })
            })

        // Original Data

          d3.select("#reg_original").on("click", function(){
            d3.csv("/regression/temperature/temp_data/original",

              // When reading the csv, I must format variables:
            function(d){
              return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow, Prediction_min : d.Prediction_min, Prediction_max : d.Prediction_max}
            },

              // Now I can use this dataset:
            function(data_original) {

              x.domain(d3.extent(data_original, function(d) { return d.date; }))
              y.domain([-6,d3.max(data_original, function(d) { return +d.MaxTemp; })])
              xAxis.transition().call(d3.axisBottom(x))
              yAxis.transition().call(d3.axisLeft(y))

              x_reg_predict.domain(d3.extent(data_original, function(d) { return d.date; }))
              y_reg_predict.domain([-6,d3.max(data, function(d) { return +d.Prediction_max; })])
              xAxis_reg_predict.transition().call(d3.axisBottom(x_reg_predict))
              yAxis_reg_predict.transition().call(d3.axisLeft(y_reg_predict))

              x_mini.domain(d3.extent(data_original, function(d) { return d.date; }))
              y_mini.domain([-6,d3.max(data_original, function(d) { return +d.MaxTemp; })])
              xAxis_mini.transition().call(d3.axisBottom(x_mini))

              x_reg_predict_mini.domain(d3.extent(data_original, function(d) { return d.date; }))
              y_reg_predict_mini.domain([-6,d3.max(data, function(d) { return +d.Prediction_max; })])
              xAxis_reg_predict_mini.transition().call(d3.axisBottom(x_reg_predict_mini))
            
              reg_line.datum(data_original)
                      .select('.reg_line')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x(d.date) })
                        .y(function(d) { return y(d.MinTemp) })
                    )
                  reg_line.datum(data_original)
                      .select('.reg_line1')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x(d.date) })
                        .y(function(d) { return y(d.MaxTemp) })
                    )

                  reg_line_reg_predict.datum(data_original)
                      .select('.reg_line4')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x_reg_predict(d.date) })
                        .y(function(d) { return y_reg_predict(d.Prediction_max) })
                    )
                  reg_line_reg_predict.datum(data_original)
                      .select('.reg_line5')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x_reg_predict(d.date) })
                        .y(function(d) { return y_reg_predict(d.Prediction_min) })
                    )

                      
                  temp_mini.datum(data_original)
                        .select('.area1')
                        .transition()
                        .attr("d", temp_mini_area_max)
                      
                  temp_mini.datum(data_original)
                        .select('.area2')
                        .transition()
                        .attr("d", temp_mini_area_min)

                  reg_predict_mini.datum(data_original)
                        .select('.area5')
                        .transition()
                        .attr("d", pred_max_area_mini)

                  reg_predict_mini.datum(data_original)
                        .select('.area6')
                        .transition()
                        .attr("d", pred_min_area_mini)

              tooltip_temp.on("mousemove", mousemove)
              tooltip_reg_predict.on("mousemove", mousemove)
            })
            })

        // Prediction Button

          d3.select("#reg_predict").on("click", function(){
            d3.csv("/regression/temperature/temp_data/prediction",

              // When reading the csv, I must format variables:
            function(d){
              return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow, Prediction_min : d.Prediction_min, Prediction_max : d.Prediction_max}
            },

              // Now I can use this dataset:
            function(data_prediction) {

                d3.json("/regression/temperature/temp_data/prediction/metrics", 

                  function(d){
                    mse_min_field.text("Mean Squared Error : " + (d.mse_min.toFixed(4)))
                    r2_min_field.text("R2 Score : " + (d.r2_min.toFixed(2) * 100) + "%")
                    mse_max_field.text("Mean Squared Error : " + (d.mse_max.toFixed(4)))
                    r2_max_field.text("R2 Score : " + (d.r2_max.toFixed(2) * 100) + "%")

                  });

              x.domain(d3.extent(data_prediction, function(d) { return d.date; }))
              y.domain([-6,d3.max(data_prediction, function(d) { return +d.MaxTemp; })])
              xAxis.transition().call(d3.axisBottom(x))
              yAxis.transition().call(d3.axisLeft(y))

              x_reg_predict.domain(d3.extent(data_prediction, function(d) { return d.date; }))
              y_reg_predict.domain([-6,d3.max(data_prediction, function(d) { return +d.Prediction_max; })])
              xAxis_reg_predict.transition().call(d3.axisBottom(x_reg_predict))
              yAxis_reg_predict.transition().call(d3.axisLeft(y_reg_predict))

              x_mini.domain(d3.extent(data_prediction, function(d) { return d.date; }))
              y_mini.domain([-6,d3.max(data_prediction, function(d) { return +d.MaxTemp; })])
              xAxis_mini.transition().call(d3.axisBottom(x_mini))

              x_reg_predict_mini.domain(d3.extent(data_prediction, function(d) { return d.date; }))
              y_reg_predict_mini.domain([-6,d3.max(data_prediction, function(d) { return +d.Prediction_max; })])
              xAxis_reg_predict_mini.transition().call(d3.axisBottom(x_reg_predict_mini))
            
              reg_line.datum(data_prediction)
                      .select('.reg_line')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x(d.date) })
                        .y(function(d) { return y(d.MinTemp) })
                      )
              reg_line.datum(data_prediction)
                      .select('.reg_line1')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x(d.date) })
                        .y(function(d) { return y(d.MaxTemp) })
                      )

              reg_line_reg_predict.datum(data_prediction)
                      .select('.reg_line4')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x_reg_predict(d.date) })
                        .y(function(d) { return y_reg_predict(d.Prediction_max) })
                      )
              reg_line_reg_predict.datum(data_prediction)
                      .select('.reg_line5')
                      .transition()
                      .attr("d", d3.line()
                        .x(function(d) { return x_reg_predict(d.date) })
                        .y(function(d) { return y_reg_predict(d.Prediction_min) })
                      )
                      
              temp_mini.datum(data_prediction)
                        .select('.area2')
                        .transition()
                        .attr("d", temp_mini_area_min)

              temp_mini.datum(data_prediction)
                        .select('.area1')
                        .transition()
                        .attr("d", temp_mini_area_max)
                      
              reg_predict_mini.datum(data_prediction)
                        .select('.area5')
                        .transition()
                        .attr("d", pred_max_area_mini)

              reg_predict_mini.datum(data_prediction)
                        .select('.area6')
                        .transition()
                        .attr("d", pred_min_area_mini)

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

                    focus_pred_max.attr("transform", "translate(" + x_reg_predict(d.date) + "," + y_reg_predict(d.Prediction_max) + ")");
                    focus_pred_max.select("text").text(function() { return d.Prediction_max; });
                    focus_pred_max.select(".x-hover-line").attr("y2", height - y_reg_predict(d.Prediction_max));
                    focus_pred_max.select(".y-hover-line").attr("x2", -x_reg_predict(d.date));

                    focus_pred_min.attr("transform", "translate(" + x_reg_predict(d.date) + "," + y_reg_predict(d.Prediction_min) + ")");
                    focus_pred_min.select("text").text(function() { return d.Prediction_min; });
                    focus_pred_min.select(".x-hover-line").attr("y2", height - y_reg_predict(d.Prediction_min));
                    focus_pred_min.select(".y-hover-line").attr("x2", -x_reg_predict(d.date));
                    })
           
           tooltip_reg_predict.on("mousemove", function(){
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

                    focus_pred_max.attr("transform", "translate(" + x_reg_predict(d.date) + "," + y_reg_predict(d.Prediction_max) + ")");
                    focus_pred_max.select("text").text(function() { return d.Prediction_max; });
                    focus_pred_max.select(".x-hover-line").attr("y2", height - y_reg_predict(d.Prediction_max));
                    focus_pred_max.select(".y-hover-line").attr("x2", -x_reg_predict(d.date));

                    focus_pred_min.attr("transform", "translate(" + x_reg_predict(d.date) + "," + y_reg_predict(d.Prediction_min) + ")");
                    focus_pred_min.select("text").text(function() { return d.Prediction_min; });
                    focus_pred_min.select(".x-hover-line").attr("y2", height - y_reg_predict(d.Prediction_min));
                    focus_pred_min.select(".y-hover-line").attr("x2", -x_reg_predict(d.date));
                    })
            })
          })
        })  
      }})

})();