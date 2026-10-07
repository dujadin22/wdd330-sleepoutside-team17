import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, getLocalStorage, alertMessage } from "./utils.mjs";

loadHeaderFooter();

// --- SECURITY GUARD: Require login/registration before accessing checkout ---
const token = getLocalStorage("so-token");
if (!token) {
  alertMessage("Please log in or register to complete an order.", true);
  setTimeout(() => {
    window.location.href = "../login/index.html";
  }, 1500);
}
// --------------------------------------------------------------------------

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();
checkout.calculateOrderTotal(); // Automatically calculate totals on page load

const form = document.querySelector("#checkout-form");
const submitButton = document.querySelector("#checkoutSubmit");
const statusMessage = document.querySelector("#checkout-status");
const originalButtonText = submitButton.textContent;

function setSubmittingState(isSubmitting) {
  submitButton.disabled = isSubmitting;
  submitButton.classList.toggle("is-loading", isSubmitting);
  form.setAttribute("aria-busy", String(isSubmitting));

  if (isSubmitting) {
    submitButton.textContent = "Processing Order...";
    statusMessage.textContent = "Processing your order. Please wait.";
  } else {
    submitButton.textContent = originalButtonText;
    statusMessage.textContent = "";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Double check token on submit as an extra safeguard
  const currentToken = getLocalStorage("so-token");
  if (!currentToken) {
    alertMessage("Your session has expired. Please log in again.", true);
    setTimeout(() => {
      window.location.href = "../login/index.html";
    }, 1500);
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  setSubmittingState(true);

  const orderPlaced = await checkout.checkout(form);

  if (!orderPlaced) {
    setSubmittingState(false);
    statusMessage.textContent =
      "The order could not be completed. Review the message above and try again.";
  }
});

document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});