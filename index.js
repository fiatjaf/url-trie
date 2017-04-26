module.exports = function urltrie (urls, skipempty) {
  var res = {}

  for (var i = 0; i < urls.length; i++) {
    var url = urls[i]

    var parts

    if (url.slice(0, 4) !== 'http') {
      parts = [url]
    } else {
      parts = url.split('/')
        .slice(2)
        .filter(x => x.trim())

      var last = parts.splice(-1)[0]
      var pqs = last.split('?')
      parts.push(pqs[0])
      if (pqs.length > 1) {
        var search = pqs.slice(1).join('?')
        parts.push('?' + search)
      }

      parts = parts.filter(x => x.trim())
    }

    var parentparts = []
    var current = res
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j]
      var partstohere = parentparts.concat(part)
      var id = partstohere.join('/')

      if (!current[id]) {
        current[id] = {count: 0}
      }
      current[id].count++

      if (j === (parts.length - 1)) {
        // last part
        current[id].url = url
      } else {
        // descend
        current[id].next = current[id].next || {}
        current = current[id].next
        parentparts = partstohere
      }
    }
  }

  if (skipempty) {
    skip(res)
  }

  return res
}

function skip (node, justthisid) {
  var ids = justthisid ? [justthisid] : Object.keys(node)

  for (var i = 0; i < ids.length; i++) {
    var id = ids[i]
    var child = node[id]

    if (!child) continue

    var nextkeys = child.next ? Object.keys(child.next) : []
    if (nextkeys.length === 1 && !child.url) {
      var nextid = nextkeys[0]

      // skipping this child
      var grandchild = child.next[nextid]
      delete node[id]
      node[nextid] = grandchild
      skip(node, nextid)
    } else {
      // just recurse into the next children
      if (child.next) {
        skip(child.next)
      }
    }
  }
}
