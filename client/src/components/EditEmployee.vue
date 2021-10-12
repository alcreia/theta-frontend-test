<template>
  <v-container class="px-12 my-4">
    <h2>Edit Employee Data</h2>
    <v-form 
      ref="form"    
      @submit.prevent
      class="my-5 px-8">
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
      class="white--text mx-2"
      @click="saveEmployee"
    >
      Save
    </v-btn>
    <v-dialog
      max-width="600px"
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          v-bind="attrs"
          v-on="on"
          class="white--text mx-2"
        >
          Delete
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Delete Employee Data</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <p>Are you sure you want to delete this data?</p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            No
          </v-btn>
          <v-btn
            color="red"
            @click="deleteEmployee"
            class="white--text"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        e_dept:'',
        dialog: false
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
      saveEmployee() {
        let data = {
            id: this.e_id,
            name: this.e_name,
            department: this.e_dept
        };
        this.$http.put("http://localhost:3000/api/employees/"+ this.$route.params.id, data)
          .then(response => {
            console.log(response);
            this.$router.back();
          });
      },
      deleteEmployee() {
          this.$http.delete("http://localhost:3000/api/employees/"+ this.$route.params.id)
          .then(response => {
            console.log(response);
            this.$router.back();
          });
      },
    }
}
</script>