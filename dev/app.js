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
});

extras.addEventListener("click", function (e) {
  if (e.target === extras) return;
});

imageUpload.addEventListener("change", function (e) {
  image.src = URL.createObjectURL(e.target.files[0]);
  image.setAttribute("draggable", "true");
});

range.addEventListener("change", function (e) {
  filterValue.textContent = `${Math.trunc(range.value * 100)}%`;

  if (filterName.textContent === "Grayscale"){
    image.style.filter = `grayscale(${filterValue.textContent})`
  }
  if (filterName.textContent === "Inversion"){
    image.style.filter = `invert(${filterValue.textContent})`
  }
  if (filterName.textContent === "Brightness"){
    image.style.filter = `brightness(${filterValue.textContent})`
  }
  if (filterName.textContent === "Saturation"){
    image.style.filter = `saturate(${filterValue.textContent})`
  }
  
});
