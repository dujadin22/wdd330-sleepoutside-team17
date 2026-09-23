import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const imageSource =
    item.Images?.PrimarySmall ||
    item.Images?.PrimaryMedium ||
    item.Image ||
    "";

  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${imageSource}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <span class="cart-remove" data-id="${item.Id}">❌</span>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(
    key,
    listElement,
    footerElement,
    totalElement,
    clearButton,
  ) {
    this.key = key;
    this.listElement = listElement;
    this.footerElement = footerElement;
    this.totalElement = totalElement;
    this.clearButton = clearButton;
  }

  init() {
    const cartItems = getLocalStorage(this.key) || [];

    this.clearButton?.addEventListener("click", () => {
      this.clearCart();
    });

    // Listen for clicks on individual item remove buttons
    this.listElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("cart-remove")) {
        const productId = e.target.dataset.id;
        this.removeItem(productId);
      }
    });

    this.renderCart(cartItems);
  }

  clearCart() {
    localStorage.removeItem(this.key);
    this.renderCart([]);
  }

  removeItem(id) {
    let cartItems = getLocalStorage(this.key) || [];
    // Filter out the item matching the clicked ID
    cartItems = cartItems.filter((item) => item.Id !== id);
    setLocalStorage(this.key, cartItems);
    this.renderCart(cartItems);
  }

  renderCart(cartItems) {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      cartItems,
      "afterbegin",
      true,
    );

    if (cartItems.length === 0) {
      this.footerElement.classList.add("hide");

      this.listElement.innerHTML = `
        <li class="empty-cart" role="status">
          <h3>Your cart is empty.</h3>
          <p>Add a product before continuing to checkout.</p>
          <a class="empty-cart__link" href="${import.meta.env.BASE_URL}">
            Continue Shopping
          </a>
        </li>
      `;

      return;
    }

    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.FinalPrice),
      0,
    );

    this.totalElement.textContent = `Total: $${total.toFixed(2)}`;
    this.footerElement.classList.remove("hide");
  }
}