# CCCF Docker Instructions

This module takes a [cccf](https://github.com/asbjornenge/common-container-configuration-format) or a cccf-docker (coming sooner or later) structure and turns it into docker instructions.

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

	// Run and rm could take optional start/stop if exists kind of thing...?

## CLI

	npm install -g cccf-docker-instructions
	cccf-docker-instructions run config.json | sh

## Changelog

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