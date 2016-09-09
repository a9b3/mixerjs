let timerId
let interval = 100

function intervalFn() {
  postMessage('tick')
}

const handlers = {
  start(args) {
    setInterval(intervalFn, interval)
  },
  setInterval(args) {
    interval = args
    if (timerId) {
      clearInterval(timerId)
      timerId = setInterval(intervalFn, interval)
    }
  },
  stop() {
    clearInterval(timerId)
    timerId = null
  },
}

onmessage = ({ data: { type, args } }) => {
  if (handlers[type]) handlers[type](args)
}
