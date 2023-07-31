window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");

  if (window.scrollY > 0) {
    navbar.classList.add("opaque");
  } else {
    navbar.classList.remove("opaque");
  }
});