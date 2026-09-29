import"./style-C3X2JnmN.js";import{E as n}from"./ExternalServices-IbnfaJjf.js";import{r as l,l as d,b as i}from"./utils-BMsenODm.js";function u(t){return`
    <li class="product-card">
      <a href="/wdd330-sleepoutside-team17/product_pages/?product=${t.Id}">
        <img
          src="${t.Images.PrimaryMedium}"
          alt="${t.NameWithoutBrand}"
        />
        <h3 class="card__brand">${t.Brand.Name}</h3>
        <h2 class="card__name">${t.NameWithoutBrand}</h2>
        <p class="product-card__price">$${t.FinalPrice}</p>
      </a>
    </li>
  `}class m{constructor(e,r,s){this.category=e,this.dataSource=r,this.listElement=s}async init(){try{const e=await this.dataSource.getData(this.category);this.renderList(e)}catch(e){this.listElement.innerHTML="<li>Sorry, the products could not be loaded.</li>",console.error(e)}}renderList(e){if(e.length===0){this.listElement.innerHTML="<li>No products found.</li>";return}l(u,this.listElement,e,"afterbegin",!0)}}async function h(){await d();const t=(i("search")||"").trim(),e=i("category")||"tents",r=t||e,s=r.split("-").map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(" ");t?(document.querySelector("#product-list-title").textContent=`Search Results: ${t}`,document.querySelector("#product-search").value=t,document.title=`Sleep Outside | Search: ${t}`):(document.querySelector("#product-list-title").textContent=`Top Products: ${s}`,document.title=`Sleep Outside | ${s}`);const c=new n,o=document.querySelector(".product-list");new m(r,c,o).init()}h();
