// app entry point
import '!style-loader!css-loader!font-awesome/css/font-awesome.css'
import '!style-loader!css-loader!highlight.js/styles/github.css'
import 'styles/index.scss'

import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import useScroll from 'scroll-behavior'
import { AppContainer } from 'react-hot-loader'
import Root from './root.js'

if (CONFIG.debug === false && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}

const history = useScroll(browserHistory)

render(
  <AppContainer>
    <Root history={history} />
  </AppContainer>,
  document.getElementById('mount')
)

if (module.hot) {
  let HotRoot = require('./root.js').default

  module.hot.accept('../styles/index.scss', () => {
    require('../styles/index.scss')
  })

  module.hot.accept('./root.js', () => {
    render(
      <AppContainer>
        <HotRoot history={history} />
      </AppContainer>,
      document.getElementById('mount')
    )
  })
}

// import audioContext from './mixer/audioContext.js'
// import Controller from './mixer/Controller.js'
// import SoundSource from './mixer/SoundSource.js'
// import clickMp3 from '../assets/click.mp3'
// import Scheduler from './mixer/Scheduler/Scheduler.js'
//
// async function main() {
//   const controller = new Controller()
//
//   // const soundSource = new SoundSource()
//   // soundSource.outputNode.connect(audioContext.destination)
//   // await soundSource.load(clickMp3)
//   //
//   // function handler(note, nextNoteTime) {
//   //   console.log('hi', note, nextNoteTime)
//   //   if ([1, 5, 9, 13].indexOf(note+1) !== -1) {
//   //     soundSource.play({ startTime: nextNoteTime })
//   //   }
//   // }
//
//   // controller.toggleMetronome()
//   // controller.setTempo(90)
//   // controller.start()
// }
//
// main()
