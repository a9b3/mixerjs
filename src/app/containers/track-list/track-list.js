import styles from './track-list.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

import Track from '../track/track.js'
import Pattern from '../pattern/pattern.js'
import state from 'state'

@observer
@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class TrackList extends Component {
  static propTypes = {
    trackList: PropTypes.object,
  }

  addTrack = () => {
    const track = this.props.trackList.addTrack({ label: 'default' })
    state.controller.addHandler(track.handler)
  }

  render() {
    return <div styleName='track-list'>
      <div styleName='cols'>
        {this.props.trackList.tracks.map((track, i) => {
          return <div styleName='row' key={i}>
            <div styleName='item'>
              <Track track={track}></Track>
            </div>

            <div styleName='item' style={{ flexGrow: '1' }}>
              <Pattern bar={track.bar} beat={track.beat} track={track}></Pattern>
            </div>
          </div>
        })}
        <div styleName='row add' onClick={this.addTrack}>
          <div style={{ color: 'white' }}>
            <i className='fa fa-plus'></i>
          </div>
        </div>
      </div>
    </div>
  }
}
