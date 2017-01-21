//Start of gague logic and drawing 
window.onload = function() { 
    var canvas = document.getElementById("canvas"); 
    var ctx = canvas.getContext("2d"); 

    //dimensions 
    var W = canvas.width; 
    var H = canvas.height; 

	var degrees = 0; 
	var new_degrees = 0; 
	var difference = 0; 
    var color = "lightgreen"; 
	
	var bgcolor = "#222"; 
	var text; 	
	var animation_loop, redraw_loop; 

    function init() { 
        ctx.clearRect(0, 0, W, H); 

        //360 arc
        ctx.beginPath();
		ctx.strokeStyle = bgcolor;
		ctx.lineWidth = 30;
		ctx.arc(W/2, H/2, 100, 0, Math.PI*2, false); 
		
		//Draw it!!
		ctx.stroke();    
		
		//gauge will be a simple arc 
		//Angle in radians = angle in degrees*PI/180 
		var radians = degrees*Math.PI/180;
		ctx.beginPath(); 
		ctx.strokeStyle = color; 
		ctx.lineWidth = 30; 

		ctx.arc(W/2, H/2, 100, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false); 
		
		//you can see the arc now
		ctx.stroke();
		
		//Lets add the text
		ctx.fillStyle = color;
		ctx.font = "50px bebas";
		text = Math.floor(degrees/360*100) + "%";
		
		//Lets center the text
		//deducting half of text width from position x
		text_width = ctx.measureText(text).width;
		
		//adding manual value to position y since the height of the text cannot
		//be measured easily. There are hacks but we will keep it manual for now.
		ctx.fillText(text, W/2 - text_width/2, H/2 + 15);
    }

	function draw() { 
		//Cancel any movement animation if a new chart is requested
		if(typeof animation_loop != undefined) clearInterval(animation_loop);
		
		//random degree from 0 to 360
		new_degrees = Math.round(Math.random()*360);
		difference = new_degrees - degrees;

		//This will animate the gauge to new positions
		//The animation will take 1 second
		//time for each frame is 1sec / difference in degrees
		animation_loop = setInterval(animate_to, 1000/difference);
	}

	//Make the chart move to new degrees
	function animate_to() { 
		if(degrees == new_degrees) 
			clearInterval(animation_loop); 
		
		if(degrees < new_degrees) 
			degrees++;
		else 
			degrees--; 

		init();	
	}

	draw();
	redraw_loop = setInterval(draw, 2000); 
}



//Start of Graph Logic and Drawing 
var data = null;
var graph = null;

function custom(x, y) {
	return (Math.sin(x/50) * Math.cos(y/50) * 50 + 50);
}

// Called when the Visualization API is loaded.
function drawVisualization() {
    // Create and populate a data table.
    var data = new vis.DataSet();

    for(var x=0; x<30; x++) {
        for(var y=0; y<30; y++) {
            for(var z=0; z<30; z++) {
                var value = custom(x, y);
                data.add({ 
                    x: x, 
                    y: y, 
                    z: value, 
                    style: value
                });
            }
        }
    }

	// specify options
	var options = {
	  width:  '1000px',
	  height: '1000px',
	  style: 'surface',
	  showPerspective: true,
	  showGrid: true,
	  showShadow: false,
	  keepAspectRatio: true,
	  verticalRatio: 1
    };

	// create a graph3d
	var container = document.getElementById('mygraph');
	graph3d = new vis.Graph3d(container, data, options);
}
