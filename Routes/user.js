const express = require('express');
//gravatar는 아바타를 자동으로 만들어준다. 
const gravatar = require('gravatar');
//bcrypt는 암호를 암호화
const bcrypt = require('bcryptjs');

//회원가입 버튼을 누르면 필요한 항목을 스키마를 통해 불러오고, 콜렉션 내에 이미 가입된 이메일이 있는지 체크하기 위해 모델을 불러온다.  
const userModel = require('../Models/user');


//app내에 Api를 받아올 페이지에서는 익스프레스 안의 라우터를 불러와야 한다. 
//const 뒤에는 임의의 변수명을 설정하고, 라우터를 익스프레스 안에서 불러온다.
const router = express.Router();


// 현재 입력받은 주소: 3000/user/register
// @route GET 3000/user/register
// @desc Register User
// @access public(아직)

// 중괄호는 return값을 줄 때와 json값을 줄 때 사용한다. 나머지는 소괄호?
router.post('/register', (req, res) => {
    userModel
        //사용자 입력값 중의 이메일(req.body.email)로 userModel안의 이메일에 해당하는 값이 있는지 찾는다.
        .findOne({email: req.body.email})
        //user는 지금 회원가입하면서 정보를 입력하는 user를 지칭하고, 이미 위에서 대조된 상태값을 지칭.
        .then(user => {
            if(user){
                res.status(404).json({
                    errMsg: "이미 가입된 E-mail주소입니다."
                })
            } else{
                //아이디나 이메일에 아바타를 설정한다. 그 옵션을 사이즈, 레이팅?, 단위이다.
                const avatar = gravatar.url(req.body.email, {
                    s: '200', 
                    r: 'pg',
                    d: 'mm'
                });

                //userModel 이라는 콜렉션에 사용자 입력값을 집어넣는다(save). 
                const newUser = new userModel({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password

                });
                
                newUser
                    .save()
                    //저장된 newUser가 user로 전환 리턴. 그 user값(value)을 보여주는게 userInfo
                    .then(user => res.status(200).json({
                        userInfo: user
                    }))
                    .catch(err => res.status(400).json({
                        errMsg: err
                    }));

            }
        })
        .catch(err => res.status(400).json({
            errMsg: err
        }));

})

// 현재 입력받은 주소: 3000/user/login
// @route GET 3000/user/login
// @desc Login user
// @access public(아직)
router.post('/login', (req, res) => {
    res.status(200).json({
        msg: 'User login'
    })
})




//이 페이지에서 내보내는 행위를 설정하는 것. 이름은 큰 의미가 없다(router라는 이름을 다른 곳에서 부르는 개념이 아님)
module.exports = router;