var util = require('util'),
	request = require('request'),
	googleapis = require('googleapis'),
	moment = require('moment');

var config = {
	SERVICE_ACCOUNT_EMAIL: '667184107220-mmhsdm0kuqkdf2qogomk8nekfpch74i1@developer.gserviceaccount.com',
	BROOKLYN_EVENTS: "hugeinc.com_vv2go4uglh0b6po0n9dqrld168@group.calendar.google.com"
}

var jwt = new googleapis.auth.JWT(
		config.SERVICE_ACCOUNT_EMAIL,
		__dirname + '/google-auth.key.pem',
		null, 		// API_KEY,	**NOTE: i _think_ this stays null if we are using the .pem in the above
		['https://www.googleapis.com/auth/calendar']
);

var fetchEvents = function (googleCalendarId, callback) {
	// 1) use the JWT to request a token
	jwt.authorize(function (err, result) {
		// 2) use token to authenticate API requests
		googleapis.calendar('v3').events.list({
			auth: jwt,
			calendarId: config[googleCalendarId],
			singleEvents: true,								// expand recurring events into instances & include them
			orderBy: 'startTime',							// order by the start date/time (ascending). Requires that singleEvents be true
			timeMin: ISODateString(new Date()),	// make sure we're only grabbing events in the future (ie. their end time "timeMin" hasn't passed)
			maxResults: 15									// limit results, otherwise the recurring events will flood the results list
		}, function (err, list) {
			// Clean up the data
			if (!list) {
				callback({"error": "empty list"}, null);
				return;
			} else {
				list.items.forEach(function (e, i) {
					// Day of the week
					e.day = moment(e.start.dateTime).format('ddd');
					// Date of the month
					e.dateOfMonth = moment(e.start.dateTime).format('D');
					// Time of event
					e.prettyTime = moment(e.start.dateTime).format('h:mm a');
				});
			}
			callback(null, list.items);
		});
	});
};

var ISODateString = function (d) {
	function pad(n) { return n < 10 ? '0'+n : n }
	return d.getUTCFullYear()+'-'
		+ pad(d.getUTCMonth()+1)+'-'
		+ pad(d.getUTCDate())+'T'
		+ pad(d.getUTCHours())+':'
		+ pad(d.getUTCMinutes())+':'
		+ pad(d.getUTCSeconds())+'Z';
};

module.exports.fetchEvents = fetchEvents;