const util = require('util');


function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}

module.exports = print;