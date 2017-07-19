export default function interval(fn, time) {
  const interval = window.setInterval(fn, time)
  return () => window.clearInterval(interval)
}
