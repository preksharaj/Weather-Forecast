	$(document).ready(function() {
		
		
		$("#weatherForm").validate({
			rules: {
				streetAddress: "required",
				city: "required",
				state: {
					required: true
				}
			},
			messages: {
				streetAddress: "Please enter the street address",
				city: "Please enter the city",
				state: {
					required: "Please select a state"
				}
			}
		});
		
		
		
		
		
		$('#search').click(function (e) {
			console.log("search button was clicked.");
			if($("#weatherForm").valid()){
				console.log("Inside the ajax call");
				$.ajax({
					url: 'http://projectp-env.elasticbeanstalk.com/',
					data: {
						streetAddress : $("#streetAddress").val(),
						city : $("#city").val(),
						state : $("#state").val(),
						degree : $('input[name=degree]:checked').val()
					},
					type: 'GET',
					dataType: 'json',
					success: function(output){
						console.log("Inside the success function");
						console.log(output);
						$('#weatherResult').show();
						var icon;
						 switch(output.currently.icon)
    {
    case 'clear-day':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear.png' title='"+ output.currently.summary +"' length='125' width='125'>";
    break;
    
    case 'clear-night':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png' title='"+ output.currently.summary +"' length='125' width='125'>";
    break;
    
        case 'rain':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/rain.png' title='"+ output.currently.summary +"' length='125' width='125'>";
        break;
    
        case 'snow':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/snow.png' title='"+ output.currently.summary +"' length='125' width='125'>";
            break;
    
        case 'sleet':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png' title='"+ output.currently.summary +"' length='125' width='125'>";
            break;
    
        case 'wind':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/wind.png' title='"+ output.currently.summary +"' length='125' width='125'>";
            break;
    
        case 'fog':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/fog.png' title='"+ output.currently.summary +"' length='125' width='125'>";
            break;
    
        case 'cloudy':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png' title='"+ output.currently.summary +"' length='125' width='125'>";
            break;
    
        case 'partly-cloudy-day':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png' title='"+ output.currently.summary +"' length='125' width='125'>";
            break;
    
        case 'partly-cloudy-night':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png' title='"+ output.currently.summary +"' length='125' width='125'>";
    break;
             
    }
						
						if($('input[name=degree]:checked').val() == "Fahrenheit") {
							console.log($('input[name=degree]:checked').val())
							
							 var precipIntensityC = "";
         var ocp = output.currently.precipIntensity;
       if(ocp >= 0 && ocp < 0.002) precipIntensityC = "None";
       else if(ocp >= 0.002 && ocp < 0.017) precipIntensityC = "Very Light";
       else if(ocp >= 0.017 && ocp < 0.1) precipIntensityC = "Light";
       else if(ocp >= 0.1 && ocp < 0.4) precipIntensityC = "Moderate";
       else if(ocp >= 0.4) precipIntensityC = "Heavy";
							
							$('#rightNowVisual').html(
								'<div class="row" style="background: #F17D7E">' +
								'<center>' +
									'<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">' +
										icon +
									'</div>' +
									'<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">' +
										'<span style="color: white;"><b>' + output.currently.summary + ' in ' + $("#city").val() +', '+ $("#state").val() + '</b></span><br><span style="color: white; font-size: 50px;"><b>' + Math.round(output.currently.temperature)+'<span style="font-size: 15px; vertical-align: text-top;">&deg F</span></b></span><br><div id="fb-root"><span style="color: blue;">'+ 'L: ' + Math.round(output.daily.data[0].temperatureMax) + '&deg</span> | <span style="color: green"> H: '+ Math.round(output.daily.data[0].temperatureMin) + '&deg</span>&nbsp;&nbsp' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://cs-server.usc.edu:45678/hw/hw8/images/fb_icon.png" title="Facebook Post" id="fbTestBtn" length="40" width="40" ></div>' +'</div>'+				
									'</div>' +
								'</center>' +
								'<div>' +
								'<div class="row">' +
									'<div class="table-responsive"><table class="table table-striped">'+
										'<tr><td>Precipitation</td><td>' + precipIntensityC + '</td></tr>'+
										'<tr style="background: #F1DDDD"><td>Chance of Rain</td><td>' + Math.round(output.currently.precipProbability * 100) + ' %</td></tr>'+
										'<tr><td>Wind Speed</td><td>' + (output.currently.windSpeed).toFixed(2) + ' mph</td></tr>'+
										'<tr style="background: #F1DDDD"><td>Dew Point</td><td>' + (output.currently.dewPoint).toFixed(2) + '&deg F</td></tr>'+
										'<tr><td>Humidity</td><td>' + Math.round(output.currently.humidity * 100) + ' %</td></tr>'+
										'<tr style="background: #F1DDDD"><td>Visibility</td><td>' + (output.currently.visibility).toFixed(2) + ' mi</td></tr>'+
										'<tr><td>Sunrise</td><td>' + output.daily.data[0].sunriseTime + '</td></tr>'+
										'<tr style="background: #F1DDDD"><td>Sunset</td><td>' + output.daily.data[0].sunsetTime + '</td></tr>'+
									'</table></div>' +
								'</div>'
							);
							
								$('#fbTestBtn').click(function(e){
									console.log("fb button was clicked");

									var fbpicture = "";
									switch(output.currently.icon)
									{
										case 'clear-day': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/clear.png'; break;
										case 'clear-night': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png'; break;
										case 'rain': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/rain.png'; break;
										case 'snow': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/snow.png'; break;
										case 'sleet': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png'; break;
										case 'wind': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/wind.png'; break;
										case 'fog':	fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/fog.png'; break;
										case 'cloudy': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png'; break;
										case 'partly-cloudy-day': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png'; break;
										case 'partly-cloudy-night':	fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png'; break;		 
									}

									var fbname = 'Current Weather in ' + $("#city").val() +', '+ $("#state").val();
									var fbdesc = output.currently.summary + ', ' + Math.round(output.currently.temperature) + '\xB0F';
									
									console.log("fbpicture - " + fbpicture + " fbname - " + fbname + " fbdesc - " + fbdesc);
									FB.init({appId: "1518337368490160", status: true, cookie: true});
									postToFeed(fbpicture, fbname, fbdesc);
								});

								
							$('#map_div').html('<div id="basicMap" style="width:570px; height:450px; padding-left:0px;padding-right:0px;"></div>');
        var map = new OpenLayers.Map("basicMap");
        var mapnik = new OpenLayers.Layer.OSM();

		var layer_cloud = new OpenLayers.Layer.XYZ(
        		"clouds",
        		"http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
        	{
           		isBaseLayer: false,
            	opacity: 0.5,
            	sphericalMercator: true
       		}
    	);
		var layer_precipitation = new OpenLayers.Layer.XYZ(
				"precipitation",
				"http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
			{
				isBaseLayer: false,
				opacity: 0.5,
				sphericalMercator: true
			}
		);
        
        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913");
	   map.addLayers([mapnik, layer_precipitation, layer_cloud]);
	   var lonlat = new OpenLayers.LonLat(output.longitude, output.latitude).transform('EPSG:4326','EPSG:900913');
       	map.setCenter( lonlat, 7 );
       // map.getView().setCenter(ol.proj.transform([34, -118], 'EPSG:4326', 'EPSG:900913'));
      	map.addControl(new OpenLayers.Control.LayerSwitcher());


							
						}
					
						if($('input[name=degree]:checked').val() == "Celsius") {
							console.log($('input[name=degree]:checked').val())
							 
							 var precipIntensityC = "";
         var ocp = (output.currently.precipIntensity / 25.4)
       if(ocp >= 0 && ocp < 0.002) precipIntensityC = "None";
       else if(ocp >= 0.002 && ocp < 0.017) precipIntensityC = "Very Light";
       else if(ocp >= 0.017 && ocp < 0.1) precipIntensityC = "Light";
       else if(ocp >= 0.1 && ocp < 0.4) precipIntensityC = "Moderate";
       else if(ocp >= 0.4) precipIntensityC = "Heavy";
							
							$('#rightNowVisual').html(
								'<div class="row" style="background: #F17D7E">' +
								'<center>' +
									'<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">' +
										icon +
									'</div>' +
									'<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">' +
										'<span style="color: white;"><b>' + output.currently.summary + ' in ' + $("#city").val() +', '+ $("#state").val() + '</b></span><br><span style="color: white; font-size: 50px;"><b>' + Math.round(output.currently.temperature) +'<span style="font-size: 15px; vertical-align: text-top;">&deg C</span></b></span><br><div id="fb-root"><span style="color: blue;">'+ 'L: ' + Math.round(output.daily.data[0].temperatureMin) + '&deg</span> | <span style="color: green"> H: '+ Math.round(output.daily.data[0].temperatureMax) + '&deg</span>&nbsp;&nbsp' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://cs-server.usc.edu:45678/hw/hw8/images/fb_icon.png" title="Facebook Post" id="fbTestBtn" length="40" width="40" ></div>' +'</div>'+				
									'</div>' +
								'</center>' +
								'<div>' +
								'<div class="row">' +
									'<div class="table-responsive"><table class="table table-striped">'+
										'<tr><td>Precipitation</td><td>' + precipIntensityC + '</td></tr>'+
										'<tr style="background: #F1DDDD"><td>Chance of Rain</td><td>' + Math.round(output.currently.precipProbability * 100) + ' %</td></tr>'+
										'<tr><td>Wind Speed</td><td>' + (output.currently.windSpeed).toFixed(2) + ' m/s</td></tr>'+
										'<tr style="background: #F1DDDD"><td>Dew Point</td><td>' + (output.currently.dewPoint).toFixed(2) + '&deg C</td></tr>'+
										'<tr><td>Humidity</td><td>' + Math.round(output.currently.humidity * 100) + ' %</td></tr>'+
										'<tr style="background: #F1DDDD"><td>Visibility</td><td>' + (output.currently.visibility).toFixed(2) + ' Km</td></tr>'+
										'<tr><td>Sunrise</td><td>' + output.daily.data[0].sunriseTime + '</td></tr>'+
										'<tr style="background: #F1DDDD"><td>Sunset</td><td>' + output.daily.data[0].sunsetTime + '</td></tr>'+
									'</table></div>' +
								'</div>'
							);
							
							$('#fbTestBtn').click(function(e){
									console.log("fb button was clicked");

									var fbpicture = "";
									switch(output.currently.icon)
									{
										case 'clear-day': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/clear.png'; break;
										case 'clear-night': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png'; break;
										case 'rain': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/rain.png'; break;
										case 'snow': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/snow.png'; break;
										case 'sleet': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png'; break;
										case 'wind': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/wind.png'; break;
										case 'fog':	fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/fog.png'; break;
										case 'cloudy': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png'; break;
										case 'partly-cloudy-day': fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png'; break;
										case 'partly-cloudy-night':	fbpicture='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png'; break;		 
									}

									var fbname = 'Current Weather in ' + $("#city").val() +', '+ $("#state").val();
									var fbdesc = output.currently.summary + ', ' + Math.round(output.currently.temperature) + '\xB0C';
									
									console.log("fbpicture - " + fbpicture + " fbname - " + fbname + " fbdesc - " + fbdesc);
									FB.init({appId: "1518337368490160", status: true, cookie: true});
									postToFeed(fbpicture, fbname, fbdesc);
								});

								
							$('#map_div').html('<div id="basicMap" style="width:570px; height:450px; padding-left:0px;padding-right:0px;"></div>');
        var map = new OpenLayers.Map("basicMap");
        var mapnik = new OpenLayers.Layer.OSM();

		var layer_cloud = new OpenLayers.Layer.XYZ(
        		"clouds",
        		"http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
        	{
           		isBaseLayer: false,
            	opacity: 0.5,
            	sphericalMercator: true
       		}
    	);
		var layer_precipitation = new OpenLayers.Layer.XYZ(
				"precipitation",
				"http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
			{
				isBaseLayer: false,
				opacity: 0.5,
				sphericalMercator: true
			}
		);
        
        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913");
	   map.addLayers([mapnik, layer_precipitation, layer_cloud]);
	   var lonlat = new OpenLayers.LonLat(output.longitude, output.latitude).transform('EPSG:4326','EPSG:900913');
       	map.setCenter( lonlat, 7 );
        //map.getView().setCenter(ol.proj.transform([34, -118], 'EPSG:4326', 'EPSG:900913'));
      	map.addControl(new OpenLayers.Control.LayerSwitcher());


							
							
						}
						
							
							
	if($('input[name=degree]:checked').val() == "Fahrenheit") {
							console.log($('input[name=degree]:checked').val())
							 
							 var next24HourVisual = '<div class="table-responsive id="next24HourTable"><table class="table table-striped"><tr style="background:rgb(41,97,146); color:rgb(255,250,240);"><th><center>Time</center></th><th><center>Summary</center></th><th><center>Cloud Cover</center></th><th><center>Temp' +'&deg F'+'</center></th><th><center>View Details</center></th></tr>';
							
								for(var i = 1; i < 25; i++) {
								switch(output.hourly.data[i].icon)
    {
    case 'clear-day':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
    break;
    
    case 'clear-night':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
    break;
    
        case 'rain':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/rain.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
        break;
    
        case 'snow':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/snow.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'sleet':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'wind':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/wind.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'fog':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/fog.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'cloudy':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'partly-cloudy-day':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'partly-cloudy-night':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
    break;
	}       
    
								console.log(i);
								next24HourVisual += '<tr style="background:rgb(255,255,255);"><td><center>' + output.hourly.data[i].time + '</center></td><td><center>' + icon + '</center></td><td><center>' + Math.round((output.hourly.data[i].cloudCover)*100)+' %' + '</center></td><td><center>' + (output.hourly.data[i].temperature).toFixed(2) + '</center></td><td><center><span class="glyphicon glyphicon-plus" data-toggle="collapse" data-target="#viewDetail'+ i +'" aria-expanded="false" aria-controls="viewDetail'+ i +'" aria-hidden="true"></span></center></td></tr>';
								next24HourVisual += '<tr class="collapse" id="viewDetail'+ i +'"><td colspan="5">';
								next24HourVisual += '<div class="table-responsive"><table class="table table-striped" style="background:rgb(255,255,255);"><tr style="background:rgb(255,255,255);"><th><center>Wind</center></th><th><center>Humidity</center></th><th><center>Visibility</center></th><th><center>Pressure</center></th></tr>';
								next24HourVisual += '<tr style="background:rgb(249,249,249);"><td><center>' + output.hourly.data[i].windSpeed+' mph' + '</center></td><td><center>' + Math.round((output.hourly.data[i].humidity)*100)+' %' + '</center></td><td><center>' + output.hourly.data[i].visibility+' mi' + '</center></td><td><center>' + output.hourly.data[i].pressure+' mb' + '</center></td></tr>';
								next24HourVisual += '</table></div>';
								next24HourVisual += '</td></tr>';
								
							}
							next24HourVisual += '</table></div>';						
							$('#next24HoursVisual').html(next24HourVisual);
							}
							
	if($('input[name=degree]:checked').val() == "Celsius") {
							console.log($('input[name=degree]:checked').val())
							var next24HourVisual = '<div class="table-responsive" id="next24HourTable"><table class="table table-striped"><tr style="background:rgb(41,97,146); color:rgb(255,250,240);"><th><center>Time</center></th><th><center>Summary</center></th><th><center>Cloud Cover</center></th><th><center>Temp' +'&deg C'+'</center></th><th><center>View Details</center></th></tr>';
							for(var i = 1; i < 25; i++){
								
								switch(output.hourly.data[i].icon)
    {
    case 'clear-day':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
    break;
    
    case 'clear-night':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
    break;
    
        case 'rain':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/rain.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
        break;
    
        case 'snow':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/snow.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'sleet':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'wind':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/wind.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'fog':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/fog.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'cloudy':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'partly-cloudy-day':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
            break;
    
        case 'partly-cloudy-night':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png' title='"+ output.hourly.data[i].summary +"' length='40' width='40'>";
    break;
	}       
    
								console.log(i);
								next24HourVisual += '<tr style="background:rgb(255,255,255);"><td><center>' + output.hourly.data[i].time + '</center></td><td><center>' + icon + '</center></td><td><center>' + Math.round((output.hourly.data[i].cloudCover)*100)+' %' + '</center></td><td><center>' + (output.hourly.data[i].temperature).toFixed(2) + '</center></td><td><center><span class="glyphicon glyphicon-plus" data-toggle="collapse" data-target="#viewDetail'+ i +'" aria-expanded="false" aria-controls="viewDetail'+ i +'" aria-hidden="true"></span></center></td></tr>';
								next24HourVisual += '<tr class="collapse" id="viewDetail'+ i +'"><td colspan="5">';
								next24HourVisual += '<div class="table-responsive"><table class="table table-striped" style="background:rgb(255,255,255);"><tr style="background:rgb(255,255,255);"><th><center>Wind</center></th><th><center>Humidity</center></th><th><center>Visibility</center></th><th><center>Pressure</center></th></tr>';
								next24HourVisual += '<tr style="background:rgb(249,249,249);"><td><center>' + output.hourly.data[i].windSpeed+' m/s' + '</center></td><td><center>' + Math.round((output.hourly.data[i].humidity)*100)+' %' + '</center></td><td><center>' + output.hourly.data[i].visibility+' Km' + '</center></td><td><center>' + output.hourly.data[i].pressure+' hPa' + '</center></td></tr>';
								next24HourVisual += '</table></div>';
								next24HourVisual += '</td></tr>';
							}
							next24HourVisual += '</table></div>';						
							$('#next24HoursVisual').html(next24HourVisual);
							}
							
							var next7DaysVisual = "";
							next7DaysVisual += '<div class="col-xs-12 col-sm-12 col-md-1 col-lg-1" style="background:rgb(46,51,56);"></div><div class="col-xs-12 col-sm-12 col-md-1 col-lg-1" style="background:rgb(46,51,56);"></div>'
							
							if($('input[name=degree]:checked').val() == "Fahrenheit") {
							console.log($('input[name=degree]:checked').val())
							 
							
								
							for(var j = 1; j < 8; j++) {
								 var visibility7Days = "N.A.";					
								if (output.daily.data[j].visibility != undefined) {
									visibility7Days = (output.daily.data[j].visibility).toFixed(2)+' mi';
								}
								switch(output.daily.data[j].icon)
    {
    case 'clear-day':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
    break;
    
    case 'clear-night':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
    break;
    
        case 'rain':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/rain.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
        break;
    
        case 'snow':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/snow.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'sleet':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'wind':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/wind.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'fog':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/fog.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'cloudy':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'partly-cloudy-day':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'partly-cloudy-night':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
    break;
	}       
    
	switch(output.daily.data[j].icon)
    {
    case 'clear-day':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
    break;
    
    case 'clear-night':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
    break;
    
        case 'rain':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/rain.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
        break;
    
        case 'snow':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/snow.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'sleet':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'wind':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/wind.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'fog':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/fog.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'cloudy':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'partly-cloudy-day':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'partly-cloudy-night':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
    break;
	}       
    
							
							
								next7DaysVisual += '<div class="col-xs-12 col-sm-12 col-md-1 col-lg-1 next7DaysVisualWell" style="border-radius: 5px; padding-left: 0; padding-right:0;" id="preksha'+ j +'" data-toggle="modal" data-target="#myModal'+j+'"><center>' + '<span style="color: white; font-size:13px;"><b>' + getTimeStampDay(output.daily.data[j].time)+ '</b></span>' +'<br><span style="color: white; font-size:13px;"><b>'+ getTimeStampMonthDate(output.daily.data[j].time) +'</b></span><br>'+ icon +'<br><span style="color: white; font-size:13px;"> Min <br> Temp </span><br><span style="color: white; font-size:20px;"><b>'+ output.daily.data[j].temperatureMin +'&deg</span><br><span style="color: white; font-size:13px;"> Max <br> Temp </span><br><span style="color: white; font-size:20px;"><b>'+ output.daily.data[j].temperatureMax + '&deg</b></span></center></div>';
								next7DaysVisual += '<div class="modal fade" id="myModal'+j+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
								next7DaysVisual +=   '<div class="modal-dialog" role="document">';
								next7DaysVisual += 	'<div class="modal-content">';
								next7DaysVisual += 	  '<div class="modal-header">';
								next7DaysVisual += 		'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
								next7DaysVisual += 		'<h4 class="modal-title" id="myModalLabel">Weather in '+ $("#city").val() + ' on ' + getTimeStampMonthDate(output.daily.data[j].time) +'</h4>';
								next7DaysVisual += 	  '</div>';
								next7DaysVisual += 	  '<div class="modal-body">';
								next7DaysVisual += 		'<center>' + icon1 + '<br><span style="font-size: 30px;">' + getTimeStampDay(output.daily.data[j].time) + ': <span style="color: FFA500;">' + output.daily.data[j].summary + '</span></span></center>';
								next7DaysVisual +=    	'<div class="row">';
								next7DaysVisual +=		'<center>';
								next7DaysVisual +=	  		'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Sunrise Time </b></span><br><span>' + output.daily.data[j].sunriseTime + '</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=			'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Sunset Time </b></span><br><span>' + output.daily.data[j].sunsetTime + '</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=			'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Humidity </b></span><br><span>' + Math.round(output.daily.data[j].humidity * 100) + '%</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=		'</center>';
								next7DaysVisual +=		'</div>';
								next7DaysVisual +=		'<div class="row">';
								next7DaysVisual +=		'<center>';
								next7DaysVisual +=			'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Wind Speed </b></span><br><span>' + (output.daily.data[j].windSpeed).toFixed(2) + ' mph</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=			'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Visibility </b></span><br><span>' + visibility7Days + '</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=			'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Pressure </b></span><br><span>' + output.daily.data[j].pressure + ' mb</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=		'</center>';
								next7DaysVisual +=		'</div>';
								next7DaysVisual += 	  '</div>';
								next7DaysVisual += 	  '<div class="modal-footer">';
								next7DaysVisual += 		'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
								next7DaysVisual += 	  '</div>';
								next7DaysVisual += 	'</div>';
								next7DaysVisual +=   '</div>';
								next7DaysVisual += '</div>';
							}next7DaysVisual += '<div class="col-xs-12 col-sm-12 col-md-1 col-lg-1"></div><div class="col-xs-12 col-sm-12 col-md-1 col-lg-1"></div><div class="col-xs-12 col-sm-12 col-md-1 col-lg-1"></div>';
							$('#next7DaysVisual').html(next7DaysVisual);
							activateTabs();
							}
					
					if($('input[name=degree]:checked').val() == "Celsius") {
							console.log($('input[name=degree]:checked').val())
							for(var j = 1; j < 8; j++) {
								
								var visibility7Days = "N.A.";					
								if (output.daily.data[j].visibility != undefined) {
									visibility7Days = (output.daily.data[j].visibility).toFixed(2)+' Km';
								}
								
								switch(output.daily.data[j].icon)
    {
    case 'clear-day':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
    break;
    
    case 'clear-night':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
    break;
    
        case 'rain':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/rain.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
        break;
    
        case 'snow':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/snow.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'sleet':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'wind':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/wind.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'fog':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/fog.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'cloudy':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'partly-cloudy-day':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
            break;
    
        case 'partly-cloudy-night':
    icon="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png' title='"+ output.daily.data[j].summary +"' length='40' width='40'>";
    break;
	}       
    
	switch(output.daily.data[j].icon)
    {
    case 'clear-day':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
    break;
    
    case 'clear-night':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
    break;
    
        case 'rain':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/rain.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
        break;
    
        case 'snow':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/snow.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'sleet':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'wind':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/wind.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'fog':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/fog.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'cloudy':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'partly-cloudy-day':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
            break;
    
        case 'partly-cloudy-night':
    icon1="<img src='http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png' title='"+ output.daily.data[j].summary +"' length='150' width='150'>";
    break;
	}       
    
		
				
								next7DaysVisual += '<div class="col-xs-12 col-sm-12 col-md-1 col-lg-1 next7DaysVisualWell" style="border-radius: 5px; padding-left: 0; padding-right:0;" id="preksha'+ j +'" data-toggle="modal" data-target="#myModal'+j+'"><center>' + '<span style="color: white; font-size:13px;"><b>' + getTimeStampDay(output.daily.data[j].time)+ '</b></span>' +'<br><span style="color: white; font-size:13px;"><b>'+ getTimeStampMonthDate(output.daily.data[j].time) +'</b></span><br>'+ icon +'<br><span style="color: white; font-size:13px;"> Min <br> Temp </span><br><span style="color: white; font-size:20px;"><b>'+ output.daily.data[j].temperatureMin +'&deg</span><br><span style="color: white; font-size:13px;"> Max <br> Temp </span><br><span style="color: white; font-size:20px;"><b>'+ output.daily.data[j].temperatureMax + '&deg</b></span></center></div>';
								next7DaysVisual += '<div class="modal fade" id="myModal'+j+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
								next7DaysVisual +=   '<div class="modal-dialog" role="document">';
								next7DaysVisual += 	'<div class="modal-content">';
								next7DaysVisual += 	  '<div class="modal-header">';
								next7DaysVisual += 		'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
								next7DaysVisual += 		'<h4 class="modal-title" id="myModalLabel">Weather in '+ $("#city").val() + ' on ' + getTimeStampMonthDate(output.daily.data[j].time) +'</h4>';
								next7DaysVisual += 	  '</div>';
								next7DaysVisual += 	  '<div class="modal-body">';
								next7DaysVisual += 		'<center>' + icon1 + '<br><span style="font-size: 30px;">' + getTimeStampDay(output.daily.data[j].time) + ': <span style="color: FFA500;">' + output.daily.data[j].summary + '</span></span></center>';
								next7DaysVisual +=    	'<div class="row">';
								next7DaysVisual +=		'<center>';
								next7DaysVisual +=	  		'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Sunrise Time </b></span><br><span>' + output.daily.data[j].sunriseTime + '</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=			'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Sunset Time </b></span><br><span>' + output.daily.data[j].sunsetTime + '</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=			'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Humidity </b></span><br><span>' + Math.round(output.daily.data[j].humidity * 100) + '%</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=		'</center>';
								next7DaysVisual +=		'</div>';
								next7DaysVisual +=		'<div class="row">';
								next7DaysVisual +=		'<center>';
								next7DaysVisual +=			'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Wind Speed </b></span><br><span>' + (output.daily.data[j].windSpeed).toFixed(2) + ' m/s</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=			'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Visibility </b></span><br><span>' + visibility7Days + '</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=			'<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">';
								next7DaysVisual +=				'<span style="font-size: 20px;"><b> Pressure </b></span><br><span>' + output.daily.data[j].pressure + ' hPa</span>'; 
								next7DaysVisual +=			'</div>';
								next7DaysVisual +=		'</center>';
								next7DaysVisual +=		'</div>';
								next7DaysVisual += 	  '</div>';
								next7DaysVisual += 	  '<div class="modal-footer">';
								next7DaysVisual += 		'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
								next7DaysVisual += 	  '</div>';
								next7DaysVisual += 	'</div>';
								next7DaysVisual +=   '</div>';
								next7DaysVisual += '</div>';
							}next7DaysVisual += '<div class="col-xs-12 col-sm-12 col-md-1 col-lg-1"></div><div class="col-xs-12 col-sm-12 col-md-1 col-lg-1"></div><div class="col-xs-12 col-sm-12 col-md-1 col-lg-1"></div>';
							$('#next7DaysVisual').html(next7DaysVisual);
							activateTabs();
							}
					},
					error: function(){
						
					}
				});				
			} return false;
		});

		
		  function postToFeed(picture, name, description) {
			var obj = {
			  method: 'feed',
			  redirect_uri: 'http://cs-server.usc.edu:23729/hw8/forecast.html',
			  link: 'http://forecast.io/',
			  picture: picture,
			  name: name,
			  caption: 'WEATHER INFORMATION FROM FORECAST.IO',
			  description: description
			};
	 
			function callback(response) {
			  //document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
			  if(response['post_id']) {
				  alert("Posted Successfully")
			  } else {
				  alert("Not Posted");
			  }
			}
	 
			FB.ui(obj, callback);
		
		  }
		
		
		/* Convert the timestamp to get Time 
		function timeFormatter(dateTime){
			//multiply by 1000 to convert the unix timestamp to milliseconds
			var date = new Date(dateTime * 1000);
			if (date.getHours()>=12){
				var hour = parseInt(date.getHours()) - 12;
				hour = (hour == '0' ? 12 : hour);
				var amPm = "PM";
			} else {
				var hour = date.getHours();
				hour = (hour == '0' ? 12 : hour);
				var amPm = "AM";
			}
			var time = (hour < 10 ? '0'+hour : hour)   + ":" + (date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes()) + " " + amPm;
			console.log(time);
			return time;
		}*/
		
		/* Convert the timestamp to get the Day */
		function getTimeStampDay(dateTime) {
			var d = new Date(dateTime * 1000);
			var weekday = new Array(7);
			weekday[0] = "Sunday";
			weekday[1] = "Monday";
			weekday[2] = "Tuesday";
			weekday[3] = "Wednesday";
			weekday[4] = "Thursday";
			weekday[5] = "Friday";
			weekday[6] = "Saturday";

			var n = weekday[d.getDay()];
			return n;
		}
				
		/* Convert the timestamp to get the month and day/date */
		function getTimeStampMonthDate(dateTime) {
			var d = new Date(dateTime * 1000);
			var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var date = d.getDate();
			
			return monthNames[d.getMonth()] + " " + date;
		}
		
		/*nav tabs activate */
		function activateTabs() {
			$('#weatherTabs a[href="#rightNow"]').click(function (e) {
					$('#weatherTabs a[href="#rightNow"]').tab('show');
			});
			
			$('#weatherTabs a[href="#next24Hours"]').click(function (e) {
					$('#weatherTabs a[href="#next24Hours"]').tab('show');
			});
			
			$('#weatherTabs a[href="#next7Days"]').click(function (e) {
					$('#weatherTabs a[href="#next7Days"]').tab('show');
			});
		} 
		
		/*clear button */
		$('#clearBtn').click(function (e)  {
			if($('#streetAddress').val() != "") $('#streetAddress').val("");
			if($('#city').val() != "") $('#city').val("");
			if($('#state').val() != "") $('#state').val("");
			if($('#fahrenheit').is(':checked') == false) $("#fahrenheit").prop("checked", true);
			var validator = $( "#weatherForm" ).validate();
			validator.resetForm();
			if($('#weatherResult')) $('#weatherResult').hide();
		});
	});
	