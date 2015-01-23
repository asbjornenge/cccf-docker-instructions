var assert = require('assert')
var clone  = require('clone')
var clu    = require('../cli-utils')
var config = clone(require('./config.json'))

describe('cdi cli', function() {

    it('can add environment variables', function() {
        var newEnv = 'EPLE=KAKE'
        config.forEach(function(container) {
            assert(container.env.indexOf(newEnv) < 0)
        })
        var cl = clu({ env : [newEnv] })
        cl.config = config
        cl.addEnvArgsMaybe().config.forEach(function(container) {
            assert(container.env.indexOf(newEnv) > 0)
        })
    })

    it('can replace variables in the format ${var}', function() {
        config[0].cmd += ' --domain ${DOMAIN}'
        var domain = 'google.com'
        var cl = clu({ var : ["DOMAIN="+domain]})
        cl.config = config
        cl.replaceVarsMaybe()
        assert(config[0].cmd.indexOf('google.com') < 0)
        assert(cl.config[0].cmd.indexOf('google.com') > 0)
    }) 

})

