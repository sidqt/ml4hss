(function(){
	// set the dimensions and margins of the graph
		var margin = {top: 10, right: 30, bottom: 30, left: 60},
		    margin2 = {top: 5, right: 30, bottom: 30, left: 60},
		    width = 850 - margin.left - margin.right,
		    height = 450 - margin.top - margin.bottom,
		    height2 = 75 - margin2.top - margin.bottom;


		var parseTime = d3.timeParse("%d/%m/%Y");
		var formatTime = d3.timeFormat("%d/%m/%Y");
		var bisectDate = d3.bisector(function(d) { return d.date; }).left;
	
	//SVG for Temperature graph

		  	//////////////// Temp legend//////////////
	
		var svg_graph_legend = d3.select("#Graph_legend")
		                      .append("svg")
		                      .attr("id", "temp_legend")
		                      .attr("width",300 )
		                      .attr("height",100 );
		
		var rects_legend = svg_graph_legend.append("g")
		            .attr("transform",
		                  "translate(0,0)");

		var graph_title = d3.select("#Graph_main")
								.append("text")
								.attr("id", "grph_title")
								.attr("text-anchor", "end");
		

		var svg_graph = d3.select("#Graph_main")
						  .append("svg")
						    .attr("width", width + margin.left + margin.right)
						    .attr("height", height + margin.top + margin.bottom)
						  .append("g")
						    .attr("transform",
						         "translate(" + margin.left + "," + margin.top + ")");



		

	//SVG for mini Temperature graph
	
		var svg_graph_mini = d3.select("#Graph_mini")
		  .append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height2 + margin2.top + margin2.bottom)
		  .append("g")
		    .attr("transform",
		         "translate(" + margin.left + "," + margin2.top + ")");
	
	///////////////// Outcomes Legend//////////////////////

		var svg_outcomes_legend = d3.select("#outcomes_legend")
		                      .append("svg")
		                      .attr("id", "outcomes_legend")
		                      .attr("width",300 )
		                      .attr("height",100 );

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

		var rain_today = d3.select("#rain_today_outcomes")
		                      .append("svg")
		                      .attr("width",50 )
		                      .attr("height",20 )
		                      .attr("transform", "translate(130, -30)");

		rain_today.append("rect")
		            .attr("id", "rain_today")
		            .attr("width", 50 )
		            .attr("height", 20)
		            .attr("fill", "lightgrey")

		var rain_tomm = d3.select("#rain_tomm_outcomes")
		                      .append("svg")
		                      .attr("width",50 )
		                      .attr("height",20 )
		                      .attr("transform", "translate(130, -30)");

		rain_tomm.append("rect")
		            .attr("id", "rain_tom")
		            .attr("width", 50 )
		            .attr("height", 20)
		            .attr("fill", "lightgrey")

		var rain_pred = d3.select("#rain_tomm_predict")
		                      .append("svg")
		                      .attr("width",50 )
		                      .attr("height",20 )
		                      .attr("transform", "translate(130, -30)");

		rain_pred.append("rect")
		            .attr("id", "rain_tom_pred")
		            .attr("width", 50 )
		            .attr("height", 20)
		            .attr("fill", "lightgrey")

	/////////////// Metrics ///////////////////////////////////

		var accuracy_field = d3.select("#accuracy_field")
								.append("text")
								.attr("id", "accuracy_data")
								.text("Acucracy : 0%")

		var precision_yes_field = d3.select("#precision_yes_field")
									.append("text")
									.attr("id", "precision_yes_data")
									.text("Precision for Yes : 0%")

		var precision_no_field = d3.select("#precision_no_field")
									.append("text")
									.attr("id", "precision_no_data")
									.text("Precision for No : 0%")

	/////////////// Selectors /////////////////////////////////

		var dataSelected = "none"
		var graphSelected = "none"
		var modelSelected = "naive"
		var dataLoaded = "No"
		var data1 ; 
		var data2 ;

		d3.select("#naive").on("click", function(){ 

			modelSelected = "naive"
			console.log("naive")});

		d3.select("#svm").on("click", function(){ 

			modelSelected = "svm"
			console.log("svm")});

		d3.select("#logreg").on("click", function(){ 

			modelSelected = "logreg"
			console.log("logreg")});
	

	//Read the data

	d3.select("#load_data").on("click", function(){

		dataSelected = "original"
		
		if (dataLoaded == "No"){
			console.log("data Loaded")
			dataLoaded = "Yes"
			d3.csv("/classification/rain_no_rain/rain_data/original",

			  // When reading the csv, I must format variables:
			  function(d){
			    return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rainfall : d.Rainfall, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow, Prediction : d.Prediction}
			  },

			  // Now I can use this dataset:
			  function(data) {
						data1 = 'MinTemp'
						data2 = 'MaxTemp'

						graph_title.text("Minimum and Maximum Temperature - 2018")			  			

						svg_graph_legend.append("text")
										.attr("id", "legend")
						                      .text("Temperature")
						                      .attr("transform",
						                              "translate(0,15)");                      
						var graph_legend_1 = svg_graph_legend.append("text")
						                      .text("Minimum Temperature")
						                      .attr("transform",
						                              "translate(70,50)")


						var rect_1_legend = rects_legend.append("rect")
						            .attr("width", 50 )
						            .attr("height", 20)
						            .attr("fill", "green")
						            .attr("transform","translate(0,35)");
						
						var graph_legend_2 = svg_graph_legend.append("text")
						                      .text("Maximum Temperature")
						                      .attr("transform",
						                              "translate(70,90)");
						var rect_2_legend = rects_legend.append("rect")
						            .attr("width", 50 )
						            .attr("height", 20)
						            .attr("fill", "red")
						            .attr("transform", "translate(0,75)"); 

						

			    	// Temp graph Axis

				    	// Add X axis --> it is a date format
					    var x = d3.scaleTime()
					      .domain(d3.extent(data, function(d) { return d.date; }))
					      .range([ 0, width ]);
					    var xAxis = svg_graph.append("g")
					      .attr("transform", "translate(0," + height + ")")
					      .call(d3.axisBottom(x));

					    // Add Y axis
					    var y = d3.scaleLinear()
					      .domain([-6,d3.max(data, function(d) { return +d[data2]; })])
					      //.domain([0,1])
					      .range([ height, 0 ]);
					    var yAxis = svg_graph.append("g")
					      .call(d3.axisLeft(y));

					    // Add a clipPath: everything out of this area won't be drawn.
					    var clip = svg_graph.append("defs").append("svg:clipPath")
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
					    var xAxis_mini = svg_graph_mini.append("g")
					      .attr("transform", "translate(0," + height2 + ")")
					      .call(d3.axisBottom(x_mini));

					    // Add Y axis
					    var y_mini = d3.scaleLinear()
					      .domain([-6,d3.max(data, function(d) { return +d[data2]; })])
					      .range([ height2, 0 ]);

					    // Add a clipPath: everything out of this area won't be drawn.
					    var clip_mini = svg_graph_mini.append("defs").append("svg:clipPath")
					        .attr("id", "clip_mini")
					        .append("svg:rect")
					        .attr("width", width )
					        .attr("height", height2 )
					        .attr("x", 0)
					        .attr("y", 0);
					// Temp Graph

					    // Defining brush
					    var brush = d3.brushX()                   		// Add the brush feature using the d3.brush function
					        .extent( [ [0,0], [width,height] ] )  		// initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
					        .on("end", updateChart)         			// Each time the brush selection changes, trigger the 'updateChart' function

					    // Create the line variable: where both the line and the brush take place
					    var line = svg_graph.append('g')
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
					        .y(function(d) { return y(d[data1]) })
					        );

					    line.append("path")
					      .datum(data)
					      .attr("class", "line1")  // I add the class line to be able to modify this line later on.
					      .attr("fill", "none")
					      .attr("stroke", "red")
					      .attr("stroke-width", 1)
					      .attr("d", d3.line()
					        .x(function(d) { return x(d.date) })
					        .y(function(d) { return y(d[data2]) })
					        );

					    var area_min = d3.area()
						    .x(function(d) { return x_mini(d.date); })
						    .y0(height2)
						    .y1(function(d) { return y_mini(d[data1]); });

					    var area_max = d3.area()
						    .x(function(d) { return x_mini(d.date); })
						    .y0(height2)
						    .y1(function(d) { return y_mini(d[data2]); });
					       

					    // Add the brushing
					 	var mini_graph_path = svg_graph_mini.append('g')
					      .attr("clip-path", "url(#clip_mini)");
					      
					    mini_graph_path.append("path")
					      .datum(data)
					      .attr("class", "area1")
					      .attr("d", area_max)
					      .attr("fill", "red")
					      .attr("opacity", 0.6);

					    mini_graph_path.append("path")
					      .datum(data)
					      .attr("class", "area2")
					      .attr("d", area_min)
					      .attr("fill", "green")
					      .attr("opacity", 0.6);

					 	mini_graph_path
					      .append("g")
					        .attr("class", "brush")
					        .call(brush);

					    // Tooltip code
					    var focus_min = svg_graph.append("g")
					        .attr("class", "focus")
					        .style("display", "none");
					    focus_min.append("line")
					        .attr("class", "x-hover-line hover-line")
					        .attr("y1", 0)
					        .attr("y2", height);
					    focus_min.append("line")
					        .attr("class", "y-hover-line hover-line")
					        .attr("x1", 0)
					        .attr("x2", width);
					    focus_min.append("circle")
					        .attr("r", 2);
					    focus_min.append("text")
					        .attr("x", 15)
					        .attr("dy", ".31em");

					    var focus_max = svg_graph.append("g")
					        .attr("class", "focus")
					        .style("display", "none");
					    focus_max.append("line")
					        .attr("class", "x-hover-line hover-line")
					        .attr("y1", 0)
					        .attr("y2", height);
					    focus_max.append("line")
					        .attr("class", "y-hover-line hover-line")
					        .attr("x1", 0)
					        .attr("x2", width);
					    focus_max.append("circle")
					        .attr("r", 2);
					    focus_max.append("text")
					        .attr("x", 15)
					        .attr("dy", ".31em");

					    var tooltip = svg_graph.append("rect")
					        .attr("class", "overlay")
					        .attr("width", width)
					        .attr("height", height)
					        .on("mouseover", function() { 			          
					          focus_min.style("display", null);
					          focus_max.style("display", null);
					        })
					        .on("mouseout", function() { 
					          focus_min.style("display", "none");
					          focus_max.style("display", "none"); 
					          rain_today.select("#rain_today").attr("fill", "lightgrey")
					          rain_tomm.select("#rain_tom").attr("fill","lightgrey")
					          rain_pred.select("#rain_tom_pred").attr("fill","lightgrey")
					        })
					        .on("mousemove", mousemove);

					    // Temp Graph X Axis label
					    svg_graph.append("text")             
					      .attr("transform",
					            "translate(" + (width/2) + " ," + 
					                           (height + margin.top + 20) + ")")
					      .style("text-anchor", "middle")
					      .text("Date");

					    // Temp Graph Y Axis label
					  	svg_graph.append("text")
					  		.attr("id", "y_axis_label")
						    .attr("transform", "rotate(-90)")
						    .attr("y", 0 - margin.left)
						    .attr("x",0 - (height / 2))
						    .attr("dy", "1em")
						    .style("text-anchor", "middle")
						    .text("Temperature"); 

				    // A function that set idleTimeOut to null
					    var idleTimeout
					    
					    function idled() { idleTimeout = null; }

					// Update Functions

					    function updateChart() {

					      // What are the selected boundaries?
					      extent = d3.event.selection
					      // If no selection, back to initial coordinate. Otherwise, update X axis domain
					      if(!extent){
					        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
					        x.domain([ 4,8])
					        x_mini.domain([ 4,8])
					      }else{
					        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
					        x_mini.domain([ x_mini.invert(extent[0]), x_mini.invert(extent[1]) ])
					        mini_graph_path.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
					      }  

					      xAxis.transition().duration(1000).call(d3.axisBottom(x))
					      
					      line
					          .select('.line')
					          .transition()
					          .duration(1000)
					          .attr("d", d3.line()
					            .x(function(d) { return x(d.date) })
					            .y(function(d) { return y(d[data1]) })
					          )
					      line
					          .select('.line1')
					          .transition()
					          .duration(1000)
					          .attr("d", d3.line()
					            .x(function(d) { return x(d.date) })
					            .y(function(d) { return y(d[data2]) })
					          )

					      xAxis_mini.transition().duration(1000).call(d3.axisBottom(x_mini))

					      mini_graph_path
					          .select('.area1')
					          .transition()
					          .duration(1000)
					          .attr("d", area_max)

					      mini_graph_path
					          .select('.area2')
					          .transition()
					          .duration(1000)
					          .attr("d", area_min) 
					   		}

					   	function updateGraph(graphSelected, data1, data2){
					   		console.log("entered")
					   		x.domain(d3.extent(data, function(d) { return d.date; }));
					   		x_mini.domain(d3.extent(data, function(d) { return d.date; }))
					   		if (graphSelected == "temperature"){

					   			if(dataSelected == "normalized"){
					   				y.domain([0,1])
									y_mini.domain([0,1])
					   			}
					   			else{
					   				y.domain([-6,d3.max(data, function(d) { return +d.MaxTemp; })]);
					   				y_mini.domain([-6,d3.max(data, function(d) { return +d.MaxTemp; })]);
					   			}

					   			graph_title.text("Minimum and Maximum Temperature - 2018");
					   			svg_graph_legend.select("#legend").text("Temperature")
					   			graph_legend_1.text("Minimum Temperature");
					   			graph_legend_2.text("Maximum Temperature");
					   			rect_1_legend.attr("fill", "green");
					   			rect_2_legend.attr("fill", "red");
					   			svg_graph.select("#y_axis_label").text("Temperature")
					   			yAxis.transition().duration(1000).call(d3.axisLeft(y))
					   			line.select('.line').attr("stroke", "green")
					   			line.select('.line1').attr("stroke", "red")
					   			mini_graph_path.select(".area1").attr("fill", "red")
					   			mini_graph_path.select(".area2").attr("fill", "green")
					   		
					   		}
					   		if (graphSelected == "humidity"){

					   			if(dataSelected == "normalized"){
					   				y.domain([0,1])
									y_mini.domain([0,1])
					   			}
					   			else{
					   				y.domain([0,100]);
					   				y_mini.domain([0,100]);	
					   			}

					   			graph_title.text("Humidity at 9AM and 3PM each day");
					   			svg_graph_legend.select("#legend").text("Humidity")
					   			graph_legend_1.text("Humudity at 9 am");
					   			graph_legend_2.text("Humidity at 3 pm");
					   			rect_1_legend.attr("fill", "blue");
					   			rect_2_legend.attr("fill", "steelblue");
					   			svg_graph.select("#y_axis_label").text("Humidity")
					   			yAxis.transition().duration(1000).call(d3.axisLeft(y))
					   			line.select('.line').attr("stroke", "blue")
					   			line.select('.line1').attr("stroke", "steelblue")
					   			mini_graph_path.select(".area1").attr("fill", "steelblue")
					   			mini_graph_path.select(".area2").attr("fill", "blue")

					   		}
					   		if (graphSelected == "rainfall"){

					   			if(dataSelected == "normalized"){
					   				y.domain([0,1])
									y_mini.domain([0,1])
					   			}
					   			else{
						   			y.domain([0,50]);
						   			y_mini.domain([0,50]);	
					   			}
					   			
					   			graph_title.text("Rainfall Measure when it Rained");
					   			svg_graph_legend.select("#legend").text("Rainfall")
					   			graph_legend_1.text("");
					   			graph_legend_2.text("");
					   			rect_1_legend.attr("fill", "white");
					   			rect_2_legend.attr("fill", "white");
					   			svg_graph.select("#y_axis_label").text("Rainfall(cm)")
					   			yAxis.transition().duration(1000).call(d3.axisLeft(y))
					   			line.select('.line').attr("stroke", "steelblue")
					   			mini_graph_path.select(".area2").attr("fill", "steelblue")

					   		}

					   		line
						        .select('.line')
						        .transition()
						        .duration(1000)
						        .attr("d", d3.line()
						          .x(function(d) { return x(d.date) })
						          .y(function(d) { return y(d[data1]) })
						      )
						    line
						        .select('.line1')
						        .transition()
						        .duration(1000)
						        .attr("d", d3.line()
						          .x(function(d) { return x(d.date) })
						          .y(function(d) { return y(d[data2]) })
						      )
						 
						    mini_graph_path
						          .select('.area1')
						          .transition()
						          .duration(1000)
						          .attr("d", area_max)
						        
						    mini_graph_path
						          .select('.area2')
						          .transition()
						          .duration(1000)
						          .attr("d", area_min)


					   	}

					// Tooltip function

					    function mousemove() {
					        var x0 = x.invert(d3.mouse(this)[0]),
					            i = bisectDate(data, x0, 1),
					            d0 = data[i - 1],
					            d1 = data[i],
					            d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;      
					        focus_min.attr("transform", "translate(" + x(d.date) + "," + y(d[data1]) + ")");
					        focus_min.select("text").text(function() { return d[data1]; });
					        focus_min.select(".x-hover-line").attr("y2", height - y(d[data1]));
					        focus_min.select(".y-hover-line").attr("x2", -x(d.date));
					        
					        focus_max.attr("transform", "translate(" + x(d.date) + "," + y(d[data2]) + ")");
					        focus_max.select("text").text(function() { return d[data2]; });
					        focus_max.select(".x-hover-line").attr("y2", height - y(d[data2]));
					        focus_max.select(".y-hover-line").attr("x2", -x(d.date));
					     
					        rain_today.select("#rain_today").attr("fill", function(){if(d.Rain_today == "No") {return "red";} else {return"green";}})
					        rain_tomm.select("#rain_tom").attr("fill", function(){if(d.Rain_tom == "No") {return "red";} else {return"green";}})
					        //rain_pred.select("#rain_tom_pred").attr("fill", function(){if(d.Prediction == "No") {return "red";} else {return"green";}})
					    	}

					// If user double click, reinitialize the chart
					
						svg_graph.on("dblclick",function(){
					    	x.domain(d3.extent(data, function(d) { return d.date; }))
					    	xAxis.transition().call(d3.axisBottom(x))

					    	x_mini.domain(d3.extent(data, function(d) { return d.date; }))
					    	xAxis_mini.transition().call(d3.axisBottom(x_mini))
					    
						    line
						        .select('.line')
						        .transition()
						        .attr("d", d3.line()
						          .x(function(d) { return x(d.date) })
						          .y(function(d) { return y(d[data1]) })
						      )
						    line
						        .select('.line1')
						        .transition()
						        .attr("d", d3.line()
						          .x(function(d) { return x(d.date) })
						          .y(function(d) { return y(d[data2]) })
						      )
						 
						    mini_graph_path
						          .select('.area1')
						          .transition()
						          .attr("d", area_max)
						        
						    mini_graph_path
						          .select('.area2')
						          .transition()
						          .attr("d", area_min)
						    
					    	});
						
						svg_graph_mini.on("dblclick",function(){
						    x.domain(d3.extent(data, function(d) { return d.date; }))
						    xAxis.transition().call(d3.axisBottom(x))

						    x_mini.domain(d3.extent(data, function(d) { return d.date; }))
						    xAxis_mini.transition().call(d3.axisBottom(x_mini))

						    line
						        .select('.line')
						        .transition()
						        .attr("d", d3.line()
						          .x(function(d) { return x(d.date) })
						          .y(function(d) { return y(d[data1]) })
						      )
						    line
						        .select('.line1')
						        .transition()
						        .attr("d", d3.line()
						          .x(function(d) { return x(d.date) })
						          .y(function(d) { return y(d[data2]) })
						      )
						  
						    mini_graph_path
						          .select('.area1')
						          .transition()
						          .attr("d", area_max)
						        
						    mini_graph_path
						          .select('.area2')
						          .transition()
						          .attr("d", area_min)
					    	});
			
			// Normalization Button

				d3.select("#normalized").on("click", function(){ 
					

					dataSelected = "normalized"
					console.log("normalized")
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
					    	yAxis.transition().call(d3.axisLeft(y))

					    	x_mini.domain(d3.extent(data_normalized, function(d) { return d.date; }))
					    	y_mini.domain([0,1])
					    	xAxis_mini.transition().call(d3.axisBottom(x_mini))
					    
						    line.datum(data_normalized)
						        .select('.line')
						        .transition()
						        .attr("d", d3.line()
						          .x(function(d) { return x(d.date) })
						          .y(function(d) { return y(d[data1]) })
						      )
						    line.datum(data_normalized)
						        .select('.line1')
						        .transition()
						        .attr("d", d3.line()
						          .x(function(d) { return x(d.date) })
						          .y(function(d) { return y(d[data2]) })
						      )
						    mini_graph_path.datum(data_normalized)
						          .select('.area1')
						          .transition()
						          .attr("d", area_max)
						        
						    mini_graph_path.datum(data_normalized)
						          .select('.area2')
						          .transition()
						          .attr("d", area_min)

							tooltip.on("mousemove", function(){
						    	var x0 = x.invert(d3.mouse(this)[0]),
			            i = bisectDate(data_normalized, x0, 1),
			            d0 = data_normalized[i - 1],
			            d1 = data_normalized[i],
			            d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;      
			        focus_min.attr("transform", "translate(" + x(d.date) + "," + y(d[data1]) + ")");
			        focus_min.select("text").text(function() { return d[data1]; });
			        focus_min.select(".x-hover-line").attr("y2", height - y(d[data1]));
			        focus_min.select(".y-hover-line").attr("x2", -x(d.date));
			        
			        focus_max.attr("transform", "translate(" + x(d.date) + "," + y(d[data2]) + ")");
			        focus_max.select("text").text(function() { return d[data2]; });
			        focus_max.select(".x-hover-line").attr("y2", height - y(d[data2]));
			        focus_max.select(".y-hover-line").attr("x2", -x(d.date));
			        
			        rain_today.select("#rain_today").attr("fill", function(){if(d.Rain_today == "No") {return "red";} else {return"green";}})
			        rain_tomm.select("#rain_tom").attr("fill", function(){if(d.Rain_tom == "No") {return "red";} else {return"green";}})
			        //rain_pred.select("#rain_tom_pred").attr("fill", function(){if(d.Prediction == "No") {return "red";} else {return"green";}})
						    })

					})
					})

			// Original Data

				d3.select("#original").on("click", function(){ 
					
					dataSelected = "original"
					console.log("original")
					d3.csv("/classification/rain_no_rain/rain_data/original",

		  			// When reading the csv, I must format variables:
						function(d){
						return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rainfall : d.Rainfall, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow, Prediction : d.Prediction}
							},

							// Now I can use this dataset:
						function(data_original) {
							x.domain(d3.extent(data_original, function(d) { return d.date; }))
							y.domain([-6,d3.max(data_original, function(d) { return +d[data2]; })])
							xAxis.transition().call(d3.axisBottom(x))
							yAxis.transition().call(d3.axisLeft(y))

							x_mini.domain(d3.extent(data_original, function(d) { return d.date; }))
							y_mini.domain([-6,d3.max(data_original, function(d) { return +d[data2]; })])
							xAxis_mini.transition().call(d3.axisBottom(x_mini))

							line.datum(data_original)
							    .select('.line')
							    .transition()
							    .attr("d", d3.line()
							      .x(function(d) { return x(d.date) })
							      .y(function(d) { return y(d[data1]) })
							  )
							line.datum(data_original)
							    .select('.line1')
							    .transition()
							    .attr("d", d3.line()
							      .x(function(d) { return x(d.date) })
							      .y(function(d) { return y(d[data2]) })
							  )
							    
							mini_graph_path.datum(data_original)
							      .select('.area1')
							      .transition()
							      .attr("d", area_max)
							  
							mini_graph_path.datum(data_original)
							      .select('.area2')
							      .transition()
							      .attr("d", area_min)

							tooltip.on("mousemove", mousemove)
						})
					})

			// Prediction Button

				d3.select("#predict").on("click", function(){ 
						

					dataSelected = "predict"
					console.log("predict")

					d3.csv("/classification/rain_no_rain/rain_data/prediction/" + modelSelected,

			  		// When reading the csv, I must format variables:
						function(d){
						    return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rainfall : d.Rainfall, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow, Prediction : d.Prediction}
						 	},

						  	// Now I can use this dataset:
						function(data_prediction) {

							d3.json("/classification/rain_no_rain/rain_data/prediction/metrics/" + modelSelected, 

								function(d){
									accuracy_field.text("Accuracy : " + (d.accuracy.toFixed(2) * 100) + "%")
									precision_yes_field.text("Precision for Yes : " + (d.precision_yes.toFixed(2) * 100) + "%")
									precision_no_field.text("Precision for No : " + (d.precision_no.toFixed(2) * 100) + "%")
								});

						  	//console.log(data_prediction)
						  	x.domain(d3.extent(data_prediction, function(d) { return d.date; }))
						  	y.domain([-6,d3.max(data_prediction, function(d) { return +d[data2]; })])
					    	xAxis.transition().call(d3.axisBottom(x))
					    	yAxis.transition().call(d3.axisLeft(y))

					    	x_mini.domain(d3.extent(data_prediction, function(d) { return d.date; }))
					    	y_mini.domain([-6,d3.max(data_prediction, function(d) { return +d[data2]; })])
					    	xAxis_mini.transition().call(d3.axisBottom(x_mini))
					    
						    line.datum(data_prediction)
						        .select('.line')
						        .transition()
						        .attr("d", d3.line()
						          .x(function(d) { return x(d.date) })
						          .y(function(d) { return y(d[data1]) })
						      	)
						    line.datum(data_prediction)
						        .select('.line1')
						        .transition()
						        .attr("d", d3.line()
						          .x(function(d) { return x(d.date) })
						          .y(function(d) { return y(d[data2]) })
						      	)
						        
						    mini_graph_path.datum(data_prediction)
						          .select('.area1')
						          .transition()
						          .attr("d", area_max)
						        
						    mini_graph_path.datum(data_prediction)
						          .select('.area2')
						          .transition()
						          .attr("d", area_min)

							tooltip.on("mousemove", function(){
								    	var x0 = x.invert(d3.mouse(this)[0]),
					            i = bisectDate(data_prediction, x0, 1),
					            d0 = data_prediction[i - 1],
					            d1 = data_prediction[i],
					            d = (d1 && d0) ? (x0 - d0.date > d1.date - x0 ? d1 : d0) : 0;      
					        focus_min.attr("transform", "translate(" + x(d.date) + "," + y(d[data1]) + ")");
					        focus_min.select("text").text(function() { return d[data1]; });
					        focus_min.select(".x-hover-line").attr("y2", height - y(d[data1]));
					        focus_min.select(".y-hover-line").attr("x2", -x(d.date));
					        
					        focus_max.attr("transform", "translate(" + x(d.date) + "," + y(d[data2]) + ")");
					        focus_max.select("text").text(function() { return d[data2]; });
					        focus_max.select(".x-hover-line").attr("y2", height - y(d[data2]));
					        focus_max.select(".y-hover-line").attr("x2", -x(d.date));
					        
					        rain_today.select("#rain_today").attr("fill", function(){if(d.Rain_today == "No") {return "red";} else {return"green";}})
					        rain_tomm.select("#rain_tom").attr("fill", function(){if(d.Rain_tom == "No") {return "red";} else {return"green";}})
					        rain_pred.select("#rain_tom_pred").attr("fill", function(){if(d.Prediction == "No") {return "red";} else {return"green";}})
								    })
							})
						})	

				d3.select("#temperature").on("click", function(){ 
					
					data1 = 'MinTemp'
					data2 = 'MaxTemp'
					graphSelected = "temperature"
					updateGraph(graphSelected, data1, data2);
					console.log("temperature")
				});
				
				d3.select("#humidity").on("click", function(){ 
					
					data1 = 'Humidity3pm'
					data2 = 'Humidity9am'
					graphSelected = "humidity"
					updateGraph(graphSelected, data1, data2);
					console.log("humidity")
				});

				d3.select("#rainfall").on("click", function(){

					data1 = 'Rainfall'
					data2 = null
					graphSelected = "rainfall"
					updateGraph(graphSelected, data1, data2);
					console.log("rainfall")
				});



		// end of initial data import check
		})
	//end of initial data import
	}})


// End of overall function
})();