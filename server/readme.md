# huge-tv-server

This repo contains  the server TVs around the office. This repo is part of a bundle of three repos.

| Project        | Purpose           |  |
| ------------- |:-------------:| -----:|
| [huge-tv-html] (https://stash.hugeinc.com/projects/HTV/repos/huge-tv-html/browse)      | container and content |  |
| [huge-tv-server] (https://stash.hugeinc.com/projects/HTV/repos/huge-tv-server/browse)      | server for routing config files, websockets and video files |  |
| [huge-tv-videos] (https://stash.hugeinc.com/projects/HTV/repos/huge-tv-videos/browse)      | stores videos to keep other repos clean |  

__All three repos share the same [pivitol board](https://www.pivotaltracker.com/n/projects/1583817). Speak to @macinapura or @mhart for access.__

__All three projects must be in the same root directory. i.e:__

```
H7712:hsrc macinapura$ ls -d huge-tv*
huge-tv-html	huge-tv-server	huge-tv-videos
H7712:hsrc macinapura$
```

__Each repo's readme will contain its own implementation details__

-----
-----

## huge-tv-server
* node server
* uses express
* hosts websockets for second screen functionality
* serves videos and status files from sibling directories
* huge-calendars module can serve any calendar by email (add to config object)
*  any new tv type (config file from the huge-tv-html repo) needs to be added to the routes array
*  config files are served based on the route that requested them; i.e. /george/config.js servers ../huge-tv-html/config.george.js
