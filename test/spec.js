var assert = require('assert')
var cdi    = require('../index')

describe('cccf-docker-instructions', function() {

	it('can return run instructions', function() {
		var instructions = cdi.run({})
		assert(typeof instructions == 'object')
	})

})