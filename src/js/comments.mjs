export function renderComments(productId) {
  const container = document.querySelector("#comments-container");
  if (!container) return;
  
  const comments = JSON.parse(localStorage.getItem(`comments_${productId}`)) || [];

  if (comments.length === 0) {
    container.innerHTML = "<p>No comments yet. Be the first!</p>";
    return;
  }

  container.innerHTML = comments.map(c => `
    <div class="comment-card">
      <p><strong>${c.name}</strong> <em>(${c.date})</em></p>
      <p>${c.text}</p>
    </div>
  `).join("");
}

export function setupCommentSubmission(productId) {
  renderComments(productId);

  const form = document.querySelector("#comment-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#userName").value.trim();
    const text = document.querySelector("#userComment").value.trim();
    const date = new Date().toLocaleDateString();

    const newComment = { name, text, date };
    const comments = JSON.parse(localStorage.getItem(`comments_${productId}`)) || [];
    
    comments.push(newComment);
    localStorage.setItem(`comments_${productId}`, JSON.stringify(comments));

    form.reset();
    renderComments(productId);
  });
}