const router = require('express').Router();
const apiRoutes = require('./api');

//the /api route to be used with the router
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;