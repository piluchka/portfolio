"use strict"

function getIsMobileMenuCreated(isChanged) {
  function isMobileMenuCreated(isChanged) {
    let isMobileMenuCreated = false
    if (isChanged) {
      isMobileMenuCreated = true
    }

    return isMobileMenuCreated
  }

  return isMobileMenuCreated(isChanged)
}

window.addEventListener("DOMContentLoaded", function () {
  const innerWidth = this.innerWidth

  if (innerWidth <= 768) {
    createMobileMenu(innerWidth)
  }
})

window.addEventListener("resize", function () {
  const innerWidth = this.innerWidth

  if (innerWidth <= 768 && !getIsMobileMenuCreated(false)) {
    createMobileMenu()
  } else {
    removeMobileMenu()
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
    console.log(nextSibling)
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

function createMobileMenu() {
  if (!getIsMobileMenuCreated(false)) {
    const removeElement = document.getElementById("links")
    if (removeElement && removeElement.parentElement.tagName === "DIV") {
      removeElAndAppendItToMenu(removeElement)
      getIsMobileMenuCreated(true)
    }
  }
}

function removeMobileMenu() {
  const removeElement = document.getElementById("links")
  if (removeElement && removeElement.parentElement.tagName === "LI") {
    removeElement.parentElement.remove()
    const item = document.getElementsByClassName("item-header")
    if (item) {
      const mainItem = item[0]
      mainItem.append(removeElement)
      getIsMobileMenuCreated(true)
    }
  }
}

function removeElAndAppendItToMenu(el) {
  el.remove()
  const menuList = document.getElementById("menuList")
  const li = document.createElement("li")
  li.className = "menu__item"
  li.classList.add("menu__item--links")
  li.appendChild(el)
  menuList.append(li)
}

// Scroll effect with Intersection Observer
const observer = new IntersectionObserver(observerCallBack, { threshold: 0.7 })

function observerCallBack(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("_show")
    }
  })
}

const scrollElements = document.querySelectorAll("._scroll")
scrollElements.forEach((el) => {
  observer.observe(el)
})
