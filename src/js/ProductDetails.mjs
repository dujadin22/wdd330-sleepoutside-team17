import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { setupCommentSubmission } from "./comments.mjs";

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
    this.selectedColor = null;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    
    if (this.product.Colors && this.product.Colors.length > 0) {
      this.selectedColor = this.product.Colors[0].ColorName;
    }

    this.renderProductDetails();

    if (this.product.Colors && this.product.Colors.length > 1) {
      const colorOptions = document.querySelectorAll(".color-swatch-option");
      colorOptions.forEach((option) => {
        option.addEventListener("click", () => {
          colorOptions.forEach((opt) => opt.style.borderColor = "#ccc");
          option.style.borderColor = "#525b0f";
          this.selectedColor = option.dataset.colorName;
          
          const colorNameSpan = document.querySelector(".selected-color-name");
          if (colorNameSpan) {
            colorNameSpan.textContent = this.selectedColor;
          }
        });
      });
    }

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));

    document
      .getElementById("addToWishlist")
      .addEventListener("click", this.addProductToWishlist.bind(this));

    setupCommentSubmission(this.productId);
  }

  addProductToCart() {
    const token = getLocalStorage("so-token");
    if (!token) {
      alertMessage("Please log in or register to add items to your cart.", true);
      setTimeout(() => {
        window.location.href = "../login/index.html";
      }, 1500);
      return;
    }

    const cartItems = getLocalStorage("so-cart") || [];
    
    const productWithColor = {
      ...this.product,
      selectedColor: this.selectedColor || (this.product.Colors ? this.product.Colors[0].ColorName : "Default")
    };

    cartItems.push(productWithColor);
    setLocalStorage("so-cart", cartItems);
    alertMessage("Product added to your cart.", false);
    animateCartIcon();
  }

  addProductToWishlist() {
    const wishlistItems = getLocalStorage("wishlist") || []; 
    const exists = wishlistItems.some((item) => item.Id === this.product.Id);
    
    if (!exists) {
      wishlistItems.push(this.product);
      setLocalStorage("wishlist", wishlistItems); 
      alertMessage("Product added to your wish list! ❤️", false);
    } else {
      alertMessage("This item is already in your wish list.", true);
    }
  }

  renderProductDetails() {
    const detailElement = document.querySelector(".product-detail");

    let colorsHtml = "";
    if (this.product.Colors && this.product.Colors.length > 0) {
      if (this.product.Colors.length > 1) {
        const swatchesHTML = this.product.Colors.map((color, index) => {
          const borderColor = index === 0 ? "#525b0f" : "#ccc";
          const swatchImg = color.ColorImage || this.product.Images.PrimarySmall;
          return `<div class="color-swatch-option" data-color-name="${color.ColorName}" style="cursor: pointer; border: 2px solid ${borderColor}; border-radius: 4px; padding: 3px; display: inline-block;" title="${color.ColorName}"><img src="${swatchImg}" alt="${color.ColorName}" style="width: 35px; height: 35px; object-fit: cover; border-radius: 2px; display: block;" /></div>`;
        }).join("");

        colorsHtml = `
          <div class="product-colors-selection" style="margin: 15px 0;">
            <p style="font-weight: 600; margin-bottom: 8px;">Color: <span class="selected-color-name" style="font-weight: normal;">${this.selectedColor}</span></p>
            <div style="display: flex; gap: 10px;">
              ${swatchesHTML}
            </div>
          </div>
        `;
      } else {
        colorsHtml = `<p class="product__color">Color: ${this.product.Colors[0].ColorName}</p>`;
      }
    }

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
      ${colorsHtml}
      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>

      <button id="addToCart" data-id="${this.product.Id}">
        Add to Cart
      </button>

      <button id="addToWishlist" style="background-color: #333; margin-top: 10px;" data-id="${this.product.Id}">
        Add to Wish List ❤️
      </button>

      <section class="product-comments" style="margin-top: 30px;">
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