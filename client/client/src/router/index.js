import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PurchaseView from "../views/PurchaseView.vue";
import TestimonialView from "../views/TestimonialView.vue";
import AddTestimonialView from "../views/AddTestimonialView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/purchase",
      name: "purchase",
      component: PurchaseView,
    },
    {
      path: "/testimonial",
      name: "testimonial",
      component: TestimonialView,
    },
    {
      path: "/addtestimonial",
      name: "addtestimonial",
      component: AddTestimonialView,
    },
  ],
});

export default router;
