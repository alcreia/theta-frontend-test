<template>
  <v-container>
    <v-form 
      ref="form"    
      @submit.prevent>
      <v-row>
        <v-col
          cols="12"
          sm="4"
          md="3"
        >
          <v-text-field
            label="ID*"
            required
            v-model="e_id"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="8"
          md="9"
        >
          <v-text-field
            label="Name*"
            required
            v-model="e_name"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Department*"
            required
            v-model="e_dept"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-btn
      color="blue darken-1"
      text
      @click="addEmployee"
    >
      Save
    </v-btn>
    <v-btn
      color="red"
      text
      @click="addEmployee"
    >
      Delete
    </v-btn>
  </v-container>
          
</template>

<script>
export default {
    name: "EditEmployee",
    data: () => ({
        error: "",
        employee: [],
        e_id:'',
        e_name:'',
        e_dept:''
    }),
    mounted() {
        fetch("http://localhost:3000/api/employees/")
        .then(response => response.json())
        .then(result => {
            this.employee = result;
        });
    },
    methods: {
      addEmployee() {
          let data = {
              id: this.e_id,
              name: this.e_name,
              department: this.e_dept
          };
          this.$http.post("http://localhost:3000/api/employees", data)
          .then(response => window.location(response.data.Location));
      },
    }
}
</script>