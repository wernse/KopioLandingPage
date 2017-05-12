const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Test Route Time: ', Date.now())
  next()
})
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api test works');
});

module.exports = router;