window.addEventListener("scroll", function (e) {
  const header = this.document.querySelector("header")

  header.classList.toggle("header--scrolled", this.window.scrollY > 0)
})

document.addEventListener("click", function (e) {
  if (e.target.parentElement.id === "playBtn") {
    const video = document.querySelector(".video-player__video")
    const playBtn = document.getElementById("playBtn")

    video.style.visibility = "visible"
    video.style.opacity = "1"
    playBtn.style.opacity = "0"
    playBtn.style.visibility = "hidden"
  }
})
