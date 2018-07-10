	var mcconfig="./mc/config.json";
	$.getJSON( mcconfig, function( data ) {
		 data.models.forEach((val) => {
            const model = val;
            renderPIE(model,'multiple-choice');
          }); 
	});