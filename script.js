// variables
const width = 850
const height = 850

// querySelectors
const grid = document.querySelector("#grid")



function checkGridSize(number) {
  if (number < 1) {
    return 1
  } else if (number > 100) {
    return 100
  }
  return number
}

function makeGrid(rows=16, columns=16) {
  rows = checkGridSize(rows)
  columns = checkGridSize(columns)
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