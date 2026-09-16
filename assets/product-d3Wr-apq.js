import{g as d,s as e,a as o,l as c,b as s}from"./utils-Be1MtOp5.js";import{E as i}from"./ExternalServices-B5j8aKlk.js";function u(){const t=document.querySelector(".cart");t&&(t.classList.remove("cart--updated"),t.offsetWidth,t.classList.add("cart--updated"),t.addEventListener("animationend",()=>t.classList.remove("cart--updated"),{once:!0}))}class n{constructor(r,a){this.productId=r,this.product={},this.dataSource=a}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addProductToCart.bind(this))}addProductToCart(){const r=d("so-cart")||[];r.push(this.product),e("so-cart",r),o("Product added to your cart.",!1),u()}renderProductDetails(){document.querySelector(".product-detail").innerHTML=`
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
    `}}c();const p=s("product"),l=new i,m=new n(p,l);m.init();
