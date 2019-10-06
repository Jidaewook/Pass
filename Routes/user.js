const express = require('express');

//bcrypt는 암호를 암호화
const bcrypt = require('bcryptjs');

//회원가입 버튼을 누르면 필요한 항목을 스키마를 통해 불러오고, 콜렉션 내에 이미 가입된 이메일이 있는지 체크하기 위해 모델을 불러온다. 
//가입된 유저를 유저모델에 저장하기 위해 불러와야 한다.  
const userModel = require('../Models/user');


const passport = require('passport');
const passportConf = require('../config/passport');

//app내에 Api를 받아올 페이지에서는 익스프레스 안의 라우터를 불러와야 한다. 
//const 뒤에는 임의의 변수명을 설정하고, 라우터를 익스프레스 안에서 불러온다.
const router = express.Router();


const validateLoginInput = require('../Validation/login');
const authCheck = passport.authenticate('jwt', { session: false });

const passportSignIn = passport.authenticate('local', {session: false});
const userController = require('../controller/user');





// 현재 입력받은 주소: 3000/user/register
// @route GET 3000/user/register
// @desc Register User
// @access public(아직)

// 중괄호는 return값을 줄 때와 json값을 줄 때 사용한다. 나머지는 소괄호?
router.post('/register', userController.register_user);

// 현재 입력받은 주소: 3000/user/login
// @route GET 3000/user/login
// @desc Login user
// @access public(아직)
router.post('/login', passportSignIn, userController.login_user);



//@route Get localhost:3000/user/current
//@desc Return current user
//@access Private


//authCheck = passport.authenticate('jwt', {session: false})는 인증을 위한 함수덩어리 인데, 여기서 쓰는 user는 config/passport.js에서 jwt를 통해 출력된 값이다.
router.get('/current', authCheck, (req, res) => {
    res.json({
        id: req.user._id,
        avatar: req.user.local.avatar,
        email: req.user.local.email
    });
});

//@route Get localhost:3000/user/all
//@desc Return All user
//@access Private

router.get('/all', (req, res) => {
    userModel.find()
        .then(docs => {
            if(docs.length <= 0){
                return res.status(400).json({
                    msg: 'Data is none'

                });
            } else {
                res.status(200).json({
                    userCount: docs.length,
                    userInfo: docs
                });
            }
        })
        .catch(err => res.status(400).json(err));
});


// Google OAuth
router.post('/oauth/google', passport.authenticate('googleToken', {session: false}) ,(req, res) => {
    const token = signToken(req.user);
    console.log(token);
    res.status(200).json({ 
        msg: "successful Google Login",
        tokenInfo: "bearer " + token    
    });
});

//Facebook OAuth
router.post('/oauth/facebook', passport.authenticate('facebookToken', {session: false}), (req, res) => {
    const token = signToken(req.user);
    console.log(token);
    res.status(200).json({
        msg: "successful Facebook Login",
        tokenInfo: "bearer " + token
    });
});

// //Kakao OAuth
// router.post('/oauth/kakao', passport.authenticate('kakao-token', {session: false}), (req, res) => {
//     const token = signToken(req.user);
// });




//이 페이지에서 내보내는 행위를 설정하는 것. 이름은 큰 의미가 없다(router라는 이름을 다른 곳에서 부르는 개념이 아님)
module.exports = router;