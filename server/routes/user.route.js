const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('User Route Time: ', Date.now())
  next()
})
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api user works');
});

module.exports = router;