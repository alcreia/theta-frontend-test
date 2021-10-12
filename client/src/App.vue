<template>
  <v-app>
    <v-app-bar
      app
      color="light-blue lighten-1"
      flat
    >
      <div class="d-flex align-center">
        <router-link 
          to="/" 
          style="text-decoration: none; color: white; font-weight=700" >
          Theta Frontend Test
        </router-link>
      </div>
    </v-app-bar>

    <v-main class="px-5">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
