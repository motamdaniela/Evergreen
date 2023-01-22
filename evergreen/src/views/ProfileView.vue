<template>
<v-dialog v-model="dialog">
      <div class="fieldPklight modal">
      
      <v-card>
        <v-card-actions>
                <button class="btnRound btnPk" @click="dialog = false">
                    <img style=" width: 15px " src="../assets/icons/icones/close.svg"/>
                </button>
            </v-card-actions>
        <v-card-text>
          <label for="username" class="semiTitle">Novo username</label>
          <br />
          <input class="input" id="username" v-model="newUsername" type="password" />
          <br />
          <label for="pass" class="semiTitle">Nova palavra-passe</label>
          <br />
          <input class="input" id="pass" v-model="newPassword" type="password" />
        </v-card-text>
        <v-card-actions>
          <button class="btn-page btnG" @click="Edit" >Guardar</button>
        </v-card-actions>
      </v-card>
    </div>
</v-dialog>



<v-dialog v-model="dialogLists">
      <div class="fieldPklight modal">
      
        <div v-for="activity in activitiesSub">
          <div class="fieldG">
            {{ activity.title }}
            helloooo

          </div>

        </div>
      

    </div>
</v-dialog>



  <div>
    <img id="ProfilePic" :src="user.photo"/>
    <img id="editIcon" src="/src/assets/icons/icones/editProfile.svg"
    @click="dialog = true"
     />
    <p class="Name"><b>{{ user.name }}</b></p>
    <p><b>{{ user.school }}</b></p>
    <p>{{ user.email }}</p>
  </div>
  <div>
    <button class="btn-page btnP" @click="dialogLists = true">Atividades Inscritas</button>
    <!-- <button class="btn-page btnP">Atividades Participadas</button> -->
    <button class="btn-page btnPk">Ocorrências Feitas</button>
    <button class="btn-page btnY">Ocorrências Pendentes</button>
  </div>
  <button v-if="this.user.type == 'council'" class="btn-page btnR">Verificar presenças</button>
  <div>
    <h2 class="gradientGreen"> <span>Crachás</span></h2>
    <div class="badgesDiv">
      <img class="badge" v-for="badge in this.badges" :src="badge" />
    </div>
  </div>
</template>

<script>
import { useActivityStore } from "@/stores/Activity";
import { useUsersStore } from "@/stores/User";


export default {
  setup() {
    const userStore = useUsersStore();
    const activityStore = useActivityStore();

    return { userStore, activityStore };
  },
  data() {
    return {
      user: "",
      badges: [],
      dialog: false,
      dialogLists: true,
      newPassword: '',
      newUsername: '',
      newColor: '',
      newShape: '',
      activitiesSub: [],
      activities: this.activityStore.getActivities
    };
  },
  created() {
    let user = this.userStore.getLogged;
    let users = this.userStore.getUsers;
    users.forEach((u) => {
      if (u.email == user){
        this.user = u;
        u.rewards.forEach((r) => {
              this.badges.push(r)

        })
      }
    });

    this.activities = this.activityStore.getActivities;
    this.activities.forEach((activity) => {
      activity.users.forEach((user) => {
        if (user == this.logged) {
          if(!this.activitiesSub.find(act=>act.id==activity.id)){
            this.activitiesSub.push(activity);
          }
        }
      });
    });

    this.activitiesSub.forEach((act) => {
      if(!act.users.find(user=>user==this.logged)){
        let index = this.activitiesSub.indexOf(act);
        this.activitiesSub.splice(index, 1);
      }
    });
  },
  updated () {
    this.activities = this.activityStore.getActivities;
    this.activities.forEach((activity) => {
      activity.users.forEach((user) => {
        if (user == this.logged) {
          if(!this.activitiesSub.find(act=>act.id==activity.id)){
            this.activitiesSub.push(activity);
          }
        }
      });
    });

    this.activitiesSub.forEach((act) => {
      if(!act.users.find(user=>user==this.logged)){
        let index = this.activitiesSub.indexOf(act);
        this.activitiesSub.splice(index, 1);
      }
    });;
  },
  methods: {
    Edit() {
      this.user.username = this.newUsername;
      this.user.password = this.newPassword;
      // this.user.color = this.newColor;
      // this.user.shape = this.newShape;
      this.dialog = false;
      this.userStore.edit(JSON.stringify(this.user))
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/profile.css";
</style>
