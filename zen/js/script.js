"use strict"

let isMobileMenuCreated = false

// let getMobileMenuCreated = function () {
//   let isMobileMenuCreated = false
//   function returnAnotherValue() {
//     isMobileMenuCreated = !isMobileMenuCreated
//   }
//   returnAnotherValue()
//   return isMobileMenuCreated
// }

// window.addEventListener("load", function () {
//   console.log(innerWidth)
//   checkViewportSize(innerWidth, isMobileMenuCreated)
// })

if (this.innerWidth <= 768 && !isMobileMenuCreated) {
  const removeElement = this.document.getElementById("links")
  if (removeElement && removeElement.parentElement.tagName === "DIV") {
    removeElAndAppendItToMenu(removeElement)
    isMobileMenuCreated = true
  }
}

window.addEventListener("resize", function () {
  // checkViewportSize(innerWidth, isMobileMenuCreated)
  if (this.innerWidth <= 768 && !isMobileMenuCreated) {
    const removeElement = this.document.getElementById("links")
    if (removeElement && removeElement.parentElement.tagName === "DIV") {
      removeElAndAppendItToMenu(removeElement)
      isMobileMenuCreated = true
    }
  } else if (this.innerWidth > 768 && isMobileMenuCreated) {
    const removeElement = this.document.getElementById("links")
    if (removeElement && removeElement.parentElement.tagName === "LI") {
      removeElement.parentElement.remove()
      const item = document.getElementsByClassName("item-header")
      if (item) {
        const mainItem = item[0]
        mainItem.append(removeElement)
        isMobileMenuCreated = false
      }
    }
  }
})

document.addEventListener("click", function (e) {
  const target = e.target
  if (target.classList.contains("icon-menu")) {
    document.body.classList.toggle("menu-opened")
  }

  if (target.closest("[data-open]") && target.tagName === "BUTTON") {
    let hiddenEl
    let nextSibling = target.closest("[data-open]")
    while (nextSibling) {
      if (nextSibling.classList.contains("brands--hidden")) {
        hiddenEl = nextSibling
        break
      }
      nextSibling = nextSibling.nextElementSibling
    }
    if (hiddenEl) {
      hiddenEl.classList.remove("brands--hidden")
      hiddenEl.classList.add("brands--opened")
    } else {
      let hiddenEl
      let nextSibling = target.closest("[data-open]")
      while (nextSibling) {
        if (nextSibling.classList.contains("brands--opened")) {
          hiddenEl = nextSibling
          break
        }
        nextSibling = nextSibling.nextElementSibling
      }
      hiddenEl.classList.add("brands--hidden")
      hiddenEl.classList.remove("brands--opened")
    }
  }
})

function removeElAndAppendItToMenu(el) {
  el.remove()
  const menuList = document.getElementById("menuList")
  const li = document.createElement("li")
  li.className = "menu__item"
  li.classList.add("menu__item--links")
  li.appendChild(el)
  menuList.append(li)
}

// function checkViewportSize(viewportSize, isMobileMenuCreated) {
//   console.log(isMobileMenuCreated)
//   if (viewportSize <= 768 && !isMobileMenuCreated) {
//     const removeElement = document.getElementById("links")
//     if (removeElement && removeElement.parentElement.tagName === "DIV") {
//       removeElAndAppendItToMenu(removeElement)
//       isMobileMenuCreated = true
//     }
//   } else if (viewportSize > 768 && isMobileMenuCreated) {
//     const removeElement = document.getElementById("links")
//     if (removeElement && removeElement.parentElement.tagName === "LI") {
//       removeElement.parentElement.remove()
//       const item = document.getElementsByClassName("item-header")
//       if (item) {
//         const mainItem = item[0]
//         mainItem.append(removeElement)
//         isMobileMenuCreated = false
//       }
//     }
//   }
// }
