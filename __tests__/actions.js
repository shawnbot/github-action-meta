const {
  GITHUB_REPOSITORY,
  GITHUB_ACTION,
  GITHUB_ACTOR,
  GITHUB_EVENT_NAME,
  GITHUB_EVENT_PATH,
  GITHUB_WORKFLOW,
  GITHUB_WORKSPACE,
  GITHUB_SHA,
  GITHUB_REF
} = process.env

const expectedWorkflow = 'CI'

describe('Actions environment tests', () => {
  if (GITHUB_WORKFLOW !== expectedWorkflow) {
    it('passes locally', () => {})
    return
  }

  const pkg = require('../package.json')
  const meta = require('..')

  it('.action', () => {
    expect(GITHUB_ACTION).not.toBe(null)
    expect(meta.action).toEqual(GITHUB_ACTION)
  })

  it('.actor', () => {
    expect(GITHUB_ACTOR).not.toBe(undefined)
    expect(meta.actor).toEqual(GITHUB_ACTOR)
  })

  describe('.event', () => {
    it('is an object', () => {
      expect(meta.event).toBeInstanceOf(Object)
    })

    it('.name', () => {
      expect(GITHUB_EVENT_NAME).not.toBe(undefined)
      expect(meta.event.name).toEqual(GITHUB_EVENT_NAME)
    })

    it('.path', () => {
      expect(GITHUB_EVENT_PATH).not.toBe(undefined)
      expect(meta.event.path).toEqual(GITHUB_EVENT_PATH)
    })

    it('.data', () => {
      const {data} = meta.event
      expect(data).toBeInstanceOf(Object)
      // expect(data.event).toEqual(GITHUB_EVENT_NAME)
    })

    describe('.git', () => {
      it('.ref', () => {
        expect(GITHUB_REF).not.toBe(undefined)
        expect(meta.git.ref).toEqual(GITHUB_REF)
      })

      it('.sha', () => {
        expect(GITHUB_SHA).not.toBe(undefined)
        expect(meta.git.sha).toEqual(GITHUB_SHA)
      })

      it('.branch', () => {
        const prefix = 'refs/heads/'
        expect(GITHUB_REF.startsWith(prefix)).toBe(true)
        const branch = GITHUB_REF.substr(prefix.length)
        expect(branch).not.toBe(undefined)
        expect(branch.startsWith(prefix)).toBe(false)
        expect(meta.git.branch).toEqual(branch)
      })
    })

    describe('.repo', () => {
      const slug = pkg.repository
      const [owner, repo] = slug.split('/')

      it('is an object', () => {
        expect(meta.repo).toBeInstanceOf(Object)
      })

      it('.slug', () => {
        expect(meta.repo.slug).toEqual(slug)
      })

      it('.owner', () => {
        expect(meta.repo.owner).toEqual(owner)
      })

      it('.name', () => {
        expect(meta.repo.name).toEqual(repo)
      })

      it('.toString() returns the slug', () => {
        expect(String(meta.repo)).toEqual(slug)
      })
    })

    it('.workflow', () => {
      expect(GITHUB_WORKFLOW).not.toBe(undefined)
      expect(meta.workflow).toEqual(GITHUB_WORKFLOW)
    })

    it('.workspace', () => {
      expect(GITHUB_WORKSPACE).not.toBe(undefined)
      expect(meta.workspace).toEqual(GITHUB_WORKSPACE)
    })
  })
})
