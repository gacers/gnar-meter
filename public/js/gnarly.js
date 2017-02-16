/**
*
*        _        ,-.    / )
*       ( `.     // /-._/ /
*        `\ \   /(_/ / / /
*          ; `-`  (_/ / /
*          |       (_/ /
*          \          /
*           )       /`
*          /      /`
*
*
*
*   In order to run this app, create the file js/app.js.  Below is an example of
*   how to initialize the application within the js/app.js file.
*
*   Baisc Init:
*       gnarly.init();
*
*   Custom Options:
*       gnarly.init({
*           homeOfficeInfo: [
*               {
*                   cycleBeaches: true,
*                   measurements: 'english',
*                   random: false
*               }
*           ],
*           officeLoc: [
*               {
*                   name: 'Brooklyn',
*                   initials: 'BK',
*                   lat: 40.7028816,
*                   lon: -73.9926221,
*                   beachID: [
*                       {
*                           id: 4269,
*                           gnarMultiplyer: 1,
*                           nightEnabled: false,
*                           transit: 'BICYCLING',
*                           videoLetterboxed: false
*                       },
*                       {
*                           id: 4270,
*                           gnarMultiplyer: 1,
*                           nightEnabled: true,
*                           transit: 'BICYCLING'
*                           videoLetterboxed: false
*                       }
*                   ]
*               }
*           ]
*       });
*
*
*   Raddest global variables
*
*   homeOfficeInfo:
*       cycleBeaches:
*            options: true, false
*            If true, cycle through all the beaches in the BeachID array per location
*
*        measurements:
*            options: english, metric
*            If your home office is in the US, set to english, outside set to metric.
*            Tells the beach api which units to display and the weather api how
*            to convert the Kelvin.
*
*       random:
*            options: true, false
*            Location orders can be randomized or go through the list according
*            to object order set below
*
*   officeLoc:
*       Office loactions generally deal with beaches near Huge offices.  However,
*       if in a location with a lot of beaches, you could use these objects to
*       list multiple beaches in your area.
*
*       name:
*           This is the name of the office in relationship to the beach.
*           It shows up in the Shred alert ("Brooklyn Time to Shred!!!!!").
*
*       initials:
*           Initials of the city the office being displayed is loacted. If the
*           initials aren't obvios, like LA, use the airport code.
*
*       lat:
*           The latitude of the closest office.
*           It is taken from the url of the office location in google maps.
*           This is needed for the map data
*               i.e: https://www.google.com/maps/place/Huge/@51.5218759,-0.0849403,15z/data=!4m5!3m4!1s0x0:0xd8e7019103b03afb!8m2!3d51.5218759!4d-0.0849403
*
*       lon:
*           The longitude of the closest office.
*           It is taken from the url of the office location in google maps.
*           This is needed for the map data
*               i.e: https://www.google.com/maps/place/Huge/@51.5218759,-0.0849403,15z/data=!4m5!3m4!1s0x0:0xd8e7019103b03afb!8m2!3d51.5218759!4d-0.0849403
*
*       beachID:
*           id:
*               http://surfline.com: find a cam in the Cams & Reports menu and
*               select it (cameras have a square icon and
*               HD cams have a rectangle icon).  The ID will be in the URL.
*               Needs to be an array even if one.
*               Can be several objects comma seperated.
*               This controls the beach cam, location data, wave data, and weather data.
*
*           gnarMultiplyer:
*               Used to correctly reflect the gnarMeter per beach.
*               For instance, 6ft is a big deal in New York but not that high in
*               Ocean Beach, CA.  To reflect this, we set the multiplyer to 2
*               and this doubles the wave height needed to set of a gnar (based
*               on 1-5ft initially).
*               gnarMultiplyer and results converted to meters automatically if
*               measurements set to metric.  Gnar Meter will reflect the same as
*               the english version.
*
*           nightEnabled:
*               options: true, false
*               If the camera has night vision or just looks good at night, you
*               can set this to true.
*               If false, this office location will be skipped over after 35min
*               after sunset and will turn on 20min before sunrise.
*               Each camera is turned off after a certain hour.  If nightEnabled
*               is true, but the camera is off, the beach will be skipped.
*
*            transit:
*               options: DRIVING, BICYCLING, WALKING, TRANSIT
*               TRANSIT will add markers to the map of train/bus/transfer number
*               Must be in caps.
*               If a route is not possible or requires a flight, the two markers
*               will appear but no route.  Google API does not return this info.
*
*            videoLetterboxed:
*               options: true, false
*               If the video feed you wish to use is letterboxed, set to true.
*               This will upscale the video to cutoff the letterboxing so that
*               the image fills the screen
*
*   Quick Jumps:
*       shredAlertColor()
*       shakaParticles()
*       shredAlert()
*       gnarMeter()
*       gnarMeterData()
*       revealWaveData()
*       printSurfText()
*       setWaveText()
*       formatWaveData()
*       getNewWaveData()
*       waveText()
*       waveData()
*       waveChart()
*       makeMarker()
*       directionsFallback()
*       buildRoute()
*       routeOptions()
*       buildMap()
*       mapOptions()
*       revealSunset()
*       revealSunrise()
*       setTime()
*       revealWeather()
*       weatherResponse()
*       weatherInfo()
*       waveResponseVariables()
*       getBeachData()
*       mapReset()
*       gnarReset()
*       resetData()
*       nextBeach()
*       beachIDRetreival()
*       isStalled()
*       showVideo()
*       isPlaying()
*       playerStatus()
*       initHLS()
*       setHLS()
*       posterSet()
*       setPosterInitials()
*       streamInit()
*       cameraStatus()
*       setVideoVariables()
*       beachCam()
*       hourAdjust()
*       setTimeZone()
*       formatTime()
*       editTime()
*       setCameraLimits()
*       sundDataResponse()
*       sunInfo()
*       beachForecast()
*       defineUnits()
*       setGlobalVariables()
*       resetBeachID()
*       setBeachID()
*       cookieOrderControl()
*       beachIndex()
*       getCookie()
*       checkCookie()
*       setBeachOrder()
*       setBeachNumber()
*       setOrderType()
*       launchApp()
*       init()
*/

var gnarly = (function() {
    var domElements = {
            BEACH_INITIAL: document.querySelector('.beach-initials'),
            BEACH_TITLE: document.querySelector('.beach-title'),
            BODY: document.body,
            CALL_TO_SHRED: document.querySelector('.call-to-shred-text'),
            GNAR_CHART: document.getElementById('gnarChart'),
            IMAGE_WRAPPER: document.querySelector('.fullscreen-image-wrapper'),
            LOCATION_NAME: document.querySelector('.shred-location'),
            MAP: document.getElementById('map'),
            MAP_TITLE: document.querySelector('.map-title'),
            OFFICE_TITLE: document.querySelector('.office-title'),
            PANEL: document.querySelector('.panel'),
            POSTER: document.querySelector('.poster'),
            SHAKAS: ".shaka-meter li",
            SUNRISE: document.querySelector('.sunrise'),
            SUNRISE_DATA: document.querySelector('.sunrise-data'),
            SUNSET: document.querySelector('.sunset'),
            SUNSET_DATA: document.querySelector('.sunset-data'),
            TEMP: document.querySelector('.temp'),
            TEMPERATURE: document.querySelector('.temperature'),
            VIDEO: document.getElementById('videoId'),
            VIDEO_WRAPPER: document.querySelector('.video-wrapper'),
            WAVE_HEIGHT: document.querySelector('.wave-height'),
            WAVE_HEIGHT_DATA: document.querySelector('.wave-height-data')
        },
        styleOptions = {
            textColorOptions: 6,
            officeIcon: 'images/huge-location.svg',
            beachIcon: 'images/gnar-location.svg',
            shakaIcon: 'images/shaka-brah-white.svg',
            mapStroke: '#ffffff',
            mapStrokeOpacity: 1,
            mapStrokeWeight: 3,
            mapMarkers: [],
            english: 'english',
            metric: 'metric'
        },
        ACTIVE = 'gnarly',
        beach,
        beachArraySet = false,
        beachImage,
        beachLatCoord,
        beachLonCoord,
        beachName,
        beachSet = false,
        camCurrent,
        camOff,
        camOn,
        cookie,
        directionsDisplay,
        directionsService,
        DISABLED = 'disabled',
        file,
        forecastData,
        gmap,
        gnarChart,
        gnarRates = [],
        heightUnit,
        isRandom,
        locationDefaults = {
            homeOfficeInfo: [
                {
                    cycleBeaches: true,
                    measurements: 'english',
                    random: false
                }
            ],
            officeLoc: [
                {
                    name: 'Brooklyn',
                    initials: 'BK',
                    lat: 40.7028816,
                    lon: -73.9926221,
                    beachID: [
                        {
                            id: 4269,
                            gnarMultiplyer: 1,
                            nightEnabled: false,
                            transit: 'BICYCLING',
                            videoLetterboxed: false
                        }
                    ]
                },
                {
                    name: 'Oakland',
                    initials: 'OAK',
                    lat: 37.8066025,
                    lon: -122.2711768,
                    beachID: [
                        {
                            id: 4127,
                            gnarMultiplyer: 2,
                            nightEnabled: false,
                            transit: 'BICYCLING',
                            videoLetterboxed: false
                        }
                    ]
                },
                {
                    name: 'Los Angeles',
                    initials: 'LA',
                    lat: 34.0626624,
                    lon: -118.3641838,
                    beachID: [
                        {
                            id: 4209,
                            gnarMultiplyer: 1,
                            nightEnabled: false,
                            transit: 'BICYCLING',
                            videoLetterboxed: false
                        }
                    ]
                },
                {
                    name: 'Portland',
                    initials: 'PDX',
                    lat: 45.5190225,
                    lon: -122.6664673,
                    beachID: [
                        {
                            id: 5073,
                            gnarMultiplyer: 2.4,
                            nightEnabled: false,
                            transit: 'DRIVING',
                            videoLetterboxed: false
                        }
                    ]
                },
                {
                    name: 'London',
                    initials: 'LDN',
                    lat: 51.5218759,
                    lon: -0.087129,
                    beachID: [
                        {
                            id: 134366,
                            gnarMultiplyer: 1,
                            nightEnabled: true,
                            transit: 'TRANSIT',
                            videoLetterboxed: false
                        }
                    ]
                }
            ]
        },
        MAP_TITLE_TOGGLE = 'activate-switch',
        marker,
        MO = MutationObserver || WebKitMutationObserver || MozMutationObserver,
        multiplyer,
        nightEnabled,
        observ,
        office,
        officeCookie = 'office',
        officeInitials,
        officeLatCoord,
        officeLonCoord,
        officeName,
        openWeatherUnit,
        options,
        overwrites,
        player,
        POSTER_HIDE = 'poster-hide',
        POSTER_READY = 'poster-ready',
        posterSrc,
        retrieved = false,
        REVEAL = 'reveal',
        selectedBeach,
        selectedBeachID,
        setMap,
        SHOWMAP = 'map-show',
        stoked = false,
        sunriseFormat,
        sunsetFormat,
        sunDown,
        sunUp,
        surflineVar,
        surfMax,
        surfMaximum,
        surfMinimum,
        tempUnit,
        timeZone,
        transit,
        videoLetterboxed,
        waveIndex,
        weatherID;

    /**
    *   Makes the rainbow on the shred alert extra gnarly, brah
    */
    function shredAlertColor() {
        var animation = Math.floor(Math.random() * styleOptions.textColorOptions) + 1,
            style = 'style';

        domElements.CALL_TO_SHRED.removeAttribute(style);

        domElements.CALL_TO_SHRED.setAttribute(style, 'animation-name: flash' + animation);
    }

    /**
    *   Brah, where the gnar becomes reality
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
            emit1.preloadImage(styleOptions.shakaIcon);

        jmParticleEngine.addEmitter(emit1, true);
    }

    /**
    *   Trigger the sickest of alerts, brah.
    *   Let's add some color arrays for maximum spacing out.
    */
    function shredAlert() {
        var ACTIVE = 'shred';

        setTimeout(function(){
            domElements.BODY.classList.add(ACTIVE);
        }, 4000);

        setTimeout(function(){
            domElements.BODY.classList.remove(ACTIVE);
        }, 9000);

        shakaParticles();
        shredAlertColor();
    }

    /**
    *   Shaka Meter, nough said brah.
    *   Let's the app know if the viewer is already stoked so it knows to reset
    *   them later if so.
    *
    *   Adds class of gnarly to shakas based on the height of the waves.
    *   Triggers ShredAlert
    */
    function gnarMeter() {
        if (surfMaximum > gnarRates[4]) {
            $(domElements.SHAKAS).addClass(ACTIVE);

            shredAlert();
        } else if (surfMaximum > gnarRates[3]) {
            $(domElements.SHAKAS + ':lt(4)').addClass(ACTIVE);
        } else if (surfMaximum >gnarRates[2]) {
            $(domElements.SHAKAS + ':lt(3)').addClass(ACTIVE);
        } else if (surfMaximum > gnarRates[1]) {
            $(domElements.SHAKAS + ':lt(2)').addClass(ACTIVE);
        } else if (surfMaximum <= gnarRates[1] && surfMaximum > gnarRates[0]) {
            $(domElements.SHAKAS + ':lt(1)').addClass(ACTIVE);
        }
    }

    /**
    *   Gnar meter location handler, dude
    *   The wave height can be manipulated by location using the multiplyer
    *   Multiplyer set in the officeLoc array
    *   Convert the gnar meter to meters if needed
    */
    function gnarMeterData() {
        gnarRates = [
            1 * multiplyer,
            2 * multiplyer,
            3 * multiplyer,
            4 * multiplyer,
            5 * multiplyer
        ];

        if (measurements === styleOptions.metric) {
            surfMaximum = Math.round(surfMaximum * 3.28);
        }

        domElements.LOCATION_NAME.innerHTML = officeName;
        domElements.OFFICE_TITLE.innerHTML = officeName + ' Office';

        if (beachName) {
            domElements.BEACH_TITLE.classList.remove(DISABLED);

            domElements.BEACH_TITLE.innerHTML = beachName;

            domElements.MAP_TITLE.classList.add(MAP_TITLE_TOGGLE);
        } else {
            domElements.BEACH_TITLE.classList.add(DISABLED);
        }

        gnarMeter();
    }

    /**
     *    If wave DOM changed, reveal the data
     */
    function revealWaveData() {
        domElements.WAVE_HEIGHT.classList.add(REVEAL);

        observ.disconnect();
    }

    /**
     *    Let's print that wave data on the screen!!!!
     *    Trigger the GNAAAAAAAAAAR!
     */
    function printSurfText(surfText, surfPrint) {
        observ.observe(domElements.WAVE_HEIGHT_DATA, {childList: true, subtree: true});

        domElements.WAVE_HEIGHT_DATA.innerHTML = surfPrint + surfText;

        gnarMeterData();
    }

    /**
     *    Yoooo, like some times there is text and sometimes there's none.  Format
     *    the wave text to give an overal gnarly experience to the viewres.
     */
    function setWaveText() {
        var surfGetText = forecastData.Analysis.surfText[0],
            surfText,
            surfPrint;

        if (surfGetText) {
            surfText = ' - ' + surfGetText;
        } else {
            surfText = '';
        }

        if (surfMaximum === surfMinimum) {
            surfPrint = surfMinimum + '-' + (surfMaximum + 1) + ' ' + heightUnit;
        } else {
            surfPrint = surfMinimum + '-' + surfMaximum + ' ' + heightUnit
        }

        if (surfGetText == undefined) {
            surfText = '';
        }

        if (surfMaximum == 0 || surfMaximum == 1 && surfMinimum == 0) {
            surfPrint = ' ';
            surfText = 'Flat';
        }

        printSurfText(surfText, surfPrint)
    }

    /**
     *    Yo brah, some radical duders totally like celcius.  Let's make them feel
     *    totally included.
     */
    function formatWaveData(surfMaximumData, surfMinimumData) {
        if (measurements === styleOptions.metric) {
            surfMaximum = Math.round(surfMaximumData * 10) / 10;
            surfMinimum = Math.round(surfMinimumData * 10) / 10;
        } else {
            surfMaximum = Math.round(surfMaximumData);
            surfMinimum = Math.round(surfMinimumData);
        }

        setWaveText();
    }

    /**
     *    If the human data is totally empty, grab from the array;
     */
    function getNewWaveData() {
        var surfMaximumData = surfMax[waveIndex],
            surfMinimumData = forecastData.Surf.surf_min[0][waveIndex];

        formatWaveData(surfMaximumData, surfMinimumData);
    }

    /**
    *   Get the gnarly wave heights.  Human version works best, but if empty, grab
    *   from the surf_min/surf_max arrays
    */
    function waveText() {
        var surfMaximumData = forecastData.Analysis.surfMax[0],
            surfMinimumData = forecastData.Analysis.surfMin[0];

        if (isNaN(surfMaximumData)) {
            getNewWaveData();
        } else {
            formatWaveData(surfMaximumData, surfMinimumData);
        }
    }

    /**
    *   Totally identify the proper item in the surf_max/surf_min array, brah
    *   Dude, you need to get the proper index of the periodSchedule to match
    *   the proper index of the min/max
    */
    function waveData() {
        var date = new Date(),
            currentHour = date.getHours() * 100,
            schedule = forecastData.Surf.periodSchedule[0],
            hourGreaterThan = false,
            waveDataPoints = [];

        for (var i = 0; i < schedule.length; i++) {
            if (currentHour >= schedule[i]) {
                waveDataPoints.push(schedule[i]);
            }
        }

        waveIndex = waveDataPoints.length - 1;

        waveText();
    }

    /**
    *   Raddest ass wave charts dude.
    *   Uses chart.js.
    *   Pulls arrays from the gnarliest of apis
    *   Chart doesn't seem to like an array of values under 0.5.
    */
    function waveChart() {
        var waveObject = [];

        for (i = 0; i < surfMax.length; ++i) {
            waveObject.push({
                x: i,
                y: surfMax[i] + 1
            });
        }

        gnarChart = new Chart(domElements.GNAR_CHART, {
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
                responsive: true,
                maintainAspectRatio: true,
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
    *   Sets custom icon...that's like, waaaaaay heavy, brah
    */
    function makeMarker(position, icon, name) {
        marker = new google.maps.Marker({
            position: position,
            map: gmap,
            icon: icon,
            title: name,
            optimized: false
        });

        styleOptions.mapMarkers.push(marker);
    }

    /**
     *    Brah, if there is a dank ass error on directionsService or a transit
     *    mode is not added, fallback to displaying the map bound by the two
     *    bitchin' locations
     */
    function directionsFallback(request, icons) {
        var bounds = new google.maps.LatLngBounds();

        makeMarker(request.origin, icons.start, officeName);
        makeMarker(request.destination, icons.end, beachName);

        bounds.extend(request.origin);
        bounds.extend(request.destination);

        gmap.fitBounds(bounds);
    }

    /**
    *   Builds Map routes, duh
    *   Triggers custom icon builds
    *   If directionsService fails (braaaah!!!!!), call fallback map
    */
    function buildRoute(request, icons) {
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
                makeMarker(request.origin, icons.start, officeName);
                makeMarker(request.destination, icons.end, beachName);
            } else {
                directionsFallback(request, icons);
            }
        });

        domElements.MAP.classList.add(SHOWMAP);
    }

    /**
    *   Builds Map routes options so i can totally hang ten
    *   Triggers routes build out.
    *
    *   If the two spots can't be reached except by plane, skip the route and
    *   fallback to just two points.
    */
    function routeOptions() {
        var start = {
                lat: officeLatCoord,
                lng: officeLonCoord
            },
            end = {
                lat: Number(beachLatCoord),
                lng: Number(beachLonCoord)
            },
            request = {
                origin: start,
                destination: end
            },
            icons = {
                start: {
                    url: styleOptions.officeIcon,
                    scaledSize: new google.maps.Size(40, 40),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(15, 15)
                },
                end: {
                    url: styleOptions.beachIcon,
                    scaledSize: new google.maps.Size(40, 40),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(15, 15)
                }
            };

        if (!transit) {
            directionsFallback(request, icons);
        } else {
            request.travelMode = google.maps.TravelMode[transit];

            buildRoute(request, icons);
        }
    }

    /**
    *   Initiates map and sets options
    *   Triggers Map route options
    */
    function buildMap(mapOptions, directionsOptions) {
        gmap = new google.maps.Map(domElements.MAP, mapOptions);
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer(directionsOptions);
        directionsDisplay.setMap(gmap);

        routeOptions();
    }

    /**
    *   Sets Map options so i can drop in with style
    *   Sets Maps route styles
    *   Triggerers Map build
    */
    function mapOptions() {
        var mapStyles = [
            {
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#1d2c4d'
                    }
                ]
            },
            {
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#8ec3b9'
                    }
                ]
            },
            {
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#1a3646'
                    }
                ]
            },
            {
                'featureType': 'administrative.country',
                'elementType': 'geometry.stroke',
                'stylers': [
                    {
                        'color': '#4b6878'
                    }
                ]
            },
            {
                'featureType': 'administrative.land_parcel',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'administrative.land_parcel',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#64779e'
                    }
                ]
            },
            {
                'featureType': 'administrative.neighborhood',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'administrative.province',
                'elementType': 'geometry.stroke',
                'stylers': [
                    {
                        'color': '#4b6878'
                    }
                ]
            },
            {
                'featureType': 'landscape.man_made',
                'elementType': 'geometry.stroke',
                'stylers': [
                    {
                        'color': '#334e87'
                    }
                ]
            },
            {
                'featureType': 'landscape.natural',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#023e58'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#283d6a'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'labels.text',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#6f9ba5'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#1d2c4d'
                    }
                ]
            },
            {
                'featureType': 'poi.park',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#023e58'
                    }
                ]
            },
            {
                'featureType': 'poi.park',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#3C7680'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#304a7d'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'labels',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#98a5be'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#1d2c4d'
                    }
                ]
            },
            {
                'featureType': 'road.arterial',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'road.highway',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#2c6675'
                    }
                ]
            },
            {
                'featureType': 'road.highway',
                'elementType': 'geometry.stroke',
                'stylers': [
                    {
                        'color': '#255763'
                    }
                ]
            },
            {
                'featureType': 'road.highway',
                'elementType': 'labels',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'road.highway',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#b0d5ce'
                    }
                ]
            },
            {
                'featureType': 'road.highway',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#023e58'
                    }
                ]
            },
            {
                'featureType': 'road.local',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'transit',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#98a5be'
                    }
                ]
            },
            {
                'featureType': 'transit',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#1d2c4d'
                    }
                ]
            },
            {
                'featureType': 'transit.line',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#283d6a'
                    }
                ]
            },
            {
                'featureType': 'transit.station',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#3a4762'
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'color': '#0e1626'
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'labels.text',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#4e6d70'
                    }
                ]
            }
        ],
        mapOptions = {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
                strokeColor: styleOptions.mapStroke,
                strokeOpacity: styleOptions.mapStrokeOpacity,
                strokeWeight: styleOptions.mapStrokeWeight
            }
        };

        buildMap(mapOptions, directionsOptions);
    }


    /**
     *    If sunset DOM changed, reveal the data
     */
    function revealSunset() {
        domElements.SUNSET.classList.add(REVEAL);

        observ.disconnect();
    }

    /**
     *    If sunrise DOM changed, reveal the data
     */
    function revealSunrise() {
        domElements.SUNRISE.classList.add(REVEAL);

        observ.disconnect();
    }

    function setTime() {
        observ.observe(domElements.SUNRISE_DATA, {childList: true, subtree: true});
        observ.observe(domElements.SUNSET_DATA, {childList: true, subtree: true});

        domElements.SUNRISE_DATA.innerHTML = sunriseFormat + '<span>am</span>';
        domElements.SUNSET_DATA.innerHTML = sunsetFormat + '<span>pm</span>';
    }

    /**
     *    If weather DOM changed, reveal the data
     */
    function revealWeather() {
        domElements.TEMPERATURE.classList.add(REVEAL);

        observ.disconnect();
    }

    /**
     *    Let's clean up some waaaay gnarly decimals and drop in the temp.
     */
    function weatherResponse(responseData) {
        var temp = Math.round(responseData.main.temp);

        observ.observe(domElements.TEMP, {childList: true, subtree: true});

        domElements.TEMP.innerHTML = temp + '&deg;' + tempUnit;
    }

    /**
    *   Get that clean weather based off of weatherID
    *   Dude, like, let's trigger some info on the daylight!!
    *   Initiaes the map to show our way to the break.
    */
    function weatherInfo() {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + beachLatCoord + '&lon=' + beachLonCoord + '&units=' + openWeatherUnit + '&APPID=ef9e7e6d82e6945b2f61368cb1d538c7',
            type: 'GET',
            dataType: 'jsonp',
            success: function(responseData) {
                weatherResponse(responseData);
                setTime();
                mapOptions();
            }, //end success
            error: function(err) {
                console.log('ERR', err);
            }
        });
    }

    /**
     *    Global variables set for the beach names and location, brah.
     *    Global beach Lat an Lon set for geo-gnarcation.
     */
    function waveResponseVariables() {
        beachName = forecastData.Location.tide_location;
        surfMax = forecastData.Surf.surf_max[0];
    }

    /**
     *    Now that the sun is up and camera is on and working, let's bring that
     *    gnarly beach and weather data in.
     */
    function getBeachData() {
        stoked = true;

        waveResponseVariables();
        weatherInfo();
        waveChart();
        waveData();
    }

    /**
     *    Braaaaah, where we were is where we were.  Let's move on and not look
     *    back. Erase the map for some true closure.
     */
    function mapReset() {
        domElements.MAP.classList.remove(SHOWMAP);

        domElements.MAP_TITLE.classList.remove(MAP_TITLE_TOGGLE);

        styleOptions.mapMarkers = [];

        if (setMap != undefined) {
            for (var i = 0; i < styleOptions.mapMarkers.length; i++) {
                styleOptions.mapMarkers[i].setMap(null);
            }

            directionsDisplay.setMap(null);
        }
    }

    /**
     *    Don't forget those gnarly shaka, yo!!!  Clear them to so we can feel
     *    the true nirvana of the moment later on.
     */
    function gnarReset() {
        stoked = false;

        gnarRates = [];

        $(domElements.SHAKAS).removeClass(ACTIVE);

        if (gnarChart != undefined) {
            gnarChart.destroy();
        }
    }

    /**
     *    Let's wipe out our charts and map and start clean.  We should launch a
     *    new cam as well!
     */
    function resetData() {
        retrieved = true;

        domElements.PANEL.classList.remove(REVEAL);
        domElements.POSTER.classList.remove(POSTER_HIDE, POSTER_READY);
        domElements.MAP_TITLE.classList.remove(MAP_TITLE_TOGGLE);

        gnarReset();
        mapReset();
        beachForecast();
    }

    /**
     *    Waaaaaaaaay buumed about that last spot, brah.  Let's look up a new
     *    beach then reset and move on :(
     */
    function nextBeach() {
        beachSet = false;

        setOrderType();
        setBeachID();
        resetData();
    }

    /**
    *   Retrieve the next beach in that gnarly beachIDs array.  If that array has
    *   reached its demise, let's move on to the next swell.
    */
    function beachIDRetreival() {
        if (!retrieved) {
            var beachCount = beachIDs.length - 1,
                currentBeach = beachIDs.indexOf(selectedBeach),
                newBeach;

            if (currentBeach < beachCount) {
                selectedBeach = beachIDs[++currentBeach];

                resetData();
            } else {
                nextBeach();
            }
        }
    }

    /**
     *    Wipe out, Brah! I can't sit still!!! If the video is stalled for 2 seconds, let's
     *    move on to the next beach in the array!
     */
    function isStalled() {
        var stallTime = player.getCurrentTime();

        setTimeout(function(){
            var currentTime = player.getCurrentTime();

            if (stallTime == currentTime) {
                beachIDRetreival();
            }
        }, 2000);
    }

    /**
     *    The video has been released!!! Let's hide that lame poster and release
     *    the motion of the ocean upon our surfer brothers!
     */
    function showVideo() {
        setTimeout(function(){
            domElements.IMAGE_WRAPPER.classList.remove(POSTER_READY);
            domElements.IMAGE_WRAPPER.classList.add(POSTER_HIDE);
            domElements.VIDEO.style.display = 'block';
            domElements.PANEL.classList.add(REVEAL);
        }, 1500);
    }

    /**
     *    Brah, if playing, show me the video.
     *    If the gnar has not been released to the meter, let the data flow to
     *    reveal the height of the waves.  Totally stoked!
     */
    function isPlaying() {
        showVideo();

        if (!stoked) {
            getBeachData();
        }
    }

    /**
     *    Brah!!! We can't have the video sitting there stalled out goofy footed.
     *    Let's see if it's playing.
     */
    function playerStatus() {
        player.on('playing', isPlaying);

        player.on('stalled', isStalled);
    }

    /**
     *    The gnarliest of cameras has been set forth upon the lip of the live
     *    cam wave.  Let the streaming commence!
     */
    function initHLS(hlsOptions) {
        var hls = new Hls();

        hls.loadSource(file);
        hls.attachMedia(domElements.VIDEO);

        hls.on(Hls.Events.MANIFEST_PARSED,function() {
            domElements.VIDEO.play();
        });
    }

    /**
     *    This is the impact zone of the streaming mecca.  The totally tubular
     *    streaming file is passed into the hollow of the HLS wave for optimal
     *    carving of some bitchin wave cam....yeeeeeeeaaaaaah!
     *
     *    Set those options then stream through the barrel.
     *
     *    Oh yeah, let's make sure that isn't stalled out on some flat waves, Brah
     */
    function setHLS() {
        var hlsOptions = {
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
            appendErrorMaxRetry: 200
        }

        if (Hls.isSupported(hlsOptions)) {
            initHLS(hlsOptions);
        }

        playerStatus();
    }

    /**
     *    If poster DOM changed, reveal the data
     */
    function posterSet() {
        domElements.IMAGE_WRAPPER.classList.add(POSTER_READY);

        observ.disconnect();
    }

    /**
     *    Let's drop in some poster images and reveal!
     */
    function setPosterInitials() {
        observ.observe(domElements.POSTER, {attributes: true});

        domElements.BEACH_INITIAL.innerHTML = officeInitials;

        domElements.POSTER.src = posterSrc;
    }

    /**
     *    Calls functions to handle the video streaming.  BRAH!
     */
    function streamInit() {
        setPosterInitials();
        setHLS();
    }

    /**
     *    If the camera is totally on and that bitchin' sun a shining, play the
     *    video dude.
     *
     *    Else, let's skip on to the next beach...yeeeeaaah brah!
     *
     *    That is, unless the camera has bitchin' night vision...then let's play
     *    that sucker.  That's of course unless the camera is forced off...then
     *    truckin on down the road to the next spot.
     */
    function cameraStatus() {
        if (sunUp >= 0 && sunDown <= 0) {
            streamInit();
        } else {
            if (nightEnabled) {
                if (camCurrent <= camOff && camCurrent >= camOn) {
                    streamInit();
                } else {
                    nextBeach();
                }
            } else {
                nextBeach();
            }
        }
    }

    /**
     *    Creates global variables needed based of the bitchin response data from
     *    the surfline cam API
     */
    function setVideoVariables(responseData, plyrOptions) {
        retrieved = false;
        camCurrent = Number(responseData.streamInfo.stream[0].currentTime);
        camOn = Number(responseData.streamInfo.stream[0].hourTimeOn) + 1;
        camOff = Number(responseData.streamInfo.stream[0].cameraNightOffTime);
        file = responseData.streamInfo.stream[0].file;
        player = plyr.setup(domElements.VIDEO, plyrOptions)[0];
        posterSrc = responseData.streamInfo.stream[0].camImage;
    }

    /**
    *   Get that GNARLY beach cam from the selectedBeach
    *   Detect if needs to hide letterboxing
    *   Passes data to variables
    *   Checks to see if the camera is live
    *   Triggers video player
    */
    function beachCam() {
        // Get surf cam
        $.ajax({
            url: 'http://api.surfline.com/v1/cams/' + selectedBeachID,
            type: 'GET',
            dataType: 'jsonp',
            success: function(responseData) {
                var plyrOptions = {
                        controls: [
                            'fullscreen'
                        ],
                        debug: false,
                        hideControls: true
                    };

                if (videoLetterboxed) {
                    domElements.VIDEO_WRAPPER.className += ' letterboxed';
                }

                setVideoVariables(responseData, plyrOptions);
                cameraStatus();
                playerStatus();
            }, //end success
            error: function(err) {
                nextBeach();
            }
        });
    }

    /**
    *   Converts hour from military time (Brah, i'll shred in cleveland before joing
    *   the army!!!!!)
    */
    function hourAdjust(hour) {
        if (hour > 12) {
            return hour - 12;
        } else {
            return hour;
        }
    }

    /**
     *    Adjust time to match timeZone data is pulled from
     */
    function setTimeZone(time) {
        var timeZoneFormatted = time.tz(timeZone).format();

        return timeZoneFormatted;
    }

    /**
     *    Yo dude, let's get that time in a more readable, bitchin format
     */
    function formatTime(time) {
        var initialFormat = setTimeZone(time).split('T')[1],
            timeTrim = initialFormat.match(/[^:]+(\:[^:]+)?/g)[0],
            hour = hourAdjust(Number(timeTrim.split(':')[0])),
            min = timeTrim.split(':')[1];

        return hour + ':' + min;
    }

    /**
     *    Yo brah, get rid of those dank ass extra characters we don't need in the
     *    time response
     */
    function editTime(time) {
        var timeFormat = time.match(/[^:]+(\:[^:]+)?/g)[0];

        return timeFormat;
    }

    /**
     *    Brah, like, what's the point of using these cameras if nothing is visible?
     *    Use the sunrise and sunset data to initiate the cams.
     *    Camera turns on 20 minutes before it's sunrise and turns off 35 minutes
     *    after sunset.
     *
     *    Initiate beachCam
     */
    function setCameraLimits(baseZone, date, sunrise, sunset) {
        var baseTime = editTime(moment().tz(timeZone).format().split('T')[1]),
            currentTime =  moment(editTime(moment().tz(timeZone).format().split('T')[1]), 'hh:mm'),
            sunRiseLimit = moment(editTime(setTimeZone(moment.tz(date + ' ' + sunrise, baseZone).subtract(15, 'm')).split('T')[1]), 'hh:mm'),
            sunSetLimit = moment(editTime(setTimeZone(moment.tz(date + ' ' + sunset, baseZone).add(30, 'm')).split('T')[1]), 'hh:mm');

        sunDown = currentTime.diff(sunSetLimit, 'm');
        sunUp = currentTime.diff(sunRiseLimit, 'm');

        beachCam();
    }

    /**
     *    Yo!!! Let's make those times make sense per location!!!  Utilize the
     *    moment to translate timezones.
     *    Pass the times to setCameraLimits.
     */
    function sundDataResponse(responseData) {
        var baseZone = 'Europe/London',
            date = moment().tz(baseZone).format().split('T')[0],
            sunrise = editTime(responseData.results.sunrise.split('T')[1]),
            sunset = editTime(responseData.results.sunset.split('T')[1]);

        sunriseFormat = formatTime(moment.tz(date + ' ' + sunrise, baseZone));
        sunsetFormat = formatTime(moment.tz(date + ' ' + sunset, baseZone));

        setCameraLimits(baseZone, date, sunrise, sunset);
    }

    /**
     *    Duuuuude, get some gnarly sun data and pass it on to be formatted.
     */
    function sunInfo() {
        $.ajax({
            url: 'http://api.sunrise-sunset.org/json?lat=' + beachLatCoord + '&lng=' + beachLonCoord + '&date=today&formatted=0',
            type: 'GET',
            dataType: 'jsonp',
            success: function(responseData) {
                sundDataResponse(responseData);
            }
        });
    }/**

    /**
    *   Get the epic wave height from the beachID.
    *   Get the beach lat, lon to pass to the other apis.
    *   Pass the waaay ganrly data to make global variables.
    *   Inititate the sun data.
    */
    function beachForecast() {
        $.ajax({
            url: 'http://api.surfline.com/v1/forecasts/' + selectedBeachID + '?resources=surf,analysis,wind,weather,tide,sort&days=1&getAllSpots=false&units=' + surflineVar + '&interpolate=true&showOptimal=false&usenearshore=true',
            type: 'GET',
            dataType: 'jsonp',
            success: function(responseData) {
                forecastData = responseData;
                beachLatCoord = forecastData.lat;
                beachLonCoord = forecastData.lon;
                timeZone = forecastData.timeZoneString;

                sunInfo();
            }, //end success
            error: function(err) {
                nextBeach();
            }
        });
    }

    /**
     *    Yo brah, Let's set the untis for this bitchin visualization!
     */
    function defineUnits() {
        if (measurements === styleOptions.english) {
            heightUnit = 'ft';
            surflineVar = 'e';
            openWeatherUnit = 'imperial';
            tempUnit = 'f';
        } else if (measurements === styleOptions.metric) {
            heightUnit = 'm';
            surflineVar = 'm';
            openWeatherUnit = 'metric';
            tempUnit = 'c';
        }
    }

    /**
    *   Get index to call random bitchin beach based of amount of totally rad beaches
    *   Set those variables used to shred the gnar globally
    */
    function setGlobalVariables() {
        beachIDs = options.officeLoc[office].beachID;
        selectedBeach = beachIDs[beach];
        selectedBeachID = beachIDs[beach].id;
        measurements = options.homeOfficeInfo[0].measurements;
        multiplyer = selectedBeach.gnarMultiplyer;
        nightEnabled = selectedBeach.nightEnabled;
        officeInitials = options.officeLoc[office].initials;
        officeLatCoord = options.officeLoc[office].lat;
        officeLonCoord = options.officeLoc[office].lon;
        officeName = options.officeLoc[office].name;
        transit = selectedBeach.transit;
        videoLetterboxed = selectedBeach.videoLetterboxed;

        if (multiplyer == undefined) {
            multiplyer = 1;
        }

        beachSet = true;

        defineUnits();
    }

    /**
     *    Brah, sometimes life is waaaaay bogus.  In the case of a undefined beachID,
     *    let's try starting this process again.
     */
    function resetBeachID() {
        document.cookie = 'office=0';

        setOrderType();
    }

    /**
    *   Brah, let's make sure the beachID is works.  If not, let's not cause a
    *   point break and rest.  Otherwise, paddle forth and truly feel the gnar.
    */
    function setBeachID() {
        if (office == undefined) {
            resetBeachID();
        } else if (!beachSet) {
            setGlobalVariables()
        }
    }

    /**
    *   Duuuude, increase that cookie by one and set order, or let loose and randomize
    *   but not allow the same beach twice in a row
    */
    function cookieOrderControl(cookieName, baseItem, cookie, i) {
        var c;

        if (!isRandom) {
            if (cookie == (baseItem.length - 1)) {
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

        document.cookie = cookieName + '=' + c;

        return c;
    }

    /**
    *   Gets a random number based of the items in the beachIDs array to escape the soup
    *   Checks against this bitchin cookie to prevent totally messy waves
    */
    function beachIndex(cookieName, baseItem, cookie, item) {
        for (var i = 0; i < baseItem.length; i++) {
            if (baseItem[i] == item) {
                if (i !== cookie) {
                    document.cookie = cookieName + '=' + i;

                    return i;
                } else {
                    return cookieOrderControl(cookieName, baseItem, cookie, i);
                }
            }
        }
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
    *    Like, totally call the proper beach index to pull from
    */
    function setBeachOrder(beachNum) {
        var location = options.officeLoc[beachNum],
            cookieName = location.initials,
            cookie = Number(checkCookie(cookieName)),
            baseItem = location.beachID;
            beachItem = baseItem[cookie];

        if (baseItem.length == 1) {
            var beachItem = baseItem[0];
        }

        beach = beachIndex(cookieName, baseItem, cookie, beachItem);
    }

    /**
    *   Dude, ensure the beah array is coming from the proper office
    */
    function setBeachNumber(cookie) {
        var beachNum;

        if (cookie < (options.officeLoc.length - 1)) {
            beachNum = cookie + 1;
        } else {
            beachNum = 0;
        }

        setBeachOrder(beachNum)
    }

    /**
    *   Duuuuude, anarchy versus order control
    *   To randomnize or not randomnize, that is the question.
    *   If cycle beaches is set to true, setup beach cookies
    */
    function setOrderType() {
        var cookie = Number(checkCookie(officeCookie)),
            baseItem = options.officeLoc,
            officeItem;

        isRandom = options.homeOfficeInfo[0].random;

        if (!isRandom) {
            officeItem = options.officeLoc[cookie];
        } else {
            officeItem = options.officeLoc[Math.floor(Math.random() * options.officeLoc.length)];
        }

        office = beachIndex(officeCookie, baseItem, cookie, officeItem);

        if (options.homeOfficeInfo[0].cycleBeaches) {
            setBeachNumber(cookie);
        } else {
            beach = 0;
        }
    }

    observ = new MO(function(mutations) {
        mutations.forEach(function(mutation) {
            var targetClass = mutation.target.classList;

            if (targetClass.contains('poster')) {
                posterSet();
            }

            if (targetClass.contains('temp')) {
                revealWeather();
            }

            if (targetClass.contains('sunrise-data')) {
                revealSunrise();
            }

            if (targetClass.contains('sunset-data')) {
                revealSunset();
            }

            if (targetClass.contains('wave-height-data')) {
                revealWaveData();
            }
        });
    });

    /**
     *    Get the beach order
     *    Set the global variables based off the chosen beach
     *    Launch the beach cam and other apis after variables set
     */
    function launchApp() {
        setOrderType();
        setBeachID();
        beachForecast();
    }

    /**
    *   Merge default options and user options to create the gnarliest of options
    *   Launch the app, duuuude
    */
    function init(gnarOptions) {
        options = $.extend(locationDefaults, gnarOptions);

        launchApp();
    }

    /**
    *   Inits gnarly beach cams and data brah
    *   Accepts parameters to create custom options
    */
    return {
        init: function(gnarOptions) {
            init(gnarOptions);
        }
    };
})();
