import styles from './demo.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import {
  SoundSource,
  audioContext,
  ConvolverNode,
  Channel,
} from 'mixer'

import url from '../../assets/drumkit/chant.wav'
import wav from '../../../../../../Desktop/large-hall.wav'

@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Demo extends Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  async componentDidMount() {
    const convolverNode = new ConvolverNode()

    const channel = new Channel()
    channel.outputNode.connect(audioContext.destination)

    channel.addFxNode(convolverNode)
    await convolverNode.load(wav)

    const soundSource = new SoundSource()
    soundSource.connect(channel)
    await soundSource.load(url)
    soundSource.play()
  }

  render() {
    return <div styleName='demo'>
      <div>
        hi
      </div>
    </div>
  }
}
