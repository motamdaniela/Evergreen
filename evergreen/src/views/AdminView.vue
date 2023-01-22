<template>
  <div class="d-flex justify-center flex-row">
    <div class="carddiv">
      <img class="icon" src="src/assets/images/faqYellow.svg" />
      <v-card class="cardY">
        <RouterLink to="/Users">Utilizadores</RouterLink>
      </v-card>
    </div>

    <div class="carddiv">
      <img class="icon" src="src/assets/images/faqPurple.svg" />
          <v-card class="cardP">
          <RouterLink to="/ActivitiesList">Atividades</RouterLink>
      </v-card>
    </div>

      <div class="carddiv">
        <img class="icon" src="src/assets/images/faqRed.svg" />
        <v-card  class="cardR">
            <RouterLink to="/Occurences">Ocorrências</RouterLink>
          </v-card>
      </div>
    </div>


    <v-row  class="d-flex justify-center flex-row">
      <div class="carddivTables">
        <p>Inscriões conselho Eco-Escolas</p>
        <v-card class="cardG">
  
        </v-card>
      </div>
  
      <div class="carddivTables">
        <p>Atividades prócimas</p>
        <v-card class="cardG">
          
        </v-card>
      </div>
    </v-row>

</template>

<script>
export default {};
</script>

<style scoped>
@import "../assets/styles/admin.css";
</style>
