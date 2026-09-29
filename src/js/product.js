export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // Use our datasource to get the details for the current product
    this.product = await this.dataSource.findProductById(this.productId);
    // Render the product details to the HTML
    this.renderProductDetails();
    
    // Once rendered, attach the event listener for the Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));

    // Initialize the comments section for this specific product
    this.initComments();
  }

  addToCart() {
    // Your existing add to cart logic...
  }

  renderProductDetails() {
    // Your existing render logic...
  }

  // --- New Comment Methods ---

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