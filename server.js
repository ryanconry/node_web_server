const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

//"nodemon server.js -e js,hbs" to watch all js and hbs file extensions in project

const port = process.env.PORT || 3000;            //heroku will set port, if run locally then 3000
var app = express();

hbs.registerPartials(__dirname + '/views/partials');  //set directory for handlebar partials
                                                    //dirname is absolute path to node_web_server
app.set('view engine', 'hbs');                    //set view engine to use handlebars

app.use((req,res,next)=> {                        //set up logger middleware
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;   //log entry
  console.log(log);                               //print to console
  fs.appendFile('server.log', log + '\n', (err) => {  //save to file
    console.log('Unable to append to server.log');
  });
  next();                                         //call next to return
})

app.use((req,res,next) => {                       //set up maintenance middleware
  res.render('maintenance.hbs');
  next();
});

app.use(express.static(__dirname + '/public'));   //static takes absolute path to what you want to serve up

hbs.registerHelper('getCurrentYear',() => {         //initialize handlebar helper
  return new Date().getFullYear();
});

app.get('/', (req,res) => {                        //set behaviour for root page
  res.render('home.hbs',{                         //render home.hbs on root page
    pageTitle: 'Home',                            //pass object to render in home template
    message: 'Welcome to my web server!'
  });
});

app.get('/about',(req,res)=> {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req,res) => {
  res.send({
    type: 'Error Message',
    code: 'bad'
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
