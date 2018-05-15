const express = require('express');
const hbs = require('hbs');

//"nodemon server.js -e js,hbs" to watch all js and hbs file extensions in project

var app = express();

hbs.registerPartials(__dirname + '/views/partials');  //set directory for handlebar partials
app.set('view engine', 'hbs');                    //set view engine to use handlebars
app.use(express.static(__dirname + '/public'));   //static takes absolute path to what you want to serve up
                                                   //dirname is path to node_web_server

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

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
