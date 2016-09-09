import EventEmitter from 'events'

export default class Table extends EventEmitter {
  table = []

  constructor() {
    super()
    this.setMaxListeners(0)
  }

  update({ colIndex, rowIndex, style , fixed }) {
    this._setCell({ colIndex, rowIndex, style })

    const maxWidthInColumn = Math.max(
      ...this.table
      .map(row => row[colIndex] && row[colIndex].style.width)
      .filter(a => a)
    )
    this.table.forEach((row, rowIndex) => {
      const { style } = row[colIndex]
      if (style.width !== maxWidthInColumn) {
        style.width = maxWidthInColumn
        this.emit(`${rowIndex}${colIndex}`, this.table)
      }
    })

    if (fixed) {
      this.table.forEach((row, rowIndex) => {
        row[colIndex].style.position = 'absolute'
        row[colIndex].style.left = `-${row[colIndex].style.width}px`
        this.emit(`${rowIndex}${colIndex}`, this.table)

        // set next column margin
        if (!row[colIndex + 1]) {
          this._setCell({ colIndex: colIndex + 1, rowIndex, style: {} })
        }
        const { style } = row[colIndex + 1]
        // style.marginLeft = this.table[rowIndex][colIndex].style.width
        style.background = 'black'
        this.emit(`${rowIndex}${colIndex + 1}`, this.table)
      })
    }

    const maxHeightInRow = Math.max(
      ...this.table[rowIndex]
      .map(cell => cell.style.height)
      .filter(a => a)
    )
    this.table[rowIndex].forEach((elem, colIndex) => {
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
