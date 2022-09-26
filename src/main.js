import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";
import typeSpec from "./mixins/typeSpec.vue"

const app = createApp(App);
app.use(router);
app.use(store);
app.mixin(typeSpec);

app.mount("#app");

