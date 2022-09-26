import { createRouter, createWebHistory } from "vue-router";
import ProductAdd from "./pages/ProductAdd";
import ProductList from "./pages/ProductList";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: ProductList,
      name: "view-product",
    },
    {
      path: "/add-product",
      component: ProductAdd,
      name: "add-product",
    },
    { 
      path: "/:notFound(.*)", 
      component: null
    },
  ],
});

export default router;
