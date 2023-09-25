import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router"; // Import the necessary functions from Vue Router

import HomePage from "./views/HomePage.vue";
import ProductDetailPage from "./views/ProductDetailPage.vue";
import AddProductPage from "./views/AddProductPage.vue";
import LoginPage from "./views/LoginPage.vue";
import RegisterPage from "./views/RegisterPage.vue";

const app = createApp(App);

const routes = [
  { path: "/", component: HomePage },
  { path: "/product/:id", component: ProductDetailPage },
  { path: "/add-product", component: AddProductPage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);
app.mount("#app");
