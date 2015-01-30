var assert = require('assert')
var clone  = require('clone')
var clu    = require('../cli-utils')
var config = clone(require('./config.json'))

describe('cdi cli', function() {

    it('can will add any unreconized arguments to all containers', function() {
        var envArg1 = 'EPLE=KAKE'
        var envArg2 = 'NISSE=PETTER' 
        var dnsArg  = '172.17.42.1'
        config.forEach(function(container) {
            assert(container.env.indexOf(envArg1) < 0)
            assert(container.env.indexOf(envArg2) < 0)
            assert(container.dns == undefined)
        })
        delete config[0].env
        var cl = clu({ env : [envArg1,envArg2], dns : dnsArg })
        cl.config = config
        cl.addArgsMaybe().config.forEach(function(container) {
            assert(container.env.indexOf(envArg1) >= 0)
            assert(container.env.indexOf(envArg2) >= 0)
            assert(container.dns.indexOf(dnsArg) >= 0)
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

