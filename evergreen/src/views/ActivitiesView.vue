<template>
  <div>
    <v-dialog v-model="suggestion">
      <div class="fieldP modal sugModal">
        <button class="btnRound btnP" @click="suggestion = false">
          <img style="width: 15px" src="../assets/icons/icones/close.svg"/>
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
        <div v-if="+this.activity.begin > +this.userObj.loginDate">
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
        <div
          class="textRed"
          v-else-if="
            +this.activity.begin <= +this.userObj.loginDate &&
            +this.activity.end >= +this.userObj.loginDate
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
      <img src="../assets/images/flowerP.svg" alt=""/>Plano de Atividades
    </h1>

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
      <div class="grid-item" v-for="activity in activities">
        <v-card
          class="card"
          :class="'class' + activity.idTheme"
          max-width="400"
          v-if="+activity.end > +this.user.loginDate"
        >
          <img
            class="Sirv image "
            :data-src="activity.photo"
            height="219"
            width="380"
            alt=""
            cover
          />
          <!-- </v-img> -->
          <link
            class="image"
            rel="preload"
            as="image"
            :href="activity.photo"
          />

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
        <v-card class="mx-auto card gray" max-width="400" v-else>
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

    return { activityStore, missionStore, userStore, suggestionStore, themeStore };
  },

  name: "Activities",
  data() {
    return {
      activities: [],
      user: '',
      userObj: "",
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
      themes: [],
      themesPicked: [],
      getActivitiesDB: [],
    };
  },
  
  updated() {
    console.log('picked', this.themesPicked);
  },
  
  async created() {
    this.getActivitiesDB = await this.activityStore.fetchAllActivities();
    this.activities = this.getActivitiesDB.activities
    
    let thms_db = await this.themeStore.fetchAllThemes()
    this.themes = thms_db.themes
    console.log('viewthemes' , this.themes)
    // this.themes.forEach((theme) => console.log('themes' , theme.name))

    if(this.user == undefined || this.user == ''){
      await this.userStore.fetchLogged();
      this.logged = this.userStore.getLogged
    }

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
  },
  computed: {
    // async renderActivities(){
    //   await this.activityStore.fetchAllActivities()
    //   return this.activityStore.getActivities
    // },

    FilterThemes() {
      let filteredList = [];
      if (this.themesPicked.length <= 0) {
        this.activities = this.getActivitiesDB.activities
      } else {
        this.activities = this.getActivitiesDB.activities
        this.activities.forEach((activity) => {
            if (this.themesPicked.includes(activity.idTheme)) {
              filteredList.push(activity);
            }
          });
        console.log('filtered ', filteredList)
        this.activities = filteredList;
      }
    },
  },

};
</script>

<style scoped>
@import "../assets/styles/activities.css";
</style>
