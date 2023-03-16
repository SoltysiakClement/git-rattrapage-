import {connection} from '../config/database.js'
import bcrypt from "bcrypt";
import session from 'express-session';

export const displayForm = (req, res) => {
   

    res.render('connectionForm.ejs');
}


// Chiffrer le mot de passe 

// bcrypt.hash('123456789',saltsRound,(error,hash)=>{
//     console.log(hash)
// })


//verification de corre sp
// bcrypt.compare('123456789','$2b$10$k9XYJakJGa.lVUPV3AxCO.KiQE9U7BxJrmo7kiMu9O9TgtjrYrN4O',(err,result)=>{
//     if(result){
//          console.log('bon mdp')
//     }
   
//     else{
//         console.log('mv mdp')

//     }
// })

export const postFormConnection = (req, res) =>{

    let sql = "SELECT * FROM utilisateur WHERE email = ?";

    connection.query(sql,[req.body.email], function(error,user,fields){
       
        bcrypt.compare(req.body.mdp,user[0].mdp,(err,result)=>{
           
            if(result){
                // Création de session
                // console.log('bon msp');
                req.session.isConnected = user[0].nom;
                
                res.redirect('/')
            }
           
            else{
                // Mauvais mot de passe 
                req.session.error="true"
                res.redirect('/connectionForm')
                console.log('Mauvais mot de passe');
            }
        })
    })


}

export const postmodifier = (req, res) =>{
    
    let sql = "UPDATE INTO article (titre,description) VALUES (?,?)";

    connection.query(sql,[req.body.titre,req.body.description], function(error,halloween,fields){
        res.redirect('/')
    })


}

export const deconnection = (req, res) =>{
    console.log('Deconnexion')
    req.session.destroy((err) =>{
        res.redirect('/');
    })
}
