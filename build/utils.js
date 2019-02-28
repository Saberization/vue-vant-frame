const path = require('path')
const glob = require('glob')
const os = require('os')

exports.getMultiFile = function (_path) {
  const entries = []

  glob.sync(_path).forEach(entry => {
    entries.push(entry)
  })

  return entries
}

exports.getDirectoryName = function (_path) {
  let dir = ''

  if (_path) {
    const _pathArray = _path.split('/')
    dir = _pathArray[_pathArray.length - 2]
  }

  return dir
}

exports.getFileName = function (_path) {
  let filename = ''

  if (_path) {
    const _pathArray = _path.split('/')
    filename = _pathArray[_pathArray.length - 1]
  }

  return filename
}

exports.resolve = function (dir) {
  return path.join(__dirname, '../' + dir)
}

exports.getNetWorkInterface = function () {
  return os.networkInterfaces()
}