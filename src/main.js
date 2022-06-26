import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "normalize.css";
import "popper.js/dist/popper.min.js";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas, far);

const app = createApp(App);
app.component("FIcons", FontAwesomeIcon);
app.use(router);
app.mount("#app");
