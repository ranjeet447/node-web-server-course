const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app =express();




app.set('view engine','hbs');
app.set('views', __dirname + '/views');


app.use((req, res,next) => {
  var now = new Date().toString();
  var log = `${now}:  ${req.method}  ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n' ,(error)=>{
    if(error){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req,res,next) =>{
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));//<-middleWare

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCuurrentYear',()=>{
  return new Date().getFullYear();
});


app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Hello Express'
  });
});

app.get('/about',(req,res) =>  {
  res.render('about.hbs',{
    pageTitle:'About Page',
    body:'Page body',
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  });
});

app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
