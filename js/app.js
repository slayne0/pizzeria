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

  for (let i = 0; i < data.length; i++) {
    const pizzaItem = document.createElement("div");
    pizzaItem.classList.add("pizza-item");

    const img = document.createElement("img");
    img.classList.add("pizza-picture");
    img.src = data[i].image;

    const ATCB = document.createElement("span");
    ATCB.classList.add("add-to-cart-btn");

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
    pizzaItem.appendChild(ATCB);
    ATCB.appendChild(img1);
    pizzaItem.appendChild(pizzaInfo);
    pizzaInfo.appendChild(pizzaName);
    pizzaInfo.appendChild(pizzaPrice);

    ATCB.innerHTML += "Add to card";
  }
}

main();
