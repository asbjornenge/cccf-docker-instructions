var path = require('path')

var pathToStatic = function (static_param) {
    if (static_param[0] != '/') static_param = process.cwd()+'/'+static_param
    return path.resolve(static_param)
}

var clu = function(argv) {
    this.argv = argv
}
clu.prototype = {

    loadConfig : function() {
        this.config = require(pathToStatic(this.argv['_'][1]))
        return this
    },

    hasArg : function(arg) {
        var argv = this.argv
        if (!argv) return false 
        if (!argv[arg]) return false
        if (typeof argv[arg] == 'string') argv[arg] = [argv[arg]]
        if (!(argv[arg] instanceof Array)) return false
        return true
    },

    addEnvArgs : function() {
        this.config = this.config.map(function(container) {
            container.env = (container.env || []).concat(this.argv.env)
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

    addEnvArgsMaybe : function() {
        if (this.hasArg('env')) this.addEnvArgs()
        return this
    },

    replaceVarsMaybe : function() {
        if (this.hasArg('var')) this.replaceVars()
        return this
    }

}
module.exports = function(argv) {
    return new clu(argv)
}
