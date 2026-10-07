export default class Alert {
  constructor() {
    // This dynamically resolves to the correct path whether local or on GitHub Pages
    this.path = `${import.meta.env.BASE_URL}json/alerts.json`;
  }

  async init() {
    const alerts = await this.loadAlerts();
    if (alerts && alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  async loadAlerts() {
    try {
      const response = await fetch(this.path);
      if (!response.ok) return [];
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error loading alerts:", error);
      return [];
    }
  }

  renderAlerts(alerts) {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    alerts.forEach((alertData) => {
      const p = document.createElement("p");
      p.textContent = alertData.message;
      p.style.backgroundColor = alertData.background || "#333";
      p.style.color = alertData.color || "#fff";
      p.style.padding = "12px 15px";
      p.style.margin = "5px 0";
      p.style.textAlign = "center";
      p.style.fontWeight = "bold";

      alertSection.appendChild(p);
    });

    mainElement.prepend(alertSection);
  }
}