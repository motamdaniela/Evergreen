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
<v-dialog v-model="editProfile">
    <div class="fieldPklight modal-lg editModal">
        <!-- <v-card-actions> -->
          <button class="btnRound btnPk" @click="editProfile = false">
            <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
          </button>
        <!-- </v-card-actions> -->
        
        <!-- <v-card-text> -->
          <form @submit.prevent="onSubmit">

            <div>
            <div>
              <label for="photo" class="semiTitle">Nova foto de perfil</label>
              <br>
              <img class="pfp" v-if="form.newPhoto==''" :src="user.photo" width="100">
              <img class="pfp" v-else :src="form.newPhoto" width="100">
              <br />
            </div>
            
            <input 
            @change="previewFiles"
            type="file"
            name="picture"
            accept="image/png, image/jpeg"
            ref="myFiles"
            /> 

            <div>
              <label for="username" class="semiTitle">Novo nome de utilizador</label>
              <br />
              <input
                class="input"
                id="username"
                v-model="form.newUsername"
                type="text"
              />
              <br />
              <label for="pass" class="semiTitle">Nova palavra-passe</label>
              <br />
              <input
                class="input"
                id="pass"
                v-model="form.newPassword"
                type="password"
              />
              <br />
              <label for="passC" v-if="this.form.newPassword" class="semiTitle">Confirmar palavra-passe</label>
              <br />
              <input
                class="input"
                id="passC"
                v-model="form.newPasswordConf"
                v-if="this.form.newPassword"
                type="password"
              />
            </div>
            </div>

            <v-alert class="errorAlert" type="error" color="#E9674D" v-if="error">{{
        error
      }}</v-alert>

            <v-card-actions>
              <button v-if="this.form.newUsername != this.user.username || this.form.newPhoto || this.form.newPassword" class="btn-card btnG" type="submit" >Guardar</button>
            </v-card-actions>

      <v-alert
        class="errorAlert"
        type="warning"
        color="#E9A13B"
        v-if="warning"
        >{{ warning }}</v-alert
      >
          </form>
          
          <!--  -->
        <!-- </v-card-text> -->
        <!-- <v-card-actions>
          <button class="btn-page btnG" @click="Edit">Guardar</button>
        </v-card-actions> -->
        
      <!-- </v-card> -->
    </div>
  </v-dialog>


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
        <p v-if="this.activitiesSub.length <= 0">Ainda não estás inscrito em nenhuma atividade!</p>
        <div v-for="activity in this.activitiesSub" class="fieldP profileList">
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
    <v-row id="pfpRow">
      <v-col>
        <!-- <img id="smallStar" src="/src/assets/images/aboutPurple.svg"/> -->
        <RouterLink to="/Rank" id="positionIcon">
            <div id="divRank">
          <img id="rankIcon" src="../assets/images/aboutPurple.svg">
            <p id="userPos">{{ this.users.indexOf(curUser) + 1 }}</p>
          </div>
          </RouterLink>
      </v-col>
      <v-col class="colPfp">
        <img id="ProfilePic" :src="user.photo" />
      </v-col>
      <v-col class="colSide" style="margin-top:4%;">
        <v-row id="ptsnBtn">
          <p id="pontos"><img id="ptsImg" src="/src/assets/icons/icones/coins.svg"/>{{ user.points }} pontos</p>
          <br>
        </v-row>
        <v-row id="editIcon">
          <img id="edit"
          src="/src/assets/icons/icones/editProfile.svg"
          @click="editProfile = true"/>
        </v-row>
      </v-col>
    </v-row>
    <p class="Name">
      <b>{{ user.name }}</b>
    </p>
    <p>{{ user.username }}</p>
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
    <button class="btn-page btnPk btnProfile" @click="dialogOcDone = true">
      Ocorrências Feitas
    </button>
    <button class="btn-page btnY btnProfile" @click="dialogOcPend = true">
      Ocorrências Pendentes
    </button>
  </div>
  <button v-if="filteredActivities.length > 0" class="btn-page btnR">
    <RouterLink to="/ActivitiesList">
      Verificar presenças
    </RouterLink>
  </button>
  <br />
  <div>
    <h1 class="gradientGreen padding"><span>Crachás</span></h1>
    <br>
    <div v-if="!this.user.rewards.length">
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
      form:{
        newPhoto:'',
        newUsername:'',
        newPassword:'',
        newPasswordConf:'',
      },
      user: "",
      editProfile:false,
      dialog: false,
      dialogAct: false,
      dialogOcDone: false,
      dialogOcPend: false,
      openOc: false,
      open: false,
      openBadge: false,
      newPassword: "",
      newUsername: "",
      activitiesSub: [],
      ocsDone: [],
      ocsPend: [],
      activities: this.activityStore.getActivities,
      occurences: this.occurrenceStore.getOccurrences,
      logged: this.userStore.getLogged,
      types: this.occurrenceStore.getTypes,
      missions: this.missionStore.getMissions,
      users: [],
      error:"",
      warning:"",
      filteredActivities:"",
      curUser: ''
    };
  },
  async created() {
    if(this.user == undefined || this.user == ''){
      await this.userStore.fetchLogged();
      this.user = await this.userStore.getLogged
    };
    this.form.newUsername = this.user.username

    // let users=this.userStore.getUsers;
    // users.forEach(s=>{
    //   s.email==this.logged&&(this.user=s)
    // });

    // if(this.users == undefined || this.users == ''){

      // get the list of all users, activities and occurrences
      await this.userStore.fetchAllUsers();
      this.users = this.userStore.getUsers

      await this.activityStore.fetchAllActivities();
      this.activities = this.activityStore.getActivities

      this.occurences= await this.occurrenceStore.getAllOccurrences();
      this.occurences = this.occurrenceStore.getOccurrences

      this.activitiesSub = await this.activityStore.fetchSubActivities();

      console.log(this.activitiesSub)
      //filter the lists of user's pending and done occurrences
      // console.log(await this.occurrenceStore.getAllOccurrences())
      this.occurences.forEach(oc =>{
          switch(oc.status){
            case "pending":
              this.ocsPend.push(oc);
            case "solved":
              this.ocsDone.push(oc);
          }
      })
      // console.log(this.user)
      // console.log(this.ocsPend[0], this.ocsDone)


    // this.users.sort((a,b)=>b.points-a.points||b.activities-a.activities||b.occurences-a.occurences);

    // this.curUser = this.users.find(user => user.email == this.user.email)
    

  },
  updated() {
    // this.activities=this.activityStore.getActivities,this.activities.forEach(t=>{t.users.forEach(i=>{i==this.logged&&(this.activitiesSub.find(i=>i.id==t.id)||this.activitiesSub.push(t))})}),this.activitiesSub.forEach(i=>{i.users.find(i=>i==this.logged)||(i=this.activitiesSub.indexOf(i),this.activitiesSub.splice(i,1))}),this.ocsDone=[],this.ocsPend=[],this.occurences=this.occurrenceStore.getOccurrences;let userOcs=this.occurences.filter(i=>i.user==this.logged);userOcs.forEach(i=>{"pending"==i.state?this.ocsPend.push(i):"solved"==i.state&&this.ocsDone.push(i)}),this.filteredActivities=this.activities.filter(i=>i.coordinator==this.userStore.getLogged);
    // this.activitiesSub = this.activityStore.fetchSubActivities()
  },
  methods: {
    async onSubmit(){
      await this.userStore.editProfile(
        this.form.newPhoto,
        this.form.newUsername,
        this.form.newPassword,
        this.form.newPasswordConf
      );
      await this.userStore.fetchLogged();
      this.user = this.userStore.getLogged
    },

    subscribe(activity) {
      console.log(activity),this.activityStore.updateUsers(this.logged,activity.id),this.missionStore.completeMission(this.logged,0);
    },
    unsubscribe(activity) {
      activity.users=activity.users.filter(i=>i!=this.logged);
      // this.activitiesSub
    },
    changeBtn(n) {
      return!!n.users.find(n=>n==this.logged)
    },
    previewFiles(e) {
      e=e.target.files;if(e.length){const o=new FileReader;o.readAsDataURL(e[0]),o.onload=()=>this.form.newPhoto=o.result,console.log(this.user.photo)}
    },
  },
  // computed: {
  //   FilteredActivities() {
  //                 this.filteredActivities= this.activities.filter((activity) => activity.coordinator == this.userStore.getLogged)
  //             },
  // },
};
</script>

<style scoped>
@import "../assets/styles/profile.css";
</style>
