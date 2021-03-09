// slider function

let slideIndex = 0;
let slides = document.getElementsByClassName("slider_wrapper");
let dot = document.getElementsByClassName("dot");
const showSlider = (n) => {
  if (n > slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dot[i].className = dot[i].className.replace(" active", "");
  }

  slides[n].style.display = "block";
  dot[n].className += " active";
};

// setInterval(function () {
//   showSlider(slideIndex);
// }, 2000);

showSlider(slideIndex);

for (let i of dot) {
  i.addEventListener("click", function (e) {
    let sliderIndex = e.target.dataset.id;
    showSlider(sliderIndex);
  });
}

//fetch product

const url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";
const clothing = document.getElementById("clothing_section");
const accessory = document.getElementById("accessories_section");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].isAccessory != false) {
        accessory.innerHTML += homeProduct(data[i]);
      } else {
        clothing.innerHTML += homeProduct(data[i]);
      }
    }
  })
  .catch((err) => console.log(err));

const homeProduct = (data) => {
  let productList = `<div class="col-1-of-5">
                       <div class="product_image">
                        <a href="./product.html?id=${data.id}">
                           <img src="${data.preview}" />
                        </a>   
                        </div>
                <div class="product_meta">
                    <span>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                    </span>
                    <h3 class="product_title"><a href="./product.html?id=${data.id}">${data.name}</a></h3>
                    <p class="product_cat">${data.brand}</p>
                    <p class="price">Rs ${data.price}</p>
                    <button id="add_to_cart" data-id="${data.id}" data-name="${data.name}" data-brand="${data.brand}" data-price="${data.price}" data-preview="${data.preview}">Add to cart</button>
                </div>
            </div> 
  `;

  return productList;
};
