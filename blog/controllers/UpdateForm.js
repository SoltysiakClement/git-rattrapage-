import {connection} from '../config/database.js'
export const displayUpdateArticle = (req, res)=>{
    let reqArticle = "SELECT * FROM article WHERE id=?";
    connection.query(reqArticle,[req.params.id], function(error,article,fields){
        res.render('updateForm.ejs',{article:article})
    })
    
}
export const updateArticle = (req, res) =>{
    let sql = "UPDATE article SET titre=? , description=? WHERE id=?";

    connection.query(sql,[req.body.titre,req.body.description,req.params.id], function(error,fields){
        res.redirect('/')
    })
}