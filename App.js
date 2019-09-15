//express는 서버를 만들어준다. 상수는 압축 시켜놓은 것.
const express = require('express');

const app = express();
const userRoutes = require("./Routes/user");
const profileRoutes = require("./Routes/profile");
const bbsRoutes = require('./Routes/bbs');


//use는 사용자가 /user라는 요청을 넣으면 앱(userRoutes)을 사용한다. 
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);
app.use('/bbs', bbsRoutes);






const port = 3000;

//app.listen은 서버를 실행한다는 코드.
app.listen(port, () => console.log(`Server Running on ${port}`));

