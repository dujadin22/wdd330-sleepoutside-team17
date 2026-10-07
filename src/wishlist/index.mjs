import { loadHeaderFooter, getLocalStorage, setLocalStorage, alertMessage } from "../js/utils.mjs";

loadHeaderFooter();

function renderWishlist() {
  const container = document.getElementById("wishlist-container");
  if (!container) return;

  const wishlistItems = getLocalStorage("wishlist") || [];

  if (wishlistItems.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; background: #f9f9f9; border-radius: 8px; border: 1px solid #ddd; margin-top: 20px;">
        <h3>Your wish list is empty.</h3>
        <p style="color: #666; margin-bottom: 20px;">Save items you love here while shopping!</p>
        <a href="../index.html" style="background-color: #525b0f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Continue Shopping</a>
      </div>
    `;
    return;
  }

  container.innerHTML = wishlistItems.map((item, index) => `
    <div class="wishlist-card" style="display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1px solid #ddd; padding: 15px; margin-bottom: 1rem; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <div style="display: flex; align-items: center; gap: 15px;">
        <img src="${item.Images.PrimarySmall}" alt="${item.NameWithoutBrand}" style="width: 80px; height: 80px; object-fit: contain; border: 1px solid #eee; border-radius: 4px;" />
        <div>
          <h3 style="margin: 0 0 5px 0; font-size: 1rem; color: #333;">${item.Brand.Name}</h3>
          <p style="margin: 0 0 5px 0; color: #666; font-size: 0.9rem;">${item.NameWithoutBrand}</p>
          <p style="margin: 0; font-weight: bold; color: #525b0f;">$${item.FinalPrice}</p>
        </div>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="moveToCart-btn" data-index="${index}" style="background-color: #525b0f; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">Add to Cart</button>
        <button class="removeItem-btn" data-index="${index}" style="background-color: #a94442; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">Remove</button>
      </div>
    </div>
  `).join("");

  attachEventListeners(wishlistItems);
}

function animateCartIcon() {
  const cart = document.querySelector(".cart");
  if (!cart) return;

  cart.classList.remove("cart--updated");
  void cart.offsetWidth; // Forces reflow to restart animation
  cart.classList.add("cart--updated");

  cart.addEventListener(
    "animationend",
    () => cart.classList.remove("cart--updated"),
    { once: true },
  );
}

function attachEventListeners(wishlistItems) {
  // Handle removing items from wishlist
  document.querySelectorAll(".removeItem-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.getAttribute("data-index");
      wishlistItems.splice(index, 1);
      setLocalStorage("wishlist", wishlistItems);
      renderWishlist();
      alertMessage("Item removed from your wish list.", false);
    });
  });

  // Handle moving items to cart and triggering the cart animation
  document.querySelectorAll(".moveToCart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.getAttribute("data-index");
      const itemToMove = wishlistItems[index];

      const cartItems = getLocalStorage("so-cart") || [];
      cartItems.push(itemToMove);
      setLocalStorage("so-cart", cartItems);

      alertMessage("Product added to your cart!", false);
      
      // Trigger the glowing cart animation in the header!
      animateCartIcon();
    });
  });
}

renderWishlist();