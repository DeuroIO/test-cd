'use strict'

const Promise = require('bluebird')
const la = require('lazy-ass')
const is = require('check-more-types')

const exists = require('fs').existsSync
const debug = require('debug')('chdir-promise')

// stack
const folders = []

function _to (folderName) {
  la(is.unemptyString(folderName), 'missing git repo folder')
  la(exists(folderName), 'cannot find folder', folderName)

  const current = process.cwd()
  la(is.unemptyString(folderName), 'missing folder')
  process.chdir(folderName)
  debug('chdir jumped to folder', process.cwd())

  folders.push(current)

  return current
}

function comeBack () {
  if (is.empty(folders)) {
    return Promise.resolve()
  }
  const folder = folders.pop()
  process.chdir(folder)
  debug('restored folder', folder)
  return Promise.resolve(folder)
}

const chdirTo = folderName => {
  return Promise.try(() => _to(folderName))
}

const nextTo = folderName => () => chdirTo(folderName)

module.exports = {
  to: chdirTo,
  back: comeBack,
  from: comeBack,
  nextTo: nextTo
}
