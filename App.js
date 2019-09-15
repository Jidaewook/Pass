//express는 서버를 만들어준다. 상수는 압축 시켜놓은 것.
const express = require('express');

const app = express();

const port = 3000;

//app.listen은 서버를 실행한다는 코드.
app.listen(port, () => console.log(`Server Running on ${port}`));

