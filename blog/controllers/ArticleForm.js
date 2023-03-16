import {connection} from '../config/database.js'
import formidable from "formidable";
import fs from 'fs'

export const getajouter = (req, res) => {
    
    res.render('articleForm.ejs');
    
}

export const postajouter = (req, res) =>{
    
    

    let sql = "INSERT INTO article (titre,description,image) VALUES (?,?,?)";
    
    const form = formidable();
    form.parse(req, function (err, fields, files){
        let oldpath = files.fichier.filepath;
        let newpath = 'public\\images\\' + files.fichier.originalFilename;
        fs.copyFile(oldpath, newpath, function (err){
            if (err) throw err;
        })
       
        connection.query(sql,[fields.titre,fields.description,files.fichier.originalFilename], function(error,halloween,fields){
            res.redirect('/')
        })
    })

}

export const postmodifier = (req, res) =>{
    
  

    let sql = "UPDATE INTO article (titre,description) VALUES (?,?)";


    connection.query(sql,[req.body.titre,req.body.description], function(error,halloween,fields){
        res.redirect('/')
    })


}