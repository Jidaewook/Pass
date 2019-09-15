const express = require('express');

//app내에 Api를 받아올 페이지에서는 익스프레스 안의 라우터를 불러와야 한다. 
//const 뒤에는 임의의 변수명을 설정하고, 라우터를 익스프레스 안에서 불러온다.
const router = express.Router();


// 현재 입력받은 주소: 3000/user/register
// @route GET 3000/user/register
// @desc Register User
// @access public(아직)

// 중괄호는 return값을 줄 때와 json값을 줄 때 사용한다. 나머지는 소괄호?
router.post('/register', (req, res) => {
    res.status(200).json({
        msg: 'User register'
    }) 
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