function solution(arr, obj) {
  let children = arr
  let lastItem = children[children.length - 1]
  let lastItemLevel = lastItem?.level ? lastItem.level : Infinity
  let cnt = obj.level - lastItemLevel

  console.log("sedationh", { cnt })
  while (cnt > 0) {
    const nextChildren = lastItem.children
    lastItem = nextChildren[nextChildren.length - 1]
    console.log("sedationh", { lastItem })
    if (!lastItem) break
    children = nextChildren
    cnt--
  }

  children.push(obj)
  return children
}

class Obj {
  constructor(level, key, children = []) {
    this.level = level
    this.key = key
    this.children = children
  }
}

;[
  {
    input: {
      arr: [],
      obj: new Obj(1, 0),
    },
    output: [new Obj(1, 0)],
  },
  {
    input: {
      arr: [new Obj(1, 0)],
      obj: new Obj(1, 1),
    },
    output: [new Obj(1, 0), new Obj(1, 1)],
  },
  {
    input: {
      arr: [new Obj(1, 0)],
      obj: new Obj(3, 1),
    },
    output: [new Obj(1, 0, [new Obj(3, 1)])],
  },
].forEach(({ input, output }, index) => {
  const ans = solution(input.arr, input.obj)
  console.log(
    JSON.stringify({ index, output, input, ans }, undefined, " "),
    isEqual(ans, output)
  )
})

export function isEqual(a, b) {
  if (typeof a !== typeof b) return false
  if (typeof a !== "object") return a === b
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const key of keys) {
    return isEqual(a[key], b[key])
  }
}
