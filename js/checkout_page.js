const cartData = JSON.parse(localStorage.getItem("productList"));
const amountPrice = document.getElementById("amount_price");
const totalAmtPrice = document.getElementById("total_amt_price");
const chekoutEle = document.getElementById("checkout");

const renderCheckout = (data) => {
  for (let i = 0; i < data.length; i++) {
    chekoutEle.innerHTML += `

    <div class="checkout_product_card">
    <div class="checkout_product">
      <img src="${data[i].preview}" />
    </div>

    <div class="checkout_prod_details">
      <div class="checkout_prod_title">
        Product : ${data[i].name}
      </div>
      <div class="checkout_prod_brand">Brand : ${data[i].brand}</div>

      <div class="checkout_prod_qty">Quantity : ${data[i].quantity}</div>
      <div class="checkout_prod_price">Price : ${data[i].totalPrice}</div>
    </div>
  </div>
    `;
  }
};

if (cartData != undefined) {
  renderCheckout(cartData);
} else {
  chekoutEle.innerHTML += `<p class="no-order">No orders in your cart</p>`;
}

function totalPrice() {
  let Amount = 0;
  let totalAmount = 0;
  let gstAmount = 0;

  if (localStorage.getItem("productList") == undefined) {
    Amount = 0;
  } else {
    let productList = JSON.parse(localStorage.getItem("productList"));
    for (let i = 0; i < productList.length; i++) {
      Amount += Number(productList[i].totalPrice);
    }
  }
  gstAmount = (Amount * 6) / 100;
  totalAmount = Amount + gstAmount;
  amountPrice.innerHTML = Amount;
  totalAmtPrice.innerHTML = totalAmount.toFixed(2);
}

totalPrice();
