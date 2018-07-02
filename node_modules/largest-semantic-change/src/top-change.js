const la = require('lazy-ass')
const is = require('check-more-types')
const largerChange = require('./larger-change')

// give list of semantic commits, find largest change
// for example: feat, feat, fix -> feat
function computeTopChange (semanticCommits) {
  la(is.array(semanticCommits),
    'missing list of semantic commits', semanticCommits)

  return semanticCommits.reduce((change, commit) => {
    const type = is.object(commit) ? commit.type : commit
    return largerChange(change, type)
  }, null)
}

module.exports = computeTopChange
