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
