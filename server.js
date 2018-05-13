const express = require('express');

var app = express();

app.get('/', (req,res) => {
  // res.send('<h1>Hello Express</h1>');
  res.send({
    name: 'Ryan',
    age: 27,
    city: 'Hamilton'
  });
});

app.get('/about',(req,res)=> {
  res.send('About Page');
});

app.get('/bad', (req,res) => {
  res.send({
    type: 'Error Message',
    code: 'bad'
  });
})

app.listen(3000);
