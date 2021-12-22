//lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);
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
