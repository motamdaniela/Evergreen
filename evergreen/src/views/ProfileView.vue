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
    <button v-on:click="givemetheanswer">Atividades Inscritas</button>
    <button>Atividades Participadas</button>
    <button>Ocorrências Feitas</button>
    <button>Ocorrências Pendentes</button>
    <button>Verificar presenças(alunos resp.)</button>
  </div>
  <div>
    <h2>Crachás</h2>
    <div class="badgesDiv">
      <img class="badge" v-for="badge in this.badges" :src="badge" />
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useUsersStore } from "@/stores/User";

export default {
  setup() {
    const userStore = useUsersStore();

    return { userStore };
  },
  data() {
    return {
      user: "",
      badges: [],
      dialog: false,
      newPassword: '',
      newUsername: '',
      newColor: '',
      newShape: '',
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

  },
  methods: {
    givemetheanswer(){
      console.log(this.user.idRewards);
    },
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
