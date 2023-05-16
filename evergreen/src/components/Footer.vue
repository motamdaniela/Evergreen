<template>
  <footer
    v-if="
      !(
        this.$route.name == 'login' ||
        this.$route.name == 'signUp' ||
        this.$route.name == 'Occurrence'
      )
    "
  >
    <div>
      <img src="../assets/logored.svg" width="150" height="30" alt=""/>
    </div>
    <br />
    <div>
      <a class="footerA" href="#">Beatriz Rodrigues</a>
      <a class="footerA" href="#">Daniela Monteiro</a>
      <a class="footerA" href="#">Daniela Moreira</a>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
