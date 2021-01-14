const {env} = process

module.exports = {
  get action() { return env.GITHUB_ACTION },

  get actor() { return env.GITHUB_ACTOR },

  get event() {
    const path = env.GITHUB_EVENT_PATH
    return Object.freeze({
      name: env.GITHUB_EVENT_NAME,
      path,
      get data() {
        return require(path)
      }
    })
  },

  get git() {
    const ref = env.GITHUB_REF
    return Object.freeze({
      ref,
      sha: env.GITHUB_SHA,
      branch: getBranch(ref)
    })
  },

  get repo() {
    const slug = env.GITHUB_REPOSITORY
    const [owner, name] = slug ? slug.split('/') : []
    return Object.freeze({
      slug,
      owner,
      name,
      toString() {
        return slug
      }
    })
  },

  get workflow() {
    return env.GITHUB_WORKFLOW
  },

  get workspace() {
    return env.GITHUB_WORKSPACE
  }
}

function getBranch(ref) {
  const branchPrefix = 'refs/heads/'
  return ref && ref.startsWith(branchPrefix)
    ? ref.substr(branchPrefix.length)
    : ref
}
