//express는 서버를 만들어준다. 상수는 압축 시켜놓은 것.

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const passport = require('passport');
const dotEnv = require('dotenv');
dotEnv.config();

const app = express();
const userRoutes = require("./Routes/user");
const profileRoutes = require("./Routes/profile");
const bbsRoutes = require('./Routes/bbs');


//몽고디비와 지속적으로 연결하게끔 하는 것.
mongoose.Promise = global.Promise;


//mongoDB로 db의 주소를 불러온다.
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('mongodb connected..'))
    .catch(err => console.log(err));
    
    

//body-parser를 통해 bodyParser를 설정하는 과정.
//이게 되어야, 콜렉션 작업을 할 때 쓰는 req.body.xxx가 인식된다.     
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
//앱을 처음 켜면 passport를 초기화 하는 것.
// app.use(passport.initialize());
// //passport(인증)을 하기 위한 설정
// require('./config/passport')(passport);

//use는 사용자가 /user라는 요청을 넣으면 앱(userRoutes)을 사용한다. 
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);
app.use('/bbs', bbsRoutes);






const port = process.env.PORT || 5000;

//app.listen은 서버를 실행한다는 코드.
app.listen(port, () => console.log(`Server Running on ${port}`));

