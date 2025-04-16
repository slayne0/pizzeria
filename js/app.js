async function pizza() {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
}

let result = 0;
async function main() {
  const data = await pizza();

  const pizzaWrapper = document.querySelector(".pizzas-wrapper");

  for (let i = 0; i < data.length; i++) {
    const pizzaItem = document.createElement("div");
    pizzaItem.classList.add("pizza-item");

    const img = document.createElement("img");
    img.classList.add("pizza-picture");
    img.src = data[i].image;

    const $addToCartButton = document.createElement("span");
    $addToCartButton.classList.add("add-to-cart-btn");

    const img1 = document.createElement("img");
    img1.src = "../images/carbon_shopping-cart-plus.svg";

    const pizzaInfo = document.createElement("ul");
    pizzaInfo.classList.add("pizza-info");

    const pizzaName = document.createElement("li");
    pizzaName.classList.add("pizza-name");
    pizzaName.textContent = data[i].name;

    const pizzaPrice = document.createElement("li");
    pizzaPrice.classList.add("pizza-price");
    pizzaPrice.textContent = "$" + data[i].price;

    const $addToCartButtonclick = document.createElement("div");
    $addToCartButtonclick.classList.add("nomber-pizza", "hidden");

    $addToCartButtonclick.innerHTML = `
    <img class="moins-gauche" src="/images/moins-icon.png" />
        <span class="quantity" id="${i}"></span>
    <img class="plus-droite" src="/images/plus-icon.png" />
  `;

    pizzaWrapper.appendChild(pizzaItem);
    pizzaItem.appendChild(img);
    pizzaItem.appendChild($addToCartButton);
    pizzaItem.appendChild($addToCartButtonclick);
    $addToCartButton.appendChild(img1);
    pizzaItem.appendChild(pizzaInfo);
    pizzaInfo.appendChild(pizzaName);
    pizzaInfo.appendChild(pizzaPrice);

    $addToCartButton.innerHTML += "Add to card";

    const $comande = document.querySelectorAll("aside");
    const quantity = document.querySelectorAll(".quantity");

    $addToCartButton.addEventListener("click", function () {
      result += 1;
      document.getElementById(i).textContent++;
      $addToCartButton.classList.add("hidden", "actif4");
      $addToCartButtonclick.classList.remove("hidden");
      $addToCartButtonclick.classList.add("actif5");
      pizzaName.classList.add("actif1");
      pizzaPrice.classList.add("actif2")
      quantity[i].classList.add("actif3")
      
      $comande[0].classList.add("hidden");
      $comande[1].classList.remove("hidden");
      createBasket()
    });
  

  const gauche = document.querySelectorAll(".moins-gauche");
  const droite = document.querySelectorAll(".plus-droite");

    droite[i].addEventListener("click", function () {
      document.getElementById(i).textContent++;
      createBasket()
    });

    gauche[i].addEventListener("click", function () {
      document.getElementById(i).textContent--;
      createBasket()
      if (document.getElementById(i).textContent < 1) {
        result -= 1;
        $addToCartButton.classList.remove("hidden", "actif4");
        $addToCartButtonclick.classList.add("hidden");
        $addToCartButtonclick.classList.remove("actif5");
        pizzaName.classList.remove("actif1");
        pizzaPrice.classList.remove("actif2")
        quantity[i].classList.remove("actif3")
        createBasket()
        if (result < 1) {
          $comande[0].classList.remove("hidden");
          $comande[1].classList.add("hidden");
        }
      }
    });

  }
  



 


}

function createBasket () {
  const $basketProduct = document.querySelector(".basket-products");
  const totalPrice = document.querySelector(".total-order-price")
  const actif1 = document.querySelectorAll(".actif1")
  const actif2 = document.querySelectorAll(".actif2")
  const actif3 = document.querySelectorAll(".actif3")
  const actif4 = document.querySelectorAll(".actif4")
  const actif5 = document.querySelectorAll(".actif5")
  let total = 0

  totalPrice.textContent = parseInt(0)

  $basketProduct.innerHTML = ""
  for (let i = 0; i < result; i++) {


    const $basketProductItem = document.createElement("li");
    $basketProductItem.classList.add("basket-product-item");

    const $basketProductItemName = document.createElement("span");
    $basketProductItemName.classList.add("basket-product-item-name");
    $basketProductItemName.textContent = actif1[i].textContent

    const $basketProductDetail = document.createElement("span");
    $basketProductDetail.classList.add("basket-product-details");

    const $basketProductDetailQuantity = document.createElement("span");
    $basketProductDetailQuantity.classList.add(
      "basket-product-details-quantity"
    );
    $basketProductDetailQuantity.textContent = actif3[i].textContent + "×"

    const $basketProductDetailUnitPrice = document.createElement("span");
    $basketProductDetailUnitPrice.classList.add(
      "basket-product-details-unit-price"
    );
    $basketProductDetailUnitPrice.textContent = actif2[i].textContent

    const $basketProductDetailTotalPrice = document.createElement("span");
    $basketProductDetailTotalPrice.classList.add(
      "basket-product-details-total-price"
    );
    $basketProductDetailTotalPrice.textContent = parseInt(actif2[i].textContent.replace("$", "")) * actif3[i].textContent

    const $basketProductRemoveIcon = document.createElement("img");
    $basketProductRemoveIcon.classList.add("basket-product-remove-icon");
    $basketProductRemoveIcon.src = "../images/remove-icon.svg"

    $basketProduct.appendChild($basketProductItem);
    $basketProductItem.appendChild($basketProductItemName);
    $basketProductItem.appendChild($basketProductDetail);
    $basketProductDetail.appendChild($basketProductDetailQuantity);
    $basketProductDetail.appendChild($basketProductDetailUnitPrice);
    $basketProductDetail.appendChild($basketProductDetailTotalPrice);
    $basketProductItem.appendChild($basketProductRemoveIcon);
 
    total += parseInt(actif2[i].textContent.replace("$", "")) * actif3[i].textContent

  const test = document.querySelectorAll(".basket-product-remove-icon")


    $basketProductRemoveIcon.addEventListener("click", function() {
      actif4[i].classList.remove("hidden");
      actif5[i].classList.add("hidden");
      actif1[i].classList.remove("actif1");
      actif2[i].classList.remove("actif2")
      actif3[i].classList.remove("actif3")
      actif3[i].textContent = 0
      result -= 1
      createBasket()
    })


  }

  totalPrice.textContent = "$" + total
}



main();
