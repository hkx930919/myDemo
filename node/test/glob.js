const glob = require('glob')
const opotions = {
    nodir :true
}

const data = glob.sync('*/*/index.js',opotions)
console.log(data);
