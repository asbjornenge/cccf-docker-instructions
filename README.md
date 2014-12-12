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

	cdi.run(<cccf>)   // Run instructions
	cdi.rm(<cccf>)    // Remove instructions - MISSING
	cdi.start(<cccf>) // Run instructions    - MISSING
	cdi.stop(<cccf>)  // Remove instructions - MISSING

	// Run and rm could take optional start/stop if exists kind of thing...?

enjoy.