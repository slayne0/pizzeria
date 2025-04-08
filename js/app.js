async function pizza() {
  const res = await fetch("/data.json");
  const data = await res.json();
  console.log(data);
  return data;
}

async function main() {
  const data = await pizza();
  console.log(data[0]);

  const pizzaWrapper = document.querySelector(".pizzas-wrapper");
  let result = 0;

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

    pizzaWrapper.appendChild(pizzaItem);
    pizzaItem.appendChild(img);
    pizzaItem.appendChild($addToCartButton);
    $addToCartButton.appendChild(img1);
    pizzaItem.appendChild(pizzaInfo);
    pizzaInfo.appendChild(pizzaName);
    pizzaInfo.appendChild(pizzaPrice);

    $addToCartButton.innerHTML += "Add to card";

    $addToCartButton.addEventListener("click", function () {
      $addToCartButton.classList.add("nomber-pizza");

      const $addToCartButtonclick = document.createElement("div");

      pizzaWrapper.appendChild($addToCartButtonclick);

      $addToCartButtonclick.innerHTML = `
        <img class="moins-gauche" src="/images/moins-icon.png" />
            <span class="quantity" id="${i}">  </span>
        <img class="plus-droite" src="/images/plus-icon.png" />
      `;
    });
  }

  const gauche = document.querySelector(".moins-gauche");
  const droite = document.querySelector(".plus-droite");
  const quantity = $addToCartButton.querySelector(".quantity");

  const test = quantity.id;
  console.log("saucisson");
  droite.addEventListener("click", function () {
    console.log("hhdcdkk,,ns");
    result += 1;
    document.getElementById(i).textContent = "jhsudbqu";
    console.log(document.getElementById(i));
  });
}

main();
