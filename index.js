const express = require('express');
const app = express();
const port = 3000;

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

app.set("view engine" ,"ejs");



app.get('/login', (req, res) => {
  res.render('login');
})


app.get("/loginsubmit", (req, res) => {
  const email = req.query.email;
  const Password = req.query.Password;
  db.collection('users')
  .where('email', '==', email)
  .where('Password', '==', Password)
  .get().then((docs)=>{
    if(docs.size > 0){
      res.render('BudgetTracker');

    }
    else{
      res.send("Login Failed");
    }
  })
});



app.get('/signup', (req, res) => {
  res.render('signup');
})
app.get("/signupsubmit", (req, res) => {
  const Fullname = req.query.Fullname;
  const email = req.query.email;
  const Password = req.query.Password;
  const confirmPassword = req.query.confirmPassword;

 
  

  db.collection("users")
  .add({
    Fullname:Fullname,
    email:email,
    Password: Password,
    confirmPassword:confirmPassword

  }).then(()=>{
    res.render("login");
  
  
  });
});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})