<?php header('Access-Control-Allow-Origin: *');	
	$street = "";
	$city = "";
	$state = "";
	$degree = "";
	
	if (isset($_GET["streetAddress"]) && !empty($_GET["streetAddress"])) {
		$street = urlencode($_GET["streetAddress"]);
	}

	if (isset($_GET["city"]) && !empty($_GET["city"])) {
		$city = urlencode($_GET["city"]);
	}

	if (isset($_GET["state"]) && !empty($_GET["state"])) {
		$state = urlencode($_GET["state"]);
	}

	if (isset($_GET["degree"]) && !empty($_GET["degree"])) {
		$degree = $_GET["degree"];
	}

	$tempAddress = $street . "," . $city . "," . $state;
	$tempGoogleApiKey = "AIzaSyDrDxYFB5G4AXNJBUDfoLNrW5PA1ADEWhs";
	$tempGoogleApiURL = "https://maps.googleapis.com/maps/api/geocode/xml?address=" . $tempAddress . "&key=" . $tempGoogleApiKey;

	$xmlDoc = new SimpleXMLElement($tempGoogleApiURL, NULL, TRUE);
	if ($xmlDoc->status == "OK") {
		$lattitude = "";
		$longitude = "";

		$i = 0;
		foreach ($xmlDoc->result[0]->geometry[0]->location[0]->children() as $child) {
			if($i == 0) {$lattitude = $child;}
			if($i == 1) {$longitude = $child;}
			$i++;
		}

		$tempForecastApiKey = "446c19f937799a04c95bf3fbbf216006";

		$forecastApiUnit = $degree;

		

		$tempForecastApiURL = "https://api.forecast.io/forecast/" . $tempForecastApiKey . "/" . $lattitude . "," . $longitude . "?units=" . $forecastApiUnit . "&exclude=flags";

		$obj = json_decode(file_get_contents($tempForecastApiURL));
		
		date_default_timezone_set($obj->timezone);
		
		for ( $i = 0; $i <= 7; $i++)
		{
			$riseTime = $obj->daily->data[$i]->sunriseTime;
			$setTime = $obj->daily->data[$i]->sunsetTime;
			$obj->daily->data[$i]->sunriseTime = date('h:i A', $riseTime);
			$obj->daily->data[$i]->sunsetTime = date('h:i A', $setTime);

			$time = $obj->daily->data[$i]->time;
			$obj->daily->data[$i]->monthDate = date("M j", $time);
			$obj->daily->data[$i]->weekday = date("l", $time);
		}

		
		for ($j = 0; $j <= 48; $j++)
		{
			$aTime = $obj->hourly->data[$j]->time;
			$obj->hourly->data[$j]->time = date('h:i A', $aTime);
		}
		
		echo json_encode($obj);
	}
?>