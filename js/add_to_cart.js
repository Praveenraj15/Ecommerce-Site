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

let totalAmmount = 0;

function countProduct() {
  let totalCount = 0;
  if (localStorage.getItem("productList") == undefined) {
    totalCount = 0;
    totalAmmount = 0;
  } else {
    let productList = JSON.parse(localStorage.getItem("productList"));
    for (let i = 0; i < productList.length; i++) {
      totalCount += Number(productList[i].quantity);
      totalAmmount += Number(productList[i].totalPrice);
    }
  }
  cartCount.innerHTML = totalCount;
}

countProduct();
