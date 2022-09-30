//------------------fixed navbar----------------------------//
let fixPoint = document.querySelector("header main").offsetTop;
let nav = document.querySelector("header nav");
window.onscroll = function() {
  if (this.scrollY >= fixPoint - 40) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
};
//------------------Nav Links hover----------------------------//
let navLinks = document.querySelectorAll(".nav_link");
let sections = document.querySelectorAll(".sec");
let current;
window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    let secTop = sec.offsetTop;
    if (pageYOffset >= secTop - 80) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.classList.contains(current)) {
      link.classList.add("active");
    }
  });
});
//--------------------animate counting-----------------------//
let numbers = document.querySelectorAll(".num");
let started = false;
function startCount(element) {
  let goal = element.dataset.goal;
  let count = setInterval(() => {
    element.textContent++;
    if (element.textContent == goal) {
      clearInterval(count);
    }
  }, 2500 / goal);
}
window.addEventListener("scroll", () => {
  if (this.scrollY >= 80) {
    if (!started) {
      numbers.forEach(num => startCount(num));
    }
    started = true;
  }
});
