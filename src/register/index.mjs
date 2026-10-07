import { loadHeaderFooter, alertMessage } from "../js/utils.mjs";
import ExternalServices from "../js/ExternalServices.mjs";

loadHeaderFooter();

const services = new ExternalServices(); 
const form = document.querySelector("#registration-form");
const messageBox = document.querySelector("#register-message");

function showMessage(text, isSuccess = false) {
  if (messageBox) {
    messageBox.style.display = "block";
    messageBox.textContent = text;
    if (isSuccess) {
      messageBox.style.backgroundColor = "#d4edda";
      messageBox.style.color = "#155724";
      messageBox.style.border = "1px solid #c3e6cb";
    } else {
      messageBox.style.backgroundColor = "#f8d7da";
      messageBox.style.color = "#721c24";
      messageBox.style.border = "1px solid #f5c6cb";
    }
  } else {
    alertMessage(text, !isSuccess);
  }
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Check custom form validity before hitting the backend
    if (!form.checkValidity()) {
      showMessage("Please fill out all required fields correctly before submitting.", false);
      form.reportValidity();
      return;
    }

    const userData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      shippingAddress: document.getElementById("shipping").value, // Matches id="shipping" in HTML
      password: document.getElementById("password").value,
      avatar: document.getElementById("avatar").value || "",
    };

    try {
      // Post registration data to the backend via ExternalServices
      const response = await services.registerUser(userData);
      
      showMessage("Account successfully created! Redirecting to login...", true);
      form.reset();

      // Redirect to login page after a brief successful display
      setTimeout(() => {
        window.location.href = "../login/index.html";
      }, 2000);

    } catch (error) {
      const errorMsg = error.message?.message || error.message || "Registration failed. Please try again.";
      showMessage(errorMsg, false);
    }
  });
}