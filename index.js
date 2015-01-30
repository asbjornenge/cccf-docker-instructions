var cccf = require('cccf')
var clone = require('clone')
var tsiminim = require('tsiminim')

var containerToDockerCommandWithArgs = function(cmd, options, container) {
    var image = container.image
    var ccmd  = container.cmd || ''
    container.name   = container.id
    container.volume = container.volumes
    container.p      = container.ports
    delete container.image
    delete container.cmd
    delete container.id
    delete container.volumes
    delete container.ports
    if (!(options.detach === false)) container.d = true
    container['_'] = [cmd]
    return 'docker '+tsiminim(container)+' '+image+' '+ccmd
}

var containerToDockerCommandWithIds = function(cmd, container) {
    return 'docker '+cmd+' '+container.id
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
