const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
  origin:'*'
}));

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

let employee_list;

fs.readFile('employees.json',(err, data) => {
  if (err) throw err;
  employee_list = JSON.parse(data);
});

app.listen(port, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});

app.get('/api/employees', (req, res) => {  
  res.send(employee_list);
});

app.post('/api/employees', (req, res) => {  
  let employee = req.body;
  employee_list.push(employee);
  
  res.send('Success Add');
});

app.get('/api/employees/:id', (req, res) => {  
    
  let result = employee_list.filter(emp => {
    return emp.id === req.params.id
  });

  if (result != []) {
    res.send(result);
  } else {
    res.send("Not Found")
  };

});

app.put('/api/employees/:id', (req, res) => {  
  let employee = req.body;
  
  let result = employee_list.findIndex(emp => {
    return emp.id === req.params.id
  });

  employee_list[result] = employee;

  res.send('Success Edit');
});

app.delete('/api/employees/:id', (req, res) => {  

  for(let i = 0; i < employee_list.length; i++) {
    if (employee_list[i].id == req.params.id) {
      employee_list.splice(i,1);
    };  
  };
  res.send("success");
});