import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/employees",
      name: "employees",
      component: () => import("./components/EmployeesList")
    },
    {
      path: "/employees/:id",
      name: "edit-employee",
      component: () => import("./components/EditEmployee")
    }
  ]
});
