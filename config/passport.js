const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const KakaoTokenStrategy = require('passport-kakao-token');

const mongoose = require('mongoose');
const userModel = mongoose.model('users');


// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "Owl";

// module.exports = passport => {
//     passport.use(
//         //압축이 풀린 토큰값이 opts에 들어가는 데 jsonwebtoken(Bearertoken)이 맞으면(인증되면) jwt_payload가 넘어가고, 틀리면 done.
//         new JwtStrategy(opts, (jwt_payload, done) => {
//             userModel.findById(jwt_payload.id)
//                 .then(user => {
//                     if(user){
//                         return done(null, user);
//                     } else {
//                         return done(null, false);
//                     }
//                 })
//                 .catch(errors => console.log(errors));
//         })
//     )
// }

//JSON WEB Tokens Strategy

//Route에서의 user 로그인 과정을 거치면, 여기에서 토큰을 받아와 인증을 하게 되고, 인증을 하면 이 함수에서 사용자 정보를 'user'로 내보낸다.
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETKEY
}, async(payload, done) => {
    try{
        const user = await userModel.findById(payload.sub);

        if(!user){
            return done(null, false);
        }
        done(null, user);
    } catch(error){
        done(error, false);
    }
}));

//LOCAL Strategy(이메일로 회원가입했을 때/로그인 했을 때의 인증과정)

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try{
        const user = await userModel.findOne({"local.email": email});

        if(!user){
            return done(null, false);
        } 

        const isMatch = await user.isValidPassword(password);
        if(!isMatch){
            return done(null, false);
        }
        done(null, user);
    } catch(error){
        done(error, false);
    }
}));

//Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    // console.log('profile', profile);
    // console.log('accessToken', accessToken);
    // console.log('refreshToken', refreshToken);

    try{
        const existingUser = await userModel.findOne({"google.id": profile.id});
        if(existingUser) {
            return done(null, existingUser);
        }

        const newUser = new userModel({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            }
        });
        
        await newUser.save();
        done(null, newUser);
    } catch(error){
        done(error, false, error.message);
    }

}));

//Facebook OAuth Strategy
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    try{
        const existingUser = await userModel.findOne({"facebook.id": profile.id});
        if(existingUser){
            return done(null, existingUser);
        }
        const newUser = new userModel({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            }
        });

        await newUser.save();
        done(null, newUser);


    } catch(error){
        done(error, false, error.message);
    }
}));

// //Kakao OAuth Strategy
// passport.use('kakao-token', new KakaoTokenStrategy({
//     clientID: process.env.KAKAO_CLIENT_ID,
//     clientSecret: process.env.KAKAO_CLIENT_SECRET
// }, async (accessToken, refreshToken, profile, done) => {
//     console.log('accessToken', accessToken);
//     console.log('refreshToken', refreshToken);
//     console.log('profile', profile);
    
// }));