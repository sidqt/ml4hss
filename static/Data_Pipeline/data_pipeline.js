(function full_diagram(){
var svg = d3.select("#pipeline")
				.append("svg")
				.attr("height",875)
				.attr("width",1600)

	svg.append("text")
		    	.attr("transform","translate(480,300)")
		    	.text("Data Preprocessing")

	svg.append("text")
		    	.attr("transform","translate(665,300)")
		    	.text("Machine Learning")

	svg.append("text")
		    	.attr("transform","translate(850,300)")
		    	.text("Data Visualization")

var defs = svg.append("defs");

var marker = defs.append("marker")
					.attr("id", "arrow")
					.attr("markerUnits", "strokeWidth")
                    .attr("markerWidth" , "12")
                    .attr("markerHeight","12")
                    .attr("viewBox","0 0 12 12")
                    .attr("refX","6")
                    .attr("refY","6")
                    .attr("orient","auto")
                    .append("path")
                    	.attr("d","M2,2 L10,6 L2,10 L6,6 L2,2")
                    	.attr("style", "fill: #f00;")

var group_all = svg.append("g")
				.attr("id","diagram")
				.attr("transform", "translate(50, 0)");

var group = group_all.append("g")
				.attr("transform", "translate(150, 0)");

// Diagram
		group.append("path")
				.attr("d","		M 200 200 A 75 150 0 0 0 200 400")
				.attr("stroke" , "steelblue")
				.attr("stroke-width", "2")
				.attr("fill","none")

		group.append("path")
				.attr("d","		M 477 150 A 75 50 0 0 1 572 150")
				.attr("stroke" , "steelblue")
				.attr("stroke-width", "2")
				.attr("fill","none")

		group.append("path")
				.attr("d","		M 477 150 A 75 50 0 0 0 572 150")
				.attr("stroke" , "steelblue")
				.attr("stroke-width", "2")
				.attr("fill","none")

		group.append("path")
				.attr("d","     M 658 150 A 75 50 0 0 1 753 150")
				.attr("stroke" , "steelblue")
				.attr("stroke-width", "2")
				.attr("fill","none")

		group.append("path")
				.attr("d","     M 658 150 A 75 50 0 0 0 753 150" )
				.attr("stroke" , "steelblue")
				.attr("stroke-width", "2")
				.attr("fill","none")

		group.append("path")
				.attr("d","     M 306 425 A 75 50 0 0 1 381 425" )
				.attr("stroke" , "steelblue")
				.attr("stroke-width", "2")
				.attr("fill","none")

		group.append("path")
				.attr("d","     M 306 425 A 75 50 0 0 0 381 425"  )
				.attr("stroke" , "steelblue")
				.attr("stroke-width", "2")
				.attr("fill","none")

		group.append("path")
				.attr("d","     M 487 425 A 75 50 0 0 1 562 425"  )
				.attr("stroke" , "steelblue")
				.attr("stroke-width", "2")
				.attr("fill","none")

		group.append("path")
				.attr("d","     M 487 425 A 75 50 0 0 0 562 425"  )
				.attr("stroke" , "steelblue")
				.attr("stroke-width", "2")
				.attr("fill","none")

		group.append("path")
				.attr("d","     M 1000 100 A 75 250 0 0 1 1000 500" )
				.attr("stroke" , "steelblue")
				.attr("stroke-width", "2")
				.attr("fill","none")

		group.append("line")
				.attr("x1",200)
				.attr("x2",487)
				.attr("y1",200)
				.attr("y2",200)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",562)
				.attr("x2",668)
				.attr("y1",200)
				.attr("y2",200)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",743)
				.attr("x2",850)
				.attr("y1",200)
				.attr("y2",200)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",487)
				.attr("x2",487)
				.attr("y1",200)
				.attr("y2",175)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",562)
				.attr("x2",562)
				.attr("y1",200)
				.attr("y2",175)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",487)
				.attr("x2",477)
				.attr("y1",175)
				.attr("y2",150)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",562)
				.attr("x2",572)
				.attr("y1",175)
				.attr("y2",150)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",668)
				.attr("x2",668)
				.attr("y1",200)
				.attr("y2",175)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",743)
				.attr("x2",743)
				.attr("y1",200)
				.attr("y2",175)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",668)
				.attr("x2",658)
				.attr("y1",175)
				.attr("y2",150)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",743)
				.attr("x2",753)
				.attr("y1",175)
				.attr("y2",150)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",200)
				.attr("x2",306)
				.attr("y1",400)
				.attr("y2",400)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",381)
				.attr("x2",487)
				.attr("y1",400)
				.attr("y2",400)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",562)
				.attr("x2",850)
				.attr("y1",400)
				.attr("y2",400)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",306)
				.attr("x2",306)
				.attr("y1",400)
				.attr("y2",425)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",381)
				.attr("x2",381)
				.attr("y1",400)
				.attr("y2",425)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",487)
				.attr("x2",487)
				.attr("y1",400)
				.attr("y2",425)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",562)
				.attr("x2",562)
				.attr("y1",400)
				.attr("y2",425)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",850)
				.attr("x2",1000)
				.attr("y1",200)
				.attr("y2",100)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

		group.append("line")
				.attr("x1",850)
				.attr("x2",1000)
				.attr("y1",400)
				.attr("y2",500)
				.attr("stroke","steelblue")
				.attr("stroke-width","2")

// Arrows

		var arrow_x = [50,100]
		var arrow_y = [250,300,350]

		var arrow1 = group.append("line")
		             .attr("x1",arrow_x[0])  
		             .attr("y1",arrow_y[0])  
		             .attr("x2",arrow_x[1])  
		             .attr("y2",arrow_y[0])  
		             .attr("stroke","red")  
		             .attr("stroke-width",2)  
		             .attr("marker-end","url(#arrow)")

		var arrow2 = group.append("line")
		             .attr("x1",arrow_x[0])  
		             .attr("y1",arrow_y[1])  
		             .attr("x2",arrow_x[1])  
		             .attr("y2",arrow_y[1])  
		             .attr("stroke","red")  
		             .attr("stroke-width",2)  
		             .attr("marker-end","url(#arrow)");  

		var arrow3 = group.append("line")
		             .attr("x1",arrow_x[0])  
		             .attr("y1",arrow_y[2])  
		             .attr("x2",arrow_x[1])  
		             .attr("y2",arrow_y[2])  
		             .attr("stroke","red")  
		             .attr("stroke-width",2)  
		             .attr("marker-end","url(#arrow)"); 

		var arrow4 = group.append("line")
		             .attr("x1",524.5)  
		             .attr("y1",115)  
		             .attr("x2",524.5)  
		             .attr("y2",145)  
		             .attr("stroke","red")  
		             .attr("stroke-width",2)  
		             .attr("marker-end","url(#arrow)"); 

		var arrow5 = group.append("line")
		             .attr("x1",705.5)  
		             .attr("y1",115)  
		             .attr("x2",705.5)  
		             .attr("y2",145)  
		             .attr("stroke","red")  
		             .attr("stroke-width",2)  
		             .attr("marker-end","url(#arrow)");

		var arrow6 = group.append("line")
		             .attr("x1",343.5)  
		             .attr("y1",440)  
		             .attr("x2",343.5)  
		             .attr("y2",470)  
		             .attr("stroke","red")  
		             .attr("stroke-width",2)  
		             .attr("marker-end","url(#arrow)");  

		var arrow7 = group.append("line")
		             .attr("x1",524.5)  
		             .attr("y1",440)  
		             .attr("x2",524.5)  
		             .attr("y2",470)  
		             .attr("stroke","red")  
		             .attr("stroke-width",2)  
		             .attr("marker-end","url(#arrow)");  

// Sources boxes

		var src_x = [10,60,110]
		var src_y = [200,275,350]

		var src1 = group_all.append("rect")
						.attr("x", src_x[0])
						.attr("y", src_y[0])
						.attr("height", 50)
						.attr("width", 50)
						.attr("stroke" , "steelblue")
						.attr("stroke-width", "2")
						.attr("fill", "none")

		var src2 = group_all.append("rect")
						.attr("x", src_x[2])
						.attr("y", src_y[0])
						.attr("height", 50)
						.attr("width", 50)
						.attr("stroke" , "steelblue")
						.attr("stroke-width", "2")
						.attr("fill", "none")

		var src3 = group_all.append("rect")
						.attr("x", src_x[1])
						.attr("y", src_y[1])
						.attr("height", 50)
						.attr("width", 50)
						.attr("stroke" , "steelblue")
						.attr("stroke-width", "2")
						.attr("fill", "none")

		var src4 = group_all.append("rect")
						.attr("x", src_x[0])
						.attr("y", src_y[2])
						.attr("height", 50)
						.attr("width", 50)
						.attr("stroke" , "steelblue")
						.attr("stroke-width", "2")
						.attr("fill", "none")

		var src5 = group_all.append("rect")
						.attr("x", src_x[2])
						.attr("y", src_y[2])
						.attr("height", 50)
						.attr("width", 50)
						.attr("stroke" , "steelblue")
						.attr("stroke-width", "2")
						.attr("fill", "none")

// Bar Graph

	var margin = {top: 10, right: 10, bottom: 10, left: 10},
    	width = 140 - margin.left - margin.right,
    	height = 100 - margin.top - margin.bottom;


	var y = d3.scale.linear().range([height, 0]);

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")

	var graph = svg.append("g")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .attr("transform", "translate(495,530)");

	var data = [20,30,60,70,90,10,100]	
	  y.domain([0, d3.max(data)]);

// Transitions
		var i=1;
		d3.select("#next").on("click", function(){
			console.log("Clicked")
			switch(i){
				case 1:
					arrow1.transition()
							.duration(2000)
								.attr("x1",arrow_x[0]+100)	   
				        		.attr("x2",arrow_x[1]+100)
				        		.style("opacity","0.0")
				    arrow2.transition()
							.duration(2000)
								.attr("x1",arrow_x[0]+100)	   
				        		.attr("x2",arrow_x[1]+100)
				        		.style("opacity","0.0")   
					arrow3.transition()
							.duration(2000)
								.attr("x1",arrow_x[0]+100)	   
				        		.attr("x2",arrow_x[1]+100)
				        		.style("opacity","0.0")
				    src1.transition()
				    		.duration(2000)
				    		.attr("x",src_x[0]+100)
				    		.style("opacity","0.0")
				   	src2.transition()
				    		.duration(2000)
				    		.attr("x",src_x[2]+100)
				    		.style("opacity","0.0")
				    src3.transition()
				    		.duration(2000)
				    		.attr("x",src_x[1]+100)
				    		.style("opacity","0.0")
				    src4.transition()
				    		.duration(2000)
				    		.attr("x",src_x[0]+100)
							.style("opacity","0.0")		    
					src5.transition()
				    		.duration(2000)
				    		.attr("x",src_x[2]+100)
				    		.style("opacity","0.0")

				    graph.selectAll("rect")
	      				.data(data)
	    				.enter().append("rect")
	    				.transition()
	    				.delay(4000)
	      				.style("fill", function(d){
	      					if(d<90)
	      						return "steelblue";
	      					else
	      						return "red";
	      					})
						.attr("x", function(d,i){return i * 15;})
		 				.attr("y", function(d){return height - d;})
		 				.attr("width", 10)
		 				.attr("height", function(d){return d;});
		 			
		 			graph.on("click", function(){

							var arrow9 = group.append("line")
				             .attr("x1",343.5)  
				             .attr("y1",630)  
				             .attr("x2",343.5)  
				             .attr("y2",660)  
				             .attr("stroke","red")  
				             .attr("stroke-width",2)  
				             .attr("marker-end","url(#arrow)"); 

							var data_norm = data.map(function(d){return d/2;})
					
							var graph_norm = svg.append("g")
							    .attr("width", width + margin.left + margin.right)
							    .attr("height", height + margin.top + margin.bottom)
							    .attr("transform", "translate(495,650)");

							graph_norm.selectAll("rect")
								.data(data_norm)
							    .enter().append("rect")
							      		.style("fill", function(d){
							      			if(d<90)
							      				return "steelblue";
							      			else
							      				return "red";
							      		})
										.attr("x", function(d,i){return i * 15;})
								 		.attr("y", function(d){return height - d;})
								 		.attr("width", 10)
								 		.attr("height", function(d){return d;});

							var arrow10 = group.append("line")
						             .attr("x1",343.5)  
						             .attr("y1",750)  
						             .attr("x2",343.5)  
						             .attr("y2",780)  
						             .attr("stroke","red")  
						             .attr("stroke-width",2)  
						             .attr("marker-end","url(#arrow)"); 

						    svg.append("text")
						    	.attr("transform","translate(495,810)")
						    	.text("Processed Data")

							})
				  	i=i+1;
				  	break;
		   		case 2:
		   			svg.append("text")
		    			.attr("transform","translate(675,100)")
		    			.text("Processed Data")

		    		i=i+1;
		    		break;

		    	case 3:
		    		svg.append("text")
		    			.attr("transform", "translate(690,550)")
		    			.text("Predictions")
		    		i=i+1;
		    		break;
		    	case 4:
		    		svg.append("text")
		    			.attr("transform", "translate(865,100)")
		    			.text("Predictions")
		    		i=i+1;
		    		break;
		    	case 5:
		    		svg.append("text")
		    			.attr("transform", "translate(1250,250)")
		    			.attr("font-size","20px")
		    			.text("Insights")
		    		if(isSelected == "healthcare"){
		    			svg.append("text")
		    			.attr("transform", "translate(1250,300)")
		    			//.attr("font-size","20px")
		    			.text("Disease A effects lower by 10%.")
		    			svg.append("text")
		    			.attr("transform", "translate(1250,350)")
		    			//.attr("font-size","20px")
		    			.text("Region B is effected by Diesease B.")
		    			svg.append("text")
		    			.attr("transform", "translate(1250,400)")
		    			//.attr("font-size","20px")
		    			.text("Heathcare services cost reduced by 20%")
		    		}
		    		if(isSelected == "business"){
		    			svg.append("text")
		    			.attr("transform", "translate(1250,300)")
		    			//.attr("font-size","20px")
		    			.text("Product A has a better response than product B.")
		    			svg.append("text")
		    			.attr("transform", "translate(1250,350)")
		    			//.attr("font-size","20px")
		    			.text("Policy XYZ has a major impact on market")
		    			svg.append("text")
		    			.attr("transform", "translate(1250,400)")
		    			//.attr("font-size","20px")
		    			.text("Business ABC")
		    		}
		    		i=i+1;
		    		break;
		   }

		})

// Applications
var isSelected = "none"

var applications = svg.append("g")
						.attr("transform","translate(10,500)")

applications.append("text")
				.attr("transform","translate(0,10)")
				.text("APPLICATIONS")

applications.append("text")
				.attr("transform","translate(0,40)")
				.text("Healthcare Industry")
				.attr("stroke","blue")
				.on("click", function(){
					isSelected = "healthcare"
					src1.style("fill", "blue")
					src2.style("fill", "blue")
					src3.style("fill", "blue")
					src4.style("fill", "blue")
					src5.style("fill", "blue")
				})

applications.append("text")
				.attr("transform","translate(0,70)")
				.text("Business")
				.attr("stroke","Red")
				.on("click",function(){
					isSelected = "business"
					src1.style("fill", "red")
					src2.style("fill", "red")
					src3.style("fill", "red")
					src4.style("fill", "red")
					src5.style("fill", "red")
				})


	})();

























