# github-action-meta
Effortlessly access useful metadata from the GitHub Actions environment in Node:

```js
const meta = require('github-action-meta')
console.log(JSON.stringify(meta, null, 2))
```

## Keys

| getter | relevant env var(s) | notes |
| :-- | :-- | :-- |
| `.action` | `GITHUB_ACTION` | The label of the currently running action, as set in `main.workflow` |
| `.actor` | `GITHUB_ACTOR` | The GitHub username of the user who initiated the action |
| `.event.name` | `GITHUB_EVENT_NAME` | The name of the GitHub event that triggered this run |
| `.event.path` | `GITHUB_EVENT_PATH` | The path to the event payload file (JSON) |
| `.event.data` | `GITHUB_EVENT_PATH` | The event payload parsed as JSON |
| `.git.ref` | `GITHUB_REF` | The git ref, e.g. `refs/heads/{branch}` |
| `.git.branch` | `GITHUB_REF` | The git ref minus the `refs/heads/` prefix |
| `.git.sha` | `GITHUB_SHA` | The (long) SHA of the current commit |
| `.repo.slug` | `GITHUB_REPOSITORY` | The repo "slug" in the form `{owner}/{name}` |
| `.repo.owner` | `GITHUB_REPOSITORY` | The first part of the repo slug, e.g. `foo` in `foo/bar` |
| `.repo.name` | `GITHUB_REPOSITORY` | The second part of the repo slug, e.g. `bar` in `foo/bar` |
| `.workflow` | `GITHUB_WORKFLOW` | The label of the currently running workflow in `main.workflow` |
| `.workspace` | `GITHUB_WORKSPACE` | The path to the repo checkout, i.e. `/github/workspace` |
