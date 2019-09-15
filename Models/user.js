const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//스키마는 다루고자 하는 각각의 정보항목을 의미한다. 
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }, 
    date: {
        type: String,
        default: Date.now
    }

});


//몽고db에 users라는 콜렉션이 생기고 그 안에 UserSchema의 내용이 들어간다. 
module.exports = mongoose.model('users', UserSchema);