const obj = {
  a: "1",
  b: [1, 2, 3, { c: 1 }],
}

console.log(
  "sedationh",

  isEqual(deepClone(obj), obj)
)

function isEqual(a, b) {
  if (typeof a !== typeof b) return false
  if (typeof a !== "object") return a === b
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const key of keys) {
    return isEqual(a[key], b[key])
  }
}

function deepClone(target) {
  if (typeof target !== "object") {
    return target
  }
  const cloneTarget = Array.isArray(target) ? [] : {}
  for (const key in target) {
    cloneTarget[key] = deepClone(target[key])
  }
  return cloneTarget
}
