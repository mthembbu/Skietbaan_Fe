export function toggleHeader() {
    var navbar = document.querySelector(".score-capture-header");
    if (navbar.classList.contains("hidden")) {
        navbar.classList.remove("hidden");
        navbar.removeAttribute("hidden");
    } else {
        navbar.classList.add("hidden");
        navbar.setAttribute("hidden", "true");
    }
}

export function toggleToggleBar() {
    var navbar = document.querySelector(".scores-page-switch-top");
    if (navbar.classList.contains("hidden")) {
      navbar.classList.remove("hidden");
      navbar.removeAttribute("hidden");
    } else {
      navbar.classList.add("hidden");
      navbar.setAttribute("hidden", "true");
    }
  }