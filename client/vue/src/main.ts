import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);
app.component("AgGridVue", AgGridVue);
app.use(router);
app.mount("#app");
