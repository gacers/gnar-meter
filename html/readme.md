# huge-tv-html

This repo contains  the container and content for the TVs around the office. This repo is part of a bundle of three repos.

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

## huge-tv-html specifics 

The huge-tv framework is a simple javascript file that manipulates two iframes showing different "slides". Each slide is supposed to be just a self contiained html folder with its own markup, styles and scripts. *SOMETIMES* the share styles which can be put in the root css folder.

Config files tell the framework which slides to show and how long to show them for.


Each different "type" (lobby, george, calendar) of TV needs its own config file. The config file holds 3 variables, data, contentSequence, and socketURL.

* Data is your groups of content / slides
* contentSequence is the order in which it should pull items randomly from the groups
* socketURL should be localhost for the a master screen, and the hostname of the master screen for a second screen (h2556.ad.hugeinc.com:3000). If you don't want second screen events, set this to null.


Once a config file is set for a TV, it can be accessed by adding the name of the config file to the url in the browser, i.e. [http://h2556.ad.hugeinc.com:3000/george](http://h2556.ad.hugeinc.com:3000/george)

Individual TVs can have their own copies of the repo on their local computer or can just load the content from the lobby master (h2556).

Current TVs - (usernames and passwords are random combinations of huge and hugetv) 

Brooklyn Lobby Master - [h2556.ad.hugeinc.com](vnc://h2556.ad.hugeinc.com) 

Brooklyn Lobby SecondScreen - [vidwall-macmini.av.ad.hugeinc.com](vnc://vidwall-macmini.av.ad.hugeinc.com)

George 2x2 - 

George 70" - 

Front 2x2 -


