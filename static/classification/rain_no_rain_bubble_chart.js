(function(){
 
 var width = 1000,
 	height = 800;

 var svg = d3.select("#class_rain_bubble")
 	.append("svg")
 	.attr("width", width)
 	.attr("height", height)
 	.append("g")
 	.attr("transform", "translate(0,0)")

// simulation
var forceX = d3.forceX(function(d){
		if(d.Rain_today == "Yes"){
			return 3*(width/4);
		}
		else{
			return (width/4);
		}
}).strength(0.04)

var forceY = d3.forceY(function(d){
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
  			.force("x", forceX)
  			.force("y", forceY)
  			.alphaTarget(0.3)
  			.alphaDecay(0.9)
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