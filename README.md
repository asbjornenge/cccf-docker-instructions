# CCCF Docker Instructions

[![NPM](https://nodei.co/npm/cccf-docker-instructions.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cccf-docker-instructions/)

This module takes a [cccf](https://github.com/asbjornenge/cccf) or a cccf-docker (coming sooner or later) structure and turns it into docker instructions.

## Install

	npm install cccf-docker-instructions

## Use

	var cdi = require('cccf-docker-instructions')
	cdi.run(require('containers.json'))
	// =>
		[
			"docker run ...",
		 	"docker run ..."
		]

## API

	cdi.run(<cccf>)     // run instructions
	cdi.start(<cccf>)   // start instructions
	cdi.stop(<cccf>)    // stop instructions
	cdi.kill(<cccf>)    // kill instructions
	cdi.rm(<cccf>)      // remove instructions

### API Options

All the API functions can take an optional options object.

    {
        detach  : false,    // (default true)
        exclude : ['scale'] // Additional properties on the container object to exclude from the output
    }

## CLI

As of version 3.0.0 **cdi** will execute the instructions directly. You can revert to printing by passing the *--print* flag.

	npm install -g cccf-docker-instructions
	cdi run config.json
    // => <exec>
    cdi run config.json --print
    // => "docker run ..."

### CLI Options

    --print             // Prints the instructions instead of executing them
    --var MEH=BAH       // Replaces all occurances of ${MEH} with BAH

    // ANY other cli argument passed to cdi will be reflected in ALL instructions

    --env FOO=BAR
    --dns 8.8.8.8
    // => "docker run --dns=8.8.8.8 --env=FOO=BAR --name container1 ..."
    // => "docker run --dns=8.8.8.8 --env=FOO=BAR --name container2 ..."

## Changelog

### 3.1.1

* Bugfix where cli would not forward args if no --env was set :monkey:

### 3.1.0

* Support for excluding properties on the container object from the output

### 3.0.0

* Execute instructions by default :space_invader:
* Support for variables!!! :rocket:
* Forwarding any other arguments (besides *print* and *var*) to ALL instructions

### 2.4.0

* Added support for kill command 

### 2.3.1

* Bugfix where --env would break container with no env

### 2.3.0

* Added ability to pass --env args to cli
* Added ability to pass --var args to cli for replacing variables in the config file !! :rocket:

### 2.2.0

* Added missing CLI docs

### 2.1.0

* Brought back the cli :stuck_out_tongue: :see_no_evil:

### 2.0.0

* Using cccf v3.0.0
* Removed cli (moving to separate module)

### 1.1.0

* Adding detach flag by default but support overwriting

### 1.0.3

* Fixed bug returning undefined for missing cmd

### 1.0.2

* Smore silly doc fixes

### 1.0.1

* Added some cli docs

### 1.0.0

* Initial release :tada:

enjoy.
