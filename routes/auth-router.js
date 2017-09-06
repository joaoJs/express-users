const express   = require('express');
const bcrypt    = require('bcrypt');
//const beautifyUnique = require('mongoose-beautiful-unique-validation');
const passport  = require('passport');


const UserModel = require('../models/user-model.js');

const router    = express.Router();



router.get('/signup', (req,res,next) => {
    res.render('auth-views/signup-form.ejs');
});

router.post('/process-signup', (req,res,next) => {
    if (req.body.signupEmail === "" || req.body.signupPassword) {
        res.locals.feedbackMessage = "We need both email and password.";
        res.render('auth-views/signup-form.ejs');
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const scrambledPass = bcrypt.hashSync(req.body.password, salt);

    const theUser = new UserModel( {
        email: req.body.signupEmail,
        encryptedPassword: scrambledPass
    });

    theUser.save((err) => {
        if (err && theUser.errors) {
          console.log('HERE!');
          res.locals.feedbackMessage = "email already taken";

           // disply again the form with the errors
           res.render('auth-views/signup-form.ejs');
           return;
        }

        if (err && !theUser.errors) {
            // skip to the error handler middleware
            next(err);
            // return to avoid showing the view
            return;
              // early return instead of "else"
        }


        req.flash('signupSuccess', 'Sign up successful! Try loggin in.');
        res.redirect('/');
    // is this email taken?
    // did they even give us an email?
    // did they even give us a password?
    // if email isn't taken, encrypt the password
    // save the new user
    // if save works, redirect to HOME PAGE

  });

});

router.get('/login', (req,res,next) => {
    res.locals.error = req.flash('error');

    res.locals.logoutFeedback = req.flash('logoutSuccess');

    res.render('auth-views/login-form.ejs');
});

router.post('/process-login',
    // name of strategy  settings object
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get('/logout', (req,res,next) => {
  req.logout();

  req.flash('logoutSuccess', 'Log out successful.');
  res.redirect('/login');
});




module.exports = router;
