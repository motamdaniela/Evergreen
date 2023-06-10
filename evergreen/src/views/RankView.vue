<template>
  <div id="backBtnDiv">
    <button @click="$router.go(-1)">
      <img id="backBtnRank" src="../assets/icons/icones/arrowback.svg" />
    </button>
    <h1>Quadro de Líderes</h1>
  </div>
  <div v-for="user in users">
    <div class="board">
      <img :src=user.photo id="profilePic" />
      <p>
        {{ user.username }} <br />
        {{ user.school }}
      </p>
      <p>{{ user.points }} pontos</p>
      <p>{{ user.activitiesCompleted }} atividades</p>
      <p>{{ user.occurrencesDone }} ocorrências</p>
      <div class="firstPlace">{{ users.indexOf(user) + 1 }}</div>
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
    };
  },
  async created() {
    if(this.users == undefined || this.users == ''){
      await this.userStore.fetchAllUsers();
      this.users = this.userStore.getUsers
    }

    this.users.sort((a,b)=> b.points - a.points || b.activities - a.activities || b.occurences - a.occurences);
    
  },
  methods: {},
};
</script>

<style scoped>

h1{
  font-family:gliker;
  margin-top:30px;
}
#backBtnDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#backBtnRank {
  width: 50px;
  z-index: 1;
  margin-top: 60%;
  margin-left: -100%;
}
#backBtnRank:hover{
  content: url("src/assets/icons/iconesthicc/arrowback.svg");
}
</style>
