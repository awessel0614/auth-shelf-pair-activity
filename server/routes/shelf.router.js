const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
// router.get('/', (req, res) => {
//   let queryText = `SELECT * FROM "item"`;
//   pool.query(queryText).then((result) => {
//     res.send(result.rows);
//   }).catch((error) => {
//     console.log(error);
//     res.sendStatus(500);
//   });
// });


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      let queryText = `SELECT * FROM "item" WHERE "user_id" =$1;`;
      pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows);
    }).catch((e) => {
      console.error('Error in GET', e);
      res.sendStatus(500);
  });
    } else {
      res.sendStatus(401);
    }
});



/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `
    INSERT INTO "item" ("description", "image_url", "user_id")
    VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [req.body.description, req.body.image_url, req.user.id]).then((result) => {
      res.sendStatus(200);
    }).catch((e) => {
      console.error('Error in POST', e);
      res.sendStatus(500);
    })
  }
  // endpoint functionality
});

/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
