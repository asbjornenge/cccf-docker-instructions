var assert = require('assert')
var clone  = require('clone')
var config = clone(require('cccf/example.json'))
var cdi    = require('../index')

config.ports.push('443:443')

describe('cccf-docker-instructions', function() {

	it('can return run instructions', function() {
		var instructions = cdi.run(config)
		// console.log(instructions[0])
		assert(instructions instanceof Array)
		assert(instructions.length == 1)
		assert(instructions[0].indexOf('docker run') == 0)
		assert(instructions[0].indexOf('--name app') > 0)
		assert(instructions[0].indexOf('-p 80:80') > 0)
		assert(instructions[0].indexOf('-p 443:443') > 0)
		assert(instructions[0].indexOf('--env FOO=BAR') > 0)
		assert(instructions[0].indexOf('-v /tmp:/tmp') > 0)
		assert(instructions[0].indexOf(config.image) > 0)
		assert(instructions[0].indexOf(config.cmd) == (instructions[0].length - config.cmd.length)) // cmd go last
	})

	it('can return stop instructions', function() {
		var instructions = cdi.stop(config)
		// console.log(instructions)
		assert(instructions instanceof Array)
		assert(instructions[0].indexOf('docker stop app') == 0)
	})

	it('can return start instructions', function() {
		var instructions = cdi.start(config)
		// console.log(instructions)
		assert(instructions instanceof Array)
		assert(instructions[0].indexOf('docker start app') == 0)
	})

	it('can return rm instructions', function() {
		var instructions = cdi.rm(config)
		// console.log(instructions)
		assert(instructions instanceof Array)
		assert(instructions[0].indexOf('docker rm app') == 0)
	})

})