export function extendFn(fn, fnFactory) {
  const oldFn = fn
  return fnFactory(oldFn)
}
