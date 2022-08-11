import { inspect } from 'util';


function print(objeto) {
    console.log(inspect(objeto,false,12,true))
}

export default print;