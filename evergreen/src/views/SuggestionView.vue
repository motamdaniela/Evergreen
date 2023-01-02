<template>
  <div>
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
</template>

<script>
import { useSuggestionStore } from "@/stores/ActivitySuggestion";
import { useUsersStore } from "@/stores/User";
import { useActivityStore } from "@/stores/Activity";

export default {
  setup() {
    const suggestionStore = useSuggestionStore();

    const activityStore = useActivityStore();

    const userStore = useUsersStore();

    return { suggestionStore, userStore, activityStore };
  },
  data() {
    return {
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
    };
  },
  methods: {
    onSubmit() {
      this.form.id = this.suggestionStore.getSuggestions.length;
      this.form.user = this.userStore.getLogged;
      this.suggestionStore.addSuggestions(this.form);
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped></style>
