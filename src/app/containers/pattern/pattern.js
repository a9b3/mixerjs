import styles from './pattern.scss'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { observer } from 'mobx-react'

@observer
@CSSModules(styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
export default class Pattern extends Component {
  static propTypes = {
    bar: PropTypes.number,
    beat: PropTypes.number,
    notesPerBeat: PropTypes.number,
    track: PropTypes.any,
  }

  static defaultProps = {
    notesPerBeat: 8,
  }

  addNote = (current32ndNote) => {
    if (this.props.track.notes[current32ndNote]) {
      this.props.track.removeNote(current32ndNote)
    } else {
      this.props.track.addNote(current32ndNote, true)
    }
    this.setState({})
  }

  renderNotes = (bar, beat, notesPerBeat, currentBar, currentBeat) => {
    let notes = []
    for (let i = 0; i < notesPerBeat; i++) {
      const current32ndNote = (currentBar * 32) + (currentBeat * 8) + i

      notes.push(
        <div styleName={`note ${this.props.track.notes[current32ndNote] ? 'active' : ''}`}
          onClick={this.addNote.bind(this, current32ndNote)}
          key={`note_${i}`}>
        </div>
      )
    }
    return notes
  }

  renderBeats = (bar, beat, notesPerBeat, currentBar) => {
    let beats = []
    for (let i = 0; i < beat; i++) {
      beats.push(
        <div styleName='beat' key={`beat_${i}`}>
          {this.renderNotes(bar, beat, notesPerBeat, currentBar, i)}
        </div>
      )
    }
    return beats
  }

  renderBars = (bar, beat, notesPerBeat) => {
    let bars = []
    for (let i = 0; i < bar; i++) {
      bars.push(
        <div styleName='bar' key={`bar_${i}`}>
          {this.renderBeats(bar, beat, notesPerBeat, i)}
        </div>
      )
    }
    return bars
  }

  render() {
    return <div styleName='pattern'>
      {this.renderBars(this.props.bar, this.props.beat, this.props.notesPerBeat)}
    </div>
  }
}
