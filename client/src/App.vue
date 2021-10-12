<template>
  <v-app>
    <v-app-bar
      app
      color="light-blue lighten-1"
      dark
    >
      <div class="d-flex align-center">
        <h1>Theta Frontend Test</h1>
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
<style>
a {
  text-decoration: none;
  color: aliceblue;
}

</style>
