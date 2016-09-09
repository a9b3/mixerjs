import styles from './mixer.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

import Channel from '../channel/channel.js'
import ActionBar from './action-bar/action-bar.js'

@observer
@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Mixer extends Component {
  static propTypes = {
    mixer: PropTypes.object,
  }

  render() {
    return <div styleName='mixer'>
      <ActionBar />

      <div styleName='channels'>
        {this.props.mixer.channels.map((channel, i) => <Channel
          key={`channel_${i}`}
          channel={channel}
        /> )}
      </div>

      <div styleName='end'>
        <Channel channel={this.props.mixer.master} />
      </div>
    </div>
  }
}
