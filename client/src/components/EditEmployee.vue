<template>
  <v-container>
    <h1>Edit Employee Data</h1>
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
    >
      Save
    </v-btn>
    <v-btn
      color="red"
      text
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
        let id = this.$route.params.id
        fetch("http://localhost:3000/api/employees/"+ id)
        .then(response => response.json())
        .then(result => {
            this.employee = result[0];
            this.e_id = this.employee.id;
            this.e_name = this.employee.name;
            this.e_dept = this.employee.department;
        });
    },
    methods: {
    }
}
</script>