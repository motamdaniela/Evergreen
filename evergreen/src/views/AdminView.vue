<template>
  <div class="d-flex justify-center flex-row">
    <div class="carddiv">
      <img class="icon" src="/src/assets/images/faqYellow.svg" />
      <v-card class="cardY">
        <RouterLink to="/Users"
          ><h2 class="linkUsers"><span>Utilizadores</span></h2></RouterLink
        >
      </v-card>
    </div>

    <div class="carddiv">
      <img class="icon" src="/src/assets/images/faqPurple.svg" />
      <v-card class="cardP">
        <RouterLink to="/ActivitiesList"
          ><h2 class="linkActs"><span>Atividades</span></h2></RouterLink
        >
      </v-card>
    </div>

    <div class="carddiv">
      <img class="icon" src="/src/assets/images/faqRed.svg" />
      <v-card class="cardR">
        <RouterLink to="/Occurences"
          ><h2 class="linkOcs"><span>Ocorrências</span></h2></RouterLink
        >
      </v-card>
    </div>
  </div>

  <v-row class="d-flex justify-center flex-row">
    <div class="carddivTables">
      <p class="semiTitle">Inscrições conselho Eco-Escolas</p>
      <v-card class="cardG">
        <p v-if="councilUsers.length <= 0">Ainda não existem inscrições!</p>
        <div class="councilUs" v-for="user in councilUsers">
          <v-row>
            <img :src="user.photo" id="profilePic" />
            <p>{{ user.name }}</p>
          </v-row>
        </div>
      </v-card>
    </div>

    <div class="carddivTables">
      <p class="semiTitle">Atividades próximas</p>
      <v-card class="cardG">
        <div
          v-if="closeActivities.length > 0"
          v-for="activity in closeActivities"
        >
          <span class="cardText">{{ activity.title }}: </span>
          <span>{{ activity.date }}</span>
        </div>
        <div v-else>
          <span>Não tem atividades próximas</span>
        </div>
      </v-card>
    </div>
  </v-row>
</template>

<script>
import { useUsersStore } from "@/stores/User";
import { useActivityStore } from "@/stores/Activity";

export default {
  setup() {
    const userStore = useUsersStore();
    const activityStore = useActivityStore();

    return { userStore, activityStore };
  },
  data() {
    return {
      users: this.userStore.getUsers,
      councilUsers: [],
      myActivities: [],
      closeActivities: [],
      logged: this.userStore.getLogged,
      user: "",
    };
  },
  async created() {
    this.users.forEach((user) => {
      if (user.council) {
        this.councilUsers.push(user);
        // alert(this.councilUsers)
      }
    });

    this.user = this.userStore.getUsers.find(
      (user) => user.email == this.logged.email
    );

    this.myActivities = await this.activityStore.fetchCoordinatorActivities()
    console.log(this.myActivities, 'myActivities')

    let today = new Date();
    let todayDate = +(
      today.getFullYear() +
      "" +
      ((today.getMonth() + 1).toString().length < 2
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "" +
      (today.getDate().toString().length < 2
        ? "0" + today.getDate()
        : today.getDate())
    );

    this.myActivities.forEach((act) => {
      if (
        this.closeActivities.length < 5 &&
        +act.begin > +todayDate &&
        !this.closeActivities.find((a) => a._id == act._id)
      ) {
        this.closeActivities.push(act);
      } else {
        this.closeActivities.forEach((a) => {
          if (
            +a.begin > +act.begin && 
            +a.begin > +todayDate &&
            !this.closeActivities.find((ac) => a._id == ac._id)
          ) {
            this.closeActivities.splice(this.closeActivities.indexOf(act), 1);
            this.closeActivities.push(a);
          }
        });
      }
    });

    console.log(this.closeActivities, 'close activities');
  },
};
</script>

<style scoped>
@import "../assets/styles/admin.css";
</style>
