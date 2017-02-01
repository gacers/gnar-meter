# Surf Report

This project tracks wave height and weather conditions at beaches near our offices.

      _        ,-.    / )
     ( `.     // /-._/ /
      `\ \   /(_/ / / /
        ; `-`  (_/ / /
        |       (_/ /
        \          /
         )       /`
        /      /`


__Installation__

    * Run npm install from the project folder
    * Run npm start to launch server
    * http://localhost:3000

In order to run this app, __create the file js/app.js__.  Below is an example of how to initialize the application within the __js/app.js__ file.

Speak with __@gacers__ if you have any questions

__Basic Init with default options__
```javascript
gnarly.init();
```

__Init with custom options__
```javascript
gnarly.init({
    homeOfficeInfo: [
        {
            duration: 40000,
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
                },
                {
                    id: 4270,
                    gnarMultiplyer: 1,
                    nightEnabled: true,
                    transit: 'BICYCLING',
                    videoLetterboxed: false
                },
                {
                    id: 5133,
                    gnarMultiplyer: 1,
                    nightEnabled: false,
                    transit: 'BICYCLING',
                    videoLetterboxed: false
                },
                {
                    id: 137586,
                    gnarMultiplyer: 1,
                    nightEnabled: false,
                    transit: 'BICYCLING',
                    videoLetterboxed: false
                },
                {
                    id: 142784,
                    gnarMultiplyer: 1,
                    nightEnabled: false,
                    transit: 'BICYCLING',
                    videoLetterboxed: false
                }
            ]
        }
    ]
});
```

## Raddest global variables

* homeOfficeInfo:
    * duration:
        * amount of time before switching to next beach
        
    * cycleBeaches:
        * true, false
        * If true, cycle through all the beaches in the BeachID array per location

    * measurements: 
        * english, metric
        * If your home office is in the US, set to english, outside set to metric. Tells the beach api which units to display and the weather api how to convert the Kelvin.
    
    * random: 
        * true, false
        * Location orders can be randomized or go through the list according to object order set below

* officeLoc:
    * Office loactions generally deal with beaches near Huge offices.  However, if in a location with a lot of beaches, you could use these objects to list multiple beaches in your area.
        
        * name:
            * This is the name of the office in relationship to the beach.  
            * It shows up in the Shred alert ("Brooklyn Time to Shred!!!!!").

        * initials:
            * Initials of the city the office being displayed is loacted. If the initials aren't obvios, like LA, use the airport code.

        * lat:
            * The latitude of the closest office.  
            * It is taken from the url of the office location in google maps.  This is needed for the map data
                * i.e: https://www.google.com/maps/place/Huge/@51.5218759,-0.0849403,15z/data=!4m5!3m4!1s0x0:0xd8e7019103b03afb!8m2!3d51.5218759!4d-0.0849403

        * lon:
            * The longitude of the closest office.  
            * It is taken from the url of the office location in google maps.  This is needed for the map data
                * i.e: https://www.google.com/maps/place/Huge/@51.5218759,-0.0849403,15z/data=!4m5!3m4!1s0x0:0xd8e7019103b03afb!8m2!3d51.5218759!4d-0.0849403

        * beachID: 
            * id:
                * http://surfline.com: find a cam in the Cams & Reports menu and select it (cameras have a square icon and HD cams have a rectangle icon).  The ID will be in the URL.
                * Needs to be an array even if one.
                * Can be several objects comma seperated.
                * This controls the beach cam, location data, wave data, and weather data.

            * gnarMultiplyer:
                * Used to correctly reflect the gnarMeter per beach.
                * For instance, 6ft is a big deal in New York but not that high in Ocen Beach, CA.  To reflect this, we set the multiplyer to 2 and this doubles the wave height needed to set of a gnar (based on 1-5ft initially).
                * gnarMultiplyer and results converted to meters automatically if measurements set to metric.  Gnar Meter will reflect the same as the english version.
            
            * nightEnabled:
                * true, false
                * If the camera has night vision or just looks good at night, you can set this to true.
                * If false, this office location will be skipped over after 35min after sunset and will turn on 20min before sunrise.
                * Each camera is turned off after a certain hour.  If nightEnabled is true, but the camera is off, the beach will be skipped.
            
            * transit: 
                * DRIVING, BICYCLING, WALKING, TRANSIT
                * TRANSIT will add markers to the map of train/bus/transfer number
                * Must be in caps
                * If a route is not possible or requires a flight, the two markers will appear but no route.  Google API does not return this info.

            * videoLetterboxed: 
                * true, false
                * If the video feed you wish to use is letterboxed, set to true.  This will upscale the video to cutoff the letterboxing so that the image fills the screen
