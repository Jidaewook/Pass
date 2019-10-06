const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



//스키마는 다루고자 하는 각각의 정보항목을 의미한다. 
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //profile 스키마가 ref를 통해서 users의 하위개념으로 엮이게 된다. 
        ref: 'users'
    }, 
    age: {
        type: Number
    },
    bio: {
        type: String
    },
    major: {
        type: String
    },
    location: {
        type: [String]
    },
    testname: {
        type: [String],
        required: true
    },
    preference: {
        type: [String]
    },
    task: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('profile', ProfileSchema);