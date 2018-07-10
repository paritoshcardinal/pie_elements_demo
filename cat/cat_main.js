  var catconfig="./cat/config2.json";
	$.getJSON( catconfig, function( data ) {
		
		 data.models.forEach((val) => {
            const model = val;
            renderPIE(model,'categorize-element');
          }); 
	});