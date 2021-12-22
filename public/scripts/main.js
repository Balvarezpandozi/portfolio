// This script contains all the functionality of the website.

//Navbar toggle button
const navToggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

navToggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

//Scrolling: Allows to have a better scroll animation when clicking links in the navbar that lead to sections on the website
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
//This function takes some text, and it creates a textarea element. Then, it selects the text, copies it and deletes the textarea element. This is a nondirect way to copy text because, for security reasons, browsers do not let you directly copy text to the clipboard
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
//This function allows elements to collapse like a dropdown menu.
workCollapsibles.forEach((coll) => {
  coll.addEventListener("click", () => {
    //Select sibbling element to the dropdown button
    const content = coll.nextElementSibling;

    if (content.classList.contains("disappear")) {
      //if is hidden, then make visible and make button stay with the active class(css)
      content.classList.remove("disappear");
      coll.classList.add("job-button-active");
    } else {
      //if is not hidden, then make invisible and take away active class from button
      content.classList.add("disappear");
      coll.classList.remove("job-button-active");
    }
  });
});

//Same as before just for a different set of elements. Note: Obviously it would be better if we create a function and just feed the elements we want to collapse.
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

//This function works similarly to the collapsible function. However the selection of elements is way different. Basically, we click a container that triggers the function. The buttons do not occupy the whole container. So, we take the element that is closes to the place we clicked. If we get an element it must be one of the buttons, if we dont get any element we just clicked in an empty space.
tabsContainer.addEventListener("click", function (e) {
  //grap closes button
  const clicked = e.target.closest(".skills-tab");

  // Guard clause: discard if no button was clicked
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

// This function reveals sections as the observer intersects them
const revealSection = function (entries, observer) {
  //Loop through all entries caught by the observer
  entries.forEach((entry) => {
    //if the section is read but has not be intersected, discard it
    if (!entry.isIntersecting) return;
    //Show section
    entry.target.classList.remove("section-hidden");
    //Stop tracking given section
    observer.unobserve(entry.target);
  });
};

//Set up observer
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, //observe whole viewport
  threshold: 0.15, //read element when 15% of it is in the observers viewport
});

//Hide all sections on the website
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

//lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");
//This function takes all images as they are intersected by the observer and changes its source to a better quality image and once it loads it takes away the filter they posses
const loadImage = function (entries, observer) {
  //loop through all images that the observer finds
  entries.forEach((entry) => {
    //if the image is not intersected, discard it
    if (!entry.isIntersecting) return;
    //replace src with data-src
    entry.target.src = entry.target.dataset.src;
    //once the better quality image loads, remove blur filter(lazy-img class)
    entry.target.addEventListener("load", () => {
      entry.target.classList.remove("lazy-img");
    });
    //stop tracking given image
    observer.unobserve(entry.target);
  });
};

//Set up observer
const imgObserver = new IntersectionObserver(loadImage, {
  root: null, //use whole viewport
  threshold: 0, //when the observer intersects image at its 0%(beggining, not anywhere but in it)
});
//Set observer to track all images
imgTargets.forEach((img) => imgObserver.observe(img));

//Slider
//This function handles the slider(projects section)
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider-button-left");
  const btnRight = document.querySelector(".slider-button-right");
  const dotContainer = document.querySelector(".dots");

  //declares a variable to track the current slide
  let curSlide = 0;
  //Sets the maximun amount of slides
  const maxSlide = slides.length;

  // Functions
  //This function inserts a dot(styling element) per slide
  const createDots = function () {
    //Loops through slides
    slides.forEach(function (_, i) {
      //inserts a dot into the container with the field data-slide=i, where i is the slide number
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  //this function takes a slide number and takes away the active class to all buttons but the one pertaining to the slide
  const activateDot = function (slide) {
    //Remove active class from all dots
    document
      .querySelectorAll(".dots-dot")
      .forEach((dot) => dot.classList.remove("dots-dot-active"));
    //Add active class to the dot pertaining to the given slide
    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add("dots-dot-active");
  };

  //This function slides the given slide to the viewport
  const goToSlide = function (slide) {
    //loops through slides
    slides.forEach(
      //moves slides so that the given slide is the one that shows in the viewport
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  //this function moves the slider to the directly next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      //If there is not a next slide, set current slide to the first one(0)
      curSlide = 0;
    } else {
      //Otherwise, increment the current slide counter
      curSlide++;
    }

    //Set slider to the slide determined before
    goToSlide(curSlide);
    //Set pertaining dot to be active
    activateDot(curSlide);
  };

  //This function does excatly the same as before but for the directly previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //This function initializes the slider
  const init = function () {
    //Set slider on the first slide
    goToSlide(0);
    //Create all dots
    createDots();
    //Set pertaining active dot
    activateDot(0);
  };
  //Initialize slider
  init();

  // Event handlers
  //When next button is clicked, execute next slide function
  btnRight.addEventListener("click", nextSlide);
  //When previous button is clicked, execute previous slide function
  btnLeft.addEventListener("click", prevSlide);

  //Same as before but it works for the right and left arraw keys
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  //This event listener moves the slider depending on the dot clicked
  dotContainer.addEventListener("click", function (e) {
    //If the element clicked in the dot container is one of the dots, execute
    if (e.target.classList.contains("dots-dot")) {
      //Set slide to the slide on the given dot data set(data-slide)
      const { slide } = e.target.dataset;
      //Move slider to given slide
      goToSlide(slide);
      //Make pertaining dot active
      activateDot(slide);
    }
  });
};
//Initialize slider
slider();
