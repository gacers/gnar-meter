
var data = {
  "clocks" : [
    {"name": "vertical-clock-0", "duration": 30},
    {"name": "vertical-clock-1", "duration": 30},
  ],
  "calendars" : [
    //{"name": "vertical-singleEvent", "duration": 30},
  ],
  "countdowns" : [
    {"name": "vertical-countdown-party", "duration": 30}, 
  ],
  "misc" : [
    {"name": "vertical-weather", "duration": 30},
  ]
};

var contentSequence = ["clocks", "misc", "countdowns"]; // these values must match the top level properties of the data object

var vertical = true;

var isSecondScreen = true;