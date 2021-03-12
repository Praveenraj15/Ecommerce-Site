const orderApiEndpoint = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const order = document.getElementById("placeOrderBtn");
let orderdProduct = [];
const url = "https://604721529e5ab30017394272.mockapi.io/order/placeorder";
const productData = JSON.parse(localStorage.getItem("productList"));

order.addEventListener("click", (e) => {
  e.preventDefault();
  for (let i = 0; i < productData.length; i++) {
    const product = {
      product_id: productData[i].id,
      product_name: productData[i].name,
      product_quantity: productData[i].quantity,
    };
    orderdProduct.push(product);
  }

  const orderdata = {
    products: orderdProduct,
  };

  orderApiEndpoint(url, orderdata)
    .then((data) => {
      localStorage.clear();
      location.assign("./thankyou.html");
    })
    .catch((err) => console.log(err));
});
