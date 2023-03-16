import {connection} from '../config/database.js'
import session from 'express-session';

export default (req, res) => {

    const reqArticles = "SELECT * FROM article"
    connection.query(reqArticles, function(error,articlesSQL, fields){
        res.locals.isConnected = req.session.isConnected;
        res.render('home.ejs', {articles : articlesSQL});
    }
)}
   
