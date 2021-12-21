//Navbar toggle button
const navToggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

navToggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

//Scrolling
document.querySelector(".navbar-links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Copy email button
const copyButton = document.querySelector(".copy-button");
function copy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  copyButton.innerText = "Copied";
}

//Collapsible
const workCollapsibles = document.querySelectorAll(".work-collapsible");
workCollapsibles.forEach((coll) => {
  coll.addEventListener("click", () => {
    const content = coll.nextElementSibling;
    if (content.classList.contains("disappear")) {
      content.classList.remove("disappear");
      coll.classList.add("job-button-active");
    } else {
      content.classList.add("disappear");
      coll.classList.remove("job-button-active");
    }
  });
});

const educCollapsibles = document.querySelectorAll(".education-collapsible");
educCollapsibles.forEach((coll) => {
  coll.addEventListener("click", () => {
    const content = coll.nextElementSibling;
    if (content.classList.contains("disappear")) {
      content.classList.remove("disappear");
      coll.classList.add("education-button-active");
    } else {
      content.classList.add("disappear");
      coll.classList.remove("education-button-active");
    }
  });
});

// Skills Tabs
const tabsContainer = document.querySelector(".skills-tab-container");
const skillsTabs = document.querySelectorAll(".skills-tab");
const tabsContent = document.querySelectorAll(".skills-content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".skills-tab");

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  skillsTabs.forEach((t) => t.classList.remove("skills-tab-active"));
  tabsContent.forEach((c) => c.classList.remove("skills-content-active"));

  // Activate tab
  clicked.classList.add("skills-tab-active");

  // Activate content area
  document
    .querySelector(`.skills-content-${clicked.dataset.tab}`)
    .classList.add("skills-content-active");
});

//Reveal sections
const allSections = document.querySelectorAll("section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

//lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImage = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    //replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", () => {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
});
imgTargets.forEach((img) => imgObserver.observe(img));

//Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider-button-left");
  const btnRight = document.querySelector(".slider-button-right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots-dot")
      .forEach((dot) => dot.classList.remove("dots-dot-active"));

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add("dots-dot-active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots-dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
