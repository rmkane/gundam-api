import { AgGridVue } from "ag-grid-vue3";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.component("AgGridVue", AgGridVue);
app.use(router);
app.use(pinia);
app.mount("#app");
