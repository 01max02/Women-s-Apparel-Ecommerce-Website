// Global variables
let currentImageIndex = 0
const totalImages = 3

// Image switching functionality
function changeMainImage(thumbnail, index) {
  const mainImage = document.getElementById("mainImage")
  const thumbnails = document.querySelectorAll(".thumbnail")
  const paginationDots = document.querySelectorAll(".pagination-dot")

  // Update main image
  mainImage.src = thumbnail.src

  // Update active thumbnail
  thumbnails.forEach((thumb) => thumb.classList.remove("active"))
  thumbnail.classList.add("active")

  paginationDots.forEach((dot) => dot.classList.remove("active"))
  paginationDots[index].classList.add("active")

  // Update current index
  currentImageIndex = index
}

document.addEventListener("DOMContentLoaded", () => {
  const paginationDots = document.querySelectorAll(".pagination-dot")
  const thumbnails = document.querySelectorAll(".thumbnail")

  paginationDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const thumbnail = thumbnails[index]
      changeMainImage(thumbnail, index)
    })
  })
})

// Color selection
function selectColor(colorBtn) {
  const colorOptions = document.querySelectorAll(".color-option")
  const selectedColorSpan = document.querySelector(".selected-color")

  colorOptions.forEach((option) => option.classList.remove("active"))
  colorBtn.classList.add("active")

  selectedColorSpan.textContent = colorBtn.dataset.color
}

// Size selection
function selectSize(sizeBtn) {
  const sizeOptions = document.querySelectorAll(".size-option")

  sizeOptions.forEach((option) => option.classList.remove("active"))
  sizeBtn.classList.add("active")
}

// Wishlist toggle
document.getElementById("wishlistBtn").addEventListener("click", function () {
  this.classList.toggle("active")
})

// Add to bag functionality
function addToBag() {
  const selectedColor = document.querySelector(".color-option.active").dataset.color
  const selectedSize = document.querySelector(".size-option.active").textContent

  alert(`Added to bag: Plain Fitted Waistcoat Vest in ${selectedColor}, Size ${selectedSize}`)
}

// Expandable sections
function toggleSection(header) {
  const content = header.nextElementSibling
  const isActive = header.classList.contains("active")

  // Close all sections
  document.querySelectorAll(".section-header").forEach((h) => {
    h.classList.remove("active")
    h.nextElementSibling.classList.remove("active")
  })

  // Open clicked section if it wasn't active
  if (!isActive) {
    header.classList.add("active")
    content.classList.add("active")
  }
}

// Bottom tabs functionality
function switchTab(tabBtn, tabId) {
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabPanels = document.querySelectorAll(".tab-panel")

  tabBtns.forEach((btn) => btn.classList.remove("active"))
  tabPanels.forEach((panel) => panel.classList.remove("active"))

  tabBtn.classList.add("active")
  document.getElementById(tabId).classList.add("active")
}
