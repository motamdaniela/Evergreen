<template>
  <div>
    <v-dialog class="dialog" v-model="dialog">
      <div class="fieldPklight modal actModal">
        <v-card elevation="0" color="#F9F9F9" v-if="this.action != 'edit'">
          <v-card-title>Aviso!</v-card-title>
          <v-card-text>
            <p v-if="this.action == 'block' && this.user.state == 'active'">
              Tem a certeza que pretende bloquear o utilizador
              <b>{{ this.user.name }}</b> ?
            </p>
            <p
              v-else-if="this.action == 'block' && this.user.state == 'blocked'"
            >
              Tem a certeza que pretende voltar a ativar o utilizador
              <b>{{ this.user.name }}</b> ?
            </p>
            <p v-if="this.action == 'delete'">
              Tem a certeza que pretende eliminar o utilizador
              {{ this.user.name }}
              <b> permanentemente</b> ?
            </p>
          </v-card-text>
          <v-card-actions>
            <button
              v-if="this.action == 'block'"
              class="btn-page btnPk"
              @click="Block"
            >
              Confirmar
            </button>
            <button
              v-if="this.action == 'delete'"
              class="btn-page btnPk"
              @click="Delete"
            >
              Confirmar
            </button>
            <button class="btn-page btnPklight" @click="dialog = false">
              Cancelar
            </button>
          </v-card-actions>
        </v-card>

        <v-card elevation="0" color="#F9F9F9" v-else>
          <v-card-text>
            <label for="pass" class="semiTitle">Nova palavra-passe</label>
            <br />
            <input
              class="input"
              id="pass"
              v-model="newPassword"
              type="password"
            />
            <br />
            <label v-if="this.newPassword" for="passConf" class="semiTitle"
              >Confirme a palavra-passe</label
            >
            <br />
            <input
              v-if="this.newPassword"
              class="input"
              id="passConf"
              v-model="newPasswordConf"
              type="password"
            />
            <v-alert
              class="errorAlert"
              type="error"
              color="#E9674D"
              v-if="error"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <button
              v-if="this.newPassword"
              class="btn-page btnPk"
              @click="Edit"
            >
              Guardar
            </button>
            <button class="btn-page btnPklight" @click="dialog = false">
              Cancelar
            </button>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>
  </div>

  <!-- page content -->
  <div>
    <h1 class="title">
      <img
        class="backbtn"
        onclick="history.back()"
        src="../assets/icons/icones/arrowback.svg"
      />
      <span>Utilizadores</span>
    </h1>
  </div>

  <div class="searchbar">
    <input
      class="inputSmall"
      v-model="search"
      type="text"
      :v-bind="search ? (isFilter = true) : (isFilter = false)"
    />
    <img id="searchicon" src="../assets/icons/icones/search.svg" />
  </div>

  <div v-for="user in filteredUsers">
    <div v-if="user.type == 'user'" class="boardY board">
      <img :src="user.photo" id="profilePic" />
      <div class="textInfo">
        <h3>
          <b>{{ user.name }}</b>
        </h3>
        <p>{{ user.school }} • {{ user.email }}</p>
      </div>
      <div class="btnGroup">
        <button
          class="btn-page btnPklight"
          @click="
            dialog = true;
            this.action = 'edit';
            this.user = user;
          "
        >
          Editar
        </button>
        <button
          v-if="user.state == 'active'"
          class="btn-page btnY"
          @click="
            dialog = true;
            this.action = 'block';
            this.user = user;
          "
        >
          Bloquear
        </button>
        <button
          v-if="user.state != 'active'"
          class="btn-page btnB"
          @click="
            dialog = true;
            this.action = 'block';
            this.user = user;
          "
        >
          Ativar
        </button>
        <button
          class="btn-page btnR"
          @click="
            dialog = true;
            this.action = 'delete';
            this.user = user;
          "
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
  <br />
  <div v-for="user in filteredUsers">
    <div v-if="user.type != 'user'" class="boardY board">
      <img :src="user.photo" id="profilePic" />
      <div class="textInfo">
        <h3>
          <b>{{ user.name }}</b>
        </h3>
        <p>{{ user.email }}</p>
      </div>
      <div>
        <button
          class="btn-page btnPklight"
          @click="
            dialog = true;
            this.action = 'edit';
            this.user = user;
          "
        >
          Editar
        </button>
        <button
          class="btn-page btnR"
          @click="
            dialog = true;
            this.action = 'delete';
            this.user = user;
          "
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/User";
import { useActivityStore } from "@/stores/Activity";
import { useMissionStore } from "@/stores/Mission";
import { useSuggestionStore } from "@/stores/ActivitySuggestion";
import { useOccurrenceStore } from "@/stores/Occurrence";

export default {
  setup() {
    const userStore = useUsersStore();
    const activityStore = useActivityStore();
    const missionStore = useMissionStore();
    const occurrenceStore = useOccurrenceStore();

    return { userStore, activityStore, missionStore, occurrenceStore };
  },
  data() {
    return {
      users: [],
      dialog: false,
      action: "",
      user: "",
      newPassword: "",
      newPasswordConf: "",
      search: "",
      isFilter: false,
      error: "",
    };
  },
  methods: {
    async Edit() {
      if (this.newPassword == this.newPasswordConf) {
        await this.userStore.editUser(
          this.user._id,
          this.newPassword,
          this.newPasswordConf
        );
        this.dialog = false;
      } else {
        this.error = "Confirme que a palavra-passe coincide!";
      }
    },
    async Block() {
      if (this.user.state == "active") {
        await this.userStore.blockUser(this.user._id, "blocked");
      } else {
        await this.userStore.blockUser(this.user._id, "active");
      }
      await this.userStore.fetchAllUsers();
      this.users = this.userStore.getUsers;
      this.dialog = false;
    },
    async Delete() {
      await this.activityStore.delete(this.user._id);
      await this.occurrenceStore.delete(this.user._id);
      await this.missionStore.delete(this.user._id);
      await this.userStore.deleteUser(this.user._id);
      await this.userStore.fetchAllUsers();
      this.users = this.userStore.getUsers;
      this.dialog = false;
    },
  },
  computed: {
    filteredUsers() {
      console.log(this.users);
      if (this.isFilter) {
        return this.users.filter(
          (user) =>
            user.name.startsWith(this.search) ||
            user.email.startsWith(this.search)
        );
      } else if (this.search == "") {
        return this.users;
      } else {
        return this.users;
      }
    },
  },
  async created() {
    await this.userStore.fetchAllUsers();
    this.users = this.userStore.getUsers;
  },
};
</script>

<style scoped>
@import "../assets/styles/admin.css";
</style>
