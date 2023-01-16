<template>
<div>
    <v-dialog v-model="dialog">
      <div class="fieldPklight">
      <v-card v-if="this.action != 'edit'" >
        <v-card-title>Aviso!</v-card-title>
        <v-card-text>
          <p v-if="this.action == 'block'">Tem a certeza que pretende bloquear o utilizador
            <b>{{ this.user.name }}</b>
            por <b> 3dias</b> ?
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
          <img class="backbtn" onclick="history.back()" src="../assets/icons/icones/back.svg">
          <span>Utilizadores</span>
        </h1>
    </div>

  <button class="btn-page">Adicionar Admin</button>
  <button class="btn-page">Adicionar Utilizador</button>
  <div v-for="user in users">
    <div v-if="user.type != 'admin'" class="boardY board">
      <img :src="user.photo" id="profilePic" />
      <p>{{ user.name }}</p>
      <div>
        <button class="btn-page btnPklight" @click="dialog = true; this.action = 'edit'; this.user = user">Editar</button>
        <button v-if="user.state == 'active'" class="btn-page btnY" @click="dialog = true; this.action = 'block'; this.user = user">Bloquear</button>
        <button v-if="user.state != 'active'" class="btn-page btnB" @click="dialog = true; this.action = 'unblock'; this.user = user">Ativar</button>
        <button class="btn-page btnR" @click="dialog = true; this.action = 'delete'; this.user = user">Eliminar</button>
      </div>

    </div>
  </div>

  <div v-for="user in users" >
    <div v-if="user.type == 'admin'" class="board">
      <img :src="user.photo" id="profilePic" />
      <p>{{ user.name }}</p>
      <button class="btn-page" v-on:click="AlertEdit(user)">Editar</button>
      <button class="btn-page">Bloquear</button>
      <button class="btn-page">Eliminar</button>
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
      users: this.userStore.getUsers,
      dialog: false,
      action: '',
      user: '',
      newPassword: '',
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
    }
  },
};
</script>

<style lang="scss" scoped></style>
