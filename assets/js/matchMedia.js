
let current_theme = localStorage.getItem("current_theme") || "light";

if ("system" === current_theme) {
  current_theme = (current_theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

document.documentElement.classList.add(current_theme);
