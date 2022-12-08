<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
    data: () => ({
      drawer: false,
      group: null,
      collapse: false,
      offsetTop: 0,
      items: [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ],
    }),

    computed: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
        if(this.offsetTop > 0){
          this.collapse = true;
        }
      },
    },
  }
</script>

  <template>
      <v-layout>

        <v-app-bar
        color="transparent"
        flat
        :collapse="collapse"
        >
        
        <v-app-bar-title>
          <img src="./assets/logored.svg" style="width: 20%; margin-top: 0.5%">
        </v-app-bar-title>
        
        <v-spacer></v-spacer>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
        </nav>

        
        <v-app-bar-nav-icon id="ddmenu" variant="text" @click.stop="drawer = !drawer">=</v-app-bar-nav-icon>
      </v-app-bar>
      
      <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
      >
      <v-list 
      :items="items"
      ></v-list>
    </v-navigation-drawer>

    <v-main>

      
    </v-main>
    </v-layout>
  <RouterView />
</template>
