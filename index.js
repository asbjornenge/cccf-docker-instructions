var cccf  = require('cccf')
var clone = require('clone')
var rmist = require('minimist-reverse')

var containerToDockerCommandWithArgs = function(cmd, options, container) {
    var image      = container.image
    var ccmd       = container.cmd || ''
    container.name = container.id
    if (container.volumes) container.volume = container.volumes
    if (container.ports)   container.p      = container.ports
    if (container.host)    cmd = ['-H='+container.host,cmd]
    if (!(options.detach === false)) container.d = true
    container['_'] = ['docker'].concat(cmd)
    return rmist(container, ['cmd','image','id','volumes','ports','host'])+' '+image+' '+ccmd
}

var containerToDockerCommandWithIds = function(cmd, container) {
    var host = container.host ? '-H='+container.host+' ' : ''
    return 'docker '+host+cmd+' '+container.id
}

var validConfig = function(config) {
    return cccf.validate((config instanceof Array) ? config : [config])
}

module.exports = {

	run : function(config, options) {
        var ctd = containerToDockerCommandWithArgs.bind(undefined, 'run', options || {})
        return clone(validConfig(config)).map(ctd)
	},

	kill : function(config) {
        var ctd = containerToDockerCommandWithIds.bind(undefined, 'kill')
		return clone(validConfig(config)).map(ctd)
	},

	stop : function(config) {
        var ctd = containerToDockerCommandWithIds.bind(undefined, 'stop')
		return clone(validConfig(config)).map(ctd)
	},

	start : function(config) {
        var ctd = containerToDockerCommandWithIds.bind(undefined, 'start')
		return clone(validConfig(config)).map(ctd)
	},

	rm : function(config) {
        var ctd = containerToDockerCommandWithIds.bind(undefined, 'rm')
		return clone(validConfig(config)).map(ctd)
	}

}
