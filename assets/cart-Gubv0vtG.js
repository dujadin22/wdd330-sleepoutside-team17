import"./style-C3X2JnmN.js";import{g as c,s as i,r as l,l as n}from"./utils-BMsenODm.js";function d(a){var t,e;return`
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${((t=a.Images)==null?void 0:t.PrimarySmall)||((e=a.Images)==null?void 0:e.PrimaryMedium)||a.Image||""}"
          alt="${a.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${a.Name}</h2>
      </a>
      <p class="cart-card__color">${a.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${a.FinalPrice}</p>
      <span class="cart-remove" data-id="${a.Id}">❌</span>
    </li>
  `}class m{constructor(r,t,e,s,o){this.key=r,this.listElement=t,this.footerElement=e,this.totalElement=s,this.clearButton=o}init(){var t;const r=c(this.key)||[];(t=this.clearButton)==null||t.addEventListener("click",()=>{this.clearCart()}),this.listElement.addEventListener("click",e=>{if(e.target.classList.contains("cart-remove")){const s=e.target.dataset.id;this.removeItem(s)}}),this.renderCart(r)}clearCart(){localStorage.removeItem(this.key),this.renderCart([])}removeItem(r){let t=c(this.key)||[];t=t.filter(e=>e.Id!==r),i(this.key,t),this.renderCart(t)}renderCart(r){if(l(d,this.listElement,r,"afterbegin",!0),r.length===0){this.footerElement.classList.add("hide"),this.listElement.innerHTML=`
        <li class="empty-cart" role="status">
          <h3>Your cart is empty.</h3>
          <p>Add a product before continuing to checkout.</p>
          <a class="empty-cart__link" href="/wdd330-sleepoutside-team17/">
            Continue Shopping
          </a>
        </li>
      `;return}const t=r.reduce((e,s)=>e+Number(s.FinalPrice),0);this.totalElement.textContent=`Total: $${t.toFixed(2)}`,this.footerElement.classList.remove("hide")}}n();const h=new m("so-cart",document.querySelector(".product-list"),document.querySelector(".cart-footer"),document.querySelector(".cart-total"),document.querySelector("#clear-cart"));h.init();
