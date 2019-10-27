
//gravatar는 아바타를 자동으로 만들어준다. 
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
//load input Validation
const validateRegisterInput = require('../Validation/register');

const userModel = require('../Models/user');




//토큰 만드는 방법을 모듈화
signToken = user => {
    return jwt.sign({
        iss: 'PASSMANAGER',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.SECRETKEY);
};


exports.register_user = async (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    //check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const foundUser = await userModel.findOne({ "local.email": req.body.email });
    if (foundUser) {
        errors.msg = "이미 가입된 E-mail주소입니다."
        res.status(400).json(errors);

    }

    // 아이디나 이메일에 아바타를 설정한다. 그 옵션을 사이즈, 레이팅?, 단위이다.
    const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });


    //userModel 이라는 콜렉션에 사용자 입력값을 집어넣는다(save). 
    const newUser = new userModel({
        method: 'local',
        local: {
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password

        }
    });

    const token = signToken(newUser);

    await newUser.save()
        .then(user => {
            res.status(200).json({
                msg: 'created User',
                userInfo: user,
                tokenInfo: "bearer " + token
            });
        });


    // userModel
    //     //사용자 입력값 중의 이메일(req.body.email)로 userModel안의 이메일에 해당하는 값이 있는지 찾는다.
    //     .findOne({email: req.body.email})
    //     //user는 지금 회원가입하면서 정보를 입력하는 user를 지칭하고, 이미 위에서 대조된 상태값을 지칭.
    //     .then(user => {
    //         if(user){
    //             errors.msg = "이미 가입된 E-mail주소입니다."
    //             res.status(400).json(errros);
    //         } else{
    //             //아이디나 이메일에 아바타를 설정한다. 그 옵션을 사이즈, 레이팅?, 단위이다.
    //             const avatar = gravatar.url(req.body.email, {
    //                 s: '200', 
    //                 r: 'pg',
    //                 d: 'mm'
    //             });

    //             //userModel 이라는 콜렉션에 사용자 입력값을 집어넣는다(save). 
    //             const newUser = new userModel({
    //                 name: req.body.name,
    //                 email: req.body.email,
    //                 avatar,
    //                 password: req.body.password

    //             });

    //             //패스워드 암호화
    //             bcrypt.genSalt(10, (err, salt) => {
    //                 bcrypt.hash(newUser.password, salt, (err, hash) => {
    //                     if(err) throw err;
    //                     newUser.password = hash;
    //                     newUser.save()
    //                         .then(user => res.json(user))
    //                         .catch(err => res.json(err));
    //                 });
    //             });


    //         }
    //     })
    //     .catch(err => {
    //         errors.err = err;
    //         res.status(500).json(errors);
    //     });

};


exports.login_user = async (req, res) => {

    const token = signToken(req.user);
    console.log(token);
    res.status(200).json({
        msg: 'successful login',
        tokenInfo: "bearer " + token
    });
    // const {errors, isValid} = validateLoginInput(req.body);

    // //check Validation
    // if(!isValid){
    //     res.status(400).json(errors);
    // } 

    // //userModel은 데이터베이스로서 상수화된 값이고, 가입을 하면 스키마의 모양대로 유저의 정보가 담기게 된다. 
    // //그래서 로그인을 할 때, userModel에서 email을 활용햇 가입자 정보를 findOne을 해서 찾은 결과(매칭여부)를 user로 주게 된다.
    // //매칭되었으면 user는 1, 없으면 0이 될 것이다.  
    // userModel
    //     .findOne({email: req.body.email})
    //     .then(user => {
    //         if(!user){
    //             errors.msg = '가입된 이메일이 없습니다.'
    //             res.status(400).json(errors);
    //         } else{
    //             //user가 매칭된 상황이므로, 패스워트 매칭 여부 확인 들어간다.
    //             bcrypt.compare(req.body.password, user.password)
    //                 .then(isMatch => {
    //                     if(!isMatch){
    //                         errors.msg = 'Password Incorrect';
    //                         return res.status(400).json(errors);

    //                     } else{
    //                         const payload = {id: user.id, name: user.name, avatar: user.avatar};

    //                         //sign은 webtoken을 생성하는 건데, payload라는 덩어리와, 암구어, 만료시간, 에러 또는 성공시 결과값(성공시 토큰덩어리-payload의 뭉텡이를 키한묶음으로 압축한 것)
    //                         jwt.sign(
    //                             payload,
    //                             process.env.SECRETKEY, 
    //                             {expiresIn: 10000},
    //                             (err, token) => {
    //                                 res.json({
    //                                     success: true,
    //                                     token: 'Bearer ' + token
    //                                 });
    //                             }
    //                         )
    //                     }
    //                 })
    //                 .catch(err => res.json(err));
    //         }
    //     })
    //     .catch(err => {
    //         errors.err = err;
    //         res.status(500).json(errors);
    //     })
};