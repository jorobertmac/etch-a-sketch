// variables
let width = 300
let height = 300
let color = "rgb(0, 0, 0)"
let gridView = true

// querySelectors
const canvas = document.querySelector("#canvas")
const toggleGrid = document.querySelector("#toggle-grid")
const gridColor = document.querySelector("#grid-color")
const viewport = document.querySelector("#viewport")
const resizeButton = document.querySelector("#resize")
const colorPicker = document.querySelector("#color-picker")
const colorBox = document.querySelectorAll(".color-box")
const colorPreviewPrimary = document.querySelector("#primary")

// addEventListeners
toggleGrid.addEventListener("click", toggleGridView)
gridColor.addEventListener("input", setGridColor)
viewport.addEventListener("change", setViewport)
resizeButton.addEventListener("click", resize)
colorPicker.addEventListener("input", (e) => {
  setColor(e.target.value)
  if (isCustomColor(getSelected())) {
    getSelected().style.backgroundColor = color
  }
})

colorBox.forEach((box) => {
  box.addEventListener("click", () => {
    if (isSelected(box) && isCustomColor(box)) {
      unselectColorBox()
      return
    }
    unselectColorBox()
    selectColorBox(box)
    setColor(getColorBoxColor(box))
  })
})

// functions
function getGridSquareAll() {
  return document.querySelectorAll(".grid-square")
}

function getGridRowAll() {
  return document.querySelectorAll(".grid-row")
}

function setGridColor() {
  getGridRowAll().forEach((row) => {
    row.style.borderColor = gridColor.value
  })
  getGridSquareAll().forEach((box) => {
    box.style.borderColor = gridColor.value
  })
}

function toggleGridView() {
  gridView = !gridView
  checkGridView()
}

function checkGridView() {
  if (gridView) {
    showGrid()
  } else {
    hideGrid()
  }
}

function hideGrid() {
  getGridRowAll().forEach((row) => {
    row.style.borderWidth = "0px"
  })
  getGridSquareAll().forEach((box) => {
    box.style.borderWidth = "0px"
  })
}

function showGrid() {
  getGridRowAll().forEach((row) => {
    if (row === row.parentNode.firstElementChild) return 
    row.style.borderWidth = "1px 0 0 0"
    row.style.borderStyle = "solid"
    row.style.borderColor = gridColor.value
  })  
  getGridSquareAll().forEach((box) => {
    if (box === box.parentNode.firstElementChild) return
    box.style.borderWidth = "0 0 0 1px"
    box.style.borderStyle = "solid"
    box.style.borderColor = gridColor.value
  })
}

function isCustomColor(box) {
  if (box) {
    return box.classList.contains("custom")
  }
}

function isSelected(box) {
  return box.classList.contains("selected")
}

function getSelected() {
  return document.querySelector(".selected")
}

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

function setViewport() {
  viewport.min = Math.max(getWidthInput()*4, getHeightInput()*4)
  width = viewport.value
  height = viewport.value
  makeGridProportion(getHeightInput(), getWidthInput())
  console.log(viewport.value);
  
}

function getWidthInput() {
  const widthInput = document.querySelector("#width")
  const widthInputValue = checkGridSize(parseInt(widthInput.value))
  widthInput.value = widthInputValue
  return widthInputValue
}

function getHeightInput() {
  const heightInput = document.querySelector("#height")
  const heightInputValue = checkGridSize(parseInt(heightInput.value))
  heightInput.value = heightInputValue
  return heightInputValue
}

function resize() {
  canvas.replaceChildren()
  makeGrid(getHeightInput(), getWidthInput())
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
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  } else if (rows < columns) {
    canvas.style.width = `${width}px`
    canvas.style.height = `${(rows / columns) * height}px`
  } else if (rows > columns) {
    canvas.style.width = `${(columns / rows) * width}px`
    canvas.style.height = `${height}px`
  }
}

function makeGrid(rows = 16, columns = 16) {
  rows = checkGridSize(rows)
  columns = checkGridSize(columns)
  setViewport()
  for (let r = 0; r < rows; r++) {
    const row = document.createElement("div")
    row.className = "grid-row"
    canvas.appendChild(row)
    for (let c = 0; c < columns; c++) {
      const gridSquare = document.createElement("div")
      gridSquare.className = "grid-square"
      row.appendChild(gridSquare)
    }
  }
  checkGridView()
}

makeGrid()
