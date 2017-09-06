const passport = require('passport');

const UserModel = require('../models/user-model.js');


// 'serializeuser' is called when the user logs in
// it determines what gets saved into the session when you log in
passport.serializeUser((userFromDb, done) => {
    // tell passport we want to save the id inside the session
    done(null, userFromDb._id);
    // null --> no error
});

// 'deserializeUser' is called on every request after logging in
// it tells the passport how to get the user's information with the id
passport.deserializeUser((idFromBowl, done) => {
    UserModel.findById(
      idFromBowl,
      (err, userFromDb) => {
          if (err) {
            done(err);
            return;
          }

          done(null, userFromDb);
      }
    );
});


// -----------------------------------------------------------------------------
//
// STRATEGIES setup

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// set up a new strategy
passport.use(
   new LocalStrategy(
       // 1st arg settings obj
       {
          usernameField: "loginEmail",
          password: "password"
       },

       // 2nd obj a callback
       (emailValue, passValue, done) => {
          // find the user in the db with that email
          UserModel.findOne(
            { email: emailValue },

            (err, userFromDb) => {
               if (err) {
                   done(err);
                   return;
               }

               if (userFromDb === null) {
                      // LOG IN FAILED
                   done(null, false, { message: 'Email is wrong. 💩'});
                   return;
               }

               const isGoodPassword = bcrypt.compareSync(passValue, userFromDb.encryptedPassword);

               if (isGoodPassword === false) {
                  done (null, false, {message: "password is wrong 💩."});
                  return;
               }

               done(null, userFromDb);

            }
          );
       }

   )
);
