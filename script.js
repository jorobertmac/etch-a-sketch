// variables
const width = 750
const height = 750
let color = "rgb(0, 0, 0)"

// querySelectors
const grid = document.querySelector("#grid")
const resizeButton = document.querySelector("#resize")
const colorPicker =document.querySelector("#color-picker")
const colorBox = document.querySelectorAll(".color-box")
const colorPreviewPrimary = document.querySelector("#primary")

// addEventListeners
resizeButton.addEventListener("click", resize)
colorPicker.addEventListener("blur", (e) => {
  unselectColorBox()
  setColor(e.target.value)
})
colorBox.forEach(box => {
  box.addEventListener("click", () =>{
    unselectColorBox()
    selectColorBox(box)
    setColor(getColorBoxColor(box))
  })
})

function selectColorBox(box) {
  box.classList.add("selected")
}

function unselectColorBox() {
  const selected = document.querySelector(".selected")
  if (!selected) return
  selected.classList.remove("selected")
}

function getColorBoxColor(box) {
  return window.getComputedStyle(box).getPropertyValue(`background-color`)
}

function setColor(newColor) {
  color = newColor
  colorPreviewPrimary.style.backgroundColor = color
}

function resize() {
  const widthInput = document.querySelector("#width")
  const heightInput = document.querySelector("#height")
  let widthInputValue = checkGridSize(parseInt(widthInput.value))
  let heightInputValue = checkGridSize(parseInt(heightInput.value))
  widthInput.value = widthInputValue
  heightInput.value = heightInputValue
  grid.replaceChildren()
  makeGrid(heightInputValue, widthInputValue)
}


function checkGridSize(number) {
  if (number < 1) {
    return 1
  } else if (number > 100) {
    return 100
  }
  return number
}

function makeGridProportion(rows, columns) {
  if (rows === columns) {
    grid.style.width = `${width}px`
    grid.style.height = `${height}px`
  } else if (rows < columns) {
    grid.style.width = `${width}px`
    grid.style.height = `${rows/columns*height}px`
  } else if (rows > columns) {
    grid.style.width = `${columns/rows*width}px`
    grid.style.height = `${height}px`
  }
}

function makeGrid(rows=16, columns=16) {
  rows = checkGridSize(rows)
  columns = checkGridSize(columns)
  makeGridProportion(rows, columns)
  for (let r = 0; r < rows; r++) {
    const row = document.createElement("div")
    row.className = "grid-row"
    grid.appendChild(row)
    for (let c = 0; c < columns; c++){
      const gridSquare = document.createElement("div")
      gridSquare.className = "grid-square"
      row.appendChild(gridSquare)
    }
  }
}

makeGrid()