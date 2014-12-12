var cccf = require('cccf')

var transformKey = function(key, value) {
	switch(key) {
		case 'id':
			return ' --name '+value
		case 'ports':
			if (value instanceof Array) return value.reduce(function(current, sub) { return current + transformKey(key, sub) },'')
			return ' -p '+value
		case 'env':
			if (value instanceof Array) return value.reduce(function(current, sub) { return current + transformKey(key, sub) },'')
			return ' --env '+value
		case 'volumes':
			if (value instanceof Array) return value.reduce(function(current, sub) { return current + transformKey(key, sub) },'')
			return ' -v '+value
		default:
			return ''
	}
}

var buildRunCommand = function(container) {
	return Object.keys(container).reduce(function(cmd, key) {
		return cmd.slice(0,cmd.indexOf('__options__')) + transformKey(key, container[key]) + cmd.slice(cmd.indexOf('__options__'),cmd.length)
	},'docker run__options__'+container.image+' '+(container.cmd || '')).replace('__options__',' ')
}

module.exports = {

	run : function(config) {
		if (!(config instanceof Array)) config = [config]
		if (cccf.validate(config)) return cccf.validate(config)
		return config.map(function(container) {
			return buildRunCommand(container)
		})
	},

	stop : function(config) {
		if (!(config instanceof Array)) config = [config]
		if (cccf.validate(config)) return cccf.validate(config)
		return config.map(function(container) { return 'docker stop '+container.id  })
	},

	start : function(config) {
		if (!(config instanceof Array)) config = [config]
		if (cccf.validate(config)) return cccf.validate(config)
		return config.map(function(container) { return 'docker start '+container.id  })
	},

	rm : function(config) {
		if (!(config instanceof Array)) config = [config]
		if (cccf.validate(config)) return cccf.validate(config)
		return config.map(function(container) { return 'docker rm '+container.id  })
	}

}