$(document).ready(function() {
    var piModel = new PiModel();
    var fieldVisualization = new FieldVisualization();
	console.log('A/ The document is ready');
    $('#moar').bind('click', function() {
		console.log('rerere');
        piModel.improveSimulation();
        fieldVisualization.refresh(piModel);
    });
});
