<template>
  <v-container>
    <h1>Employees List</h1>
    <v-dialog
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          + Add New
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Employee Data</span>
        </v-card-title>
        <v-card-text>
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
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="addEmployee"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-simple-table class="my-2">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="employee in employees"
        :key="employee.id">
          <td>{{employee.id}}</td>
          <td>{{employee.name}}</td>
          <td>{{employee.department}}</td>
          <td>
            <v-btn :to="{ name: 'edit-employee', params: {id: employee.id}}">
              Edit
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
    name: "EmployeesList",
    data: () => ({
        error: "",
        employees: [],
        e_id:'',
        e_name:'',
        e_dept:''
    }),
    mounted() {
        fetch("http://localhost:3000/api/employees")
        .then(response => response.json())
        .then(result => {
            this.employees = result;
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
            .then(response => {
              console.log(response);
              this.$router.go(0);
            });
        },
    }
}
</script>