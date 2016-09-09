import EventEmitter from 'events'

export default class Table extends EventEmitter {
  table = [
    [{ style: {} }],
  ]

  constructor() {
    super()
    this.setMaxListeners(0)
  }

  update({ colIndex, rowIndex, style }) {
    this._setCell({ colIndex, rowIndex, style })

    const maxWidthInColumn = Math.max(
      ...this.table
      .map(row => row[colIndex] && row[colIndex].style.width)
      .filter(a => a)
    )
    this.table.forEach((row, rowIndex) => {
      if (!row[colIndex]) return
      const { style } = row[colIndex]
      if (style.width !== maxWidthInColumn) {
        style.width = maxWidthInColumn
        this.emit(`${rowIndex}${colIndex}`, this.table)
      }
    })

    const maxHeightInRow = Math.max(
      ...this.table[rowIndex]
      .map(cell => cell.style.height)
      .filter(a => a)
    )
    this.table[rowIndex].forEach((elem, colIndex) => {
      if (!elem) return
      const { style } = elem
      if (style.height !== maxHeightInRow) {
        style.height = maxHeightInRow
        this.emit(`${rowIndex}${colIndex}`, this.table)
      }
    })
  }

  _setCell({ colIndex, rowIndex, style }) {
    this.table[rowIndex] = this.table[rowIndex] || []
    this.table[rowIndex][colIndex] = this.table[rowIndex][colIndex] || {
      style,
    }
    this.table[rowIndex][colIndex].style = Object.assign({}, this.table[rowIndex][colIndex].style, style)
  }
}
