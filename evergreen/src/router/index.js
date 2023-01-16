import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPageView.vue";
import About from "../views/AboutView.vue";
import Faq from "../views/FaqView.vue";
import Login from "../views/LoginView.vue";
import SignUp from "../views/SignUpView.vue";
import Home from "../views/HomePageView.vue";
import Activities from "../views/ActivitiesView.vue";
import Occurrence from "../views/OccurrenceView.vue";
import Form from "../views/FormView.vue";
import Missions from "../views/MissionsView.vue";
import Profile from "../views/ProfileView.vue";
import Rank from "../views/RankView.vue";
import Activity from "../views/ActivityView.vue";
import Suggestion from "../views/SuggestionView.vue";
import Admin from "../views/AdminView.vue";
import Users from "../views/ListofUsersView.vue";
import ListOc from "../views/ListofOccurencesView.vue";

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
      path: "/Occurrence",
      name: "Occurrence",
      component: Occurrence,
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
      path: "/Activity/:id",
      name: "Activity",
      component: Activity,
    },
    {
      path: "/Suggestion",
      name: "Suggestion",
      component: Suggestion,
    },
    {
      path: "/Users",
      name: "Users",
      component: Users,
    },
    {
      path: "/Occurences",
      name: "Occurences",
      component: ListOc,
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
