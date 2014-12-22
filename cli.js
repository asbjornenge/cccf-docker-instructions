#!/usr/bin/env node
var path = require('path')
var cdi  = require('./index')
var argv = process.argv.slice(2)
var pkg  = require('./package.json')
var help = "USAGE\n    cdi [CMD] config-file.json\n\
CMD\n\
    run     - output run commands\n\
    start   - output start commands\n\
    stop    - output stop commands\n\
    rm      - output rm commands\n\
"
if (argv.length < 2) { console.log(help); process.exit(1) }
if (Object.keys(cdi).indexOf(argv[0]) < 0) { console.log('ERROR: Invalid CMD '+argv[0]+'\n\n'+help); process.exit(1) }
var pathToStatic = function (static_param) {
    if (static_param[0] != '/') static_param = process.cwd()+'/'+static_param
    return path.resolve(static_param)
}
var cmd = argv[0]
var cfg = require(pathToStatic(argv[1]))
try { 
    cdi[cmd](cfg).forEach(function(instruction) { console.log(instruction) })    
} catch(e) { 
    console.log('ERROR: Broken configuration\n', require('treeify').asTree(e.trace))
}
