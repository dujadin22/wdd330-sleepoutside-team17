import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, alertMessage } from "./utils.mjs";

// Load global navigation headers and footers
loadHeaderFooter();

const services = new ExternalServices();
const form = document.querySelector("#login-form");
const statusMessage = document.querySelector("#login-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  const credentials = { email, password };

  try {
    statusMessage.textContent = "Logging in...";
    
    // Send credentials to the backend
    const response = await services.loginRequest(credentials);

    // Assuming the server returns an access token or JWT token object
    if (response.accessToken) {
      localStorage.setItem("so-token", JSON.stringify(response.accessToken));
      statusMessage.textContent = "Login successful! Redirecting...";
      
      // Redirect to the orders review page or dashboard
      setTimeout(() => {
        window.location.href = "../orders/index.html"; 
      }, 1000);
    } else {
      statusMessage.textContent = "";
      alertMessage("Login failed. Please check your credentials and try again.");
    }
  } catch (error) {
    statusMessage.textContent = "";
    // Handle error message gracefully
    const errorMessage = error.message?.message || "Invalid email or password.";
    alertMessage(errorMessage);
  }
});