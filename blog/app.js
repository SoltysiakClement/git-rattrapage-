import mysql from "mysql";
import express from 'express';
import router from './routes/routes.js';
import session from "express-session";
import parseurl from 'parseurl';


const app = express();


const saltsRound =10;
//hash le pass

//controller


//paramettrage du systeme de session 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    
  }))

  //création d'une session


//middlwerwolf
app.use((req,res,next)=>{
    res.locals.isConnected =req.session.isConnected;
    next();
})
  //verifier
  app.use((req,res,next)=>{
    //recup la route appeler
    let pathname = parseurl(req).pathname;

    let protectedPath=['/articleForm','/articleUpdate/[0-9]'];
    

    //console.log(pathname);
  //si route appeler secur et utiliseur pas connecté alors redirection vers page /
  if(!req.session.isConnected && protectedPath.indexOf(pathname)!==-1){
    res.redirect('/');

  }
  else{
    next();
  }
  })

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//définition du répertoire des fichiers public
app.use(express.static('public'));

app.use('/', router);

app.listen(3000, 'localhost', () => {
    console.log('serveur démarré sur http://localhost:3000');
})

