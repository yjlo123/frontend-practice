var balance = [{label:"Mon", y:1},
			{label:"Tue", y:2},
			{label:"Wed", y:10},
			{label:"Thu", y:3},
			{label:"Fri", y:5}];

var randomData = [];
var num = 3+Math.floor(Math.random() * 10);
for(var i = 0; i < num; i++){
	randomData.push({label:randomId(3), y:Math.floor(Math.random() * 100)});
}
var chartConfig = {
	id: "chart",
	title: "The Chart Title",
	data: randomData,
	width: "100%",
	height: "250px",
	margin: "10px",
	showValue: true,
	color: "rgb(0, 153, 255)"
}
drawChart(chartConfig);

function drawChart(config){
	var data = config.data;
	var maxValue = Math.max.apply(Math,data.map(function(o){return o.y;}));
	var chart = $("#"+config.id);
	var chartTable = $("<table>").css("text-align", "center");
	//chartTable.css("border", "1px solid black");
	chartTable.append($("<thead>").append($("<tr>").html(
		$("<td>").attr("colspan",data.length)
		.attr("align","center")
		.css("font-size", "20px")
		.css("padding", "10px")
		.html(config.title)
	)));
	chartTable.css("width", config.width);
	chartTable.css("height", config.height);
	var barRow = $("<tr>");

	var labelRow = $("<tr>").css("height", "20px");
	$(data).each(function(i, e){
		var value = e.y;
		var label = e.label;
		var bar = $("<div>")
			.css("color", "white")
			.css("height", value*100/maxValue+"%")
			.css("width", "100%")
			.css("background-color", config.color);
		if(config.showValue){
			bar.text(value);
		}
		var barCell = $("<td>")
			.css("width", 100/data.length+"%")
			.css("height", "100%")
			//.css("border", "1px solid black")
			.css("text-align", "center")
			.css("padding", "0 "+config.margin)
			.attr("valign","bottom")
			.html(bar);
		barRow.append(barCell);
		labelRow.append($("<td>").html(label));
	});
	chartTable.append(barRow);
	chartTable.append(labelRow);
	chart.html(chartTable);
}


function randomId(n){
	var text = "";
	var possible = "abcdefghijkmnpqrstuvwxyz23456789";
	for( var i = 0; i < n; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}