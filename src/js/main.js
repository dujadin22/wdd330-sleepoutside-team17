import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

loadHeaderFooter();

// Initialize and display dynamic site alerts
const alerts =
 new Alert();
alerts.init();