<template>
    <br>
    <div id="activities">
        <h1 class="underlinePurple">Atividades Inscritas</h1>
    </div>

    <v-card class="mx-auto" max-width="400">
    <v-img
    src="./assets/images/image.png"
      height="200"
      cover
      padding="10px"
    >
    </v-img>

    <v-card-subtitle class="pt-4">
      Number 10
    </v-card-subtitle>

    <v-card-text>
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange">
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style> @import"../assets/styles/home.css"; </style>