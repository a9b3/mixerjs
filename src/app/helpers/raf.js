export default function raf(cb) {
  let interval = window.requestAnimationFrame(fn)
  function fn() {
    cb()
    interval = window.requestAnimationFrame(fn)
  }

  return () => window.cancelAnimationFrame(interval)
}
