import { loadHeaderFooter } from "./utils.mjs";

// Load the global header and footer templates
loadHeaderFooter();

// Optional: Ensure the cart is fully cleared upon reaching the success page 
// (though your checkout class already removes it, this acts as a safe backup)
localStorage.removeItem("so-cart");