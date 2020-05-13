<template>
  <v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
   <v-list>
      <v-list-item
        v-for="link of links"
        :key="link.title"
        :to="link.url"
      >
        <v-list-item-icon>
          <v-icon>{{link.icon}}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="link.title"></v-list-item-title>
        </v-list-item-content>

  
      </v-list-item>
      <v-list-item
        v-if="isUserLoggedIn"
        @click="loggedOut"
      >
        <v-list-item-icon>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="'Logout'"></v-list-item-title>
        </v-list-item-content>

  
      </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue accent-3"
      dense
      dark>

      <v-app-bar-nav-icon 
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      >
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Add application</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        text
        v-for="link of links"
        :key="link.title"
        :to="link.url"
        class="hidden-sm-and-down"
      >
        <v-icon left>
         {{link.icon}}
        </v-icon>
        {{link.title}}
      </v-btn>
      <v-btn
        text
        dark
        v-if="isUserLoggedIn"
        class="hidden-sm-and-down"
        @click="loggedOut"
      >
        <v-icon left>
          mdi-exit-to-app
        </v-icon>
        Logout
      </v-btn>    
    </v-app-bar>

    <v-content>

        <router-view></router-view>

    </v-content>
    <template v-if="error">
      <v-snackbar
        color="error"  
        :multi-line="true"
        :timeout="5000"
        :value="true"
        @input="closeError"
      >
        {{ error }}
        <v-btn
          dark
          text
          @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
 
  data: () => ({
    drawer: false,
  }),
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          {title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders'},
          {title: 'New ad', icon: 'mdi-note-plus-outline', url: '/new'},
          {title: 'My ads', icon: 'mdi-format-list-bulleted', url: '/list'}
        ]
      }
      return [
        {title: 'Login', icon: 'mdi-lock', url: '/login'},
        {title: 'Registration', icon: 'mdi-face', url: '/registration'},
      ]
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    loggedOut () {
      this.$store.dispatch('loggedOut')
      this.$router.push('/')
    }
  }

};
</script>

<style>
  .pointer {
    cursor: pointer;
  }
</style>
