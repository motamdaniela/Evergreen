<template>
  <div class="d-flex justify-center flex-row">
    <div class="carddiv">
      <img class="icon" src="src/assets/images/faqYellow.svg" />
      <v-card class="cardY">
        <RouterLink to="/Users"><h2 class="linkUsers"><span>Utilizadores</span></h2></RouterLink>
      </v-card>
    </div>

    <div class="carddiv">
      <img class="icon" src="src/assets/images/faqPurple.svg" />
          <v-card class="cardP">
          <RouterLink to="/ActivitiesList"><h2 class="linkActs"><span>Atividades</span></h2></RouterLink>
      </v-card>
    </div>

      <div class="carddiv">
        <img class="icon" src="src/assets/images/faqRed.svg" />
        <v-card  class="cardR">
            <RouterLink to="/Occurences"><h2 class="linkOcs"><span>Ocorrências</span></h2></RouterLink>
          </v-card>
      </div>
    </div>


    <v-row  class="d-flex justify-center flex-row">
      <div class="carddivTables">
        <p class="semiTitle">Inscriões conselho Eco-Escolas</p>
        <v-card class="cardG">
          <p v-if="councilUsers.length <= 0">Ainda não existem inscrições!</p>
          <div v-for="user in councilUsers">
            <v-row>
              <img :src="user.photo" id="profilePic"/>
              <p>{{ user.name }}</p>
            </v-row>
          </div>
  
        </v-card>
      </div>
  
      <div class="carddivTables">
        <p  class="semiTitle">Atividades próximas</p>
        <v-card class="cardG">
          
        </v-card>
      </div>
    </v-row>

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
      councilUsers: [],
    }
  },
  created() {
    this.users.forEach(user =>{
      if(user.council){
        this.councilUsers.push(user)
        alert(this.councilUsers)
      }
    })
  },
};
</script>

<style scoped>
@import "../assets/styles/admin.css";
</style>
