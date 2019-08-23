	var mcconfig="./mc/config_prompt_issue.json";
	$.getJSON( mcconfig, function( data ) {
		 data.models.forEach((val) => {
            const model = val;
            renderPIE(model,'multiple-choice');
          }); 
	});