
var data = {"h" : [
    {"name": "h_text_nike", "duration": 10},
    {"name": "h_text_msm", "duration": 10},
    {"name": "h_text_benefit", "duration": 10},
    {"name": "h_text_boutique", "duration": 10},
    {"name": "h_text_sxsw", "duration": 10},
    {"name": "h_text_snkrs", "duration": 10},
    {"name": "h_text_airheads", "duration": 10},
    {"name": "h_text_estadao", "duration": 10},
    {"name": "h-all-9up", "duration": 10},
    {"name": "h-all-9up", "duration": 10}
  ],
  "case-study" : [
    {"name": "case-study-nike", "duration": 105, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]}, 
    {"name": "case-study-cannes", "duration": 110, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]}, 
    {"name": "case-study-crate-and-barrel", "duration": 15, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]},    
    {"name": "case-study-pfizer", "duration": 74, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]},
    {"name": "case-study-white-house-next", "duration": 51, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]}, 
    {"name": "case-study-kohls", "duration": 28, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]}, 
    {"name": "case-study-kohls-starwars", "duration": 40, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]}, 
    {"name": "case-study-morgan-stanley", "duration": 72, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]}, 
    {"name": "case-study-portfolio-night", "duration": 17, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]},
    {"name": "case-study-white-house", "duration": 56, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]},
    {"name": "case-study-cannes-party-01", "duration": 16, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]},
    {"name": "case-study-cannes-party-02", "duration": 16, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]},
    {"name": "case-study-cannes-party-03", "duration": 33, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]},
    {"name": "case-study-cannes-party-04", "duration": 17, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]},
    {"name": "case-study-cannes-party-05", "duration": 22, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]},
    {"name": "case-study-cannes-party-06", "duration": 21, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]},
    {"name": "case-study-cannes-party-07", "duration": 21, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]},
    {"name": "case-study-cannes-party-08", "duration": 14, "scheduleDays": [1,2,3,4,5], "scheduleHours": [8,9,10,11,12,13,14,15,16]}
  ],
  "new_hire" : [

    {"name": "new_hire_Tomoko_Yuzawa", "duration": 9},
    {"name": "new_hire_Ro_Purushotham", "duration": 9},
    {"name": "new_hire_Morgan_Firestone", "duration": 9},
    {"name": "new_hire_Louise_Palmberg", "duration": 9},
    {"name": "new_hire_Josh_Fajardo", "duration": 9},
    {"name": "new_hire_Jonathan_Puebla", "duration": 9},
    {"name": "new_hire_Charli_Lewis", "duration": 9}
  ],
  "misc" : [
    {"name": "honey-single", "duration": 17}
  ],
  "contextual" : [
    {"name" : "coffee", "duration" : 14, "scheduleDays": [0,1,2,3,4,5,6], "scheduleHours": [8,9,10] }
  ],
    "after_hours" : [
    {"name" : "youtube-livestream-ISS", "duration" : 200, "scheduleDays": [0,1,2,3,4,5,6], "scheduleHours": [18,19,20,21,22,23,24,0,1,2,3,4,5,6] },
    {"name" : "full-screen-video-after-hours", "duration" : 200, "scheduleDays": [0,1,2,3,4,5,6], "scheduleHours": [18,19,20,21,22,23,24,0,1,2,3,4,5,6] },
    // {"name" : "audio-react", "duration" : 30, "scheduleDays": [0,1,2,3,4,5,6], "scheduleHours": afterHours }
    // {"name" : "livestream-foodTrucks", "duration" : 30, "scheduleDays": workDays, "scheduleHours": [13] }
  ]
  // "announcements" : [
  //   {"name": "announcements-hackathon", "duration": 20}
  // ],
  // "featured" : [
  //   {"name": "full-screen-video", "duration": 120}
  // ]

};

var workhours = [8,9,10,11,12,13,14,15,16];
var afterHours = [17,18,19,20,21,22,23,24,0,1,2,3,4,5,6];
var workDays = [1,2,3,4,5];
var weekendDays = [0,6];
var contentSequence = ["h","after_hours", "misc", "contextual", "new_hire", "misc", "h","case-study","new_hire"]; // these values must match the top level properties of the data object

var isMaster = true;