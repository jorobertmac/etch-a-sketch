// variables
let width = 300
let height = 300

let colorApply
let colorPrimary = "rgb(0, 0, 0)"
let colorSecondary = "rgb(255, 255, 255)"
let colorErase = "rgb(255, 255, 255)"

let gridView = true
let erase = false

// querySelectors
const canvas = document.querySelector("#canvas")
const toggleGrid = document.querySelector("#toggle-grid")
const gridColor = document.querySelector("#grid-color")
const zoom = document.querySelector("#zoom")
const resizeButton = document.querySelector("#resize")
const colorPicker = document.querySelector("#color-picker")
const colorBox = document.querySelectorAll(".color-box")
const colorPreview = document.querySelectorAll(".color-preview")
const colorPreviewPrimary = document.querySelector("#primary")
const colorPreviewSecondary = document.querySelector("#secondary")
const eraseButton = document.querySelector("#erase")

// addEventListeners
toggleGrid.addEventListener("click", toggleGridView)
gridColor.addEventListener("input", setGridColor)
zoom.addEventListener("change", setZoom)
resizeButton.addEventListener("click", resize)
canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault()
})
canvas.addEventListener("mousedown", (e) => {
  drawStart(e)
})
canvas.addEventListener("mouseup", drawEnd)
canvas.addEventListener("mouseleave", drawEnd)

colorPicker.addEventListener("pointerdown", () => {
  if (isCustomColor(getSelected())) {
    getSelected().style.backgroundColor = colorPicker.value
  }
})
colorPicker.addEventListener("input", (e) => {
  const newColor = colorPicker.value
  if (isCustomColor(getSelected())) {
    getSelected().style.backgroundColor = newColor
  }
  getCurrent().style.backgroundColor = newColor
  if (getCurrent().id === "primary") {
    setColorPrimary(newColor)
  } else if (getCurrent().id === "secondary") {
    setColorSecondary(newColor)
  }
})
colorPicker.addEventListener("click", (e) => {
  const newColor = colorPicker.value
  if (isCustomColor(getSelected())) {
    getSelected().style.backgroundColo5r = newColor
  }
  getCurrent().style.backgroundColor = newColor
  if (getCurrent().id === "primary") {
    setColorPrimary(newColor)
  } else if (getCurrent().id === "secondary") {
    setColorSecondary(newColor)
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
    if (getCurrent().id === "primary") {
      setColorPrimary(getColorBoxColor(box))
    } else if (getCurrent().id === "secondary") {
      setColorSecondary(getColorBoxColor(box))
    }
  })
})

colorPreview.forEach((box) => {
  box.addEventListener("click", () => {
    getCurrent().classList.toggle("current")
    box.classList.toggle("current")
  })
})

eraseButton.addEventListener("click", toggleErase)

// Shortcut event listener
window.addEventListener("keyup", (e) => {
  key = e.key
  if (key === "p") {
    document.querySelector("#primary").click()
  }
  if (key === "s") {
    document.querySelector("#secondary").click()
  }
  if (key === "e") {
    document.querySelector("#erase").click()
  }
  if (key === "x") {
    document.querySelector("#toggle-grid").click()
  }
  if (key === "r") {
    document.querySelector("#red-box").click()
  }
  if (key === "o") {
    document.querySelector("#orange-box").click()
  }
  if (key === "y") {
    document.querySelector("#yellow-box").click()
  }
  if (key === "b") {
    document.querySelector("#black-box").click()
  }
  if (key === "w") {
    document.querySelector("#white-box").click()
  }
  if (key === "g") {
    document.querySelector("#green-box").click()
  }
  if (key === "n") {
    document.querySelector("#blue-box").click()
  }
  if (key === "v") {
    document.querySelector("#violet-box").click()
  }
  if (key === "c") {
    document.querySelector("#charcoal-box").click()
  }
  if (key === "m") {
    document.querySelector("#mocha-box").click()
  }
  if (key === ".") {
    document.querySelector("#color-picker").click()
  }
  if (key === "0") {
    document.querySelector("#custom-box0").click()
  }
  if (key === "1") {
    document.querySelector("#custom-box1").click()
  }
  if (key === "2") {
    document.querySelector("#custom-box2").click()
  }
  if (key === "3") {
    document.querySelector("#custom-box3").click()
  }
  if (key === "4") {
    document.querySelector("#custom-box4").click()
  }
  if (key === "5") {
    document.querySelector("#custom-box5").click()
  }
  if (key === "6") {
    document.querySelector("#custom-box6").click()
  }
  if (key === "7") {
    document.querySelector("#custom-box7").click()
  }
  if (key === "8") {
    document.querySelector("#custom-box8").click()
  }
  if (key === "9") {
    document.querySelector("#custom-box9").click()
  }
})

// functions
function getGridSquareAll() {
  return document.querySelectorAll(".grid-square")
}

function getGridRowAll() {
  return document.querySelectorAll(".grid-row")
}

function setGridColor() {
  canvas.style.borderColor = gridColor.value
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
  canvas.style.borderColor = "#000"
  getGridRowAll().forEach((row) => {
    row.style.borderWidth = "0px"
  })
  getGridSquareAll().forEach((box) => {
    box.style.borderWidth = "0px"
  })
}

function showGrid() {
  canvas.style.borderColor = gridColor.value
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

function drawStart(event) {
  if (erase) {
    colorApply = colorErase
  }
  else if (event.button === 0) {
    colorApply = colorPrimary
  }
  else if (event.button === 2) {
    colorApply = colorSecondary
  }

  if (event.target.classList.contains("grid-row")) {
    return
  }
  event.target.style.backgroundColor = colorApply
  getGridSquareAll().forEach((pixel) => {
    pixel.addEventListener("mouseenter", applyColor)
  })
}

function drawEnd() {
  getGridSquareAll().forEach((box) => {
    box.removeEventListener("mouseenter", applyColor)
  })
}
function applyColor() {
  this.style.backgroundColor = colorApply
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

function getCurrent() {
  return document.querySelector(".current")
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


function setColorPrimary(newColor) {
  colorPrimary = newColor
  colorPreviewPrimary.style.backgroundColor = colorPrimary
}

function setColorSecondary(newColor) {
  colorSecondary = newColor
  colorPreviewSecondary.style.backgroundColor = colorSecondary
}

function setZoom() {
  zoom.min = Math.max(getWidthInput() * 4, getHeightInput() * 4)
  width = zoom.value
  height = zoom.value
  makeGridProportion(getHeightInput(), getWidthInput())
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

function toggleErase() {
  erase = !erase
  eraseButton.classList.toggle("erase-active")
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
  setZoom()
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
