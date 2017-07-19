import styles from './pattern.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'
import state from 'state'

function getCurrentTick(currentBar, currentBeat, i, notesPerBeat) {
  const ticksPerBeat = state.controller.scheduler.ticksPerBeat
  const barOffset = currentBar * (ticksPerBeat * 4)
  const beatOffset = currentBeat * ticksPerBeat
  return barOffset + beatOffset + (i * (ticksPerBeat / notesPerBeat))
}

@observer
@CSSModules(styles, {
  allowMultiple     : true,
  errorWhenNotFound : false,
})
export default class Pattern extends Component {
  static propTypes = {
    bar   : PropTypes.number,
    beat  : PropTypes.number,
    track : PropTypes.any,
  }

  static defaultProps = {
    beat : 4,
  }

  state = {
    currentTick  : 0,
    notesPerBeat : 8,
  }

  componentDidMount() {
    state.controller.addHandler(this.controllerHandler)
  }

  componentWillUnmount() {
    state.controller.removeHandler(this.controllerHandler)
  }

  controllerHandler = (currentTick, _, { ticksPerBeat }) => {
    const offsetTick = currentTick % (this.props.bar * this.props.beat * ticksPerBeat)

    if (offsetTick % 8 === 0 && offsetTick !== this.state.currentTick) {
      window.requestAnimationFrame(this.setState.bind(this, { currentTick: offsetTick }, null))
    }
  }

  toggleNote = (currentTick) => {
    if (this.props.track.notes[currentTick]) {
      this.props.track.removeNote(currentTick)
    } else {
      this.props.track.addNote(currentTick, true)
    }
    // trigger redraw
    window.requestAnimationFrame(this.setState.bind(this, {}, null))
  }

  getNoteStyle(isActive, isPlaying) {
    return [
      isActive && 'active',
      isPlaying && 'playing',
    ].filter(a => a).join(' ')
  }
  renderNotes = (bar, beat, currentBar, currentBeat) => {
    const notes = []
    let currentTick = 0
    for (let i = 0; i < this.state.notesPerBeat; i++) {
      currentTick = getCurrentTick(currentBar, currentBeat, i, this.state.notesPerBeat)

      notes.push(
        <div styleName={`note ${this.getNoteStyle(this.props.track.notes[currentTick], currentTick === this.state.currentTick)}`}
          onClick={this.toggleNote.bind(this, currentTick)}
          key={`note_${i}`}>
        </div>
      )
    }
    return notes
  }

  renderBeats = (bar, beat, currentBar) => {
    const beats = []
    for (let i = 0; i < beat; i++) {
      beats.push(
        <div styleName='beat' key={`beat_${i}`}>
          {this.renderNotes(bar, beat, currentBar, i)}
        </div>
      )
    }
    return beats
  }

  renderBars = (bar, beat) => {
    const bars = []
    for (let i = 0; i < bar; i++) {
      bars.push(
        <div styleName='bar' key={`bar_${i}`}>
          {this.renderBeats(bar, beat, i)}
        </div>
      )
    }
    return bars
  }

  render() {
    return <div styleName='pattern'>
      {this.renderBars(this.props.bar, this.props.beat)}
    </div>
  }
}
