"use-strict";

console.log("hello mattspigs gallery");

document.addEventListener("click", (e) => {
  console.log(e.target);
});

//////////////////////////////////////////////////////////////////////////////
/* refresh = top of page (something better served in its own js file but oh well) */
//////////////////////////////////////////////////////////////////////////////
window.addEventListener("unload", function (e) {
  e.preventDefault();
  this.scrollTo(0, 0);
});

window.addEventListener("pagehide", function (e) {
  e.preventDefault();
  this.scrollTo(0, 0);
});

//////////////////////////////////////////////////////////////////////////////
/* populating gallery with (lazy) images */
//////////////////////////////////////////////////////////////////////////////

const galleryContainer = document.querySelector(".gallery");
const selectedImgContainer = document.getElementById("selected_img_container");
const selectedImg = document.getElementById("selected_img");

//fn to populate the gallery
const HARDCODEIMAGEVALUE = 46;
let selectedIndex = null;
const populateGal = function () {
  ///////////////////////////////////GALLERY HARD CODE AMOUNT/////////////////////////////////////
  //make new array with length equal to amount of pics in gallery
  const countArr = new Array(HARDCODEIMAGEVALUE);

  //create new images with data-src;
  for (let i = 1; i < countArr.length + 1; i++) {
    let curImg = document.createElement("img");

    //since the class for gallery images is only 300 px, no point in loading anything bigger than the 400px image for these. use srcset on selected imgs
    curImg.src = `../media/gallery_imgs_webp/800/gal_img_800(${i}).webp?`;

    //making an index to use for arrow navigation of images
    curImg.dataset.index = i;

    //markup lazy loading ftw
    curImg.loading = "lazy";

    curImg.classList.add("gal_img");
    // curImg.classList.add("gal_img_lazy");

    //event listener for modal functionality
    curImg.addEventListener("click", () => {
      selectedImgContainer.style.transform = `translateY(0)`;

      //the image urls with their respective intended width
      selectedImg.srcset = `
      ../media/gallery_imgs_webp/gal_img_full(${i}).webp?w=4000 4000w,
      ../media/gallery_imgs_webp/2000/gal_img_2000(${i}).webp?w=2000 2000w,
      ../media/gallery_imgs_webp/1200/gal_img_1200(${i}).webp?w=1200 1200w,
      ../media/gallery_imgs_webp/800/gal_img_800(${i}).webp?w=800 800w,
      ../media/gallery_imgs_webp/400/gal_img_400(${i}).webp?w=400 400w,
      `;
      selectedImg.src = `../media/gallery_imgs_webp/gal_img_full(${i}).webp`;

      //sizesa ttribute: media queries for what image to use at what breakpoint
      selectedImg.sizes =
        "(max-width: 500px) 400px, (max-width: 900px) 800px, (max-width: 1600px) 1200px, (max-width: 2500px) 2000px, 4000px";

      selectedImg.dataset.index = i;
      selectedIndex = i;
    });

    galleryContainer.appendChild(curImg);
  }
};

populateGal();

//modal selected image moved above view
selectedImgContainer.addEventListener("click", function () {
  selectedImgContainer.style.transform = `translateY(-100%)`;
  // selectedImgContainer.src = "";
});

//////////////////////////////////////////////////////////////////////////////
/* gallery image navigation */
//////////////////////////////////////////////////////////////////////////////
//transform functions for gallery navigation/////////////////////////////////
//these are based mainly on timings, which is wonky but was the only way i could think of to get it to work with translateX.

const slideOutLeft = function () {
  selectedImg.style.transitionDuration = `300ms`;
  selectedImg.style.transform = `translateX(-50vw)`;
  selectedImg.style.opacity = `0`;
};

const slideOutRight = function () {
  selectedImg.style.transitionDuration = `300ms`;
  selectedImg.style.transform = `translateX(50vw)`;
  selectedImg.style.opacity = `0`;
};

//for the slide in effect, just restoring the position had the card slide in from the direction. next slide = card moves out left, card moves in left as well. this was disorienting and felt bad. to fix this i used EVEN MORE timeout functions since i couldnt get transition origin to work for some reason. i make a 0 duration translation to the other side of the screen, then make a normal slow duration slide back to center. i made it on my own, and it works, but its easily broken and probably not how most people do it... lol

const slideInRight = function () {
  selectedImg.style.transitionDuration = `0ms`;
  //scoot img to other side of page for consistent effect
  selectedImg.style.transform = `translateX(50vw)`;

  //timed fn that can now pull img into place from expected position
  setTimeout(function () {
    selectedImg.style.transitionDuration = `300ms`;
    selectedImg.style.transform = `translateX(0)`;
    selectedImg.style.opacity = `1`;
  }, 300);
};

const slideInLeft = function () {
  selectedImg.style.transitionDuration = `0ms`;
  //scoot img to other side of page for consistent effect
  selectedImg.style.transform = `translateX(-50vw)`;

  //timed fn that can now pull img into place from expected position
  setTimeout(function () {
    selectedImg.style.transitionDuration = `300ms`;
    selectedImg.style.transform = `translateX(0)`;
    selectedImg.style.opacity = `1`;
  }, 300);
};

///////////////////////////////////////////////////////////

const prevImg = function () {
  slideOutRight();

  setTimeout(function () {
    //if on first image
    if (selectedIndex === 1) {
      selectedImg.srcset = `
      ../media/gallery_imgs_webp/gal_img_full(${HARDCODEIMAGEVALUE}).webp?w=4000 4000w,
      ../media/gallery_imgs_webp/2000/gal_img_2000(${HARDCODEIMAGEVALUE}).webp?w=2000 2000w,
      ../media/gallery_imgs_webp/1200/gal_img_1200(${HARDCODEIMAGEVALUE}).webp?w=1200 1200w,
      ../media/gallery_imgs_webp/800/gal_img_800(${HARDCODEIMAGEVALUE}).webp?w=800 800w,
      ../media/gallery_imgs_webp/400/gal_img_400(${HARDCODEIMAGEVALUE}).webp?w=400 400w,
      `;

      selectedImg.sizes =
        "(max-width: 500px) 400px, (max-width: 900px) 800px, (max-width: 1600px) 1200px, (max-width: 2500px) 2000px, 4000w";

      selectedImg.src = `../media/gallery_imgs_webp/gal_img_full(${HARDCODEIMAGEVALUE}).webp`;

      slideInLeft();
      selectedIndex = HARDCODEIMAGEVALUE;
      return;
    }

    selectedImg.srcset = `
    ../media/gallery_imgs_webp/gal_img_full(${
      selectedIndex - 1
    }).webp?w=4000 4000w,
    ../media/gallery_imgs_webp/2000/gal_img_2000(${
      selectedIndex - 1
    }).webp?w=2000 2000w,
    ../media/gallery_imgs_webp/1200/gal_img_1200(${
      selectedIndex - 1
    }).webp?w=1200 1200w,
    ../media/gallery_imgs_webp/800/gal_img_800(${
      selectedIndex - 1
    }).webp?w=800 800w,
    ../media/gallery_imgs_webp/400/gal_img_400(${
      selectedIndex - 1
    }).webp?w=400 400w,
    `;

    selectedImg.sizes =
      "(max-width: 500px) 400px, (max-width: 900px) 800px, (max-width: 1600px) 1200px, (max-width: 2500px) 2000px, 4000w";

    selectedImg.src = `../media/gallery_imgs_webp/gal_img_full(${
      selectedIndex - 1
    }).webp`;

    slideInLeft();
    selectedIndex--;
  }, 300);
};

const nextImg = function () {
  slideOutLeft();

  setTimeout(function () {
    //if on last image
    if (selectedIndex === HARDCODEIMAGEVALUE) {
      selectedImg.srcset = `
      ../media/gallery_imgs_webp/gal_img_full(1).webp?w=4000 4000w,
      ../media/gallery_imgs_webp/2000/gal_img_2000(1).webp?w=2000 2000w,
      ../media/gallery_imgs_webp/1200/gal_img_1200(1).webp?w=1200 1200w,
      ../media/gallery_imgs_webp/800/gal_img_800(1).webp?w=800 800w,
      ../media/gallery_imgs_webp/400/gal_img_400(1).webp?w=400 400w,
      `;

      selectedImg.sizes =
        "(max-width: 500px) 400px, (max-width: 900px) 800px, (max-width: 1600px) 1200px, (max-width: 2500px) 2000px, 4000w";

      selectedImg.src = `../media/gallery_imgs_webp/gal_img_full(1).webp`;

      slideInRight();
      selectedIndex = 1;
      return;
    }

    selectedImg.srcset = `
    ../media/gallery_imgs_webp/gal_img_full(${
      selectedIndex + 1
    }).webp?w=4000 4000w,
    ../media/gallery_imgs_webp/2000/gal_img_2000(${
      selectedIndex + 1
    }).webp?w=2000 2000w,
    ../media/gallery_imgs_webp/1200/gal_img_1200(${
      selectedIndex + 1
    }).webp?w=1200 1200w,
    ../media/gallery_imgs_webp/800/gal_img_800(${
      selectedIndex + 1
    }).webp?w=800 800w,
    ../media/gallery_imgs_webp/400/gal_img_400(${
      selectedIndex + 1
    }).webp?w=400 400w,
    `;

    selectedImg.sizes =
      "(max-width: 500px) 400px, (max-width: 900px) 800px, (max-width: 1600px) 1200px, (max-width: 2500px) 2000px, 4000w";

    selectedImg.src = `../media/gallery_imgs_webp/gal_img_full(${
      selectedIndex + 1
    }).webp`;

    slideInRight();
    selectedIndex++;
  }, 300);
};

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  const key = e.key;
  if (!key) return;
  if (key === "ArrowLeft") {
    prevImg();
    console.log(selectedImg.src);
  } else if (key === "ArrowRight") {
    nextImg();
    console.log(selectedImg.src);
  }
});

//////////////////////////////////////////////////////////////////////////////
/* mobile touch navigation */
//////////////////////////////////////////////////////////////////////////////

//the endtouch will need access to these
let startX;
let endX;

//start of swipe on image (mainly to get starting X value)
selectedImg.addEventListener("touchstart", function (e) {
  e.preventDefault();
  startX = e.touches[0].screenX;
});

//issuing callback functions at the end of the touch, its slow in devtools but works :o
selectedImg.addEventListener("touchend", function (e) {
  e.preventDefault();
  endX = e.changedTouches[0].screenX;

  let swipeLen = Math.abs(endX - startX);

  //arbitrary length value to prevent accidental swipes
  if (swipeLen >= 50) {
    if (startX < endX) prevImg();
    if (startX > endX) nextImg();
  }
});

//////////////////////////////////////////////////////////////////////////////
/* Int Obs API lazy loading seems to suck with grid*/
//let me be more clear, it sucks because it seems to want to load the first column of images before the first row of images
//////////////////////////////////////////////////////////////////////////////

// const lazyImgs = document.querySelectorAll("[data-src]");

// const imgLoader = function (entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;
//   console.log(entry.target);

//   entry.target.src = entry.target.dataset.src;
//   entry.target.classList.remove("gal_img_lazy");
//   entry.target.classList.add("gal_img");
//   observer.unobserve(entry.target);
// };

// const settingsObj = {
//   root: null,
//   threshold: 0,
//   rootMargin: "100%",
// };

// const imgObserver = new IntersectionObserver(imgLoader, settingsObj);

// lazyImgs.forEach((img) => imgObserver.observe(img));

//////////////////////////////////////////////////////////////////////////////
/* xxxx */
//////////////////////////////////////////////////////////////////////////////
