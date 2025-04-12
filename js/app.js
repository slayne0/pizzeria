async function pizza() {
  const res = await fetch("/data.json");
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
    pizzaName.classList.add("pizza-item");
    pizzaName.textContent = data[i].name;

    const pizzaPrice = document.createElement("li");
    pizzaPrice.classList.add("pizza-price");
    pizzaPrice.textContent = data[i].price;

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

    $addToCartButton.addEventListener("click", function () {
      result += 1;
      document.getElementById(i).textContent++;
      $addToCartButton.classList.add("hidden");
      $addToCartButtonclick.classList.remove("hidden");
      pizzaItem.classList.add("actif");
      $comande[0].classList.add("hidden");
      $comande[1].classList.remove("hidden");
      createBasket()
    });
  }

  const gauche = document.querySelectorAll(".moins-gauche");
  const droite = document.querySelectorAll(".plus-droite");
  const quantity = document.querySelector(".quantity");
  const $addToCartButton = document.querySelectorAll(".add-to-cart-btn");
  const $addToCartButtonclick = document.querySelectorAll(".nomber-pizza");
  const $comande = document.querySelectorAll("aside");

  for (let i = 0; i < data.length; i++) {
    droite[i].addEventListener("click", function () {
      document.getElementById(i).textContent++;
      createBasket()
    });

    gauche[i].addEventListener("click", function () {
      document.getElementById(i).textContent--;
      if (document.getElementById(i).textContent < 1) {
        result -= 1;
        $addToCartButton[i].classList.remove("hidden");
        $addToCartButtonclick[i].classList.add("hidden");
        pizzaItem.classList.remove("actif");
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
  const actif = document.querySelectorAll(".actif")

  $basketProduct.innerHTML = ""
  for (let i = 0; i < result; i++) {
    console.log(document.querySelectorAll(".pizza-info")[i])

    console.log(actif[i])

    const $basketProductItem = document.createElement("li");
    $basketProductItem.classList.add("basket-product-item");

    const $basketProductItemName = document.createElement("span");
    $basketProductItemName.classList.add("basket-product-item-name");

    const $basketProductDetail = document.createElement("span");
    $basketProductDetail.classList.add("basket-product-details");

    const $basketProductDetailQuantity = document.createElement("span");
    $basketProductDetailQuantity.classList.add(
      "basket-product-details-quantity"
    );

    const $basketProductDetailUnitPrice = document.createElement("span");
    $basketProductDetailUnitPrice.classList.add(
      "basket-product-details-unit-price"
    );

    const $basketProductDetailTotalPrice = document.createElement("span");
    $basketProductDetailTotalPrice.classList.add(
      "basket-product-details-total-price"
    );

    const $basketProductRemoveIcon = document.createElement("img");
    $basketProductRemoveIcon.classList.add("basket-product-remove-icon");

    $basketProduct.appendChild($basketProductItem);
    $basketProductItem.appendChild($basketProductItemName);
    $basketProductItem.appendChild($basketProductDetail);
    $basketProductDetail.appendChild($basketProductDetailQuantity);
    $basketProductDetail.appendChild($basketProductDetailUnitPrice);
    $basketProductDetail.appendChild($basketProductDetailTotalPrice);
    $basketProductItem.appendChild($basketProductRemoveIcon);


  }
}



main();
