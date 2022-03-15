const isDebugging = true

const log = (...args) => {
  if (!isDebugging) return
  console.log(...args)
}

export { log }
