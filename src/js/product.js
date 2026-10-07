import { alertMessage, getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import { addToWishlist } from "./wishlist.mjs";
import ExternalServices from "./ExternalServices.mjs";

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
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    
    // Safely attach event listeners for the buttons
    const cartButton = document.getElementById("addToCart");
    if (cartButton) {
      cartButton.addEventListener("click", this.addProductToCart.bind(this));
    }

    const wishlistButton = document.getElementById("addToWishlist");
    if (wishlistButton) {
      wishlistButton.addEventListener("click", this.addProductToWishlist.bind(this));
    }

    // Initialize the comments section for this specific product
    this.initComments();
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alertMessage("Product added to your cart.", false);
    animateCartIcon();
  }

  addProductToWishlist() {
    addToWishlist(this.product);
    alertMessage("Product added to your Wish List!", false);
  }

  renderProductDetails() {
    const detailElement = document.querySelector(".product-detail");
    if (!detailElement) return;

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

      <div class="product-detail__add" style="display: flex; gap: 10px; margin: 20px 0;">
        <button id="addToCart" data-id="${this.product.Id}" style="flex: 1; padding: 12px; background-color: #525b0f; color: white; border: none; font-size: 1.1rem; cursor: pointer; border-radius: 4px;">
          Add to Cart
        </button>
        <button id="addToWishlist" class="wishlist-btn" style="flex: 1; padding: 12px; background-color: #333; color: white; border: none; font-size: 1.1rem; cursor: pointer; border-radius: 4px;">
          ❤️ Add to Wish List
        </button>
      </div>

      <!-- Customer Comments Section -->
      <section class="product-comments" style="margin-top: 40px; border-top: 2px solid #ffa500; padding-top: 20px;">
        <h3>Customer Comments</h3>
        <div id="comments-container" style="margin-bottom: 20px;"></div>

        <form id="comment-form" style="background: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
          <h4 style="margin-top: 0;">Leave a Comment</h4>
          <div style="margin-bottom: 15px;">
            <label for="userName" style="display: block; margin-bottom: 5px; font-weight: bold;">Name:</label>
            <input type="text" id="userName" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
          </div>

          <div style="margin-bottom: 15px;">
            <label for="userComment" style="display: block; margin-bottom: 5px; font-weight: bold;">Comment:</label>
            <textarea id="userComment" rows="3" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
          </div>

          <button type="submit" id="submitComment" style="background-color: #525b0f; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">Post Comment</button>
        </form>
      </section>
    `;
  }

  // --- Comment Methods ---

  initComments() {
    this.renderComments();
    
    const form = document.querySelector("#comment-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.querySelector("#userName").value.trim();
        const text = document.querySelector("#userComment").value.trim();
        const date = new Date().toLocaleDateString();

        const newComment = { name, text, date };
        const comments = JSON.parse(localStorage.getItem(`comments_${this.productId}`)) || [];
        
        comments.push(newComment);
        localStorage.setItem(`comments_${this.productId}`, JSON.stringify(comments));

        form.reset();
        this.renderComments();
      });
    }
  }

  renderComments() {
    const container = document.querySelector("#comments-container");
    if (!container) return;

    const comments = JSON.parse(localStorage.getItem(`comments_${this.productId}`)) || [];

    if (comments.length === 0) {
      container.innerHTML = "<p>No comments yet. Be the first to leave one!</p>";
      return;
    }

    container.innerHTML = comments.map(c => `
      <div class="comment-card" style="border-bottom: 1px solid #ddd; margin-bottom: 1rem; padding-bottom: 0.5rem;">
        <p><strong>${c.name}</strong> <small>(${c.date})</small></p>
        <p>${c.text}</p>
      </div>
    `).join("");
  }
}

// --- AUTO-INITIALIZATION RUNNER ---
const productId = getParam("product");
const dataSource = new ExternalServices();
const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();