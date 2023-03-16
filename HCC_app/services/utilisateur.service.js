import bdd from "./bdd.service";

const db = new Bdd();

function getUtilisateur() {
  let sql = `SELECT * FROM utilisateur`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.name);
    });
  });
}
