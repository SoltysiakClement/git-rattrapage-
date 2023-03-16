import express from 'express';
import HomeController from '../controllers/Home.js';
import {getajouter,postajouter} from '../controllers/ArticleForm.js';
import {displayArticle,addCommentaire,articleDelete} from '../controllers/Article.js';
import {updateArticle,displayUpdateArticle} from '../controllers/UpdateForm.js';
import {displayForm,postFormConnection,deconnection} from '../controllers/ConnectionForm.js';

const router = express.Router();

router.get("/", HomeController);
router.get("/article/:id", displayArticle);
router.post("/article/:id", addCommentaire);
router.get("/articleForm",  getajouter);
router.post("/articleForm",  postajouter);
router.get("/articleUpdate/:id",displayUpdateArticle);
router.post("/articleUpdate/:id",updateArticle);
router.get("/articleDelete/:id",articleDelete);
router.get('/connectionForm',displayForm);
router.post('/connectionForm',postFormConnection);
router.get('/logout',deconnection);


 export default router;


