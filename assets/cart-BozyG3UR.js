import{g as s,r as l,l as i}from"./utils-Be1MtOp5.js";function n(e){var t,a;return`
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${((t=e.Images)==null?void 0:t.PrimarySmall)||((a=e.Images)==null?void 0:a.PrimaryMedium)||e.Image||""}"
          alt="${e.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${e.Name}</h2>
      </a>
      <p class="cart-card__color">${e.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${e.FinalPrice}</p>
    </li>
  `}class d{constructor(r,t,a,c,o){this.key=r,this.listElement=t,this.footerElement=a,this.totalElement=c,this.clearButton=o}init(){var t;const r=s(this.key)||[];(t=this.clearButton)==null||t.addEventListener("click",()=>{this.clearCart()}),this.renderCart(r)}clearCart(){localStorage.removeItem(this.key),this.renderCart([])}renderCart(r){if(l(n,this.listElement,r,"afterbegin",!0),r.length===0){this.footerElement.classList.add("hide"),this.listElement.innerHTML=`
    <li class="empty-cart" role="status">
      <h3>Your cart is empty.</h3>
      <p>Add a product before continuing to checkout.</p>
      <a class="empty-cart__link" href="/wdd330-sleepoutside-team17/">
        Continue Shopping
      </a>
    </li>
  `;return}const t=r.reduce((a,c)=>a+Number(c.FinalPrice),0);this.totalElement.textContent=`Total: $${t.toFixed(2)}`,this.footerElement.classList.remove("hide")}}i();const m=new d("so-cart",document.querySelector(".product-list"),document.querySelector(".cart-footer"),document.querySelector(".cart-total"),document.querySelector("#clear-cart"));m.init();
