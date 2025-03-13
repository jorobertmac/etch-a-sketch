// querySelectors
const grid = document.querySelector("#grid")

function makeGrid(rows, columns) {
  for (let r = 0; r < rows; r++) {
    const row = document.createElement("div")
    row.className = "gridRow"
    grid.appendChild(row)
    for (let c = 0; c < columns; c++){
      const gridSquare = document.createElement("div")
      gridSquare.className = "gridSquare"
      row.appendChild(gridSquare)
    }
  }
}