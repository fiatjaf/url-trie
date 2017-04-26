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
func trie (<list of urls>, <skip-empty>) <tree>
```

see tests for how it works exactly.

### example

```javascript
var trie = require('url-trie')

trie([
  'https://reddit.com/r/golang',
  'https://github.com/fiatjaf/module-linker/issues',
  'https://reddit.com/r/nim',
  'https://twitter.com/fiatjaf',
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
    count: 1,
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
