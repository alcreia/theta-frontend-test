const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
  origin:'*'
}));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())


app.get('/api/employees', (req, res) => {  
  
  fs.readFile('employees.json',(err, data) => {
    if (err) throw err;
    let employee_list = JSON.parse(data);

    res.send(employee_list);
  });
});

app.post('/api/employees', (req, res) => {  

  let qs = req.body;
  let employee = {
    "id": qs.id,
    "name": qs.name,
    "department": qs.department,
  };

  fs.readFile('employees.json',(err, data) => {
    if (err) throw err;
    let employee_list = JSON.parse(data);

    employee_list.push(employee);

    fs.writeFile('employees.json', JSON.stringify(employee_list, null, 2), (err) => {
      if (err) throw err;
      res.writeHead(302, {'location': 'http://localhost:4200'});
      res.end();
    });
  });
});

app.get('/api/employees/:id', (req, res) => {  
  
  fs.readFile('employees.json',(err, data) => {
    if (err) throw err;
    let employee_list = JSON.parse(data);

    let result = employee_list.filter(emp => {
      return emp.id === req.params.id
    });

    if (result) {
      res.send(result);
    } else {
      res.send("Not Found")
    };

  });
});

app.put('/api/employees/:id', (req, res) => {  

  let qs = req.body;
  let employee = {
    "id": qs.id,
    "name": qs.name,
    "department": qs.department,
  };
  let i;

  fs.readFile('employees.json',(err, data) => {
    if (err) throw err;
    let employee_list = JSON.parse(data);

    i = employee_list.findIndex(emp => {
      return emp.id === req.params.id
    });

    res.send(employee);
    /*fs.writeFile('employees.json', JSON.stringify(employee_list), (err) => {
      if (err) throw err;
    });*/
  });
  /*res.writeHead(302, {'location': 'http://localhost:4200'});
  res.end();*/
});

app.delete('/api/employees/:id', (req, res) => {  

  fs.readFile('employees.json',(err, data) => {
    if (err) throw err;
    let employee_list = JSON.parse(data);

    for(let i = 0; i < employee_list.length; i++) {
      if (employee_list[i].id == req.params.id) {
        employee_list.splice(i,1);
      };  
    };
    fs.writeFile('employees.json', JSON.stringify(employee_list, null, 2), (err) => {
      if (err) throw err;
    });
  });
  res.writeHead(302, {'location': 'http://localhost:4200'});
  res.end();
});

app.listen(port, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});