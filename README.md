[![npm badge](https://img.shields.io/npm/v/url-trie.svg)](https://www.npmjs.com/package/url-trie)
[![travis badge](https://travis-ci.org/fiatjaf/url-trie.svg?branch=master)](https://travis-ci.org/fiatjaf/url-trie)

## url-trie

Because I couldn't find a better name.

### install

```
npm install --save url-trie
```

### how to use

the whole package is the function:

```
func trie (<list-of-urls>, <skip-empty>) <tree>
```

`<list-of-urls>` may be an array of strings or a collection of `{url, count}` objects. `count` defaults to 1, passing an array of strings is the same as passing a collection of `{url, count}` objects with `count` set to 1 always.

`<tree>` is an object with readable useful url prefixes as keys, each key has as value a `{count, ?url, ?next}` object, `count` being the sum of all URLs in this and in the deeper nested paths, `url`, if exists, being the full URL at the current path and `next`, if exists, being another `<tree>`.

see example below and tests for how it works exactly.

### example

```javascript
var trie = require('url-trie')

trie([
  'https://reddit.com/r/golang',
  'https://github.com/fiatjaf/module-linker/issues',
  {url: 'https://reddit.com/r/nim', count: 1},
  {url: 'https://twitter.com/fiatjaf', count: 23},
  'https://www.reddit.com/r/golang/comments/2xxx6m/lua_52_vm_in_go/',
  'https://github.com/fiatjaf',
  'https://github.com/fiatjaf/url-trie',
  'https://github.com/fiatjaf/module-linker'
], true)

// returns:
{
  'reddit.com/r': {
    count: 3,
    next: {
      'reddit.com/r/golang': {
        count: 2,
        url: 'https://reddit.com/r/golang',
        next: {
          count: 1,
          url: 'https://www.reddit.com/r/golang/comments/2xxx6m/lua_52_vm_in_go/'
        }
      },
      'reddit.com/r/nim': {
        count: 1,
        url: 'https://reddit.com/r/nim'
      }
    }
  },
  'twitter.com/fiatjaf': {
    count: 23,
    url: 'https://twitter.com/fiatjaf'
  },
  'github.com/fiatjaf': {
    count: 4,
    url: 'https://github.com/fiatjaf',
    next: {
      'github.com/fiatjaf/url-trie': {
        count: 1,
        url: 'https://github.com/fiatjaf/url-trie'
      }
      'github.com/fiatjaf/module-linker': {
        count: 2,
        url: 'https://github.com/fiatjaf/module-linker',
        next: {
          'github.com/fiatjaf/module-linker/issues': {
            count: 1,
            url: 'https://github.com/fiatjaf/module-linker/issues'
          }
        }
      }
    }
  }
}
```
