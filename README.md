# CCCF Docker Instructions

[![NPM](https://nodei.co/npm/cccf-docker-instructions.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cccf-docker-instructions/)

This module takes a [cccf](https://github.com/asbjornenge/cccf) or a cccf-docker (coming sooner or later) structure and turns it into docker instructions.

## Install

	npm install cccf-docker-instructions

## Use

	var cdi = require('cccf-docker-instructions')
	console.log(cdi.run(require('containers.json')))
	// =>
		[
			"docker run ...",
		 	"docker run ..."
		]

## API

	cdi.run(<cccf>)   // run instructions
	cdi.rm(<cccf>)    // remove instructions
	cdi.start(<cccf>) // start instructions
	cdi.stop(<cccf>)  // stop instructions

## CLI

	npm install -g cccf-docker-instructions
	cdi run config.json | sh

### Options

    --env FOO=BAR    // Adds and evironment variable to ALL containers in config.json
    --var MEH=BAH    // Replaces all occurances of ${MEH} with BAH

## Changelog

### 2.3.0

* Added ability to pass --env args to cli
* Added support for replacing varilable in the config file !! :rocket:

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
