/**
*   Raddest global variables
*
*   homeOfficeInfo:
*   measurements: english, metric
*       If your home office is in the US, set to english, outside set to metric.
*       Tells the beach api what units to display and the weather api how to
*       convert the Kelvin.
*
*   timeZoneCode:
*       Appropriate time zone code for your office.  Adjust the sunrise and sunset
*       times to their appropriate local time. (May change depending on DST)
*
*   random: true, false
*   Location orders can be randomized or go through the list according to object
*   order set below
*
*   officeLoc:
*   Office loactions generally deal with beaches near Huge offices.  However, if
*   in a location with a lot of beaches, you could use these objects to list
*   multiple beaches in your area.
*
*   name:
*   This is the name of the office in relationship to the beach.  It shows up in
*   the Shred alert ("Brooklyn Time to Shred!!!!!").  If an office near a ton of
*   surf spots, you could add multiple beaches near that office.  In this case,
*   you could use the name to identiify which beach you should go shred
*   ("Ocean Beach Time to Shred!!!!").
*
*   beachID: http://surfline.com
*       Needed for beach cams and surf data
*
*   weatherID: http://openweathermap.org
*       Needed for weather and lat long of the beach.  Use the map on the site
*       to find a weather sation near desired beach
*
*   lat, lon
*       the location of the closest office.  It is taken from the url
*       of the office location in google maps.  This is needed for the map data
*       i.e: https://www.google.com/maps/place/Huge/@51.5218759,-0.0849403,15z/data=!4m5!3m4!1s0x0:0xd8e7019103b03afb!8m2!3d51.5218759!4d-0.0849403
*
*   transit: DRIVING, BICYCLING, WALKING, TRANSIT
*       TRANSIT will add markers to the map of train/bus/transfer number needed
*       Must be in caps
*
*   gnarMultiplyer
*       Used to correctly reflect the gnarMeter per beach.
*       For instance, 6ft is a big deal in New York but not that high in
*       Ocen Beach, CA.  To reflect this, we set the multiplyer to 2 and this
*       doubles the wave height needed to set of a gnar (based on 1-5ft initially).
*       gnarMultiplyer and results converted to meters automatically if
*       measurements set to metric.  Gnar Meter will reflect the same as the
*       english version.
*
*   videoLetterboxed: true, false
*       If the video feed you wish to use is letterboxed, set to true.  This will
*       upscale the video to cutoff the letterboxing so that the image fills the screen
*
*   textColorOptions
*       Number of color arrays animations in css/style.css
*
*   Quick Jumps:
*       init()
*       setOrderType()
*       setGlabalVariables()
*       beachIndex()
*       cookieOrderControl()
*       getCookie()
*       checkCookie()
*       waveInfo()
*       waveData()
*       waveText()
*       gnarMeterData()
*       gnarMeter()
*       shredAlert()
*       shredAlertColor()
*       waveChart()
*       beachCam()
*       weatherInfo()
*       humanTimeFromUnixTime()
*       mapOptions()
*       buildMap()
*       routeOptions()
*       buildRoute()
*       makeMarker()
*       shakaParticles()
*/
var homeOfficeInfo = [
        {
            measurements: 'english',
            timeZoneCode: -5,
            random: false
        }
    ],
    officeLoc = [
        {
            name: 'Brooklyn',
            beachID: 4269,
            weatherID: 5125086,
            lat: 40.7028816,
            lon: -73.9926221,
            transit: 'BICYCLING',
            gnarMultiplyer: 1,
            videoLetterboxed: false
        },
        {
            name: 'Oakland',
            beachID: 4127,
            weatherID: 5354943,
            lat: 37.8066025,
            lon: -122.2711768,
            transit: 'BICYCLING',
            gnarMultiplyer: 2,
            videoLetterboxed: false
        },
        {
            name: 'Los Angeles',
            beachID: 4209, //119811
            weatherID: 5369909,
            lat: 34.0626624,
            lon: -118.3641838,
            transit: 'BICYCLING',
            gnarMultiplyer: 1,
            videoLetterboxed: false
        },
        {
            name: 'Portland',
            beachID: 5073,
            weatherID: 5742750,
            lat: 45.5190225,
            lon: -122.6664673,
            transit: 'DRIVING',
            gnarMultiplyer: 2.4,
            videoLetterboxed: false
        },
        {
            name: 'London',
            beachID: 134367,
            weatherID: 2655095,
            lat: 51.5218759,
            lon: -0.087129,
            transit: 'TRANSIT',
            gnarMultiplyer: 2,
            videoLetterboxed: false
        }
    ],
    textColorOptions = 6,
    officeIcon = 'images/huge-location.svg',
    beachIcon = 'images/gnar-location.svg',
    shakaIcon = 'images/shaka-brah-white.svg',
    mapStroke = '#ffffff',
    mapStrokeOpacity = 1,
    mapStrokeWeight = 3,
    english = 'english',
    metric = 'metric',
    beachCookie = 'beach',
    cookie,
    item,
    beach,
    officeName,
    beachName,
    beachImage,
    beachID,
    weatherID,
    officeLatCoord,
    officeLonCoord,
    beachLatCoord,
    beachLonCoord,
    transit,
    videoLetterboxed,
    timeZone,
    timeZoneCode,
    gmap,
    directionsService,
    directionsDisplay,
    tempUnit,
    heightUnit,
    surflineVar,
    surfMax,
    isRandom;

/**
*   Trigger choka functions
*/
function init() {
    setOrderType();
    setGlobalVariables();
    waveInfo();
    beachCam();
}

/**
*   Duuuuude, anarchy versus order control
*   To randomnize or not randomnize, that is the question
*/
function setOrderType() {
    isRandom = homeOfficeInfo[0].random;
    cookie = Number(checkCookie(beachCookie));

    if (!isRandom) {
        item = officeLoc[cookie];
    } else {
        item = officeLoc[Math.floor(Math.random() * officeLoc.length)];
    }

    beach = beachIndex(item);
}

/**
*   Get index to call random bitchin beach based of amount of totally rad beaches
*   Set those variables used to shred the gnar globally
*/
function setGlobalVariables() {
    officeName = officeLoc[beach].name;
    beachID = officeLoc[beach].beachID;
    weatherID = officeLoc[beach].weatherID;
    officeLatCoord = officeLoc[beach].lat;
    officeLonCoord = officeLoc[beach].lon;
    transit = officeLoc[beach].transit;
    videoLetterboxed = officeLoc[beach].videoLetterboxed;
    timeZoneCode = homeOfficeInfo[0].timeZoneCode;
    measurements = homeOfficeInfo[0].measurements;

    if (measurements === english) {
        heightUnit = 'ft';
        surflineVar = 'e';
        tempUnit = 'f';
    } else if (measurements === metric) {
        heightUnit = 'm';
        surflineVar = 'm';
        tempUnit = 'c';
    }
}

/**
*   Gets a random number based of the items in the beachID array to escape the soup
*   Checks against this bitchin cookie to prevent totally messy waves
*/
function beachIndex(item) {
    for (var i = 0; i < officeLoc.length; i++) {
        if (officeLoc[i] == item) {
            if (i !== cookie) {
                document.cookie = 'beach=' + i;

                return i;
            } else {
                return cookieOrderControl(i);
            }
        }
    }
}

/**
*   Duuuude, increase that cookie by one and set order, or let loose and randomize
*   but not allow the same beach twice in a row
*/
function cookieOrderControl(i) {
    var c;

    if (!isRandom) {
        if (cookie == (officeLoc.length - 1)) {
            c = 0;
        } else {
            c = ++i;
        }
    } else {
        if (i > 0) {
            c = --i;
        } else {
            c = ++i;
        }
    }

    document.cookie = 'beach=' + c;

    return c;
}

/**
*   Makes sure the cookie is not a some sort of mushburger
*/
function getCookie(cookieName) {
    var name = cookieName + '=',
        cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i];

        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }

    return "";
}

/**
*   Returns the cookie from that sick line up of cookies
*/
function checkCookie(desiredCookie) {
    var result = getCookie(desiredCookie);

    return result;
}

/**
*   Get the epic wave height from the beachID
*/
function waveInfo() {
    $.ajax({
        url: "http://api.surfline.com/v1/forecasts/" + beachID + "?resources=surf,analysis&days=1&getAllSpots=false&units=" + surflineVar + "&interpolate=true&showOptimal=false",
        type: "GET",
        dataType: "jsonp",
        success: function(responseData) {
            surfMax = responseData.Surf.surf_max[0];
            timeZone = Number(responseData.timezone);
            beachName = responseData.Location.tide_location;

            console.log(responseData);

            weatherInfo();
            waveChart();
            waveData(responseData);
        }, //end success
        error: function(err) {
            console.log("ERR", err);
        }
    });
}

/**
*   Totally identify the proper item in the surf_max/surf_min array, brah
*   Dude, you need to get the proper index of the periodSchedule to match the proper index of the min/max
*/
function waveData(responseData) {
    var date = new Date(),
        currentHour = date.getHours() * 100,
        schedule = responseData.Surf.periodSchedule[0],
        hourGreaterThan = false,
        waveDataPoints = [],
        waveIndex;

    for (var i = 0; i < schedule.length; i++) {
        if (currentHour >= schedule[i]) {
            waveDataPoints.push(schedule[i]);
        }
    }

    waveIndex = waveDataPoints.length - 1;

    waveText(responseData, waveIndex);
}

/**
*   Print the gnarliest of data and release the maximum surf value
*   Surfline bases their wave heights off of the surf_min and surf_max data
*/
function waveText(responseData, i) {
    var surfGetText = responseData.Analysis.surfText[0],
        surfMaximum,
        surfMinimum,
        surfPrint,
        surfText;

    if (measurements === metric) {
        surfMaximum = Math.round(surfMax[i] * 10) / 10;
        surfMinimum = Math.round(responseData.Surf.surf_min[0][i] * 10) / 10;
    } else {
        surfMaximum = Math.round(surfMax[i]);
        surfMinimum = Math.round(responseData.Surf.surf_min[0][i]);
    }

    if (surfGetText) {
        surfText = ' - ' + surfGetText;
    } else {
        surfText = surfGetText;
    }

    if (surfMaximum === surfMinimum) {
        surfPrint = surfMinimum + '-' + (surfMaximum + 1) + ' ' + heightUnit;
    } else {
        surfPrint = surfMinimum + '-' + surfMaximum + ' ' + heightUnit
    }

    if (surfMaximum === 1 && surfMinimum === 0) {
        surfPrint = '';
        surfText = "Flat";
    }

    document.getElementById("waveHeightData").innerHTML = surfPrint + surfText;

    gnarMeterData(surfMaximum);
}

/**
*   Gnar meter location handler, dude
*   The wave height can be manipulated by location using the multiplyer
*   Multiplyer set in the officeLoc array
*   Convert the gnar meter to meters if needed
*/
function gnarMeterData(gnar) {
    var multiplyer = officeLoc[beach].gnarMultiplyer,
        gnarRates = [
            1 * multiplyer,
            2 * multiplyer,
            3 * multiplyer,
            4 * multiplyer,
            5 * multiplyer
        ];

    if (measurements === metric) {
        gnar = Math.round(gnar * 3.28);
    }

    document.getElementById('shred-location').innerHTML = officeName;
    document.getElementById('office-title').innerHTML = officeName + ' Office';

    gnarMeter(gnar, gnarRates)
}

/**
*   Shaka Meter, nough said brah
*   Adds class of gnarly to shakas based on the height of the waves
*   Triggers ShredAlert
*/
function gnarMeter(gnar, gnarRates) {
    var gnarly = 'gnarly';

    if (gnar > gnarRates[4]) {
        $('.shaka-meter li').addClass(gnarly);

        shredAlert();
    } else if (gnar > gnarRates[3]) {
        $('.shaka-meter li:lt(4)').addClass(gnarly);
    } else if (gnar >gnarRates[2]) {
        $('.shaka-meter li:lt(3)').addClass(gnarly);
    } else if (gnar > gnarRates[1]) {
        $('.shaka-meter li:lt(2)').addClass(gnarly);
    } else if (gnar <= gnarRates[1] && gnar > gnarRates[0]) {
        $('.shaka-meter li:lt(1)').addClass(gnarly);
    }
}

/**
*   Trigger the sickest of alerts, brah.
*/
function shredAlert() {
    var ACTIVE = 'shred';

    setTimeout(function(){
        document.body.classList.add(ACTIVE);
    }, 1500);

    setTimeout(function(){
        document.body.classList.remove(ACTIVE);
    }, 6500);

    shakaParticles();
    shredAlertColor();
}

/**
*   Makes the rainbow on the shred alert extra gnarly, brah
*/
function shredAlertColor() {
    var theText = document.querySelector('.call-to-shred-text'),
        animation = Math.floor(Math.random() * textColorOptions) + 1,
        style = 'style';

    theText.removeAttribute(style);

    theText.setAttribute(style, 'animation-name: flash' + animation);
}

/**
*   Raddest ass wave charts dude
*   Pulls arrays from the gnarliest of apis
*   Chart doesn't seem to like an array of values under 0.5.
*/
function waveChart() {
    var ctx = document.getElementById('gnarChart'),
        waveObject = [];

    for (i = 0; i < surfMax.length; ++i) {
        waveObject.push({
            x: i,
            y: surfMax[i] + 1
        });
    }

    console.log(waveObject)

    var gnarChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: '',
                data: waveObject,
                backgroundColor: [
                    'rgba(255, 255, 255, 0.3)'
                ],
                borderColor: [
                    'rgba(255, 255, 255, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: false,
            legend:{
                display:false
            },
            scales: {
                xAxes: [{
                    display: false,
                    position: 'bottom',
                    type: 'linear',
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.2)",
                    }
                }],
                yAxes: [{
                    display: false,
                    position: 'left',
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.2)",
                    }
                }]
            }
        }
    })
}

/**
*   Get that GNARLY beach cam from the beachID
*   Plays video
*   Make Full Window
*/
function beachCam() {
    // Get surf cam
    $.ajax({
        url: "http://api.surfline.com/v1/cams/" + beachID,
        type: "GET",
        dataType: "jsonp",
        success: function(responseData) {
            var options = {
                autoplay: true,
                html5: {
                    hlsjsconfig: {
                        debug: true,
                        autoStartLoad: true,
                        maxBufferLength: 30,
                        maxBufferSize: 60 * 1000 * 1000,
                        enableWorker: true,
                        fragLoadingTimeOut: 20000,
                        fragLoadingMaxRetry: 6,
                        fragLoadingRetryDelay: 500,
                        manifestLoadingTimeOut: 10000,
                        manifestLoadingMaxRetry: 6,
                        manifestLoadingRetryDelay: 500,
                        fpsDroppedMonitoringPeriod: 5000,
                        fpsDroppedMonitoringThreshold: 0.2,
                        appendErrorMaxRetry: 200,
                    }
                }
            },
            poster = document.getElementById('poster'),
            video = document.getElementById('videoId'),
            file = responseData.streamInfo.stream[0].file,
            player = videojs('videoId', options);

            console.log(responseData)

            if (videoLetterboxed) {
                document.querySelector('.video-wrapper').className += ' letterboxed';
            }

            poster.src = responseData.streamInfo.stream[0].camImage;

            player.src({ type: 'application/x-mpegURL', src: file });
            player.play();
            player.enterFullWindow();

            setTimeout(function (){
                video.style.display = 'block';
                poster.style.display = 'none';
            }, 1000);

        }, //end success
        error: function(err) {
            console.log("ERR", err);
        }
    });
}

/**
*   Get that clean weather based off of weatherID
*   Dude, get the sunrise and sunset
*   Get Lat and Lon of beach
*   Initiaes Map functions
*   Map needs Lat and Lon to succeed
*/
function weatherInfo() {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?id=" + weatherID + "&APPID=ef9e7e6d82e6945b2f61368cb1d538c7",
        type: "GET",
        dataType: "jsonp",
        success: function(responseData) {
            var sunrise = humanTimeFromUnixTime(responseData.sys.sunrise),
                sunset = humanTimeFromUnixTime(responseData.sys.sunset),
                tempData = responseData.main.temp,
                temp;

            if (measurements === metric) {
                temp = parseInt(tempData - 273.15);
            } else {
                temp = parseInt(1.8 * (tempData - 273) + 32);
            }

            document.getElementById('temp').innerHTML = temp + '&deg;' + tempUnit;
            document.getElementById('sunriseData').innerHTML = sunrise + '<span>am</span>';
            document.getElementById('sunsetData').innerHTML = sunset + '<span>pm</span>';

            beachLatCoord = responseData.coord.lat;
            beachLonCoord = responseData.coord.lon;

            mapOptions();
        }, //end success
        error: function(err) {
            console.log("ERR", err);
        }
    });
}

/**
*   Converts Unix time into readable time (Brah, who uses unix?!?!)
*   Converts time from military time (Brah, i'll shred in cleveland before joing the army!!!!!)
*/
function humanTimeFromUnixTime(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000),
        adjust = timeZoneCode - timeZone,
        hours = date.getHours() - adjust,
        minutes = "0" + date.getMinutes();

    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }

    var formattedTime = hours + ':' + minutes.substr(-2);

    return formattedTime;
}

/**
*   Sets Map options so i can drop in with style
*   Sets Maps route styles
*   Triggerers Map build
*/
function mapOptions() {
    var mapStyles = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1d2c4d"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8ec3b9"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#1a3646"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#4b6878"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#64779e"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#4b6878"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#334e87"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#023e58"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#283d6a"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6f9ba5"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#1d2c4d"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#023e58"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#3C7680"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#304a7d"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#98a5be"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#1d2c4d"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2c6675"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#255763"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#b0d5ce"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#023e58"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#98a5be"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#1d2c4d"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#283d6a"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#3a4762"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#0e1626"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#4e6d70"
                }
            ]
        }
    ],
    mapOptions = {
        center: {
            lat: officeLatCoord,
            lng: officeLonCoord
        },
        disableDefaultUI: true,
        mapTypeId: 'roadmap',
        scrollwheel: false,
        styles: mapStyles
    },
    directionsOptions = {
        suppressMarkers: true,
        polylineOptions: {
            strokeColor: mapStroke,
            strokeOpacity: mapStrokeOpacity,
            strokeWeight: mapStrokeWeight
        }
    };

    buildMap(mapOptions, directionsOptions);
}

/**
*   Initiates map and sets options
*   Triggers Map route options
*/
function buildMap(mapOptions, directionsOptions) {
    gmap = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer(directionsOptions);
    directionsDisplay.setMap(gmap);

    routeOptions();
}

/**
*   Builds Map routes options so i totally hang ten
*   Triggers routes build out
*/
function routeOptions() {
    var start = {
            lat: officeLatCoord,
            lng: officeLonCoord
        },
        end = {
            lat: beachLatCoord,
            lng: beachLonCoord
        },
        request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode[transit]
        },
        icons = {
            start: {
                url: officeIcon,
                size: new google.maps.Size(60, 60),
                scaledSize: new google.maps.Size(60, 60),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(15, 15)
            },
            end: {
                url: beachIcon,
                size: new google.maps.Size(60, 60),
                scaledSize: new google.maps.Size(60, 60),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(15, 15)
            }
        };

    buildRoute(request, icons);
}

/**
*   Builds Map routes, duh
*   Triggers custom icon builds
*/
function buildRoute(request, icons) {
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            makeMarker(request.origin, icons.start, officeName);
            makeMarker(request.destination, icons.end, beachName);
        } else {
            console.log("couldn't get directions:" + status);
        }
    });
}

/**
*   Sets custom icon...that's heavy, brah
*/
function makeMarker(position, icon, name) {
    new google.maps.Marker({
        position: position,
        map: gmap,
        icon: icon,
        title: name
    });
}

/**
*   Brah, where the ganr becomes reality
*/
function shakaParticles() {
    jmParticleEngine.init('shred-the-gnar-canvas', window.innerWidth, window.innerHeight);

    function particleGenerator() {
        var size = jmParticleEngine.randomNumber(200, -64, true);

        return jmParticleEngine.generateParticle(
            // Start at the emitter's x co-ordinate.
            this.x ,
            // Start at the emitter's y co-ordinate.
            this.y ,
            // Width.
            size,
            // Height.
            size,
            // Rotation.
            jmParticleEngine.randomNumber(Math.PI * 2, 0, false),
            // xVelocity.
            jmParticleEngine.randomNumber(50, 30, false),
            // yVelocity.
            jmParticleEngine.randomNumber(50, 30, false),
            // Life.
            180,
            // How will particle change size vs life.
            // 0 - no change, same size always.
            // 1 - smaller with age.
            // 2 - larger with age.
            2,
            // Red.
            jmParticleEngine.randomNumber(32, 0, true),
            // Green.
            0,
            // Blue.
            0,
            // If we wish to use a preloaded image, specify index here.
            0
        );
    }

    var emit1 = jmParticleEngine.generateEmitter(Math.ceil(window.innerWidth / 2),
        Math.ceil(window.innerHeight / 2), 200, particleGenerator);
        emit1.preloadImage(shakaIcon);

    jmParticleEngine.addEmitter(emit1, true);
}

/**
*   Inits gnarly beach cams and data brah
*/
init();
