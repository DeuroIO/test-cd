const types = {
  major: 'major',
  feat: 'feat',
  fix: 'fix',
  break: 'major',
  minor: 'feat',
  patch: 'fix',
  chore: 'chore'
}

function remap (t) {
  return types[t]
}

/*
  given two semantic version changes, like "fix" and "feat",
  returns the larger one. For example:
    "major" -> "major"
    "fix", "feat" -> "feat"
    "feat", "chore" -> "feat"
    "chore", undefined -> "chore"
    undefined, undefined -> undefined
*/
function largerChange (a, b) {
  // consider possible aliases
  a = remap(a)
  b = remap(b)

  if (!a) {
    return b
  }
  if (!b) {
    return a
  }

  if (a === 'major' || b === 'major') {
    return 'major'
  }

  if (a === 'chore') {
    return b
  }
  if (b === 'chore') {
    return a
  }
  if (a === 'feat') {
    return 'feat'
  }
  if (b === 'feat') {
    return 'feat'
  }
  return a
}

module.exports = largerChange
