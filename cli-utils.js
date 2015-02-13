var path = require('path')

var pathToStatic = function (static_param) {
    if (static_param[0] != '/') static_param = process.cwd()+'/'+static_param
    return path.resolve(static_param)
}

var clu = function(argv) {
    this.myargs = ['var','print']
    this.argv   = argv
}
clu.prototype = {

    loadConfig : function() {
        this.config = require(pathToStatic(this.argv['_'][1]))
        return this
    },

    prepArg : function(arg) {
        var argv = this.argv
        if (!argv) return false 
        if (!argv[arg]) return false
        if (typeof argv[arg] == 'string') argv[arg] = [argv[arg]]
        if (!(argv[arg] instanceof Array)) return false
        return true
    },

    addArgs : function(args) {
        this.config = this.config.map(function(container) {
            args.forEach(function(arg) {
                container[arg] = (container[arg] || []).concat(this.argv[arg])
            }.bind(this))
            return container
        }.bind(this))
    },

    replaceVars : function() {
        this.config = this.argv.var.reduce(function(conf, currVar, index, arr) {
            var split = currVar.split('=')
            var str   = JSON.stringify(conf).replace(new RegExp('\\$\{'+split[0]+'\}','g'), split[1])
            return JSON.parse(str)
        },this.config)
    },

    addArgsMaybe : function() {
        var otherArgs = Object.keys(this.argv)
                            .filter(function(arg) { return this.myargs.indexOf(arg) < 0  }.bind(this))
                            .map(function(arg) { this.prepArg(arg); return arg }.bind(this))
        this.addArgs(otherArgs)
        return this
    },

    replaceVarsMaybe : function() {
        if (this.prepArg('var')) this.replaceVars()
        return this
    }

}
module.exports = function(argv) {
    return new clu(argv)
}
