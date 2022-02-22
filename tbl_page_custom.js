looker.plugins.visualizations.add({
 create: function(element, config) {
  //element.innerHTML = `
//	<style>
//	.sannith {
//	min-width: 500px;
//	height: 600px
//	}
//	</style>
//	`;
	
    var container = element.appendChild(document.createElement("div"));
	container.className = "sannith";
    container.id = 'container';
		
  },

updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
// Clear any errors from previous updates:
this.clearErrors();

// Dump data and metadata to console:
console.log('updateAsync() data', data)
console.log('updateAsync() config', config)
console.log('updateAsync() queryResponse', queryResponse)
	
// get the names of the first dimension and measure available in data
// Data retrival and formatting starts here *********************************************************************************
x  = config.query_fields.dimensions[0].name;
y  = config.query_fields.dimensions[1].name;
z  = config.query_fields.dimensions[2].name;
a  = config.query_fields.dimensions[3].name;
b  = config.query_fields.dimensions[4].name;     
c  = config.query_fields.dimensions[5].name;     

var plot_data = [];

for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[0].name]
	plot_data.push([ 
           row[x].value,
		   row[y].value,
	       row[z].value,
		   row[a].value,
		   row[b].value,
		   row[c].value
	]);}
	
// Data retrival and formatting ends here *********************************************************************************
console.log('Color', plot_data)	
// here google chart code starts *************************************************************************************
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

           function drawTable() {
									var data = new google.visualization.DataTable();
									data.addColumn('number', 'Claim Amount');
									data.addColumn('string', 'Clm ID');
									data.addColumn('number', 'Insurance ID');
									data.addColumn('string', 'Mbr Firstname');
									data.addColumn('number', 'Mbr ID');
									data.addColumn('string', 'Mbr Lastname %');
									data.addRows(plot_data);									
									var table = new google.visualization.Table(document.getElementById('container'));
									table.draw(data, {showRowNumber: false,page:'enable',width: '100%', height: '100%',pageSize:5,pagingButtons:5 ,frozenColumns:3,alternatingRowStyle:false});
								}
// here google chart code ends **********************************************************************************************
doneRendering();
}
})
