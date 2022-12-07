<template>
    <v-layout>
      <v-app-bar
        color="primary"
        density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon>=</v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Evergreen</v-app-bar-title>

        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="n in 8"
              :key="n"
              cols="3"
            >
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
</template>