import { createApp } from "vue";
import "./styles/mug.scss";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import App from "./App.vue";
import { seedDatabase } from "./utils/seeder";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);


seedDatabase().catch(err => console.error("Seeding failed:", err));

createApp(App).use(pinia).mount("#app");
