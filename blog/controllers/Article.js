import {connection} from '../config/database.js'
export const displayArticle = (req, res) => {
  let sqlArticle = "SELECT * FROM article WHERE id =?";
  
  connection.query(sqlArticle,[req.params.id],function (error, articleSQL, fields) {
      let article = articleSQL[0];
      let sqlCommentaire = "SELECT * FROM commentaire WHERE id_article =?";
        connection.query(sqlCommentaire,[req.params.id], function(error,commentaires,fields){
        res.render("article.ejs", { article: article, commentaires: commentaires });
    })

    }
  );
    
};

export const articleDelete =(req, res)=>{

    let sqlDelete= "DELETE FROM article WHERE id = ?";
    connection.query(sqlDelete,[req.params.id],function(error,fields){
      
      res.redirect('/')
  })

}



export const addCommentaire =(req, res)=>{
    let sql = "INSERT INTO commentaire (pseudo,description,id_article) VALUES (?,?,?);";
    connection.query(sql,[req.body.pseudo,req.body.description,req.params.id], function(error,fields){

        res.redirect('/article/'+req.params.id)
    })
}
