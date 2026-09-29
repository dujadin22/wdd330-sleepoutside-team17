import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

async function init() {
  const token = getLocalStorage("so-token");
  const container = document.querySelector("#orders-container");

  if (!token) {
    container.innerHTML = "<p>You must be logged in to view orders. <a href='../login/index.html'>Login here</a>.</p>";
    return;
  }

  const services = new ExternalServices();

  try {
    const orders = await services.getOrders(token);
    
    if (orders && orders.length > 0) {
      const htmlString = orders.map(order => `
        <div class="order-card">
          <h3>Order ID: ${order.id || order._id}</h3>
          <p>Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
          <p>Name: ${order.fname} ${order.lname}</p>
          <p>Total: $${order.orderTotal}</p>
        </div>
      `).join("");
      container.innerHTML = htmlString;
    } else {
      container.innerHTML = "<p>No orders found.</p>";
    }
  } catch (error) {
    container.innerHTML = "<p>Failed to load orders. Your session may have expired. Please login again.</p>";
    console.error(error);
  }
}

init();