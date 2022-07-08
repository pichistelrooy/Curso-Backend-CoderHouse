import util from "util"

const print = (objeto) => {
  console.log(util.inspect(objeto,false,12,true))
}

export default print;