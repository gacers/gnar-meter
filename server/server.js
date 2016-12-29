var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var calendar = require('./huge-calendars');
var cors = require('cors');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var SpotifyWebApi = require('spotify-web-api-node');

var calendarCache = {};

server.listen(3000);

var currentSecondScreenURL = null;

var staticPath = path.resolve(__dirname + '/../huge-tv-html/')
var videoPath = path.resolve(__dirname + '/../huge-tv-videos/')

app.use(cors());
app.use(express.static(staticPath));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.all('/videos/:video', function (req, res){
	var requestedVideoPath = videoPath + "/" + req.params.video;
	res.sendFile(requestedVideoPath);
});

app.all('/config.js', function (req, res) {
	var configPath = staticPath;
	var refererConfig = req.headers.referer.split("/").slice(-1)[0];
	if (refererConfig.length > 0) {
		configPath += "/config." + refererConfig + ".js";
	} else {
		configPath += "/config.master.js";
	}
	res.sendFile(configPath);
});

app.all('/spotify/auth', function (req, res) {
    var spotifyApi = new SpotifyWebApi(req.query.credentials);
    // var authorizeURL = spotifyApi.createAuthorizeURL(req.query.scope);
    // var code = 'MQCbtKe23z7YzzS44KzZzZgjQa621hgSzHN';

    spotifyApi.clientCredentialsGrant().then(function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);

        res.send({"token":data.body});
    }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
    });
});

app.all('/spotify/me', function (req, res) {
  // console.log(req.query.token)
  // console.log(req.query.cred)
  var spotifyApi = new SpotifyWebApi(req.query.cred);
  spotifyApi.setAccessToken(req.query.token);
console.log(req.query)

  spotifyApi.getPlaylist(req.query.user, req.query.playlist)
  .then(function(data) {
    res.send({"token":data.body});
  }, function(err) {
    console.log('Something went wrong!', err);
  });



});


app.all('/calendar/:calendarid', function (req, res){
	var id = req.params.calendarid
	var data = null;
	var now = new Date().getTime();
	var cache = calendarCache[id];
	var interval = (1000 * 60 * 60);

	if ( (cache != null) && (cache.timestamp + interval > now) ) {
		res.send({"data":cache.events});
	} else {
		calendar.fetchEvents(id, function(error, data){
			if (error != null) {
	            res.status(500).send({"error": error});
	        } else {
	        	var now = new Date().getTime();
	        	calendarCache[id] = {timestamp: now, events: data};
	            res.send({"data":data});
	        }
		});
	}
});














//ADD NEW CONFIGS/SCREEN TYPES HERE
var routes = ["master", "george", "calendar", "local", "front"];

for (var i = 0; i < routes.length; ++i) {
	var route = routes[i];
	app.all("/" + route, function (req, res) {
		var indexPath = staticPath + "/index.html";
		res.sendFile(indexPath);
	});
}

io.on('connection', function(socket){
	if (currentSecondScreenURL != null) {
		socket.send('secondScreenStart', {url:currentSecondScreenURL});
	}

	socket.on('secondScreenStart', function(data) {
		currentSecondScreenURL = data.url;
		socket.broadcast.emit('secondScreenStart', {url:currentSecondScreenURL});
	});

	socket.on('secondScreenEnd', function(data) {
		currentSecondScreenURL = null;
		socket.broadcast.emit('secondScreenEnd');
	});
});

