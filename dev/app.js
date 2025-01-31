"use strict";

const image = document.querySelector("#image");
const range = document.querySelector("#range");
const filters = document.querySelector(".filters");
const extras = document.querySelector(".extra");
const filtersDir = document.querySelector(".filters__dir");
const imageUpload = document.querySelector("#file-upload");
const filterName = document.querySelector("#filter__info--name");
const filterValue = document.querySelector("#filter__info--value");

filters.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target === filters) return;
  filters.querySelectorAll("button").forEach((filter) => {
    filter.classList.remove("filters__active");
  });

  e.target.classList.add("filters__active");
  filterName.textContent = e.target.textContent;
  range.setAttribute("max", e.target.dataset.max);
});

imageUpload.addEventListener("change", function (e) {
  image.src = URL.createObjectURL(e.target.files[0]);
  image.setAttribute("draggable", "true");
});

range.addEventListener("change", function (e) {
  filterValue.textContent = `${Math.trunc(range.value * 100)}%`;

  if (filterName.textContent === "Grayscale") {
    image.style.filter = `grayscale(${filterValue.textContent})`;
  }
  if (filterName.textContent === "Inversion") {
    image.style.filter = `invert(${filterValue.textContent})`;
  }
  if (filterName.textContent === "Brightness") {
    image.style.filter = `brightness(${filterValue.textContent})`;
  }
  if (filterName.textContent === "Saturation") {
    image.style.filter = `saturate(${filterValue.textContent})`;
  }
});

filtersDir.addEventListener("click", function (e) {
  if (e.target === filtersDir) return;
  if (e.target.closest(".box").classList.contains("up")) {
    image.style.transform = `rotate(0deg)`;
  }
  if (e.target.closest(".box").classList.contains("down")) {
    image.style.transform = `rotate(180deg)`;
  }
  if (e.target.closest(".box").classList.contains("left-a")) {
    image.style.transform = `rotate(-90deg)`;
  }
  if (e.target.closest(".box").classList.contains("right-a")) {
    image.style.transform = `rotate(90deg)`;
  }
});

extras.addEventListener("click", function (e) {
  if (e.target === extras) return;

  if (e.target.classList.contains("save-img")) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.querySelector("#image");

    // Set canvas size to match image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Apply current filters to canvas
    ctx.filter = img.style.filter;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Create download link
    const link = document.createElement("a");
    link.download = "filtered-image.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  if (e.target.classList.contains("reset")) {
    image.src = "../img/default.png";
    image.style.filter = 'none';
    image.style.transform = 'rotate(0deg)'
  }
});
