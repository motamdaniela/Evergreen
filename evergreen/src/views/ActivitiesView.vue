<template>
  <div>
    <v-dialog v-model="suggestion">
      <div class="fieldPklight modal">
        <button class="btn-page btnPklight" @click="suggestion = false">
          x
        </button>
        <h1>Sugerir Atividade</h1>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="onSubmit"
        >
          Tema:
          <select v-model="form.theme">
            <option v-for="theme in themes">{{ theme.name }}</option>
          </select>
          Descrição:
          <input type="text" v-model="form.description" />
          Objetivos:
          <input type="text" v-model="form.objectives" />
          Metas:
          <input type="text" v-model="form.goals" />
          Recursos:
          <input type="text" v-model="form.resources" />

          <button type="submit" class="btn-page">Submeter</button>
        </v-form>
      </div>
    </v-dialog>
    <v-dialog v-model="open">
      <div class="fieldPklight modal actModal">
        <button class="btnRound btnPklight" @click="open = false">
          <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
        </button>
        <div class="contentModal">
          <div class="row1">
            <img :src="this.activity.photo" class="imgModal" />
            <div class="rowText">
              <h2>{{ this.activity.title }}</h2>
              <br>
              <h3>Data:</h3>
              <p>{{ this.activity.date }}</p>
              <br>
              <h3>Local:</h3>
              <p>{{ this.activity.place }}</p>
            </div>
          </div>
          
          <h3>Diagnóstico:</h3>
          <p>{{ this.activity.desc1 }}</p>
          <h3>Objetivos:</h3>
          <p>{{ this.activity.desc2 }}</p>
          <h3>Metas:</h3>
          <p>{{ this.activity.desc3 }}</p>
        </div>
        <input
          v-if="!changeBtn(this.activity)"
          type="button"
          class="btn-page btnG btnModal"
          id="sub"
          value="Inscrever"
          @click="subscribe(this.activity), changeBtn(this.activity)"
        />
        <input
          v-else
          type="button"
          class="btn-page btnR btnModal"
          id="unsub"
          value="Anular Inscrição"
          @click="unsubscribe(this.activity), changeBtn(this.activity)"
        />
      </div>
    </v-dialog>

    <h1 class="title">
      <img src="../assets/images/flowerP.svg" />Plano de Atividades
    </h1>

    <!-- <button class="btn-card btnP" @click="openFilter = true">Filtrar</button>
    <v-dialog v-model="openFilter">
      <div class="fieldP filterModal">
        <button
          class="btn-page btnP"
          @click="
            openFilter = false;
            selectedThemes();
          "
        >
          x
        </button>
        <v-checkbox
          v-for="theme in themes"
          v-model="themesPicked"
          :label="theme.name"
          :color="theme.color"
          :value="theme.id"
          density="compact"
          hide-details
        >
        </v-checkbox>
      </div>
    </v-dialog> -->

    <v-menu>
      <template v-slot:activator="{ props }">
        <button class="btn-page btnP btns" id="btnFiltrar" v-bind="props">Filtrar</button>
      </template>

      <v-list id="menu">
        <!-- <v-list-item v-for="(theme, index) in themes" :key="index"> -->
        <v-checkbox
          v-for="theme in themes"
          v-model="themesPicked"
          :label="theme.name"
          :color="theme.color"
          :value="theme.id"
          density="compact"
          hide-details
          >{{ FilterThemes }}
        </v-checkbox>
        <!-- </v-list-item> -->
      </v-list>
    </v-menu>

    <!-- <v-select
    v-model="themesPicked"
    :items="themeNames"
    label="Select"
    multiple
  >
      <v-list-item
          value="title"
          disabled
        ></v-list-item>
</v-select> -->

    <button class="btn-page btnP btns" @click="suggestion = true">
      Sugerir Atividades
    </button>

    <div class="list">
      <div class="grid-item" v-for="activity in activities">
        <v-card class="mx-auto" max-width="400" id="card">
          <v-img
            class="image"
            :src="activity.photo"
            height="219"
            width="380"
            cover
          >
          </v-img>

          <div class="cardText">
            <v-card-title>
              <b>{{ activity.title }}</b>
            </v-card-title>

            <div class="alignCard">
              <v-card-subtitle>
                <div>
                  <b
                    >{{ activity.date }} <br />
                    {{ activity.place }}</b
                  >
                </div>
              </v-card-subtitle>
              <button
                class="btn-card btnP"
                @click="
                  open = true;
                  this.activity = activity;
                "
              >
                Ver mais
              </button>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useActivityStore } from "@/stores/Activity";
import { useUsersStore } from "@/stores/User";
import { useMissionStore } from "@/stores/Mission";
import { useSuggestionStore } from "@/stores/ActivitySuggestion";

export default {
  setup() {
    const activityStore = useActivityStore();
    const missionStore = useMissionStore();
    const userStore = useUsersStore();
    const suggestionStore = useSuggestionStore();

    return { activityStore, missionStore, userStore, suggestionStore };
  },
  created() {
    this.themes.forEach((theme) => this.themeNames.push(theme.name));
  },
  name: "Activities",
  data() {
    return {
      activities: [],
      user: this.userStore.getLogged,
      open: false,
      openFilter: false,
      suggestion: false,
      isFilter: true,
      form: {
        id: 0,
        theme: "",
        description: "",
        objectives: "",
        goals: "",
        resources: "",
        user: "",
      },
      themes: this.activityStore.getThemes,
      themeNames: [],
      themesPicked: [],
    };
  },
  created() {
    this.activities = this.activityStore.getActivities;
  },
  updated() {
    console.log(this.themesPicked);
  },
  methods: {
    subscribe(activity) {
      console.log(activity.id);
      this.activityStore.updateUsers(this.user, activity.id);
      this.missionStore.completeMission(this.user, 0);
    },
    unsubscribe(activity) {
      activity.users = activity.users.filter((e) => e != this.user);
    },
    changeBtn(activity) {
      let u = activity.users.find((user) => user == this.user);
      if (u) {
        return true;
      } else {
        return false;
      }
    },
    onSubmit() {
      this.form.id = this.suggestionStore.getSuggestions.length;
      this.form.user = this.userStore.getLogged;
      this.suggestionStore.addSuggestions(this.form);
      location.reload();
    },
    selectedThemes() {
      console.log(this.themesPicked);
    },
  },
  computed: {
    FilterThemes() {
      let filteredList = [];
      if (this.themesPicked.length <= 0) {
        this.activities = this.activityStore.getActivities;
      } else {
        this.activityStore.getActivities.forEach((activity) => {
          this.themesPicked.forEach((theme) => {
            if (theme == activity.idTheme) {
              filteredList.push(activity);
            }
          });
        });
        this.activities = filteredList;
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/activities.css";
</style>
