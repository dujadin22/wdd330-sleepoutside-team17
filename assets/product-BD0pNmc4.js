import{s as i,g as a,b as l,a as d}from"./utils-D8xZtdzq.js";import{E as u}from"./ExternalServices-XUBQH5qW.js";function p(){return a("wishlist")||[]}function h(o){let t=p();t.some(e=>e.Id===o.Id)||(t.push(o),i("wishlist",t))}function b(){const o=document.querySelector(".cart");o&&(o.classList.remove("cart--updated"),o.offsetWidth,o.classList.add("cart--updated"),o.addEventListener("animationend",()=>o.classList.remove("cart--updated"),{once:!0}))}class g{constructor(t,e){this.productId=t,this.dataSource=e,this.product={}}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails();const t=document.getElementById("addToCart");t&&t.addEventListener("click",this.addProductToCart.bind(this));const e=document.getElementById("addToWishlist");e&&e.addEventListener("click",this.addProductToWishlist.bind(this)),this.initComments()}addProductToCart(){const t=a("so-cart")||[];t.push(this.product),i("so-cart",t),d("Product added to your cart.",!1),b()}addProductToWishlist(){h(this.product),d("Product added to your Wish List!",!1)}renderProductDetails(){const t=document.querySelector(".product-detail");t&&(t.innerHTML=`
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
    `)}initComments(){this.renderComments();const t=document.querySelector("#comment-form");t&&t.addEventListener("submit",e=>{e.preventDefault();const r=document.querySelector("#userName").value.trim(),n=document.querySelector("#userComment").value.trim(),c=new Date().toLocaleDateString(),m={name:r,text:n,date:c},s=JSON.parse(localStorage.getItem(`comments_${this.productId}`))||[];s.push(m),localStorage.setItem(`comments_${this.productId}`,JSON.stringify(s)),t.reset(),this.renderComments()})}renderComments(){const t=document.querySelector("#comments-container");if(!t)return;const e=JSON.parse(localStorage.getItem(`comments_${this.productId}`))||[];if(e.length===0){t.innerHTML="<p>No comments yet. Be the first to leave one!</p>";return}t.innerHTML=e.map(r=>`
      <div class="comment-card" style="border-bottom: 1px solid #ddd; margin-bottom: 1rem; padding-bottom: 0.5rem;">
        <p><strong>${r.name}</strong> <small>(${r.date})</small></p>
        <p>${r.text}</p>
      </div>
    `).join("")}}const f=l("product"),x=new u,y=new g(f,x);y.init();
