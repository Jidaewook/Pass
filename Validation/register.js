const Validator = require('validator');

const isEmpty = require('./isEmpty');


//사용자입력값인 req.body를 data에 받아서 아래 함수를 진행하고 그 결과값을 내보낸다.
module.exports = function validateRegisterInput(data){
    //에러가 발생하면 이 안에 에러가 담긴다. 그 내용을 서버 응답값에 출력한다. 
    let errors = {};


    //name입력값에 빈칸이 없으면(!isempty가 참.) data.name을 넣어주고, 있으면 빈칸.
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    //data.name의 길이가 2~30이게끔. 해당 안되면 에러 발생.
    if(!Validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = 'Name must be between 2 and 30 Characters';
    }


    //빈칸만 체크하는 확인들
    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required";
        
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }
 
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm Password field is required';
    }

    //email입력값의 형식이 email인지(isemail)을 이용해서 확인.
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invaild';
    }   

    if(!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'Password must be between 6 and 30 characters';
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords must match';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
}