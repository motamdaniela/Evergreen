<template>

<div class="list">
      <div class="grid-item" v-for="activity in FilteredActivities">
        <v-card
          class="mx-auto"
          max-width="400"
          id="card"
        >
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
              <button class="btn-card btnP" @click="open = true; this.activity = activity">Ver mais</button>
            </div>
          </div>
        </v-card>
      </div>
    </div>
    
    </template>
    
    <script>
    import { useUsersStore } from "@/stores/User";
    import { useActivityStore } from "@/stores/Activity";
    
    export default {
      setup() {
        const userStore = useUsersStore();
        const activityStore = useActivityStore();
    
        return { userStore, activityStore };
      },
      data() {
        return {
          activities: this.activityStore.getActivities,
          users: this.userStore.getUsers,
          dialog: false,
          isFilter: false,
        };
      },
      methods: {
        Edit() {
          this.user.password = this.newPassword;
          this.dialog = false;
          this.userStore.edit(JSON.stringify(this.user))
        },
        Block() {
          this.user.state = 'blocked';
          this.dialog = false;
          this.userStore.edit(JSON.stringify(this.user))
        },
        Unblock() {
          this.user.state = 'active';
          this.dialog = false;
          this.userStore.edit(JSON.stringify(this.user))
        },
        Delete() {
          this.dialog = false;
          this.userStore.delete(JSON.stringify(this.user))
        },
      },
      computed: {
        FilteredActivities() {
                  return this.activities.filter((activity) => activity.coordinator == this.userStore.getLogged)
              }
      },
    };
    </script>
    
    <style scoped>
    @import "../assets/styles/admin.css";
    </style>
    