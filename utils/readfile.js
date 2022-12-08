const fs = require('fs')

exports.readString = (filename) => {
    return fs.readFileSync(filename, { encoding: 'utf-8' })
}

exports.readArr = (filename, delimeter = '\n') => {
    return fs.readFileSync(filename, { encoding: 'utf-8' }).split(delimeter)
}
