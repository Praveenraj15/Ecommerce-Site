let productId = window.location.search.split("=")[1];
const productDetails = document.getElementById("productDetails");
const productImg = document.getElementById("productImg");

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
    if (i == 0) {
      previewHtml += `<img class="product_small_preview active_image" src="${preview[i]}" data-id="${preview[i]}" />`;
    } else {
      previewHtml += `<img class="product_small_preview" src="${preview[i]}" data-id="${preview[i]}" />`;
    }
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
        <div class="p_product_preview_thumb">${previewHtml}</div>
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
  updateProductthumbnail();
};

const updateProductthumbnail = () => {
  const productImage = document.getElementById("product_main_img");
  const thumb_div = document.getElementsByClassName(" product_small_preview");
  for (let i = 0; i < thumb_div.length; i++) {
    thumb_div[i].addEventListener("click", function (e) {
      console.log("test");
      productImage.src = e.target.dataset.id;
      const current = document.getElementsByClassName("active_image");
      if (current.length > 0) {
        current[0].className = current[0].className.replace("active_image", "");
      }
      this.className = "active_image";
    });
  }
};
