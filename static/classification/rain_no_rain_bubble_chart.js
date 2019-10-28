(function(){
 
	var width = 1650,
		 	height = 800;
	// Bubble SVG
		 var svg = d3.select("#class_rain_bubble")
		 	.append("svg")
		 	.attr("width", width)
		 	.attr("height", height)
		 	.append("g")
		 	.attr("transform", "translate(0,0)")


	// Legends
		 var legends_group = svg.append("g")
		 						.attr("width", 300)
		 						.attr("height", 300)
		 						.attr("transform", "translate(0,"+(height-300)+")")
		 
		 legends_group.append("text")
		 				.text("What do the Colors say?")



		 legends_group.append("text")
		 				.text("Color")
		 				.attr("transform", "translate(0,40)")

		 legends_group.append("text")
		 				.text("Rained Today")
		 				.attr("transform", "translate(80,40)")
		 
		 legends_group.append("text")
		 				.text("Will it Rain Tomorrow?")
		 				.attr("transform", "translate(180, 40)")

		 legends_group.append("text")
		 				.text("Yes")
		 				.attr("transform", "translate(80,90)")
		 
		 legends_group.append("text")
		 				.text("Yes")
		 				.attr("transform", "translate(180, 90)")

		 legends_group.append("rect")
				            .attr("width", 50 )
				            .attr("height", 20)
				            .attr("fill", "green")
				            .attr("transform", "translate(0,75)");

		 legends_group.append("text")
		 				.text("Yes")
		 				.attr("transform", "translate(80,140)")
		 
		 legends_group.append("text")
		 				.text("No")
		 				.attr("transform", "translate(180, 140)")

		 legends_group.append("rect")
				            .attr("width", 50 )
				            .attr("height", 20)
				            .attr("fill", "lightgreen")
				            .attr("transform", "translate(0,125)");

		 legends_group.append("text")
		 				.text("No")
		 				.attr("transform", "translate(80,190)")
		 
		 legends_group.append("text")
		 				.text("Yes")
		 				.attr("transform", "translate(180, 190)")

		 legends_group.append("rect")
				            .attr("width", 50 )
				            .attr("height", 20)
				            .attr("fill", "pink")
				            .attr("transform", "translate(0,175)");


		 legends_group.append("text")
		 				.text("No")
		 				.attr("transform", "translate(80,240)")
		 
		 legends_group.append("text")
		 				.text("No")
		 				.attr("transform", "translate(180, 240)")

		 legends_group.append("rect")
				            .attr("width", 50 )
				            .attr("height", 20)
				            .attr("fill", "red")
				            .attr("transform", "translate(0,225)");

		 legends_group.append("text")
		 				.text("Click and Double Click on the Chart to interact!")
		 				.attr("font-size","18px")
		 				.attr("transform", "translate(0,280)")

	// simulation
	
		var forceXseparate = d3.forceX(function(d){
				if(d.Rain_today == "Yes"){
					return 3*(width/4);
				}
				else{
					return (width/4);
				}
		}).strength(0.04)

		var forceYseparate = d3.forceY(function(d){
			if(d.Rain_tom == "Yes"){
				return 3*(height/4);
			}
			else{
				return (height/4);
			}
		}).strength(0.04)

		var forceXCombine = d3.forceX(width/2).strength(0.04)
		var forceYCombine = d3.forceY(height/2).strength(0.04)
		var forceCollide = d3.forceCollide(13)
		
		var simulation = d3.forceSimulation()
			.force("x", forceXCombine)
			.force("y", forceYCombine)
			.force("collide", forceCollide)


	//Read the data
		d3.csv("/classification/rain_no_rain/rain_data/original",

		  // When reading the csv, I must format variables:
		  function(d){
		    return { date : d3.timeParse("%Y-%m-%d")(d.Date), MinTemp : d.MinTemp, MaxTemp : d.MaxTemp,  Humidity9am : d.Humidity9am, Humidity3pm : d.Humidity3pm, Rainfall : d.Rainfall, Rain_today : d.RainToday, Rain_tom : d.RainTomorrow}
		  },

		  // Now I can use this dataset:
		  function(data) {

		  	var circle = svg.selectAll("circle")
		  				.data(data)
		  				.enter()
		  				.append("circle")
		  				.attr("r", 10)
		  				.attr("fill", function(d){
		  					if(d.Rain_today=="Yes" && d.Rain_tom == "Yes"){
		  						return "green";
		  					}
		  					else if (d.Rain_today=="Yes" && d.Rain_tom == "No") {
		  						return "lightgreen";
		  					}
		  					else if (d.Rain_today=="No" && d.Rain_tom == "Yes"){
		  						return "pink";	
		  					}
		  					else {
		  						return "red";
		  					}
		  				})


		  	simulation.nodes(data)
		  		.on('tick', ticked)

		  	function ticked(){
		  		circle
		  			.attr("cx", function(d){
		  				return d.x
		  			})
		  			.attr("cy", function(d){
		  				return d.y
		  			})
		  	}

		  	svg.on("click", function(){
		  		console.log("click")
		  		simulation
		  			.force("x", forceXseparate)
		  			.force("y", forceYseparate)
		  			.alphaTarget(0.25)
		  			.alphaDecay(0.25)
		  			.restart()

		  	});

		  	svg.on("dblclick", function(){
		  		console.log("dblclick")
		  		simulation
		  			.force("x", forceXCombine)
		  			.force("y",forceYCombine)
		  			.alphaTarget(0.18)
		  			.restart()

		  	});


		  })

	})();