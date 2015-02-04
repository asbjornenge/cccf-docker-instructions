var assert = require('assert')
var clone  = require('clone')
var config = clone(require('./config.json'))
var cdi    = require('../index')

config[0].ports.push('443:443')
config[0].dns = '172.17.42.1'

describe('cccf-docker-instructions', function() {

	it('can return run instructions', function() {
		var instructions = cdi.run(config)
		assert(instructions instanceof Array)
		assert(instructions.length == 2)
		assert(instructions[0].indexOf('docker run') == 0)
		assert(instructions[0].indexOf('--name=app1') > 0)
		assert(instructions[0].indexOf('-p=80:80') > 0)
		assert(instructions[0].indexOf('-p=443:443') > 0)
		assert(instructions[0].indexOf('--env=FOO=BAR') > 0)
		assert(instructions[0].indexOf('--volume=/tmp:/tmp') > 0)
		assert(instructions[0].indexOf('--dns=172.17.42.1') > 0)
		assert(instructions[0].indexOf(config[0].image) > 0)
		assert(instructions[0].indexOf(config[0].cmd) == (instructions[0].length - config[0].cmd.length)) // cmd go last
	})

	it('can return stop instructions', function() {
		var instructions = cdi.stop(config)
		//console.log(instructions)
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

	it('can return kill instructions', function() {
		var instructions = cdi.kill(config)
		// console.log(instructions)
		assert(instructions instanceof Array)
		assert(instructions[0].indexOf('docker kill app') == 0)
	})

	it('should not return undefined for missing cmd', function() {
		var c = clone(config)[0]; delete c.cmd
		var instructions = cdi.run(c)
		// console.log(instructions)
		assert(instructions instanceof Array)
		assert(instructions[0].indexOf('undefined') < 0)		
	})

	it('will by default add a detach flag', function() {
		var instructions = cdi.run(config)
		// console.log(instructions[0])
		assert(instructions instanceof Array)
		assert(instructions[0].indexOf(' -d ') > 0)
		var instructions = cdi.run(config, { detach : false })
		// console.log(instructions[0])
		assert(instructions instanceof Array)
		assert(instructions[0].indexOf(' -d ') < 0)
	})

    it('will correctly posision a host property', function() {
        var c = clone(config)[0]; c.host = 'tcp://172.17.42.1:4243'
        var run = cdi.run(c)[0]
        assert(run.split(' ')[1] == '-H=tcp://172.17.42.1:4243')
        var rm  = cdi.rm(c)[0]
        assert(rm.split(' ')[1] == '-H=tcp://172.17.42.1:4243')
    })

})
