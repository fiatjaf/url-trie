var tape = require('tape')
var trie = require('.')

tape('basic', function (t) {
  t.plan(2)

  t.deepEquals(trie(['https://github.com/fiatjaf/url-trie']), {
    'github.com': {
      count: 1,
      next: {
        'github.com/fiatjaf': {
          count: 1,
          next: {
            'github.com/fiatjaf/url-trie': {
              count: 1,
              url: 'https://github.com/fiatjaf/url-trie'
            }
          }
        }
      }
    }
  }, 'basic single url')

  t.deepEquals(trie([
    'https://github.com/fiatjaf/url-trie',
    'https://github.com/fiatjaf/module-linker',
    'https://github.com/fiatjaf/module-linker/?x=y',
    'https://github.com/fiatjaf/module-linker?x=y',
    'https://github.com/fiatjaf/module-linker/issues',
    'https://twitter.com/fiatjaf'
  ]), {
    'github.com': {
      count: 5,
      next: {
        'github.com/fiatjaf': {
          count: 5,
          next: {
            'github.com/fiatjaf/url-trie': {
              count: 1,
              url: 'https://github.com/fiatjaf/url-trie'
            },
            'github.com/fiatjaf/module-linker': {
              count: 4,
              url: 'https://github.com/fiatjaf/module-linker',
              next: {
                'github.com/fiatjaf/module-linker/issues': {
                  count: 1,
                  url: 'https://github.com/fiatjaf/module-linker/issues'
                },
                'github.com/fiatjaf/module-linker/?x=y': {
                  count: 2,
                  url: 'https://github.com/fiatjaf/module-linker?x=y'
                }
              }
            }
          }
        }
      }
    },
    'twitter.com': {
      count: 1,
      next: {
        'twitter.com/fiatjaf': {
          count: 1,
          url: 'https://twitter.com/fiatjaf'
        }
      }
    }
  }, 'basic multiple urls')
})

tape('skip', function (t) {
  t.plan(2)

  t.deepEquals(trie(['https://reddit.com/r/golang/comments/2xxx6m/lua_52_vm_in_go/'], true), {
    'reddit.com/r/golang/comments/2xxx6m/lua_52_vm_in_go': {
      count: 1,
      url: 'https://reddit.com/r/golang/comments/2xxx6m/lua_52_vm_in_go/'
    }
  }, 'skip single url')

  t.deepEquals(trie([
    'https://reddit.com/r/golang',
    'https://github.com/fiatjaf/module-linker/issues',
    'https://reddit.com/r/nim',
    'https://twitter.com/fiatjaf?utm=slw',
    'https://reddit.com/r/golang/comments/2xxx6m/lua_52_vm_in_go/',
    'https://github.com/fiatjaf',
    'https://github.com/fiatjaf/url-trie',
    'https://github.com/fiatjaf/module-linker'
  ], true), {
    'reddit.com/r': {
      count: 3,
      next: {
        'reddit.com/r/golang': {
          count: 2,
          url: 'https://reddit.com/r/golang',
          next: {
            'reddit.com/r/golang/comments/2xxx6m/lua_52_vm_in_go': {
              count: 1,
              url: 'https://reddit.com/r/golang/comments/2xxx6m/lua_52_vm_in_go/'
            }
          }
        },
        'reddit.com/r/nim': {
          count: 1,
          url: 'https://reddit.com/r/nim'
        }
      }
    },
    'twitter.com/fiatjaf/?utm=slw': {
      count: 1,
      url: 'https://twitter.com/fiatjaf?utm=slw'
    },
    'github.com/fiatjaf': {
      count: 4,
      url: 'https://github.com/fiatjaf',
      next: {
        'github.com/fiatjaf/url-trie': {
          count: 1,
          url: 'https://github.com/fiatjaf/url-trie'
        },
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
  }, 'skip multiple urls')
})
