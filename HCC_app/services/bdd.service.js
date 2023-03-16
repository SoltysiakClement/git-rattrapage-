const sqlite3 = require("sqlite3").verbose();

class Bdd {
  constructor() {
    if (!Bdd.instance) {
      this.db = new sqlite3.Database("./data/hcc.db");

      this.db.serialize(() => {
        this.db.run(
          "\
            CREATE TABLE IF NOT EXISTS utilisateur (\
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
                prenom TEXT NOT NULL,\
                nom TEXT NOT NULL,\
                email TEXT UNIQUE NOT NULL ,\
                salt TEXT NOT NULL,\
                hashedMotDePasse TEXT NOT NULL,\
                role TEXT NOT NULL,\
                date_creation TIMSTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)"
        );
        
        this.db.run(
            "\
              CREATE TABLE IF NOT EXISTS matchs (\
                  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
                  concurrent TEXT NOT NULL,\
                  concurrentScore INTEGER,\
                  equipeScore INTEGER ,\
                  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,"
        );

        this.db.run(
           "\
              CREATE TABLE IF NOT EXISTS utilisateurs_matchs (\
                   utilisateur_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
                   match_id INTEGER NOT NULL,\
                   PRIMARY KEY (utilisateur_id,match_id),\
                   FOREIGN KEY (match_id), REFERENCES matchs(id) ON DELETE CASCADE,"
        );

        this.db.run(
            "\
               CREATE TABLE IF NOT EXISTS articles (\
                    utilisateur_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
                    titre TEXT NOT NULL,\
                    contenu TEXT NOT NULL,\
                    date_creation TIMSTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP),\
                    utilisateur_id INTEGER NOT NULL,\
                    FOREIGN KEY (utilisateur_id) REFERENCES UTILISATEURS(id) ON DELETE CASCADE)');
        );
      
      }

      Bdd.instance = this;
    }
    
    return Bdd.instance;
  }
  module.exports = new Bdd();
}
