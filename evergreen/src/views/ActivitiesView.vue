<template>
  <div>
    <!-- modal suggestion -->
    <v-dialog v-model="suggestion">
      <div class="fieldP modal sugModal">
        <button class="btnRound btnP" @click="suggestion = false">
          <img style="width: 15px" src="../assets/icons/icones/close.svg" />
        </button>

        <form @submit.prevent="onSubmit">
          <br />
          <div id="sugCont">
            <div id="colL">
              <h3>Tema:</h3>
              <select v-model="form.theme" class="input" required>
                <option v-for="theme in themes">{{ theme.name }}</option>
              </select>

              <h3>Descrição:</h3>
              <textarea
                class="textBox"
                rows="5"
                height="60px"
                type="text"
                v-model="form.description"
                required
              >
              </textarea>
              <br /><br />
              <h3>Objetivos:</h3>
              <textarea
                class="textBox"
                rows="5"
                height="60px"
                type="text"
                v-model="form.objectives"
                required
              ></textarea>
            </div>
            <div id="colR">
              <h3>Metas:</h3>
              <textarea
                class="textBox"
                rows="5"
                height="60px"
                type="text"
                v-model="form.goals"
                required
              ></textarea>
              <br /><br />
              <h3>Recursos:</h3>
              <textarea
                class="textBox"
                rows="5"
                height="60px"
                type="text"
                v-model="form.resources"
                required
              ></textarea>
            </div>
          </div>
          <button type="submit" class="btn-page btnP" id="modBtn">
            Submeter
          </button>
        </form>
      </div>
    </v-dialog>

    <!-- confirm suggestion sent -->
    <v-dialog v-model="openActSug">
      <div class="fieldG actSugModal">
        <v-card elevation="0" color="#F9F9F9">
          <v-card-actions>
            <button
              class="btnRound btnG"
              @click="(openActSug = false), (suggestion = false)"
            >
              <img style="width: 15px" src="../assets/icons/icones/close.svg" />
            </button>
          </v-card-actions>
          <div id="actSugCont">
            <img class="actSugModalImg" src="../assets/images/correct.png" />
            <br /><br />
            <h2>A sua sugestão foi registada com sucesso!</h2>
          </div>
        </v-card>
      </div>
    </v-dialog>

    <!-- each activity -->
    <v-dialog v-model="open" scrollable>
      <div class="fieldPklight modal actModal">
        <button class="btnRound btnPklight" @click="open = false">
          <img style="width: 15px" src="../assets/icons/icones/close.svg" />
        </button>
        <div class="contentModal">
          <div class="row1">
            <img :src="this.activity.photo" class="imgModal" />
            <div class="rowText">
              <h2>{{ this.activity.title }}</h2>
              <br />
              <h3>Data:</h3>
              <p>{{ this.activity.date }}</p>
              <br />
              <h3>Local:</h3>
              <p>{{ this.activity.place }}</p>
            </div>
          </div>

          <h3>Diagnóstico:</h3>
          <p>{{ this.activity.description[0] }}</p>
          <h3>Objetivos:</h3>
          <p>{{ this.activity.description[1] }}</p>
          <h3>Metas:</h3>
          <p>{{ this.activity.description[2] }}</p>
        </div>
        <div v-if="+this.activity.begin > +this.user.loginDate">
          <input
            v-if="!changeBtn(this.activity)"
            type="button"
            class="btn-page btnG btnModal"
            id="sub"
            value="Inscrever"
            @click="subscribe(this.activity)"
          />
          <input
            v-else
            type="button"
            class="btn-page btnR btnModal"
            id="unsub"
            value="Anular Inscrição"
            @click="subscribe(this.activity)"
          />
        </div>
        <div
          class="textRed"
          v-else-if="
            +this.activity.begin <= +this.user.loginDate &&
            +this.activity.end >= +this.user.loginDate
          "
        >
          <span>
            Esta atividade está a ser realizada e, por isso, não aceita mais
            inscrições/anulações de inscrição.</span
          >
        </div>
        <div v-else class="textRed">
          <span> Esta atividade já acabou.</span>
        </div>
      </div>
    </v-dialog>

    <h1 class="title">
      <img src="../assets/images/flowerP.svg" alt="" />Plano de Atividades
    </h1>

    <!-- filter -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <button class="btn-page btnP btns" id="btnFiltrar" v-bind="props">
          Filtrar
        </button>
      </template>

      <v-list id="menu">
        <v-checkbox
          v-for="theme in themes"
          v-model="themesPicked"
          :label="theme.name"
          :color="theme.color"
          :value="theme._id"
          density="compact"
          hide-details
          >{{ FilterThemes }}
        </v-checkbox>
      </v-list>
    </v-menu>

    <button class="btn-page btnP btns" @click="suggestion = true">
      Sugerir Atividades
    </button>

    <div class="list">
      <div class="grid-item" v-for="activity in this.activities">
        <v-card
          class="card"
          :class="'class' + activity.idTheme"
          max-width="400"
          v-if="+activity.end > +this.user.loginDate"
        >
          <img
            class="Sirv image"
            :data-src="activity.photo"
            height="219"
            width="380"
            alt=""
            cover
          />
          <!-- </v-img> -->
          <link class="image" rel="preload" as="image" :href="activity.photo" />

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
                class="btn-card"
                :class="'btn' + activity.idTheme"
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
        <v-card class="card gray" max-width="400" v-else>
          <img
            class="Sirv image imgGray"
            :data-src="activity.photo"
            height="219"
            width="380"
            alt=""
            cover
          />
          <!-- </img> -->

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
                class="btn-card btnGray"
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
import { useThemesStore } from "@/stores/Theme";
import { useSuggestionStore } from "@/stores/ActivitySuggestion";

export default {
  setup() {
    const activityStore = useActivityStore();
    const missionStore = useMissionStore();
    const userStore = useUsersStore();
    const suggestionStore = useSuggestionStore();
    const themeStore = useThemesStore();

    return {
      activityStore,
      missionStore,
      userStore,
      suggestionStore,
      themeStore,
    };
  },

  name: "Activities",
  data() {
    return {
      activities: [],
      activity: {},
      user: "",
      open: false,
      openFilter: false,
      suggestion: false,
      openActSug: false,
      isFilter: true,
      form: {
        theme: "",
        description: "",
        objectives: "",
        goals: "",
        resources: "",
      },
      themes: [],
      themesPicked: [],
    };
  },

  async created() {
    if (this.activities == undefined || this.activities == "") {
      await this.activityStore.fetchAllActivities();
      this.activities = this.activityStore.getActivities;
    }

    if (this.themes == undefined || this.themes == "") {
      await this.themeStore.fetchAllThemes();
      this.themes = this.themeStore.getThemes;
    }

    if (this.user == undefined || this.user == "") {
      await this.userStore.fetchLogged();
      this.user = this.userStore.getLogged;
    }
  },

  methods: {
    async onSubmit() {
      await this.suggestionStore.submit(
        this.form.theme,
        this.form.description,
        this.form.objectives,
        this.form.goals,
        this.form.resources
      );
      this.openActSug = true;
    },
    async subscribe(activity) {
      this.activity = await this.activityStore.subscribeActivity(activity);
      await this.activityStore.fetchAllActivities();
      this.activities = this.activityStore.getActivities;

      await this.missionStore.getAllMissions();
      this.missionStore.completeMission(this.userStore.getLogged, 0);
    },
    changeBtn(activity) {
      let u = activity.users.find((user) => user.user == this.user._id);
      if (u) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    FilterThemes() {
      let filteredList = [];
      if (this.themesPicked.length <= 0) {
        this.activities = this.activityStore.getActivities;
      } else {
        this.activities = this.activityStore.getActivities;
        this.activities.forEach((activity) => {
          if (this.themesPicked.includes(activity.idTheme)) {
            filteredList.push(activity);
          }
        });
        console.log("filtered ", filteredList);
        this.activities = filteredList;
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/activities.css";
</style>
