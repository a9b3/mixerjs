import EventEmitter from 'events'

export default class Table extends EventEmitter {
  tables = {}
  /*
   * tables look like this
   * [rows][columns]
   *
   * [
   *   []
   * ],
   * [
   *   [],
   * ],
   */

  constructor() {
    super()
    this.setMaxListeners(0)
  }

  update(key, { colIndex, rowIndex, style, fixed }) {
    this._setCell(key, { colIndex, rowIndex, style })

    const maxWidthInColumn = Math.max(
      ...this.tables[key]
      .map(row => row[colIndex] && row[colIndex].style.width)
      .filter(a => a)
    )
    this.tables[key].forEach((row, rowIndex) => {
      const { style } = row[colIndex]
      if (style.width !== maxWidthInColumn) {
        style.width = maxWidthInColumn
        console.log(`here`)
        this.emit(`${key}${rowIndex}${colIndex}`, this.tables[key])
      }
    })

    const maxHeightInRow = Math.max(
      ...this.tables[key][rowIndex]
      .map(cell => cell.style.height)
      .filter(a => a)
    )
    this.tables[key][rowIndex].map((elem, colIndex) => {
      const { style } = elem
      if (style.height !== maxHeightInRow) {
        style.height = maxHeightInRow
        console.log(`here`)
        this.emit(`${key}${rowIndex}${colIndex}`, this.tables[key])
      }
    })
    //
    // this._printTable(this.tables[key])
    // this.emit(key, this.tables[key])
  }

  _printTable(table) {
    console.log(`##############`)
    for (let i = 0; i < table.length; i++) {
      let row = ''
      for (let j = 0; j < table[i].length; j++) {
        row += `[ w: ${table[i][j].style.width}, h: ${table[i][j].style.height} ]`
      }
      console.log(row)
    }
    console.log(`##############`)
  }

  _setCell(key, { colIndex, rowIndex, style }) {
    this.tables[key] = this.tables[key] || []
    const table = this.tables[key]

    table[rowIndex] = table[rowIndex] || []
    table[rowIndex][colIndex] = {
      style,
    }
  }
}
