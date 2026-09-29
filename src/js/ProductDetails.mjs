import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { setupCommentSubmission } from "./comments.mjs"; // Import your comments module

function animateCartIcon() {
  const cart = document.querySelector(".cart");
  if (!cart) return;

  cart.classList.remove("cart--updated");
  void cart.offsetWidth;
  cart.classList.add("cart--updated");

  cart.addEventListener(
    "animationend",
    () => cart.classList.remove("cart--updated"),
    { once: true },
  );
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));

    // Initialize the comments section after the product details render
    setupCommentSubmission(this.productId);
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alertMessage("Product added to your cart.", false);
    animateCartIcon();
  }

  renderProductDetails() {
    const detailElement = document.querySelector(".product-detail");
    detailElement.innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>

      <picture>
        <source
          media="(min-width: 800px)"
          srcset="${this.product.Images.PrimaryLarge}"
        />
        <source
          media="(min-width: 500px)"
          srcset="${this.product.Images.PrimaryMedium}"
        />
        <img
          class="divider"
          src="${this.product.Images.PrimarySmall}"
          alt="${this.product.NameWithoutBrand}"
        />
      </picture>

      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>

      <button id="addToCart" data-id="${this.product.Id}">
        Add to Cart
      </button>

      <!-- Customer Comments Section injected dynamically so it doesn't get wiped out -->
      <section class="product-comments">
        <h3>Customer Comments</h3>
        <div id="comments-container"></div>

        <form id="comment-form">
          <h4>Leave a Comment</h4>
          <label for="userName">Name:</label>
          <input type="text" id="userName" required />

          <label for="userComment">Comment:</label>
          <textarea id="userComment" rows="3" required></textarea>

          <button type="submit" id="submitComment">Post Comment</button>
        </form>
      </section>
    `;
  }
}