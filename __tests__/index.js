const meta = require('..')
const env = require('../env')

jest.mock('../env')

function mockEnv(vars) {
  env.mockImplementation(key => vars[key])
}

afterEach(() => env.mockReset())

describe('default export', () => {
  it('uses $GITHUB_ACTION for .action', () => {
    mockEnv({GITHUB_ACTION: 'test'})
    expect(meta.action).toEqual('test')
  })

  it('uses $GITHUB_ACTOR for .actor', () => {
    mockEnv({GITHUB_ACTOR: 'gitbot'})
    expect(meta.actor).toEqual('gitbot')
  })

  describe('.event', () => {
    it('is an object', () => {
      expect(meta.event instanceof Object).toBe(true)
    })

    it('uses $GITHUB_EVENT_NAME for .event.name', () => {
      mockEnv({GITHUB_EVENT_NAME: 'push'})
      expect(meta.event.name).toEqual('push')
    })

    it('uses $GITHUB_EVENT_PATH for .event.path', () => {
      const eventPath = '/github/workflow/event.json'
      mockEnv({GITHUB_EVENT_PATH: eventPath})
      expect(meta.event.path).toEqual(eventPath)
    })

    it('gets JSON event data from .event.data', () => {
      const eventPath = require.resolve('./fixtures/event.json')
      mockEnv({GITHUB_EVENT_PATH: eventPath})
      expect(meta.event.data).toEqual(require(eventPath))
    })
  })

  describe('.git', () => {
    it('is an object', () => {
      expect(meta.git instanceof Object).toBe(true)
    })

    it('uses $GITHUB_REF for .git.ref', () => {
      mockEnv({GITHUB_REF: 'refs/heads/foo'})
      expect(meta.git.ref).toEqual('refs/heads/foo')
    })

    describe('.branch', () => {
      it('strips leading "refs/heads/" from $GITHUB_REF', () => {
        mockEnv({GITHUB_REF: 'refs/heads/foo'})
        expect(meta.git.branch).toEqual('foo')
      })

      it('returns undefined if $GITHUB_REF is not set', () => {
        expect(meta.git.branch).toEqual(undefined)
      })
    })
  })

  describe('.repo', () => {
    it('is an object', () => {
      expect(meta.repo instanceof Object).toBe(true)
    })

    it('sets .slug to $GITHUB_REPOSITORY', () => {
      mockEnv({GITHUB_REPOSITORY: 'foo/bar'})
      expect(meta.repo.slug).toEqual('foo/bar')
    })

    it('sets .owner to the bit before "/"', () => {
      mockEnv({GITHUB_REPOSITORY: 'foo/bar'})
      expect(meta.repo.owner).toEqual('foo')
    })

    it('sets .name to the bit after "/"', () => {
      mockEnv({GITHUB_REPOSITORY: 'foo/bar'})
      expect(meta.repo.name).toEqual('bar')
    })

    it('does not set .owner without $GITHUB_REPOSITORY', () => {
      expect(meta.repo.owner).toEqual(undefined)
    })

    it('does not set .name without $GITHUB_REPOSITORY', () => {
      expect(meta.repo.name).toEqual(undefined)
    })

    it('overloads .toString() to return the slug', () => {
      mockEnv({GITHUB_REPOSITORY: 'foo/bar'})
      expect(String(meta.repo)).toEqual('foo/bar')
    })
  })

  it('uses $GITHUB_WORKFLOW for .workflow', () => {
    mockEnv({GITHUB_WORKFLOW: 'run things'})
    expect(meta.workflow).toEqual('run things')
  })

  it('uses $GITHUB_WORKSPACE for .workspace', () => {
    mockEnv({GITHUB_WORKSPACE: '/github/workspace'})
    expect(meta.workspace).toEqual('/github/workspace')
  })
})
