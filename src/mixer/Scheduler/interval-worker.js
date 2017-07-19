let timerId
let interval = 100

function intervalFn() {
  postMessage('tick')
}

const handlers = {
  start(args) {
    if (!timerId) {
      timerId = setInterval(intervalFn, interval)
    }
  },
  setInterval(args) {
    interval = args
  },
  stop() {
    clearInterval(timerId)
    timerId = null
  },
}

onmessage = ({ data: { type, args } }) => {
  if (handlers[type]) handlers[type](args)
}
