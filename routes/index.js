const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // req.user is the user obj with user info
  console.log(req.user);

  if (req.user) {
    res.locals.user = req.user;
    res.render('user-home.ejs');
  }

  else {
    res.locals.signupFeedback = req.flash('signupSuccess');
    res.render('index');
  }
});

module.exports = router;
