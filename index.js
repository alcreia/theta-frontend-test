const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/api/employees', (req, res) => {  
  
  fs.readFile('employees.json',(err, data) => {
    if (err) throw err;
    let employee_list = JSON.parse(data);

    res.send(employee_list);
  });
});

app.post('/api/employees', (req, res) => {  

  let qs = req.query;
  let employee = {
    "id": qs.id,
    "name": qs.name,
    "department": qs.department,
  };

  fs.readFile('employees.json',(err, data) => {
    if (err) throw err;
    let employee_list = JSON.parse(data);

    employee_list.push(employee);

    fs.writeFile('employees.json', JSON.stringify(employee_list), (err) => {
      if (err) throw err;
      res.send('success');
    });
  });
});

app.get('/api/employees/:id', (req, res) => {  
  
  fs.readFile('employees.json',(err, data) => {
    if (err) throw err;
    let employee_list = JSON.parse(data);
    let id;

    for(let i = 0; i < employee_list.length; i++) {
      if (employee_list[i].id == req.params.id) {
        id = i;
        break;
      } else {
        id = null;
      }
    }

    if (id) {
      res.send(employee_list[id]);
    } else {
      res.send("Not Found")
    };

  });
});

app.listen(port, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});