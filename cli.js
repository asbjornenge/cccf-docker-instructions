#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var cdi  = require('./index')
var clu  = require('./cli-utils')
var pkg  = require('./package.json')
var help = "USAGE\n    cdi [CMD] config-file.json\n\
CMD\n\
    run     - output run commands\n\
    start   - output start commands\n\
    stop    - output stop commands\n\
    rm      - output rm commands\n\
"

if (argv['_'].length < 2) { console.log(help); process.exit(1) }
if (Object.keys(cdi).indexOf(argv['_'][0]) < 0) { console.log('ERROR: Invalid CMD '+argv['_'][0]+'\n\n'+help); process.exit(1) }

var cmd = argv['_'][0]
var cfg = clu(argv).loadConfig().addEnvArgsMaybe().replaceVarsMaybe().config

try { 
    cdi[cmd](cfg).forEach(function(instruction) { console.log(instruction) })    
} catch(e) { 
    console.log('ERROR: Broken configuration\n', require('treeify').asTree(e.trace))
}
