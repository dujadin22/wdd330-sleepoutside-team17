import{l,g as d,s as i,a as n}from"./utils-D8xZtdzq.js";l();function s(){const e=document.getElementById("wishlist-container");if(!e)return;const r=d("wishlist")||[];if(r.length===0){e.innerHTML=`
      <div style="text-align: center; padding: 40px; background: #f9f9f9; border-radius: 8px; border: 1px solid #ddd; margin-top: 20px;">
        <h3>Your wish list is empty.</h3>
        <p style="color: #666; margin-bottom: 20px;">Save items you love here while shopping!</p>
        <a href="../index.html" style="background-color: #525b0f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Continue Shopping</a>
      </div>
    `;return}e.innerHTML=r.map((t,o)=>`
    <div class="wishlist-card" style="display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1px solid #ddd; padding: 15px; margin-bottom: 1rem; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <div style="display: flex; align-items: center; gap: 15px;">
        <img src="${t.Images.PrimarySmall}" alt="${t.NameWithoutBrand}" style="width: 80px; height: 80px; object-fit: contain; border: 1px solid #eee; border-radius: 4px;" />
        <div>
          <h3 style="margin: 0 0 5px 0; font-size: 1rem; color: #333;">${t.Brand.Name}</h3>
          <p style="margin: 0 0 5px 0; color: #666; font-size: 0.9rem;">${t.NameWithoutBrand}</p>
          <p style="margin: 0; font-weight: bold; color: #525b0f;">$${t.FinalPrice}</p>
        </div>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="moveToCart-btn" data-index="${o}" style="background-color: #525b0f; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">Add to Cart</button>
        <button class="removeItem-btn" data-index="${o}" style="background-color: #a94442; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">Remove</button>
      </div>
    </div>
  `).join(""),u(r)}function p(){const e=document.querySelector(".cart");e&&(e.classList.remove("cart--updated"),e.offsetWidth,e.classList.add("cart--updated"),e.addEventListener("animationend",()=>e.classList.remove("cart--updated"),{once:!0}))}function u(e){document.querySelectorAll(".removeItem-btn").forEach(r=>{r.addEventListener("click",t=>{const o=t.currentTarget.getAttribute("data-index");e.splice(o,1),i("wishlist",e),s(),n("Item removed from your wish list.",!1)})}),document.querySelectorAll(".moveToCart-btn").forEach(r=>{r.addEventListener("click",t=>{const o=t.currentTarget.getAttribute("data-index"),c=e[o],a=d("so-cart")||[];a.push(c),i("so-cart",a),n("Product added to your cart!",!1),p()})})}s();
