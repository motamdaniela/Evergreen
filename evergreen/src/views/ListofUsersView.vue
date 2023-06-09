<template>

<div>
    <v-dialog v-model="dialog">
      <div class="fieldPklight modal">
      <v-card v-if="this.action != 'edit'" >
        <v-card-title>Aviso!</v-card-title>
        <v-card-text>
          <p v-if="this.action == 'block'">Tem a certeza que pretende bloquear o utilizador
            <b>{{ this.user.name }}</b> ?
          </p>
          <p v-if="this.action == 'unblock'">Tem a certeza que pretende voltar a ativar o utilizador
            <b>{{ this.user.name }}</b> ?
          </p>
          <p v-if="this.action == 'delete'" >Tem a certeza que pretende eliminar o utilizador
            {{ this.user.name }}
            <b> permanentemente</b> ?
          </p>
        </v-card-text>
        <v-card-actions>
            <button v-if="this.action == 'block'" class="btn-page btnPk" @click="Block">Confirmar</button>
            <button v-if="this.action == 'unblock'" class="btn-page btnPk" @click="Unblock">Confirmar</button>
            <button v-if="this.action == 'delete'" class="btn-page btnPk" @click="Delete">Confirmar</button>
            <button class="btn-page btnPklight" @click="dialog = false">Cancelar</button>
        </v-card-actions>
      </v-card>
      
      <v-card v-else>
        <v-card-text>
      <label for="pass" class="semiTitle">Nova palavra-passe</label>
      <br />
      <input class="input" id="pass" v-model="newPassword" type="password" />
        </v-card-text>
        <v-card-actions>
          <button class="btn-page btnPk" @click="Edit" >Guardar</button>
          <button class="btn-page btnPklight" @click="dialog = false">Cancelar</button>
        </v-card-actions>
      </v-card>
    </div>
      
    </v-dialog>
  </div>


  <div>
        <h1 class="title">
          <img class="backbtn" onclick="history.back()" src="../assets/icons/icones/arrowback.svg">
          <span>Utilizadores</span>
        </h1>
    </div>

  <div class="searchbar">
      <input class="inputSmall" v-model="search" type="text" :v-bind="search ? isFilter = true : isFilter = false"/>
      <button @click="isFilter ? isFilter = false : isFilter = true" >
      <img id="searchicon" src="../assets/icons/icones/search.svg"/></button>
  </div>

  <div v-for="user in filteredUsers">
    <div v-if="user.type != 'admin'" class="boardY board">
      <img :src="user.photo" id="profilePic" />
      <div class="listText">
            <h2>{{ user.name }}</h2>
            <h4>{{ user.school }}</h4>
            <p>{{ user.email }}</p>
          </div>
      <div>
        <button class="btn-page btnPklight" @click="dialog = true; this.action = 'edit'; this.user = user">Editar</button>
        <button v-if="user.state == 'active'" class="btn-page btnY" @click="dialog = true; this.action = 'block'; this.user = user">Bloquear</button>
        <button v-if="user.state != 'active'" class="btn-page btnB" @click="dialog = true; this.action = 'unblock'; this.user = user">Ativar</button>
        <button class="btn-page btnR" @click="dialog = true; this.action = 'delete'; this.user = user">Eliminar</button>
      </div>

    </div>
  </div>

  <div v-for="user in filteredUsers" >
    <div v-if="user.type == 'admin'" class="boardY board">
      <img :src="user.photo" id="profilePic" />
      <p>{{ user.name }}</p>
      <div>
        <button class="btn-page btnPklight" @click="dialog = true; this.action = 'edit'; this.user = user">Editar</button>
        <button class="btn-page btnR" @click="dialog = true; this.action = 'delete'; this.user = user">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/User";

export default {
  setup() {
    const userStore = useUsersStore();

    return { userStore };
  },
  data() {
    return {
      users: [],
      dialog: false,
      action: '',
      user: '',
      newPassword: '',
      search: '',
      isFilter: false,
    };
  },
  methods: {
    Edit() {
      this.user.password = this.newPassword;
      this.dialog = false;
      this.userStore.edit(JSON.stringify(this.user))
    },
    Block() {
      this.user.state = 'blocked';
      this.dialog = false;
      this.userStore.edit(JSON.stringify(this.user))
    },
    Unblock() {
      this.user.state = 'active';
      this.dialog = false;
      this.userStore.edit(JSON.stringify(this.user))
    },
    Delete() {
      this.dialog = false;
      this.userStore.delete(JSON.stringify(this.user))
    },
  },
  computed: {
    filteredUsers() {
            if(this.isFilter) {
                return this.users.filter(user => user.name.startsWith(this.search))
            }else if(this.search == ''){
              return this.users
            }else {
                return this.users
            }
          }
  },
  async created () {
    await this.userStore.fetchAllUsers();
    this.users = this.userStore.getUsers
  },
};
</script>

<style scoped>
@import "../assets/styles/admin.css";
</style>
