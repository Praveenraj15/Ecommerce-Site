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
                           <img src="${data.preview}" />
                        </div>
                <div class="product_meta">
                    <span>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                    </span>
                    <h3 class="product_title">${data.name}</h3>
                    <p class="product_cat">${data.brand}</p>
                    <p class="price">Rs ${data.price}</p>
                    <button id="add_to_cart" data-id="${data.id}" data-name="${data.name}" data-brand="${data.brand}" data-price="${data.price}" data-preview="${data.preview}">Add to cart</button>
                </div>
            </div> 
  `;

  return productList;
};


// add to cart

document.body.addEventListener("click", function (e) {
  if (e.target.id == "add_to_cart") {
    let data = e.target.dataset;
    addToCrat(data);
  }
});

const cartCount = document.getElementById("cart_count");
const cartPopup = document.getElementsByClassName("added_popup");

const addToCrat = (data) => {
  let productDetails = [];
  let totalCount = 0;

  if (localStorage.getItem("productList") == undefined) {
    data.quantity = 1;
    data.totalPrice = data.quantity * data.price;
    productDetails.push(JSON.parse(JSON.stringify(data)));
    localStorage.setItem("productList", JSON.stringify(productDetails));
    totalCount = 1;
  } else {
    productDetails = JSON.parse(localStorage.getItem("productList"));
    let foundAtPos = -1;

    for (let i = 0; i < productDetails.length; i++) {
      totalCount += Number(productDetails[i].quantity);
      if (productDetails[i].id === data.id) {
        foundAtPos = i;
      }
    }

    if (foundAtPos > -1) {
      productDetails[foundAtPos].quantity = (
        Number(productDetails[foundAtPos].quantity) + 1
      ).toString();
      productDetails[foundAtPos].totalPrice = (
        productDetails[foundAtPos].quantity * productDetails[foundAtPos].price
      ).toString();
      localStorage.setItem("productList", JSON.stringify(productDetails));
      totalCount++;
    } else {
      data.quantity = 1;
      data.totalPrice = data.quantity * data.price;
      productDetails.push(JSON.parse(JSON.stringify(data)));
      localStorage.setItem("productList", JSON.stringify(productDetails));
      totalCount++;
    }
  }

  cartCount.innerHTML = totalCount;

  cartPopup[0].classList.add("show");

  setTimeout(function () {
    cartPopup[0].classList.remove("show");
  }, 2000);
};

function countProduct() {
  let totalCount = 0;
  if (localStorage.getItem("productList") == undefined) {
    totalCount = 0;
  } else {
    let productList = JSON.parse(localStorage.getItem("productList"));
    for (let i = 0; i < productList.length; i++) {
      totalCount += Number(productList[i].quantity);
    }
  }
  cartCount.innerHTML = totalCount;
  console.log(totalCount);
}

countProduct();
