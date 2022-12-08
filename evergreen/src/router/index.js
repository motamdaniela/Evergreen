import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPageView.vue";
import About from "../views/AboutView.vue";
import Faq from "../views/FaqView.vue";
import Login from "../views/LoginView.vue";
import SignUp from "../views/SignUpView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/inicio",
      name: "inicio",
      component: LandingPage,
    },
    {
      path: "/sobre",
      name: "sobre",
      component: About,
    },
    {
      path: "/faq",
      name: "faq",
      component: Faq,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUp,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if(to.path.startsWith("/login" || "/signUp")) {
//     next("/");
//   }else{
//     next();
//   }
// })

export default router;
