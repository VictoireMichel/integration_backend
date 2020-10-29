const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {

        User.findById(id).then(function(user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });

    const Users = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'mail',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, mail, password, done) {
            const generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            Users.findOne({
                where: {
                    mail: mail
                }
            }).then(function(user) {
                if (user) {

                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                }
                else {
                    const userPassword = generateHash(password);
                    const data =
                        {
                            mail: mail,
                            password: userPassword,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            learningMode: false
                        };

                    Users.create(data).then(function(newUser, created) {

                        if (!newUser) {
                            console.log("aa");
                            return done(null, false, {
                                message: "error user creation"
                            });

                        }

                        if (newUser) {

                            return done(null, newUser);

                        }

                    });

                }

            })
                .catch(error => console.log("there is an error with user creation : ", error));

        }

    ));

};