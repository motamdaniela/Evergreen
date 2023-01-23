<template>
  <v-dialog v-model="dialog">
    <div class="fieldPklight modal">
      <v-card>
        <v-card-actions>
          <button class="btnRound btnPk" @click="dialog = false">
            <img style="width: 15px" src="../assets/icons/icones/close.svg" />
          </button>
        </v-card-actions>
        <v-card-text>
          <label for="username" class="semiTitle">Novo username</label>
          <br />
          <input
            class="input"
            id="username"
            v-model="newUsername"
            type="text"
          />
          <br />
          <label for="pass" class="semiTitle">Nova palavra-passe</label>
          <br />
          <input
            class="input"
            id="pass"
            v-model="newPassword"
            type="password"
          />
        </v-card-text>
        <v-card-actions>
          <button class="btn-page btnG" @click="Edit">Guardar</button>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>

  <v-dialog v-model="dialogAct" scrollable class="fieldP">
    <v-card>
      <v-card-actions>
        <button @click="dialogAct = false" class="btn-page btnP">X</button>
      </v-card-actions>
      <v-card-text style="height: 400px">
        <div v-for="activity in activitiesSub" class="fieldP">
          <img class="img" :src="activity.photo" />
          {{ activity.title }}
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogOcDone" scrollable class="fieldPk">
    <v-card>
      <v-card-actions>
        <button @click="dialogOcDone = false" class="btn-page btnPk">X</button>
      </v-card-actions>
      <v-card-text style="height: 400px">
        <div v-for="oc in ocsDone" class="fieldPk">
          <img class="img" :src="oc.photo" />
          {{ oc.description }}
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogOcPend" scrollable class="fieldY">
    <v-card>
      <v-card-actions>
        <button @click="dialogOcPend = false" class="btn-page btnY">X</button>
      </v-card-actions>
      <v-card-text style="height: 400px">
        <div v-for="oc in ocsPend" class="fieldY">
          <img class="img" :src="oc.photo" />
          <p v-for="octype in types">
            <p v-if="oc.idType == octype.id" > {{ octype.name }}</p>
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <div>
    <div id="profileContent">
      <img src=""/>
    </div>
    <v-row id="pfpRow">
      <v-col>
      </v-col>
      <v-col>
        <img id="ProfilePic" :src="user.photo" />
      </v-col>
      <v-col>
        <v-row>
          <p><img style="width: 20px" src="src/assets/icons/icones/coins.svg"/>{{ user.points }} pontos</p>
        </v-row>
        <v-row>
          <button class="btn-page btnG" id="btnBonus">Bónus Login</button>
        </v-row>
        <v-row>
          <img
          id="editIcon"
          src="/src/assets/icons/icones/editProfile.svg"
          @click="dialog = true"/>
        </v-row>
      </v-col>
    </v-row>
    <p class="Name">
      <b>{{ user.name }}</b>
    </p>
    <p>
      <b>{{ user.school }}</b>
    </p>
    <p>{{ user.email }}</p>
  </div>
  <div>
    <button class="btn-page btnP" @click="dialogAct = true">
      Atividades Inscritas
    </button>
    <!-- <button class="btn-page btnP">Atividades Participadas</button> -->
    <button class="btn-page btnPk" @click="dialogOcDone = true">
      Ocorrências Feitas
    </button>
    <button class="btn-page btnY" @click="dialogOcPend = true">
      Ocorrências Pendentes
    </button>
  </div>
  <button v-if="this.user.type == 'council'" class="btn-page btnR">
    Verificar presenças
  </button>
  <div>
    <h2 class="gradientGreen"><span>Crachás</span></h2>
    <div class="badgesDiv">
      <img class="badge" v-for="badge in this.badges" :src="badge" />
    </div>
  </div>
</template>

<script>
import { useActivityStore } from "@/stores/Activity";
import { useUsersStore } from "@/stores/User";
import { useOccurrenceStore } from "@/stores/Occurrence";
import { useMissionStore } from "@/stores/Mission";

export default {
  setup() {
    const userStore = useUsersStore();
    const activityStore = useActivityStore();
    const occurrenceStore = useOccurrenceStore();
    const missionStore = useMissionStore();

    return { userStore, activityStore, occurrenceStore, missionStore };
  },
  data() {
    return {
      user: "",
      badges: [],
      dialog: false,
      dialogAct: false,
      dialogOcDone: false,
      dialogOcPend: false,
      newPassword: "",
      newUsername: "",
      newColor: "",
      newShape: "",
      activitiesSub: [],
      ocsDone: [],
      ocsPend: [],
      activities: this.activityStore.getActivities,
      occurences: this.occurrenceStore.getOccurrences,
      types: this.occurrenceStore.getTypes,
      logged: this.userStore.getLogged,
    };
  },
  created() {
    let user = this.userStore.getLogged;
    let users = this.userStore.getUsers;
    users.forEach((u) => {
      if (u.email == user) {
        this.user = u;
        u.rewards.forEach((r) => {
          this.badges.push(r);
        });
      }
    });
  },
  updated() {
    this.activities = this.activityStore.getActivities;
    this.activities.forEach((activity) => {
      activity.users.forEach((user) => {
        if (user == this.logged) {
          if (!this.activitiesSub.find((act) => act.id == activity.id)) {
            this.activitiesSub.push(activity);
          }
        }
      });
    });

    this.activitiesSub.forEach((act) => {
      if (!act.users.find((user) => user == this.logged)) {
        let index = this.activitiesSub.indexOf(act);
        this.activitiesSub.splice(index, 1);
      }
    });

    this.occurences = this.occurrenceStore.getOccurrences;
    let userOcs = this.occurences.filter(
      (Occurence) => Occurence.user == this.logged
    );

    userOcs.forEach((oc) => {
      if (oc.state == "pending") {
        this.ocsPend.push(oc);
      } else if (oc.state == "solved") {
        this.ocsDone.push(oc);
      }
    });
  },
  methods: {
    Edit() {
      this.user.username = this.newUsername;
      this.user.password = this.newPassword;
      // this.user.color = this.newColor;
      // this.user.shape = this.newShape;
      this.dialog = false;
      this.userStore.edit(JSON.stringify(this.user));
      this.missionStore.completeMission(this.logged, 7);
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/profile.css";
</style>
