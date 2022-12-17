<template>
    <br>
    <h1 class="gradientPurple padding"><span>Atividades Inscritas</span></h1>
    <br>
    <div id="activities">

        <v-card class="mx-auto" max-width="400" id="card">
          <v-img
            class="image"
            src="https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg"
            height="219"
            width="380"
            cover
          >
          </v-img>

          <div class="cardText">
            <v-card-title>
              <b>Bancos de Jardim</b>
            </v-card-title>

            <div class="alignCard">
              <v-card-subtitle >
                <div><b>Maio e Junho <br> Campus 2</b></div>
              </v-card-subtitle>
              <button class="btn-card" id="btnP">
                Ver mais
              </button>
            </div>
            
          
          </div>
       
        </v-card>

        <v-card class="mx-auto" max-width="400" id="card">
          <v-img
            class="image"
            src="https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg"
            height="219"
            width="380"
            cover
          >
          </v-img>

          <div class="cardText">
            <v-card-title>
            <b>Bancos de Jardim</b>
          </v-card-title>

          
          <div class="alignCard">
              <v-card-subtitle >
                <div><b>Maio e Junho <br> Campus 2</b></div>
              </v-card-subtitle>
              <button class="btn-card" id="btnP">
                Ver mais
              </button>
            </div>
          </div>
        
        </v-card>

        <v-card class="mx-auto" max-width="400" id="card">
          <v-img
            class="image"
            src="https://thumbs.dreamstime.com/b/banco-do-jardim-52684013.jpg"
            height="219"
            width="380"
            cover
          >
          </v-img>

          <div class="cardText">
            <v-card-title>
            <b>Bancos de Jardim</b>
          </v-card-title>

          <div class="alignCard">
              <v-card-subtitle >
                <div><b>Maio e Junho <br> Campus 2</b></div>
              </v-card-subtitle>
              <button class="btn-card" id="btnP">
                Ver mais
              </button>
          </div>
          </div>
        </v-card>
        
    </div>
    <br>
    <button class="btn-page" id="btnP">Ver todas</button>

    <br><br>
    <h1 class="gradientPink padding"><span>Quadro de Líderes</span></h1>

    <div class="board">
      <img src="../assets/images/joana.jpg" id="profilePic">
      <p>Joana Gomes <br> Esmad</p>
      <p>15 atividades</p>
      <p>7 ocorrências</p>
      <p>100 pontos</p>
      <div class="firstPlace">1</div>
    </div>

    <div class="board">
      <img src="../assets/images/joana.jpg" id="profilePic">
      <p>Clara Tavares <br> Esmad</p>
      <p>11 atividades</p>
      <p>15 ocorrências</p>
      <p>60 pontos</p>
      <div class="secondPlace">2</div>
    </div>

    <div class="board">
      <img src="../assets/images/joana.jpg" id="profilePic">
      <p>Martim Martins <br> Esmad</p>
      <p>9 atividades</p>
      <p>5 ocorrências</p>
      <p>50 pontos</p>
      <div class="thirdPlace">3</div>
    </div>
    <button class="btn-page" id="btnPink">Ver todos</button>
    <!-- ^ this mf nao vai pro meio T-T  -->
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style> @import"../assets/styles/home.css"; </style>