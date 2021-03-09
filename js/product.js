let productId = window.location.search.split("=")[1];
const productDetails = document.getElementById("productDetails");
const productImg = document.getElementById("productImg");
const productMainImg = document.getElementById("product_main_img");
const productPreview = document.querySelectorAll(".product_small_preview");

fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId)
  .then((response) => response.json())
  .then((data) => {
    productDisplay(data);
  })
  .catch((err) => console.log(err));

const productDisplay = (data) => {
  let preview = data.photos;
  let previewHtml = "";

  for (let i = 0; i < preview.length; i++) {
    previewHtml += `<li><img class="product_small_preview active_image" src="${preview[i]}" /></li>`;
  }

  let productImgSrc = `<img id="product_main_img" src="${data.preview}" />`;

  let productDetailsHolder = `<div class="p_product_title">${data.name}</div>
      <div class="p_product_brand">${data.brand}</div>
      <div class="p_product_price">Price: <span>Rs ${data.price}</span></div>
      <div class="p_product_description">
        <div class="p_product_desc_title">Description</div>
        <div class="p_product_desc">${data.description}</div>
      </div>
      <div class="p_product_preview">
        <div class="p_product_preview_title">Product Preview</div>
        <ul class="p_product_preview_thumb">${previewHtml}</ul>
      </div>
      <div class=" product_cart_buttons">
            <div class="product_add_to_cart">
              <p>
                <ion-icon name="bag-outline"></ion-icon><button id="add_to_cart" data-id="${data.id}" data-name="${data.name}" data-brand="${data.brand}" data-price="${data.price}" data-preview="${data.preview}">Add to cart</button>
              </p>
            </div>
      </div>`;
  productImg.innerHTML = productImgSrc;
  productDetails.innerHTML = productDetailsHolder;
};

// for (let i = 0; i < productPreview.length; i++) {
//   productPreview[i].addEventListener("click", function (e) {
//     console.log(e);
//   });
//   console.log("clicked");
// }

// function changeImg() {
//   var attribute = this.getAttribute("src");
//   console.log(attribute);
// }

productPreview.forEach((el) =>
  el.addEventListener("click", (event) => {
    console.log(event.target.getAttribute("src"));
  })
);
