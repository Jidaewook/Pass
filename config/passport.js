const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const userModel = mongoose.model('users');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Owl";

module.exports = passport => {
    passport.use(
        //압축이 풀린 토큰값이 opts에 들어가는 데 jsonwebtoken(Bearertoken)이 맞으면(인증되면) jwt_payload가 넘어가고, 틀리면 done.
        new JwtStrategy(opts, (jwt_payload, done) => {
            userModel.findById(jwt_payload.id)
                .then(user => {
                    if(user){
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
                .catch(errors => console.log(errors));
        })
    )
}