<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1>Theta Frontend Test</h1>
      </div>
    </v-app-bar>

    <v-main class="px-5">
      <EmployeesList/>
    </v-main>
  </v-app>
</template>

<script>
import EmployeesList from './components/EmployeesList';

export default {
  name: 'App',

  components: {
    EmployeesList
  },

  data: () => ({
    //
  }),
};
</script>
