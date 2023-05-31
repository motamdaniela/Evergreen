import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/base.css";
const app = createApp(App);
app.use(createPinia()), app.use(router);
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import '@mdi/font/css/materialdesignicons.css'
import json from "/data.json";
const vuetify = createVuetify({
  components: components,
  directives: directives,
});
app.use(vuetify), app.mount("#app");
// import { useUsersStore } from "@/stores/User";
import { useActivityStore } from "@/stores/Activity";
import { useOccurrenceStore } from "@/stores/Occurrence";
import { useMissionStore } from "@/stores/Mission";
import { useSchoolStore } from "@/stores/School";
// const userStore = useUsersStore(),
const  activityStore = useActivityStore(),
  occurrenceStore = useOccurrenceStore(),
  missionStore = useMissionStore(),
  schoolStore = useSchoolStore();
// let predefinedUsers = json.predefinedUsers,
let  activities = json.activities,
  themes = json.themes,
  types = json.types,
  missions = json.missions,
  campus = json.campus,
  schools = json.schools,
  buildings = json.buildings,
  floors = json.floors,
  classrooms = json.classrooms,
  typeM = json.typeM;
//   users = userStore.getUsers;
// predefinedUsers.forEach((user) => {
//   users.find((u) => u.email == user.email)
//     ? console.log("user has already been added")
//     : userStore.add(user);
// });
let act = activityStore.getActivities;
activities.forEach((activity) => {
  act.find((a) => a.id == activity.id)
    ? console.log("activity has already been added")
    : activityStore.addActivity(activity);
});
let tms = activityStore.getThemes;
themes.forEach((theme) => {
  tms.find((t) => t.id == theme.id)
    ? console.log("theme has already been added")
    : activityStore.addTheme(theme);
});
let tps = occurrenceStore.getTypes;
types.forEach((type) => {
  tps.find((t) => t.id == type.id)
    ? console.log("type has already been added")
    : occurrenceStore.addType(type);
});
let mss = missionStore.getMissions;
missions.forEach((mission) => {
  mss.find((m) => m.id == mission.id)
    ? console.log("mission has already been added")
    : missionStore.addMission(mission);
});
let tpm = missionStore.getTypes;
typeM.forEach((type) => {
  tpm.find((t) => t.id == type.id)
    ? console.log("type has already been added")
    : missionStore.addType(type);
});
let cmp = schoolStore.getCampus;
campus.forEach((camp) => {
  cmp.find((c) => c.id == camp.id)
    ? console.log("campus has already been added")
    : schoolStore.addCampus(camp);
});
let sch = schoolStore.getSchools;
schools.forEach((school) => {
  sch.find((s) => s.id == school.id)
    ? console.log("school has already been added")
    : schoolStore.addSchool(school);
});
let bld = schoolStore.getBuildings;
buildings.forEach((building) => {
  bld.find((b) => b.id == building.id)
    ? console.log("building has already been added")
    : schoolStore.addBuilding(building);
});
let flo = schoolStore.getFloors;
floors.forEach((floor) => {
  flo.find((f) => f.id == floor.id)
    ? console.log("floor has already been added")
    : schoolStore.addFloor(floor);
});
let cls = schoolStore.getClassrooms;
classrooms.forEach((classroom) => {
  cls.find((c) => c.id == classroom.id)
    ? console.log("classroom has already been added")
    : schoolStore.addClassroom(classroom);
});
  // missionStore.completeMission(userStore.getLogged, 0);
