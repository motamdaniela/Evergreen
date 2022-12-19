import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPageView.vue";
import About from "../views/AboutView.vue";
import Faq from "../views/FaqView.vue";
import Login from "../views/LoginView.vue";
import SignUp from "../views/SignUpView.vue";
import Home from "../views/HomePageView.vue";
import Activities from "../views/ActivitiesView.vue";
import Ocorrence from "../views/OcorrenceView.vue";
import Form from "../views/FormView.vue";
import Missions from "../views/MissionsView.vue";
import Profile from "../views/ProfileView.vue";
import Admin from "../views/AdminView.vue";
import Rank from "../views/RankView.vue";
import Users from "../views/UsersView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
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
    {
      path: "/Home",
      name: "Home",
      component: Home,
    },
    {
      path: "/Activities",
      name: "Activities",
      component: Activities,
    },
    {
      path: "/Ocorrence",
      name: "Ocorrence",
      component: Ocorrence,
    },
    {
      path: "/Form",
      name: "Form",
      component: Form,
    },
    {
      path: "/Missions",
      name: "Missions",
      component: Missions,
    },
    {
      path: "/Profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/Admin",
      name: "Admin",
      component: Admin,
    },
    {
      path: "/Rank",
      name: "Rank",
      component: Rank,
    },
    {
      path: "/Users",
      name: "Users",
      component: Users,
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
