<template>
  <!-- each activity -->
  <v-dialog v-model="open">
      <div class="fieldPklight modal actModal">
        <button class="btnRound btnPklight" @click="open = false">
          <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
        </button>
        <div class="contentModal">
          <div class="row1">
            <img :src="this.activity.photo" class="imgModal" />
            <div class="rowText">
              <h2>{{ this.activity.title }}</h2>
              <br>
              <h3>Data:</h3>
              <p>{{ this.activity.date }}</p>
              <br>
              <h3>Local:</h3>
              <p>{{ this.activity.place }}</p>
            </div>
          </div>
          
          <h3>Diagnóstico:</h3>
          <p>{{ this.activity.desc1 }}</p>
          <h3>Objetivos:</h3>
          <p>{{ this.activity.desc2 }}</p>
          <h3>Metas:</h3>
          <p>{{ this.activity.desc3 }}</p>
        </div>
        <input
          v-if="!changeBtn(this.activity)"
          type="button"
          class="btn-page btnG btnModal"
          id="sub"
          value="Inscrever"
          @click="subscribe(this.activity), changeBtn(this.activity)"
        />
        <input
          v-else
          type="button"
          class="btn-page btnR btnModal"
          id="unsub"
          value="Anular Inscrição"
          @click="unsubscribe(this.activity), changeBtn(this.activity)"
        />
      </div>
    </v-dialog>

    <!-- each occurence -->
    <v-dialog v-model="openOc">
      <div class="fieldG modal actModal">
        <button class="btnRound btnG" @click="openOc = false">
          <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
        </button>
        <div class="contentModal">
          <div class="row1">
            <img :src="this.oc.photo" class="imgModalOc" />
            <div class="rowText">
              <p v-for="octype in types">
                <h2 v-if="oc.idType == octype.id" > {{ octype.name }}</h2>
              </p>
              <br>
              <h3>Local:</h3>
              <p>{{ this.oc.campus }}, {{ this.oc.school }}, Bloco {{ this.oc.building }}</p>
              <br>
              <h3>Hora:</h3>
              <p>{{ this.oc.hour }}</p>
              <br>
              <h3>Descrição:</h3>
              <p>{{ this.oc.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </v-dialog>

  <!-- each badge -->
    <v-dialog v-model="openBadge">
      <div class="fieldPk modal badgeModal">
        <v-card elevation="0" color="#F9F9F9">
          <v-card-actions>
            <button class="btnRound btnPk" @click="openBadge = false">
              <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
            </button>
          </v-card-actions>
          <div id="bdgCont">
          <img class="badgeModalImg" :src="badge">
          <br>
          <p v-for="mission in missions">
            <h2 v-if=" mission.reward == badge" > {{ mission.title }}</h2>
          </p>
          </div>
        </v-card>
      </div>

    </v-dialog>

<!-- edit profile -->
  <v-dialog v-model="dialog">
    <div class="fieldPklight modal editModal">
      <v-card elevation="0" color="#F9F9F9">
        <v-card-actions>
          <button class="btnRound btnPk" @click="dialog = false">
            <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
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
          <br />
          <label for="photo" class="semiTitle">Nova foto de perfil</label>
          <br>
          <input
            class="input"
            @change="previewFiles"
            type="file"
            id="picture"
            name="picture"
            accept="image/png, image/jpeg"
            ref="myFiles"
          />
        </v-card-text>
        <v-card-actions>
          <button class="btn-page btnG" @click="Edit">Guardar</button>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>

  <!-- activity list -->
  <v-dialog v-model="dialogAct" content-class="fieldP modal" scrollable>
    
    <v-card elevation="0" color="#F9F9F9">
      <v-card-actions>
        <button @click="dialogAct = false" class="btnRound btnP">
          <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
        </button>
      </v-card-actions>
      <v-card-text style="height: 400px">
        <p v-if="activitiesSub.length <= 0">Ainda não estás inscrito em nenhuma atividade!</p>
        <div v-for="activity in activitiesSub" class="fieldP profileList">
          <img class="img" :src="activity.photo" />
          <div class="listText">
            <h2>{{ activity.title }}</h2>
            <br>
            <h3>{{ activity.date }}</h3>
          </div>
          <button
            class="btn-card btnP listBtn"
            @click="open = true; this.activity = activity;">
            Ver mais
          </button>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

<!-- verified occurences -->
  <v-dialog v-model="dialogOcDone" content-class="fieldPk modal" scrollable>
    
    <v-card elevation="0" color="#F9F9F9">
      <v-card-actions>
        <button @click="dialogOcDone = false" class="btnRound btnPk">
          <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
        </button>
      </v-card-actions>
      <v-card-text style="height: 400px">
        <p v-if="ocsDone.length <= 0">Ainda não tens nenhuma ocorrência verificada!</p>
        <div v-for="oc in ocsDone" class="fieldPk profileList">
          <img class="img" :src="oc.photo" />
          <div class="ocTxt">
          <p v-for="octype in types">
            <h2 v-if="oc.idType == octype.id" > {{ octype.name }}</h2>
          </p>
          <h3>{{ oc.campus }}, {{ oc.school }}, Bloco {{ oc.building }} </h3>
        </div>
          <button
            class="btn-card btnPk listBtn"
            @click="openOc = true; this.oc = oc;">
            Ver mais
          </button>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

<!-- pending occurences -->
  <v-dialog v-model="dialogOcPend" content-class="fieldY modal" scrollable>
    
    <v-card elevation="0" color="#F9F9F9">
      <v-card-actions>
        <button @click="dialogOcPend = false" class="btnRound btnY">
          <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
        </button>
      </v-card-actions>
      <v-card-text style="height: 400px">
        <p v-if="ocsPend.length <= 0">Não tens nenhuma ocorrência pendente!</p>
        <div v-for="oc in ocsPend" class="fieldY profileList">
          <img class="img" :src="oc.photo" />
          <div class="ocTxt">
          <p v-for="octype in types">
            <h2 v-if="oc.idType == octype.id" > {{ octype.name }}</h2>
          </p>
          <h3>{{ oc.campus }}, {{ oc.school }}, Bloco {{ oc.building }} </h3>
          </div>
          <button
            class="btn-card btnY listBtn"
            @click="openOc = true; this.oc = oc;">
            Ver mais
          </button>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>


<!-- page content -->
  <div id="prfContent">
  <div>
    <div id="profileContent">
      <img src=""/>
    </div>
    <v-row id="pfpRow">
      <v-col>
        <!-- <img id="smallStar" src="/src/assets/images/aboutPurple.svg"/> -->
      </v-col>
      <v-col>
        <img id="ProfilePic" :src="user.photo" />
        <RouterLink to="/Rank">
          <img id="positionIcon" src="../assets/images/aboutPurple.svg">
          <p id="userPos">{{ users.indexOf(user) + 1 }}</p>
        </RouterLink>
        <!-- ^ n vai pra cima -_- -->
      </v-col>
      <v-col>
        <div id="ptsnBtn">
          <p id="pontos"><img style="width: 20px" id="ptsImg" src="src/assets/icons/icones/coins.svg"/>{{ user.points }} pontos</p>
          <br>
          <!-- <button class="btn-page btnG" id="btnBonus">Bónus Login</button> -->
        </div>
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
    <h3>
      <b>{{ user.school }}</b>
    </h3>
    <p>{{ user.email }}</p>
  </div>

  <br />
  <div>
    <button class="btn-page btnP btnProfile" @click="dialogAct = true">
      Atividades Inscritas
    </button>
    <!-- <button class="btn-page btnP">Atividades Participadas</button> -->
    <button class="btn-page btnPk btnProfile" @click="dialogOcDone = true">
      Ocorrências Feitas
    </button>
    <button class="btn-page btnY btnProfile" @click="dialogOcPend = true">
      Ocorrências Pendentes
    </button>
  </div>
  <button v-if="this.user.council" class="btn-page btnR">
    Verificar presenças
  </button>
  <br />
  <div>
    <h1 class="gradientGreen padding"><span>Crachás</span></h1>
    <br>
    <div v-if="this.user.rewards.length <= 0">
      <p>Ainda não tens nenhum crachá!</p>
      <p>Coleciona-os todos completando</p>
      <p><RouterLink to="/Missions">missões</RouterLink></p>
    </div>
    <div class="badgesDiv">
      <img class="badge" v-for="badge in this.user.rewards" :src="badge" @click="openBadge=true; this.badge = badge"/>
    </div>
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
      dialog: false,
      dialogAct: false,
      dialogOcDone: false,
      dialogOcPend: false,
      openOc: false,
      open: false,
      openBadge: false,
      newPassword: "",
      newUsername: "",
      newColor: "",
      newShape: "",
      activitiesSub: [],
      ocsDone: [],
      ocsPend: [],
      activities: this.activityStore.getActivities,
      occurences: this.occurrenceStore.getOccurrences,
      logged: this.userStore.getLogged,
      types: this.occurrenceStore.getTypes,
      missions: this.missionStore.getMissions,
    };
  },
  created() {
    let users = this.userStore.getUsers;
    users.forEach((u) => {
      if (u.email == this.logged) {
        this.user = u;
      }
    });
    let list = [];
    users.forEach((user) => {
      if (user.type == "user") {
        list.push(user);
      }
    });
    this.users=list;
    
    this.users.sort((a,b)=> b.points - a.points || b.activities - a.activities || b.occurences - a.occurences);
    

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
    
    this.ocsDone = [];
    this.ocsPend = [];
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
    subscribe(activity) {
      console.log(activity);
      this.activityStore.updateUsers(this.logged, activity.id);
      this.missionStore.completeMission(this.logged, 0);
    },
    unsubscribe(activity) {
      activity.users = activity.users.filter((e) => e != this.logged);
      // this.activitiesSub
    },
    changeBtn(activity) {
      let u = activity.users.find((user) => user == this.logged);
      if (u) {
        return true;
      } else {
        return false;
      }
    },
    previewFiles(e) {
      const files = e.target.files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => (this.user.photo = reader.result);
      console.log(this.user.photo);
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/profile.css";
</style>
