<template>
  <div class="div" id="firstdiv">
    <div id="text0">
      <h1>
        Tudo o que precisas para o teu percurso <br />
        no Eco-Escolas num só sítio com
      </h1>
      <h1 class="gradientGreen padding"><span>Evergreen</span></h1>
      <p>
        Damos-te as boas-vindas ao Evergreen e à comunidade Eco-Escolas! <br />
        Pronto para tornares o mundo mais verde?
      </p>
      <RouterLink to="/signUp">
        <button class="btn-page" id="btn0">Começar</button>
      </RouterLink>
    </div>
  </div>

  <div>
    <img id="landingImg1" src="../assets/images/aboutPink.svg" />
    <div class="midDiv" id="div1">
      <div id="text1">
        <img src="../assets/images/atividades.svg" id="img1Small" />
        <h1 class="title">Participa em atividades</h1>
        <p class="desc">
          O projeto Eco-Escolas tem tantas atividades divertidas que não vais
          querer perder! Aposto que vais adorar pelo menos uma e, com sorte vais
          adorar todas! Mas para descobrires isso tens que te inscrever em pelo
          menos uma!
        </p>
        <RouterLink to="/signUp">
          <button class="btn-page" id="btn1">Começa já</button>
        </RouterLink>
      </div>
      <img src="../assets/images/atividades.svg" id="img1" />
    </div>
  </div>

  <div>
    <img id="landingImg2" src="../assets/images/landingYellow.svg" />
    <div class="midDiv" id="div2">
      <img src="../assets/images/ocorrencias.svg" id="img2" />
      <div id="text2">
        <img src="../assets/images/ocorrencias.svg" id="img2Small" />
        <h1 class="title" id="title2">Regista Ocorrências</h1>
        <p class="desc">
          Já alguma vez reparaste que a torneira da casa de banho da tua escola
          estava a pingar? Ou que a luz da sala de aula estava a piscar? Esta é
          a tua oportunidade de fazer algo acerca disso! Quando registas uma
          ocorrência passas a informação aos teus professores e docentes que
          podem ajudar a resolver o problema e evitar desperdício.
        </p>
        <RouterLink to="/signUp">
          <button class="btn-page" id="btn2">Começa já</button>
        </RouterLink>
      </div>
    </div>
  </div>

  <div>
    <img id="landingImg3" src="../assets/images/aboutPurple.svg" />
    <div class="midDiv" id="div3">
      <div id="text3">
        <img src="../assets/images/missoes.png" id="img3Small" />
        <h1 class="title">Completa missões</h1>
        <p>
          Quando interages com a plataforma não estás só a ajudar o planeta,
          também estas a ganhar recompensas! Completa todas as missões que temos
          para ti e explora tudo o que o Eco-Escolas tem para ofereçer enquanto
          te divertes!
        </p>
        <RouterLink to="/signUp">
          <button class="btn-page" id="btn3">Começa já</button>
        </RouterLink>
      </div>
      <img src="../assets/images/missoes.png" id="img3" />
    </div>
  </div>

  <div>
    <img id="landingImg4" src="../assets/images/landingPink.svg" />
    <div id="lastdiv">
      <h1>
        Estás pronto para dar o próximo passo para ajudar <br />
        o teu planeta?
      </h1>
      <RouterLink to="/signUp">
        <button class="btn-page" id="btn4">Começa já</button>
      </RouterLink>
    </div>
  </div>

  <div id="divBtnUp">
    <button class="btnUp" @click.native="scrollToTop">
      <img
        style="width: 50px; height: 50px"
        src="../assets/icons/icones/up.svg"
      />
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style>
@import "../assets/styles/landing.css";
</style>
