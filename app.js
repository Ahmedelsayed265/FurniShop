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
//------------------Map section----------------------------//
if (navigator.geolocation) {
  const pos = [30.560668, 31.018417];
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      const map = L.map("mapLocation").setView(coords, 11);
      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker(coords).addTo(map).bindPopup("This is your Location");
      L.marker(pos).addTo(map).bindPopup("This is our Location").openPopup();
    },
    function() {
      alert("cannot get current position");
    }
  );
}
//---------------------- testimonial slider ------------------------//
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".left-btn");
const prevButton = document.querySelector(".right-btn");
const slideWidth = slides[0].getBoundingClientRect().width;
//arrange the slides next to one another
const setSlidePostion = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePostion);
// next btn //
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};
nextButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide);
  disableButtons(slides, prevButton, nextButton, nextIndex);
});
// prev btn //
prevButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);
  moveToSlide(track, currentSlide, prevSlide);
  disableButtons(slides, prevButton, nextButton, prevIndex);
});
const disableButtons = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex == 0) {
    prevButton.classList.add("disable");
    nextButton.classList.remove("disable");
  } else if (targetIndex == slides.length - 1) {
    prevButton.classList.remove("disable");
    nextButton.classList.add("disable");
  } else {
    prevButton.classList.remove("disable");
    nextButton.classList.remove("disable");
  }
};
