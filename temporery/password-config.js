const LocalStrategy = require('passport-local').Strategy
import bcrypt from 'bycrypt';


function initialize(passport){
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if ( await bcrypt.compare(password, user.password )) {
                    return done(null,user)
            } else{
                return done(null,false, { message: 'password incorrect'})
            }
        } catch (e) {
            return done(e)
        }
    }
       

    passport.use(new LocalStrategy({ usernameField: 'email' }),
    authenticateUser)
    passport.serializeUser((user, done) => { })
    passport.serializeUser((id, done) => { })
}

module.exports = initialize