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


import Admin from "../views/AdminView.vue";
import Users from "../views/ListofUsersView.vue";
import ListOc from "../views/ListofOccurencesView.vue";
import ListofActivities from "../views/ListofActivitiesView.vue";


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
      // component: () => import ("../views/AboutView.vue")
    },
    {
      path: "/faq",
      name: "faq",
      component: Faq,
      // component: () => import ("../views/FaqView.vue")
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      // component: () => import ("../views/LoginView.vue")
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUp,
      // component: () => import ("../views/SignUpView.vue")
    },
    {
      path: "/Home",
      name: "Home",
      component: Home,
      // component: () => import ("../views/HomePageView.vue")
    },
    {
      path: "/Activities",
      name: "Activities",
      component: Activities,
      // component: () => import ("../views/ActivitiesView.vue")
    },
    {
      path: "/Occurrence",
      name: "Occurrence",
      component: Occurrence,
      // component: () => import ("../views/OccurrenceView.vue")
    },
    {
      path: "/Form",
      name: "Form",
      component: Form,
      // component: () => import ("../views/FormView.vue")
    },
    {
      path: "/Missions",
      name: "Missions",
      component: Missions,
      // component: () => import ("../views/MissionsView.vue")
    },
    {
      path: "/Profile",
      name: "Profile",
      component: Profile,
      // component: () => import ("../views/ProfileView.vue")
    },
    {
      path: "/Admin",
      name: "Admin",
      component: Admin,
      // component: () => import ("../views/AdminView.vue")
    },
    {
      path: "/Rank",
      name: "Rank",
      component: Rank,
      // component: () => import ("../views/RankView.vue")
    },
    {
      path: "/Users",
      name: "Users",
      component: Users,
      // component: () => import ("../views/ListofUsersView.vue")
    },
    {
      path: "/Occurences",
      name: "Occurences",
      component: ListOc,
      // component: () => import ("../views/ListofOccurrencesView.vue")
    },
    {
      path: "/ActivitiesList",
      name: "ActivitiesList",
      component: ListofActivities,
      // component: () => import ("../views/ListofActivitiesView.vue")
    },
  ],
});



export default router;
